import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export const SIGNAL_CHANNELS = ["HUMAN", "MARKET", "EDITORIAL", "INTERNAL"] as const;
export type SignalChannel = (typeof SIGNAL_CHANNELS)[number];

export const NEED_TYPES = ["QUESTION", "CONFUSION", "DECISION", "PROCESS", "RISK", "OPPORTUNITY", "CURRENT_EVENT"] as const;
export type NeedType = (typeof NEED_TYPES)[number];

export const AUDIENCES = ["PUBLIC", "PROFESSIONAL", "BOTH"] as const;
export type Audience = (typeof AUDIENCES)[number];

export const FRONT_STATUSES = ["CAPTURED", "CLASSIFIED", "CANDIDATE", "ROUTED", "ARCHIVED"] as const;
export type FrontStatus = (typeof FRONT_STATUSES)[number];

export type FrontFields = {
  concern: string;
  functionalContext: string;
  scope: string;
  subject: string;
};

export type Signal = FrontFields & {
  id: string;
  channel: SignalChannel;
  rawText: string;
  observedAt: string;
  sourceLabel: string;
  status: "CAPTURED";
  containsSensitiveData: false;
};

export type NeedClassification = FrontFields & {
  id: string;
  signalId: string;
  needType: NeedType;
  audience: Audience;
  confidence: number;
  rationale: string;
  classifiedAt: string;
  status: "CLASSIFIED";
};

export type TopicCandidate = FrontFields & {
  id: string;
  signalId: string;
  classificationId: string;
  question: string;
  audience: Audience;
  sourceReadiness: "UNKNOWN" | "PENDING" | "READY";
  legalReadiness: "NOT_ASSESSED" | "REQUIRES_RESEARCH" | "CANONICAL_BOUND_PENDING";
  editorialStatus: "CANDIDATE" | "RESEARCH_QUEUE" | "READY_FOR_CANONICAL_REVIEW";
  createdAt: string;
};

export type RadarSignal = FrontFields & {
  id: string;
  signalId: string;
  candidateId: string;
  freshness: "CURRENT" | "EVERGREEN" | "UNKNOWN";
  priorityHint: "LOW" | "MEDIUM" | "HIGH";
  evidenceClass: "EDITORIAL_HYPOTHESIS" | "INTERNAL_QUALITATIVE" | "EXTERNAL_RESEARCH" | "MEASURED_FIRST_PARTY";
  status: "ROUTED";
};

export type IntelligenceFrontStore = {
  schemaVersion: "1.0";
  signals: Signal[];
  classifications: NeedClassification[];
  topicCandidates: TopicCandidate[];
  radarSignals: RadarSignal[];
};

export type CaptureSignalInput = {
  channel: SignalChannel;
  rawText: string;
  observedAt?: string;
  sourceLabel: string;
  fields: FrontFields;
};

export type ClassifySignalInput = {
  signalId: string;
  needType: NeedType;
  audience: Audience;
  confidence: number;
  rationale: string;
  fields?: Partial<FrontFields>;
};

export type CreateTopicCandidateInput = {
  signalId: string;
  classificationId: string;
  question: string;
  audience?: Audience;
  fields?: Partial<FrontFields>;
};

export type RouteRadarInput = {
  signalId: string;
  candidateId: string;
  freshness: RadarSignal["freshness"];
  priorityHint: RadarSignal["priorityHint"];
  evidenceClass: RadarSignal["evidenceClass"];
};

const isOneOf = <T extends readonly string[]>(values: T, value: string): value is T[number] => values.includes(value);
const nonEmpty = (value: string | undefined): value is string => typeof value === "string" && value.trim().length > 0;
const now = () => new Date().toISOString();
const clean = (value: string) => value.trim().replace(/\s+/g, " ");
const id = (prefix: string) => `${prefix}-${randomUUID()}`;

