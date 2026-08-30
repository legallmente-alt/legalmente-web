from __future__ import annotations

import csv
import hashlib
import json
import shutil
from pathlib import Path
from PIL import Image, ImageOps

REPO = Path(__file__).resolve().parents[1]
SOURCE = REPO / 'public/internal-assets/legalmente/wave-01a'
ROOT = REPO / 'docs/social/wave-01a'
ASSETS = ROOT / 'assets'
ROOT.mkdir(parents=True, exist_ok=True)
ASSETS.mkdir(parents=True, exist_ok=True)
RAW_ASSET_BASE = 'https://raw.githubusercontent.com/legallmente-alt/legalmente-web/agent/wave01a-multichannel-sprint/docs/social/wave-01a/assets'

units = {
    'LM-PC-013': {
        'claims': 'LM-PC-013-CL-01; LM-PC-013-CL-02',
        'question': '¿Qué tiene que quedar claro sobre lo que las partes se comprometen a hacer o entregar?',
        'world': 'vida-cotidiana',
        'world_label': 'Vida cotidiana',
        'series': 'consentimiento-y-obligaciones',
        'series_label': 'Consentimiento y obligaciones',
        'chapter': 'consentimiento-no-es-solo-firma',
        'chapter_label': 'Consentir no es solamente firmar',
        'concept': 'consentimiento',
        'concept_label': 'Consentimiento',
        'process': 'leer-antes-de-aceptar',
        'process_label': 'Leer antes de aceptar',
        'route': '/proceso/leer-antes-de-aceptar',
        'previous': 'Nombrar qué se está aceptando antes de preguntar por sus efectos.',
        'next': 'Separar objeto, obligaciones y consecuencias al revisar el documento concreto.',
        'source': 'Código Civil Federal, arts. 1794 y 1824',
        'source_url': 'https://www.diputados.gob.mx/LeyesBiblio/pdf/CCF.pdf',
        'territory': 'México — explicación educativa; no regla panhispánica',
        'qualifier': 'No determina la validez, nulidad, exigibilidad ni efecto de un contrato concreto.',
        'alt': 'Bodegón cálido sobre una mesa de madera: una caja de cartón con etiqueta en blanco y una regla metálica; a la derecha hay una estructura de varillas y en primer plano una bandeja con cinta y un recipiente oscuro.',
        'linkedin_title': 'Antes de discutir consecuencias, nombra el objeto',
        'linkedin_opening': 'Una relación contractual se entiende mejor cuando primero se puede decir qué se hará, qué se entregará o qué conducta se espera.',
        'linkedin_body': 'El Código Civil Federal distingue el objeto como una categoría propia y coloca consentimiento y objeto entre los elementos de existencia del contrato. Esa referencia sirve para ordenar una conversación educativa. No convierte una explicación general en una conclusión sobre la validez o exigibilidad de un documento concreto. La pregunta inicial puede ser más sencilla: ¿las partes están describiendo el mismo objeto y las obligaciones se conectan con él?',
        'linkedin_cta': 'Guarda esta pregunta para la próxima revisión documental.',
        'ig_hook': 'Antes de hablar de consecuencias, pregunta: ¿qué se está aceptando?',
        'ig_caption': 'Un contrato se entiende mejor cuando primero nombras su centro: qué se hará, qué se entregará o qué conducta se espera.\n\nEn México, el CCF permite explicar el consentimiento y el objeto como elementos de existencia, y distinguir el objeto como categoría propia. Eso no valida un contrato concreto ni resuelve si una cláusula es exigible. Sirve para ordenar mejor la conversación antes de revisar redacción, fechas y consecuencias.\n\nGuarda la pregunta: ¿ambas partes están describiendo el mismo objeto?\n\nInformación educativa; no asesoría individual.',
        'ig_cta': 'Guárdalo para la próxima revisión.',
        'hashtags': '#LegalMente #CulturaJuridica #AntesDeFirmar',
        'pin_title': 'Qué revisar sobre el objeto de un contrato',
        'pin_description': 'Guía educativa para distinguir objeto, consentimiento y obligaciones al ordenar una revisión documental en México. No determina la validez de un contrato concreto ni sustituye asesoría profesional.',
        'board': 'Antes de firmar',
    },
    'LM-PC-031': {
        'claims': 'LM-PC-031-CL-01; LM-PC-031-CL-02',
        'question': '¿Qué elementos ayudan a describir una relación de trabajo sin asumir una conclusión sobre mi caso?',
        'world': 'empresa-comercio',
        'world_label': 'Empresa y comercio',
        'series': '',
        'series_label': '',
        'chapter': '',
        'chapter_label': '',
        'concept': '',
        'concept_label': 'Relación de trabajo',
        'process': 'organizar-hechos-y-prueba',
        'process_label': 'Organizar hechos y prueba',
        'route': '',
        'previous': 'Describir los hechos: quién trabaja, bajo qué organización y qué está documentado.',
        'next': 'Ordenar funciones, lugar, jornada, salario, pagos y vacaciones sin convertir la lista en una conclusión individual. El parent laboral específico queda pendiente de binding.',
        'source': 'Ley Federal del Trabajo, arts. 20–21 y 25',
        'source_url': 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf',
        'territory': 'México — explicación educativa; no regla panhispánica',
        'qualifier': 'No etiqueta una relación concreta ni calcula derechos o prestaciones.',
        'alt': 'Bodegón cálido sobre una mesa de madera: una caja de herramientas con herramientas y un mazo; un delantal de tela cuelga al fondo, junto a una etiqueta de cartón con cordón, un recipiente oscuro y cuadernos con un bolígrafo.',
        'linkedin_title': 'Describir una relación de trabajo sin saltar a la conclusión',
        'linkedin_opening': 'En una revisión laboral, la primera tarea no siempre es clasificar; puede ser describir con precisión lo que ocurre y lo que está documentado.',
        'linkedin_body': 'La Ley Federal del Trabajo define la relación de trabajo a partir del trabajo personal subordinado y el salario, con independencia del acto que le dé origen. También contempla elementos que pueden aparecer en el escrito laboral, como servicio, lugar, jornada, salario, forma y día de pago y vacaciones. Para una conversación empresarial, esa estructura ayuda a separar hechos, documentos y preguntas. No etiqueta automáticamente una relación concreta ni calcula derechos.',
        'linkedin_cta': 'Usa la lista como mapa de revisión, no como conclusión automática.',
        'ig_hook': 'Una lista de condiciones no es todavía una conclusión laboral.',
        'ig_caption': 'La Ley Federal del Trabajo permite ordenar una relación de trabajo alrededor de trabajo personal subordinado y salario, y contempla condiciones que pueden aparecer en el escrito laboral: servicio, lugar, jornada, salario, pago y vacaciones.\n\nLa lista ayuda a describir hechos y documentos. No etiqueta automáticamente una relación concreta ni calcula derechos. La lectura depende del territorio, los hechos y la información disponible.\n\nPrimero describe; después identifica qué necesita aclaración.\n\nInformación educativa; no asesoría individual.',
        'ig_cta': 'Guárdalo como mapa de preguntas.',
        'hashtags': '#LegalMente #Trabajo #CulturaJuridica',
        'pin_title': 'Cómo ordenar una relación de trabajo',
        'pin_description': 'Una guía educativa para separar hechos, documentos y preguntas sobre trabajo personal subordinado, salario y condiciones laborales en México. No resuelve un caso concreto.',
        'board': 'Trabajo',
    },
    'LM-PC-065': {
        'claims': 'LM-PC-065-CL-01; LM-PC-065-CL-02',
        'question': '¿Qué documentos y datos conviene ordenar para entender una sociedad mercantil?',
        'world': 'empresa-comercio',
        'world_label': 'Empresa y comercio',
        'series': '',
        'series_label': '',
        'chapter': '',
        'chapter_label': '',
        'concept': '',
        'concept_label': 'Especies y escritura o póliza constitutiva',
        'process': '',
        'process_label': '',
        'route': '',
        'previous': 'Identificar la categoría de sociedad antes de leer un documento como si fuera intercambiable con otro.',
        'next': 'Separar escritura o póliza constitutiva y datos corporativos; la representación queda como pregunta relacionada y requiere un binding propio.',
        'source': 'Ley General de Sociedades Mercantiles, arts. 1 y 6',
        'source_url': 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSM.pdf',
        'territory': 'México — explicación educativa; no regla panhispánica',
        'qualifier': 'No identifica ni valida una entidad concreta ni confirma que un documento esté completo o vigente.',
        'alt': 'Bodegón cálido sobre una mesa de madera: tres soportes de madera con piezas de distintas texturas, una carpeta de cartón cerrada, una placa metálica, un recipiente oscuro sobre una base de piedra y una bandeja con cinta.',
        'linkedin_title': 'Clasificación y documento no son la misma pregunta',
        'linkedin_opening': 'Una revisión corporativa se vuelve más clara cuando separa dos capas: qué especie de sociedad se estudia y qué documento la constituye. La representación es una pregunta relacionada, pero requiere una fuente propia.',
        'linkedin_body': 'La Ley General de Sociedades Mercantiles reconoce distintas especies de sociedades mercantiles y prevé datos que deben aparecer en la escritura o póliza constitutiva. Esa estructura sirve para ordenar una revisión documental. No identifica ni valida una entidad concreta, ni confirma que un instrumento esté completo o vigente. La claridad empieza por no mezclar clasificación legal y documento constitutivo con una conclusión sobre representación.',
        'linkedin_cta': 'Convierte cada capa en una pregunta separada antes de revisar conclusiones.',
        'ig_hook': 'Una sociedad no se entiende con un solo documento leído fuera de contexto.',
        'ig_caption': 'La Ley General de Sociedades Mercantiles reconoce distintas especies de sociedades mercantiles y prevé datos para la escritura o póliza constitutiva.\n\nEso permite ordenar una revisión en capas: primero la categoría; después el instrumento y sus datos. La cuestión de representación queda separada y requiere su propio binding; estos claims no la soportan. La explicación no identifica ni valida una entidad concreta, ni confirma que un documento esté completo o vigente.\n\nSeparar preguntas también es una forma de revisar mejor.\n\nInformación educativa; no asesoría individual.',
        'ig_cta': 'Guárdalo para ordenar una revisión corporativa.',
        'hashtags': '#LegalMente #Empresa #CulturaJuridica',
        'pin_title': 'Qué ordenar para entender una sociedad mercantil',
        'pin_description': 'Guía educativa para separar especie societaria y documento constitutivo al ordenar información corporativa en México. La representación requiere un binding propio; no se valida una entidad concreta.',
        'board': 'Empresa',
    },
}

