from __future__ import annotations

import csv
import json
import struct
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "docs/social/wave-01a"
ASSETS = ROOT / "assets"
EXPECTED = {
    "LM-PC-013": ("PRODUCT_REVIEW_REQUIRED", "Founder visual decision; separate product integration decision; then internal integration QA"),
    "LM-PC-031": ("SEPARATED_PENDING_BINDING", "Founder visual decision; semantically safe binding decision; then internal integration QA"),
    "LM-PC-065": ("RELATED_ONLY_NO_PUBLIC_INTEGRATION", "Founder visual decision; separately recorded societary mapping decision; then internal QA"),
}


def png_size(path: Path) -> tuple[int, int]:
    with path.open("rb") as handle:
        if handle.read(8) != b"\x89PNG\r\n\x1a\n":
            raise AssertionError(f"not_png:{path}")
        length = struct.unpack(">I", handle.read(4))[0]
        if handle.read(4) != b"IHDR" or length < 8:
            raise AssertionError(f"missing_ihdr:{path}")
        return struct.unpack(">II", handle.read(8))


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


state = json.loads((ROOT / "current-state.json").read_text(encoding="utf-8"))
assert set(state) == set(EXPECTED), "unexpected_current_state_ids"

for content_id, (integration_state, next_gate) in EXPECTED.items():
    unit = state[content_id]
    assert unit["founder_copy_decision_id"] == "FOUNDER_DECISION_WAVE_01A_READY_FOR_COPY_2026-08-29", content_id
    assert unit["founder_copy_scope"] == "CLAIM_APPROVAL -> READY_FOR_COPY only", content_id
    assert unit["current_copy_state"] == "READY_FOR_COPY", content_id
    assert unit["current_visual_state"] == "VISUAL_QA_PASS_PROVENANCE_UNRESOLVED", content_id
    assert unit["visual_asset_state"] == "EXISTS", content_id
    assert unit["visual_qa_state"] == "PASS", content_id
    assert unit["visual_gate_provenance"] == "UNRESOLVED", content_id
    assert unit["visual_gate_authorization"] == "NOT_RECORDED", content_id
    assert unit["current_integration_state"] == integration_state, content_id
    assert unit["integration_qa_state"] == "NOT_RUN", content_id
    assert unit["current_publication_state"] == "NOT_PUBLIC", content_id
    assert unit["media_url_state"] == "NO_DURABLE_MEDIA_URL", content_id
    assert unit["next_gate"] == next_gate, content_id

for receipt in ROOT.glob("*human-*-decision-receipt-*.md"):
    head = receipt.read_text(encoding="utf-8").splitlines()[:8]
    assert any("UNVERIFIED AGENT-PREPARED DRAFT" in line for line in head), f"unclassified_receipt:{receipt.name}"

matrix = read_csv(ROOT / "cross-channel-matrix.csv")
assert {row["CONTENT_ID"] for row in matrix} == set(EXPECTED), "matrix_content_ids"
for row in matrix:
    content_id = row["CONTENT_ID"]
    assert row["CURRENT_COPY_STATE"] == "READY_FOR_COPY", content_id
    assert row["CURRENT_VISUAL_STATE"] == "VISUAL_QA_PASS_PROVENANCE_UNRESOLVED", content_id
    assert row["VISUAL_ASSET_STATE"] == "EXISTS", content_id
    assert row["VISUAL_QA_STATE"] == "PASS", content_id
    assert row["VISUAL_GATE_PROVENANCE"] == "UNRESOLVED", content_id
    assert row["CURRENT_INTEGRATION_STATE"] == EXPECTED[content_id][0], content_id
    assert row["INTEGRATION_QA_STATE"] == "NOT_RUN", content_id
    assert row["CURRENT_PUBLICATION_STATE"] == "NOT_PUBLIC", content_id
    assert row["MEDIA_URL_STATE"] == "NO_DURABLE_MEDIA_URL", content_id
    assert not row["CANDIDATE_PUBLIC_ROUTE"], content_id
    assert row["CLAIM_IDS"] and row["SOURCE_CONTEXT"] and row["TERRITORY_CONTEXT"] and row["QUALIFIER"], content_id
    assert row["ALT_TEXT"].strip(), f"empty_alt:{content_id}"

pins = read_csv(ROOT / "pinterest_bulk_upload.csv")
assert len(pins) == len(EXPECTED), f"pin_count:{len(pins)}"
for pin in pins:
    assert pin["Title"].strip(), "missing_pin_title"
    assert not pin["Media URL"].strip(), "durable_media_url_not_authorized"
    assert not pin["Link"].strip(), "public_destination_not_authorized"
    assert not pin["Publish date"].strip(), "publish_date_not_authorized"

for content_id in sorted(EXPECTED):
    for suffix, expected_size in (("feed_4x5", (1664, 2080)), ("vertical_9x16", (1440, 2560)), ("pinterest_2x3", (1000, 1500))):
        asset = ASSETS / f"{content_id}_{suffix}.png"
        assert asset.exists(), f"missing_asset:{asset}"
        assert png_size(asset) == expected_size, f"bad_asset_size:{asset}"

print("wave01a_package_validation=PASS")
print("founder_copy_scope=READY_FOR_COPY_ONLY")
print("visual_provenance=UNRESOLVED")
print("public_render=BLOCKED")
print("publication_authorized=NO")