export function containsSensitiveData(value: string): boolean {
  return /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(value)
    || /(?:\+?\d[\d\s().-]{8,}\d)/.test(value)
    || /\b(?:expediente|folio|clabe|cuenta)\s*[:#-]?\s*[A-Z0-9-]{5,}\b/i.test(value);
}

function validateFields(fields: FrontFields, label: string): string[] {
  return Object.entries(fields).flatMap(([key, value]) => nonEmpty(value) ? [] : [`${label}.${key} is required.`]);
}

function validateSharedFields(item: FrontFields, label: string): string[] {
  return validateFields({
    concern: item.concern,
    functionalContext: item.functionalContext,
    scope: item.scope,
    subject: item.subject,
  }, label);
}

export function validateStore(store: IntelligenceFrontStore): string[] {
  const errors: string[] = [];
  if (store.schemaVersion !== "1.0") errors.push("Unsupported intelligence-front schema version.");
  const ids = new Set<string>();
  for (const collection of [store.signals, store.classifications, store.topicCandidates, store.radarSignals]) {
    for (const item of collection) {
      if (ids.has(item.id)) errors.push(`Duplicate intelligence-front id: ${item.id}.`);
      ids.add(item.id);
    }
  }
  for (const signal of store.signals) {
    errors.push(...validateSharedFields(signal, `signal.${signal.id}`));
    if (!isOneOf(SIGNAL_CHANNELS, signal.channel)) errors.push(`signal.${signal.id}.channel is invalid.`);
    if (containsSensitiveData(signal.rawText)) errors.push(`signal.${signal.id}.rawText contains sensitive data.`);
    if (signal.containsSensitiveData !== false) errors.push(`signal.${signal.id} must be explicitly non-sensitive.`);
  }
  for (const classification of store.classifications) {
    errors.push(...validateSharedFields(classification, `classification.${classification.id}`));
    if (!nonEmpty(classification.rationale)) errors.push(`classification.${classification.id}.rationale is required.`);
    if (!isOneOf(NEED_TYPES, classification.needType)) errors.push(`classification.${classification.id}.needType is invalid.`);
    if (!isOneOf(AUDIENCES, classification.audience)) errors.push(`classification.${classification.id}.audience is invalid.`);
    if (!Number.isFinite(classification.confidence) || classification.confidence < 0 || classification.confidence > 1) errors.push(`classification.${classification.id}.confidence must be between 0 and 1.`);
    if (!store.signals.some((item) => item.id === classification.signalId)) errors.push(`classification.${classification.id} references an unknown signal.`);
  }
  for (const candidate of store.topicCandidates) {
    errors.push(...validateSharedFields(candidate, `topicCandidate.${candidate.id}`));
    if (!nonEmpty(candidate.question)) errors.push(`topicCandidate.${candidate.id}.question is required.`);
    if (!store.signals.some((item) => item.id === candidate.signalId)) errors.push(`topicCandidate.${candidate.id} references an unknown signal.`);
    if (!store.classifications.some((item) => item.id === candidate.classificationId)) errors.push(`topicCandidate.${candidate.id} references an unknown classification.`);
  }
  for (const radar of store.radarSignals) {
    errors.push(...validateSharedFields(radar, `radar.${radar.id}`));
    if (!store.signals.some((item) => item.id === radar.signalId)) errors.push(`radar.${radar.id} references an unknown signal.`);
    if (!store.topicCandidates.some((item) => item.id === radar.candidateId)) errors.push(`radar.${radar.id} references an unknown topic candidate.`);
    if (radar.evidenceClass === "MEASURED_FIRST_PARTY") errors.push(`radar.${radar.id} cannot claim measured evidence without an explicit measurement record.`);
  }
  return errors;
}

export function emptyStore(): IntelligenceFrontStore {
  return { schemaVersion: "1.0", signals: [], classifications: [], topicCandidates: [], radarSignals: [] };
}

export function captureSignal(input: CaptureSignalInput): Signal {
  if (!isOneOf(SIGNAL_CHANNELS, input.channel)) throw new Error("Invalid signal channel.");
  if (!nonEmpty(input.rawText) || containsSensitiveData(input.rawText)) throw new Error("Signal text is empty or contains sensitive data.");
  if (!nonEmpty(input.sourceLabel)) throw new Error("Signal sourceLabel is required.");
  const fields = Object.fromEntries(Object.entries(input.fields).map(([key, value]) => [key, clean(value)])) as FrontFields;
  const fieldErrors = validateFields(fields, "signal");
  if (fieldErrors.length) throw new Error(fieldErrors.join(" "));
  return { id: id("SIG"), ...fields, channel: input.channel, rawText: clean(input.rawText), observedAt: input.observedAt ?? now(), sourceLabel: clean(input.sourceLabel), status: "CAPTURED", containsSensitiveData: false };
}

export function classifySignal(signal: Signal, input: ClassifySignalInput): NeedClassification {
  if (input.signalId !== signal.id) throw new Error("Classification signalId does not match the supplied signal.");
  if (!isOneOf(NEED_TYPES, input.needType) || !isOneOf(AUDIENCES, input.audience)) throw new Error("Invalid need type or audience.");
  if (!Number.isFinite(input.confidence) || input.confidence < 0 || input.confidence > 1) throw new Error("Confidence must be between 0 and 1.");
  if (!nonEmpty(input.rationale)) throw new Error("Classification rationale is required.");
  return { id: id("NEED"), signalId: signal.id, concern: clean(input.fields?.concern ?? signal.concern), functionalContext: clean(input.fields?.functionalContext ?? signal.functionalContext), scope: clean(input.fields?.scope ?? signal.scope), subject: clean(input.fields?.subject ?? signal.subject), needType: input.needType, audience: input.audience, confidence: input.confidence, rationale: clean(input.rationale), classifiedAt: now(), status: "CLASSIFIED" };
}

export function createTopicCandidate(signal: Signal, classification: NeedClassification, input: CreateTopicCandidateInput): TopicCandidate {
  if (input.signalId !== signal.id || input.classificationId !== classification.id) throw new Error("Topic candidate references do not match supplied records.");
  if (!nonEmpty(input.question)) throw new Error("Topic candidate question is required.");
  return { id: id("TOPIC"), signalId: signal.id, classificationId: classification.id, concern: clean(input.fields?.concern ?? classification.concern), functionalContext: clean(input.fields?.functionalContext ?? classification.functionalContext), scope: clean(input.fields?.scope ?? classification.scope), subject: clean(input.fields?.subject ?? classification.subject), question: clean(input.question), audience: input.audience ?? classification.audience, sourceReadiness: "UNKNOWN", legalReadiness: "NOT_ASSESSED", editorialStatus: "CANDIDATE", createdAt: now() };
}

export function routeToRadar(signal: Signal, candidate: TopicCandidate, input: RouteRadarInput): RadarSignal {
  if (input.signalId !== signal.id || input.candidateId !== candidate.id) throw new Error("Radar references do not match supplied records.");
  return { id: id("RADAR"), signalId: signal.id, candidateId: candidate.id, concern: signal.concern, functionalContext: signal.functionalContext, scope: signal.scope, subject: signal.subject, freshness: input.freshness, priorityHint: input.priorityHint, evidenceClass: input.evidenceClass, status: "ROUTED" };
}

export function storeDigest(store: IntelligenceFrontStore): string {
  return createHash("sha256").update(JSON.stringify(store)).digest("hex");
}

export class FileIntelligenceFrontRepository {
  constructor(private readonly filePath: string) {}

  async read(): Promise<IntelligenceFrontStore> {
    try {
      const store = JSON.parse(await readFile(this.filePath, "utf8")) as IntelligenceFrontStore;
      const errors = validateStore(store);
      if (errors.length) throw new Error(`Invalid intelligence-front store: ${errors.join(" ")}`);
      return store;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return emptyStore();
      throw error;
    }
  }

  async write(store: IntelligenceFrontStore): Promise<{ digest: string; path: string }> {
    const errors = validateStore(store);
    if (errors.length) throw new Error(`Refusing invalid intelligence-front store: ${errors.join(" ")}`);
    await mkdir(dirname(this.filePath), { recursive: true });
    const temporaryPath = `${this.filePath}.${process.pid}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
    await rename(temporaryPath, this.filePath);
    return { digest: storeDigest(store), path: this.filePath };
  }

  async appendSignal(input: CaptureSignalInput): Promise<Signal> {
    const store = await this.read();
    const signal = captureSignal(input);
    store.signals.push(signal);
    await this.write(store);
    return signal;
  }

  async appendClassification(signalId: string, input: Omit<ClassifySignalInput, "signalId">): Promise<NeedClassification> {
    const store = await this.read();
    const signal = store.signals.find((item) => item.id === signalId);
    if (!signal) throw new Error(`Unknown signal: ${signalId}.`);
    const classification = classifySignal(signal, { ...input, signalId });
    store.classifications.push(classification);
    await this.write(store);
    return classification;
  }

  async appendTopicCandidate(signalId: string, classificationId: string, input: Omit<CreateTopicCandidateInput, "signalId" | "classificationId">): Promise<TopicCandidate> {
    const store = await this.read();
    const signal = store.signals.find((item) => item.id === signalId);
    const classification = store.classifications.find((item) => item.id === classificationId);
    if (!signal || !classification) throw new Error("Topic candidate references an unknown signal or classification.");
    const candidate = createTopicCandidate(signal, classification, { ...input, signalId, classificationId });
    store.topicCandidates.push(candidate);
    await this.write(store);
    return candidate;
  }

  async appendRadarSignal(signalId: string, candidateId: string, input: Omit<RouteRadarInput, "signalId" | "candidateId">): Promise<RadarSignal> {
    const store = await this.read();
    const signal = store.signals.find((item) => item.id === signalId);
    const candidate = store.topicCandidates.find((item) => item.id === candidateId);
    if (!signal || !candidate) throw new Error("Radar references an unknown signal or topic candidate.");
    const radar = routeToRadar(signal, candidate, { ...input, signalId, candidateId });
    store.radarSignals.push(radar);
    await this.write(store);
    return radar;
  }
}