founder = {
    'LM-PC-013': {
        'angle': 'Un contrato se vuelve operable cuando el objeto deja de ser una palabra abstracta y se convierte en un alcance que alguien puede revisar.',
        'corporate_problem': 'Operar con un objeto contractual ambiguo puede hacer que equipos distintos entiendan entregables, conductas u obligaciones diferentes.',
        'decision_context': 'Antes de discutir consecuencias, fijar qué se hará, qué se entregará y qué conducta se espera; después contrastar esa descripción con el documento y sus hechos.',
        'business_risk': 'Si el alcance operativo queda abierto, la ejecución puede desviarse aunque las partes crean estar hablando del mismo acuerdo.',
        'what_to_review': 'Escribir la unidad de objeto, el entregable o la conducta esperada y luego separar obligaciones y consecuencias; no tratar la etiqueta del documento como respuesta suficiente.',
        'cta': '¿El equipo puede describir el mismo objeto y el mismo alcance operacional antes de discutir consecuencias?',
    },
    'LM-PC-031': {
        'angle': 'Describir la organización laboral antes de clasificarla: los hechos y los documentos deben ir delante de la etiqueta.',
        'corporate_problem': 'Clasificar demasiado pronto puede borrar diferencias entre funciones reales, subordinación, pagos, lugar de trabajo y lo que efectivamente está documentado.',
        'decision_context': 'Ordenar quién trabaja, bajo qué organización, qué ocurre en la práctica y qué documentos existen; solo después formular la pregunta de clasificación que corresponda.',
        'business_risk': 'Una etiqueta laboral aplicada antes de describir los hechos puede orientar mal la documentación y la conversación de riesgo de la empresa.',
        'what_to_review': 'Comparar funciones, organización, lugar, jornada, salario, pagos y vacaciones con los documentos disponibles, manteniendo separadas descripción y clasificación. El parent laboral específico queda pendiente de binding.',
        'cta': '¿Qué hecho o documento falta describir antes de intentar clasificar la relación?',
    },
    'LM-PC-065': {
        'angle': 'La información corporativa gana calidad cuando la especie de sociedad y su instrumento constitutivo se leen como capas distintas.',
        'corporate_problem': 'Tratar cualquier documento corporativo como equivalente puede ocultar qué sociedad se estudia, qué instrumento existe y qué datos todavía deben comprobarse.',
        'decision_context': 'Separar la categoría societaria, la escritura o póliza constitutiva y la calidad de los datos corporativos antes de formular preguntas relacionadas de representación.',
        'business_risk': 'Una base corporativa de baja calidad puede llevar a revisar el instrumento equivocado o a atribuir a una entidad datos que aún no fueron verificados.',
        'what_to_review': 'Identificar la especie de sociedad, separar escritura o póliza constitutiva de los demás datos corporativos y registrar qué información falta; la representación queda como pregunta relacionada y requiere un binding propio.',
        'cta': '¿La información corporativa permite distinguir la sociedad, el instrumento constitutivo y lo que aún debe comprobarse?',
    },
}

# Copy the approved 4:5 and 9:16 sources into the social-prep package.
for cid in units:
    for channel, filename in [('feed_4x5', f'{cid}_visual_4x5.png'), ('vertical_9x16', f'{cid}_visual.png')]:
        src = SOURCE / filename
        dest = ASSETS / f'{cid}_{channel}.png'
        shutil.copy2(src, dest)

    # Preserve all pixels while deriving Pinterest 2:3 with a restrained cream letterbox.
    src = Image.open(SOURCE / f'{cid}_visual_4x5.png').convert('RGB')
    target = (1000, 1500)
    fitted = ImageOps.contain(src, target, method=Image.Resampling.LANCZOS)
    canvas = Image.new('RGB', target, '#F5F0E8')
    x = (target[0] - fitted.width) // 2
    y = (target[1] - fitted.height) // 2
    canvas.paste(fitted, (x, y))
    canvas.save(ASSETS / f'{cid}_pinterest_2x3.png', optimize=True)

# Stable hashes and asset registry.
asset_rows = []
for path in sorted(ASSETS.glob('*.png')):
    with Image.open(path) as im:
        dimensions = f'{im.width}x{im.height}'
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    cid = path.name.split('_')[0] + '-' + path.name.split('_')[1] if path.name.startswith('LM-PC-') else ''
    # Content IDs contain two hyphens; derive from prefix before the channel suffix.
    cid = '-'.join(path.name.split('_')[0].split('-')[:2]) if False else path.name[:8]
    if path.name.startswith('LM-PC-013'): cid = 'LM-PC-013'
    if path.name.startswith('LM-PC-031'): cid = 'LM-PC-031'
    if path.name.startswith('LM-PC-065'): cid = 'LM-PC-065'
    asset_rows.append({'asset_id': path.stem, 'parent_content_id': cid, 'path': str(path.relative_to(REPO)), 'dimensions': dimensions, 'sha256': digest})

(ROOT / 'asset-registry.json').write_text(json.dumps(asset_rows, ensure_ascii=False, indent=2) + '\n')

# Pinterest bulk CSV uses the official import schema; it does not authorize upload.
pin_fields = ['Title','Media URL','Pinterest board','Thumbnail','Description','Link','Publish date','Keywords']
with (ROOT / 'pinterest_bulk_upload.csv').open('w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=pin_fields, lineterminator='\n')
    writer.writeheader()
    for cid, u in units.items():
        writer.writerow({
            'Title': u['pin_title'],
            'Media URL': f'{RAW_ASSET_BASE}/{cid}_pinterest_2x3.png',
            'Pinterest board': u['board'],
            'Thumbnail': '',
            'Description': u['pin_description'],
            'Link': f'https://ef9882a7.legalmente-educativo.pages.dev{u["route"]}' if u['route'] else '',
            'Publish date': '',
            'Keywords': u['hashtags'].replace('#', '').replace(' ', ', '),
        })

# Integration and channel matrices.
with (ROOT / 'cross-channel-matrix.csv').open('w', encoding='utf-8', newline='') as f:
    fields = ['CONTENT_ID','CLAIM_IDS','USER_JOB','EXISTING_WORLD','EXISTING_SERIES','EXISTING_CHAPTER','EXISTING_CONCEPT','EXISTING_PROCESS','CANDIDATE_PUBLIC_ROUTE','PREVIOUS_LEARNING','NEXT_LEARNING','SOURCE_CONTEXT','TERRITORY_CONTEXT','QUALIFIER','WEB_ASSET','LINKEDIN_LEGALMENTE_ASSET','LINKEDIN_FOUNDER_ASSET','INSTAGRAM_FEED_ASSET','INSTAGRAM_9X16_ASSET','PINTEREST_ASSET','ALT_TEXT','CURRENT_COPY_STATE','CURRENT_VISUAL_STATE','VISUAL_ASSET_STATE','VISUAL_QA_STATE','VISUAL_GATE_PROVENANCE','COPY_CHANNEL_QA','ART_BASE_STATE','SOCIAL_COMPOSITION_STATE','MEDIA_URL_STATE','CURRENT_INTEGRATION_STATE','CURRENT_PUBLICATION_STATE','NEXT_GATE']
    writer = csv.DictWriter(f, fieldnames=fields, lineterminator='\n')
    writer.writeheader()
    for cid, u in units.items():
        writer.writerow({
            'CONTENT_ID': cid,
            'CLAIM_IDS': u['claims'],
            'USER_JOB': u['question'],
            'EXISTING_WORLD': f'{u["world"]} — {u["world_label"]}',
            'EXISTING_SERIES': f'{u["series"]} — {u["series_label"]}' if u['series'] else '',
            'EXISTING_CHAPTER': f'{u["chapter"]} — {u["chapter_label"]}' if u['chapter'] else '',
            'EXISTING_CONCEPT': f'{u["concept"]} — {u["concept_label"]}' if u['concept'] else '',
            'EXISTING_PROCESS': f'{u["process"]} — {u["process_label"]}' if u['process'] else '',
            'CANDIDATE_PUBLIC_ROUTE': u['route'],
            'PREVIOUS_LEARNING': u['previous'],
            'NEXT_LEARNING': u['next'],
            'SOURCE_CONTEXT': u['source'],
            'TERRITORY_CONTEXT': u['territory'],
            'QUALIFIER': u['qualifier'],
            'WEB_ASSET': f'public/internal-assets/legalmente/wave-01a/{cid}_visual_4x5.png',
            'LINKEDIN_LEGALMENTE_ASSET': f'assets/{cid}_feed_4x5.png',
            'LINKEDIN_FOUNDER_ASSET': f'assets/{cid}_feed_4x5.png',
            'INSTAGRAM_FEED_ASSET': f'assets/{cid}_feed_4x5.png',
            'INSTAGRAM_9X16_ASSET': f'assets/{cid}_vertical_9x16.png',
            'PINTEREST_ASSET': f'assets/{cid}_pinterest_2x3.png',
            'ALT_TEXT': u['alt'],
            'CURRENT_COPY_STATE': 'READY_FOR_COPY',
            'CURRENT_VISUAL_STATE': 'VISUAL_QA_PASS_PROVENANCE_UNRESOLVED',
            'VISUAL_ASSET_STATE': 'EXISTS',
            'VISUAL_QA_STATE': 'PASS',
            'VISUAL_GATE_PROVENANCE': 'UNRESOLVED',
            'COPY_CHANNEL_QA': 'PASS',
            'ART_BASE_STATE': 'READY',
            'SOCIAL_COMPOSITION_STATE': 'REVIEW_REQUIRED',
            'MEDIA_URL_STATE': 'TEMPORARY_VALIDATION_URL',
            'CURRENT_INTEGRATION_STATE': 'PRODUCT_REVIEW_REQUIRED' if cid == 'LM-PC-013' else 'SEPARATED_PENDING_BINDING',
            'CURRENT_PUBLICATION_STATE': 'NOT_PUBLIC',
            'NEXT_GATE': 'Human product decision per unit; then integration QA; then publication decision' if cid == 'LM-PC-013' else 'Founder/Editor row-level mapping to a semantically correct existing parent or explicitly related-only record; then product decision; integration QA; publication decision',
        })

# Markdown channel packages.
(ROOT / 'integration-map.md').write_text('''# Wave 01A — Mapa de integración candidata\n\n**Estado del paquete:** `CONTENT_PREPARED` → `CHANNEL_ADAPTED` → `COPY_CHANNEL_QA=PASS` → `ART_BASE_STATE=READY` → `SOCIAL_COMPOSITION_STATE=REVIEW_REQUIRED` → `PUBLICATION_STATE=NOT_PUBLIC`\n\n**Integración pública:** por unidad; `LM-PC-013 = PRODUCT_REVIEW_REQUIRED`, `LM-PC-031/065 = SEPARATED_PENDING_BINDING`\n\n**Publicación:** `NOT_PUBLIC`\n\nLa integración se prepara sobre rutas existentes y no crea una familia de páginas nueva. Cada unidad conserva sus claims aprobados, fuente, artículos, territorio México, qualifier, asset real, texto seleccionable y siguiente aprendizaje. El mapa no equivale a autorización de integración ni de publicación.\n\n| Unidad | Mundo existente | Parent existente seguro | Proceso o relación | Ruta candidata | Estado | Ajuste de producto requerido |\n|---|---|---|---|---|---|---|\n| LM-PC-013 | Vida cotidiana | Consentimiento y obligaciones → Consentir no es solamente firmar | Consentimiento → Leer antes de aceptar | `/proceso/leer-antes-de-aceptar` | `PRODUCT_REVIEW_REQUIRED` | Decisión humana de producto por unidad; luego QA de integración. |\n| LM-PC-031 | Empresa y comercio | Ningún capítulo o serie laboral específico en el grafo actual | Organizar hechos y prueba como proceso genérico; no usar `deber-profesional` | — | `SEPARATED_PENDING_BINDING` | Founder/Editor debe asignar un parent existente semánticamente correcto o aceptar una relación de nivel mundo; no se integra bajo la serie sanitaria. |\n| LM-PC-065 | Empresa y comercio | Ningún parent societario específico en el grafo actual | La representación es una relación posible, no un claim soportado por LGSM arts. 1 y 6 | — | `SEPARATED_PENDING_BINDING` | Crear o aprobar un binding societario específico, o conservar la unidad como relación educativa separada; no se integra en `/concepto/representacion` por inercia. |\n\n## Contrato de integración\n\nLa ficha candidata debe usar HTML seleccionable para el copy educativo, una imagen como apoyo visual y bloques visibles de fuente, artículos, territorio, qualifier y siguiente aprendizaje. El componente no debe solicitar documentos, nombres, texto libre ni activar servicios. Solo LM-PC-013 tiene actualmente una ruta candidata que puede mostrar el preview bajo el flag interno; LM-PC-031 y LM-PC-065 permanecen fuera de rutas públicas hasta cerrar su binding.\n\n## Reglas de separación\n\nUn `CONTENT_ID` aprobado para copy no queda automáticamente integrado en el grafo. Si falta un parent semántico seguro, la unidad conserva su fuente y sus claims, pero no se le inventan breadcrumbs, ruta, serie, concepto o proceso. La representación de LM-PC-065 puede aparecer como continuidad o relación futura, nunca como afirmación respaldada por los arts. 1 y 6 de la LGSM.\n''', encoding='utf-8')

lines = ['# LinkedIn — LegalMente + Founder', '', '**Estado:** `CHANNEL_ADAPTED` / `COPY_CHANNEL_QA=PASS` / `ART_BASE_STATE=READY` / `SOCIAL_COMPOSITION_STATE=REVIEW_REQUIRED` / `PUBLICATION_STATE=NOT_PUBLIC`. La composición final aún no existe; no publicado.', '', '## Cuenta institucional: LinkedIn LegalMente', '', 'Función: educación, autoridad editorial, conocimiento, fuentes y contexto. Formato visual: 1080 × 1350, 4:5. No engagement bait, asesoría ni promesas.', '']
for cid, u in units.items():
    lines += [f'### {cid} — {u["linkedin_title"]}', '', f'**LINKEDIN_TITLE:** {u["linkedin_title"]}', f'**LINKEDIN_OPENING:** {u["linkedin_opening"]}', f'**LINKEDIN_BODY:** {u["linkedin_body"]}', f'**LINKEDIN_SOURCE_NOTE:** Fuente: {u["source"]}. Territorio: {u["territory"]}. {u["qualifier"]}', f'**LINKEDIN_CTA:** {u["linkedin_cta"]}', f'**LINKEDIN_ALT_TEXT:** {u["alt"]}', f'**LINKEDIN_VISUAL_4X5:** `assets/{cid}_feed_4x5.png`', f'**ASSET_ID:** `{cid}_feed_4x5`', '']
lines += ['## Cuenta Founder — cola separada', '', 'La cola Founder no copia el canal institucional. Su función es criterio profesional, autoridad corporativa, reflexión jurídica y riesgo empresarial; no se publica todavía.', '']
for cid, u in units.items():
    f = founder[cid]
    lines += [f'### FOUNDER-{cid}', '', f'**FOUNDER_POST_ID:** `FOUNDER-{cid}-01`', f'**RELATED_CONTENT_ID:** `{cid}`', f'**ANGLE:** {f["angle"]}', f'**CORPORATE_PROBLEM:** {f["corporate_problem"]}', f'**DECISION_CONTEXT:** {f["decision_context"]}', f'**LEGAL_CONCEPT:** {u["concept_label"]}; fuente: {u["source"]}.', f'**BUSINESS_RISK:** {f["business_risk"]}', f'**WHAT_TO_REVIEW:** {f["what_to_review"]}', f'**LIMIT:** {u["qualifier"]} Información educativa, no asesoría individual.', f'**SOURCE:** {u["source"]} — {u["source_url"]}', f'**CTA / QUESTION:** {f["cta"]}', f'**VISUAL_4X5:** `assets/{cid}_feed_4x5.png`', '']
(ROOT / 'linkedin-package.md').write_text('\n'.join(lines), encoding='utf-8')

lines = ['# Instagram — Derivados Wave 01A', '', '**Estado:** `CHANNEL_ADAPTED` / `COPY_CHANNEL_QA=PASS` / `ART_BASE_STATE=READY` / `SOCIAL_COMPOSITION_STATE=REVIEW_REQUIRED` / `PUBLICATION_STATE=NOT_PUBLIC`. La composición final aún no existe; no publicado.', '', 'Cada adaptación conserva `PARENT_CONTENT_ID`, claims, fuente, territorio y qualifier. No se crean nuevos CONTENT_ID.', '']
for cid, u in units.items():
    lines += [f'## {cid}', '', f'**PARENT_CONTENT_ID:** `{cid}`', f'**CLAIM_IDS:** `{u["claims"]}`', f'**SOURCE:** {u["source"]}', f'**TERRITORY:** {u["territory"]}', f'**QUALIFIER:** {u["qualifier"]}', f'**HOOK:** {u["ig_hook"]}', f'**INSTAGRAM_FEED_COPY:** {u["ig_caption"]}', f'**SOURCE_NOTE:** Fuente: {u["source"]}. {u["qualifier"]}', f'**CTA:** {u["ig_cta"]}', f'**ALT_TEXT:** {u["alt"]}', f'**HASHTAGS_LIMITED:** {u["hashtags"]}', f'**4X5_VISUAL:** `assets/{cid}_feed_4x5.png`', f'**9X16_VISUAL:** `assets/{cid}_vertical_9x16.png`', f'**STORY_VARIANT:** Convertir la pregunta central en tres pantallas: pregunta → fuente/contexto → siguiente aprendizaje. No introducir claims nuevos.', f'**REEL_COVER:** Usar el asset 9:16 con título corto de la unidad y zona segura amplia; sin marca de agua ni texto diminuto.', '']
(ROOT / 'instagram-package.md').write_text('\n'.join(lines), encoding='utf-8')

lines = ['# Pinterest — Preparación masiva Wave 01A', '', '**Estado:** `ART_BASE_STATE=READY` / `SOCIAL_COMPOSITION_STATE=REVIEW_REQUIRED` / `MEDIA_URL_STATE=TEMPORARY_VALIDATION_URL`; CSV con esquema oficial; `READY_FOR_BULK_UPLOAD = NO`; `BULK_UPLOAD_AUTHORIZED = NO`; publicación: `NOT_PUBLIC`. La composición final aún no existe. Las filas de LM-PC-031 y LM-PC-065 no tienen `Link` porque permanecen `SEPARATED_PENDING_BINDING`.', '', 'Se prepara un Pin base 2:3 por unidad, vinculado a un asset real mediante una URL pública directa. El CSV usa la plantilla de Pinterest (`Title`, `Media URL`, `Pinterest board`, `Thumbnail`, `Description`, `Link`, `Publish date`, `Keywords`). No se simula publicación ni se asigna una ruta candidata inexistente. Los derivados 9:16 se reservan para Instagram.', '', 'Archivo: `pinterest_bulk_upload.csv`', '', '| Validación | Regla | Resultado esperado |', '|---|---|---|', '| Asset | Cada fila apunta a un PNG existente | PASS |', '| Media URL | URL pública directa al PNG, estado 200 y content-type de imagen | PASS |', '| Alt | No vacío en matriz y paquetes de canal; el CSV oficial no incluye columna alt | PASS |', '| Title | No vacío y ≤ 100 caracteres | PASS |', '| Board | Usa agrupación humana compatible | PASS |', '| CONTENT_ID | Conservado en la matriz y manifiesto interno | PASS |', '| HOLD_SOURCE | No permitido | PASS |', '| Claim | Solo claims en READY_FOR_COPY | PASS |', '| Link | Solo se completa cuando existe ruta aprobada; LM-PC-031/065 queda vacío | PASS |', '| Publication | Nunca `PUBLISHED`; carga real no autorizada | PASS |', '']
(ROOT / 'pinterest-package.md').write_text('\n'.join(lines), encoding='utf-8')

(ROOT / 'current-state.json').write_text(json.dumps({cid: {
    'source_binding_original_state': 'HUMAN_REVIEW_REQUIRED (historical; not rewritten)',
    'human_decision_id': 'HUMAN_DECISION_LM-PC-013_APPROVE_INTEGRATION_2026-08-29' if cid == 'LM-PC-013' else 'FOUNDER_DECISION_WAVE_01A_READY_FOR_COPY_2026-08-29',
    'human_decision_date': '2026-08-29',
    'human_decision_receipt': 'LM-PC-013-human-decision-receipt-2026-08-29.md' if cid == 'LM-PC-013' else None,
    'human_decision': 'APPROVE_INTEGRATION' if cid == 'LM-PC-013' else None,
    'current_copy_state': 'READY_FOR_COPY',
    'current_visual_state': 'VISUAL_QA_PASS_PROVENANCE_UNRESOLVED',
    'visual_asset_state': 'EXISTS',
    'visual_qa_state': 'PASS',
    'visual_gate_provenance': 'UNRESOLVED',
    'visual_qa_receipt': '99_VISUAL_PRODUCTION_RECEIPT.md',
    'visual_gate_authorization': 'NOT_RECORDED',
    'copy_channel_qa': 'PASS',
    'art_base_state': 'READY',
    'social_composition_state': 'REVIEW_REQUIRED',
    'media_url_state': 'TEMPORARY_VALIDATION_URL',
    'current_integration_state': 'PUBLIC_INTEGRATION_APPROVED' if cid == 'LM-PC-013' else 'SEPARATED_PENDING_BINDING',
    'current_publication_state': 'NOT_PUBLIC',
    'supersedes': 'Historical source-binding addendum remains preserved',
    'superseded_by': 'Current operational state layer in this package',
    'next_gate': 'Integration QA for the educational route; separate publication decision' if cid == 'LM-PC-013' else 'Founder/Editor row-level mapping to a semantically correct existing parent or explicitly related-only record; then product decision; integration QA; publication decision',
} for cid in units}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

(ROOT / 'README.md').write_text('''# LegalMente — Wave 01A multichannel sprint\n\nEste paquete prepara cuatro carriles sin ejecutar gates humanos: integración candidata en rutas existentes, LinkedIn institucional y Founder, derivados de Instagram y Pinterest masivo. No contiene publicación, carga real, merge sensible ni deploy.\n\n## Estados\n\n| Unidad | Copy | Asset visual | QA visual | Provenance visual | Composición social | Integración | Publicación |\n|---|---|---|---|---|---|---|---|\n| `LM-PC-013` | `READY_FOR_COPY` | `EXISTS` | `PASS` | `UNRESOLVED` | `REVIEW_REQUIRED` | `PUBLIC_INTEGRATION_APPROVED` | `NOT_PUBLIC` |\n| `LM-PC-031` | `READY_FOR_COPY` | `EXISTS` | `PASS` | `UNRESOLVED` | `REVIEW_REQUIRED` | `SEPARATED_PENDING_BINDING` | `NOT_PUBLIC` |\n| `LM-PC-065` | `READY_FOR_COPY` | `EXISTS` | `PASS` | `UNRESOLVED` | `REVIEW_REQUIRED` | `SEPARATED_PENDING_BINDING` | `NOT_PUBLIC` |\n\n`PINTEREST_BULK_UPLOAD_AUTHORIZED = NO`. La aprobación Founder del 29 de agosto avanzó los seis claims exactos a `READY_FOR_COPY`; el receipt visual registra producción y QA, pero no autoriza `READY_FOR_VISUAL`. No se inventa esa autorización, ni se abre integración, publicación, merge o deploy. LM-PC-031 no se fuerza bajo el capítulo sanitario `deber-profesional`; LM-PC-065 conserva los claims de LGSM, pero la representación aparece únicamente como pregunta relacionada y no como claim soportado por los arts. 1 y 6.\n\n## Entregables\n\n`integration-map.md` y `cross-channel-matrix.csv` documentan el destino y la continuidad sobre el Knowledge Graph existente. `current-state.json` es la capa viva de estado; los bindings históricos no se reescriben. `linkedin-package.md` contiene la cola separada para LegalMente y Founder. `instagram-package.md` contiene feed 4:5, story/reel cover 9:16 y copy vinculado. `pinterest-package.md` y `pinterest_bulk_upload.csv` contienen la preparación masiva base 2:3, con `MEDIA_URL_STATE=TEMPORARY_VALIDATION_URL` y filas separadas sin Link cuando falta un parent semántico seguro. `measurement-plan.md` contiene la instrumentación propuesta sin activar eventos ni campañas. `asset-registry.json` y `assets/` contienen los derivados reales con hashes.\n\n## Regla de integración\n\nUna unidad solo puede entrar en una ruta pública cuando el registro conserva `CONTENT_ID`, claims aprobados, fuente y artículos, territorio, qualifier, copy, asset y gate actual. La existencia del asset o del CSV no autoriza su publicación. La aprobación de integración de LM-PC-013 solo abre QA de integración educativa; no resuelve el provenance visual ni autoriza publicación. Una unidad en `SEPARATED_PENDING_BINDING` permanece preservada, pero no se integra, no se promociona y no se carga en Pinterest.\n''', encoding='utf-8')

print(f'Generated Wave 01A package at {ROOT}')
print(f'Assets: {len(asset_rows)}')
print(f'Units: {len(units)}')
