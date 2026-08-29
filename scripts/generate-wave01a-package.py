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
        'alt': 'Dos hojas transparentes superpuestas sobre una mesa de trabajo; un centro común representa el objeto y alrededor aparecen referencias visuales a entrega, conducta y alcance.',
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
        'series': 'empresa-que-obliga',
        'series_label': 'Quién obliga a la empresa',
        'chapter': 'deber-profesional',
        'chapter_label': 'Deber profesional y contexto',
        'concept': 'deber-profesional',
        'concept_label': 'Deber profesional',
        'process': 'organizar-hechos-y-prueba',
        'process_label': 'Organizar hechos y prueba',
        'route': '/capitulo/deber-profesional',
        'previous': 'Describir los hechos: quién trabaja, bajo qué organización y qué está documentado.',
        'next': 'Ordenar funciones, lugar, jornada, salario, pagos y vacaciones sin convertir la lista en una conclusión individual.',
        'source': 'Ley Federal del Trabajo, arts. 20–21 y 25',
        'source_url': 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf',
        'territory': 'México — explicación educativa; no regla panhispánica',
        'qualifier': 'No etiqueta una relación concreta ni calcula derechos o prestaciones.',
        'alt': 'Tablero editorial con tres franjas conectadas: hechos, documentos y preguntas; una línea atraviesa las palabras personal, subordinación y salario, con una tarjeta lateral de condiciones de trabajo.',
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
        'series': 'empresa-que-obliga',
        'series_label': 'Quién obliga a la empresa',
        'chapter': 'representacion-empresa',
        'chapter_label': 'Quién puede actuar por una empresa',
        'concept': 'representacion',
        'concept_label': 'Representación',
        'process': 'verificar-representacion',
        'process_label': 'Verificar representación',
        'route': '/concepto/representacion',
        'previous': 'Identificar la categoría de sociedad antes de leer un documento como si fuera intercambiable con otro.',
        'next': 'Separar escritura o póliza constitutiva, datos corporativos y facultades de representación.',
        'source': 'Ley General de Sociedades Mercantiles, arts. 1 y 6',
        'source_url': 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSM.pdf',
        'territory': 'México — explicación educativa; no regla panhispánica',
        'qualifier': 'No identifica ni valida una entidad concreta ni confirma que un documento esté completo o vigente.',
        'alt': 'Tres objetos de archivo conectados sin fusionarse: una tarjeta de especie societaria, un documento constitutivo y una tarjeta de representación, cada uno con una línea de revisión independiente.',
        'linkedin_title': 'Clasificación, documento y representación no son la misma pregunta',
        'linkedin_opening': 'Una revisión corporativa se vuelve más clara cuando separa tres capas: qué especie de sociedad se estudia, qué documento la constituye y quién aparece con facultades.',
        'linkedin_body': 'La Ley General de Sociedades Mercantiles reconoce distintas especies de sociedades mercantiles y prevé datos que deben aparecer en la escritura o póliza constitutiva. Esa estructura sirve para ordenar una revisión documental. No identifica ni valida una entidad concreta, ni confirma que un instrumento esté completo o vigente. La claridad empieza por no mezclar clasificación legal, documento constitutivo y representación.',
        'linkedin_cta': 'Convierte cada capa en una pregunta separada antes de revisar conclusiones.',
        'ig_hook': 'Una sociedad no se entiende con un solo documento leído fuera de contexto.',
        'ig_caption': 'La Ley General de Sociedades Mercantiles reconoce distintas especies de sociedades mercantiles y prevé datos para la escritura o póliza constitutiva.\n\nEso permite ordenar una revisión en capas: primero la categoría; después el instrumento y sus datos; por separado, las facultades de representación. La explicación no identifica ni valida una entidad concreta, ni confirma que un documento esté completo o vigente.\n\nSeparar preguntas también es una forma de revisar mejor.\n\nInformación educativa; no asesoría individual.',
        'ig_cta': 'Guárdalo para ordenar una revisión corporativa.',
        'hashtags': '#LegalMente #Empresa #CulturaJuridica',
        'pin_title': 'Qué ordenar para entender una sociedad mercantil',
        'pin_description': 'Guía educativa para separar especie societaria, documento constitutivo y representación al ordenar información corporativa en México. No valida una entidad concreta.',
        'board': 'Empresa',
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

# Pinterest bulk CSV: base format only, one real asset and one unique destination per unit.
pin_fields = ['PIN_ID','PARENT_CONTENT_ID','TITLE','DESCRIPTION','ALT_TEXT','DESTINATION_URL','BOARD','SOURCE_CONTEXT','TERRITORY','ASSET_PATH','FORMAT','PUBLICATION_STATE']
with (ROOT / 'pinterest_bulk_upload.csv').open('w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=pin_fields)
    writer.writeheader()
    for cid, u in units.items():
        writer.writerow({
            'PIN_ID': f'PIN-W01A-{cid[-3:]}-01',
            'PARENT_CONTENT_ID': cid,
            'TITLE': u['pin_title'],
            'DESCRIPTION': u['pin_description'],
            'ALT_TEXT': u['alt'],
            'DESTINATION_URL': f'https://ef9882a7.legalmente-educativo.pages.dev{u["route"]}',
            'BOARD': u['board'],
            'SOURCE_CONTEXT': u['source'],
            'TERRITORY': u['territory'],
            'ASSET_PATH': f'assets/{cid}_pinterest_2x3.png',
            'FORMAT': '1000x1500 2:3',
            'PUBLICATION_STATE': 'READY_FOR_BULK_UPLOAD',
        })

# Integration and channel matrices.
with (ROOT / 'cross-channel-matrix.csv').open('w', encoding='utf-8', newline='') as f:
    fields = ['CONTENT_ID','CLAIM_IDS','USER_JOB','EXISTING_WORLD','EXISTING_SERIES','EXISTING_CHAPTER','EXISTING_CONCEPT','EXISTING_PROCESS','CANDIDATE_PUBLIC_ROUTE','PREVIOUS_LEARNING','NEXT_LEARNING','SOURCE_CONTEXT','TERRITORY_CONTEXT','QUALIFIER','WEB_ASSET','LINKEDIN_LEGALMENTE_ASSET','LINKEDIN_FOUNDER_ASSET','INSTAGRAM_FEED_ASSET','INSTAGRAM_9X16_ASSET','PINTEREST_ASSET','ALT_TEXT','CURRENT_COPY_STATE','CURRENT_VISUAL_STATE','CURRENT_INTEGRATION_STATE','CURRENT_PUBLICATION_STATE','NEXT_GATE']
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    for cid, u in units.items():
        writer.writerow({
            'CONTENT_ID': cid,
            'CLAIM_IDS': u['claims'],
            'USER_JOB': u['question'],
            'EXISTING_WORLD': f'{u["world"]} — {u["world_label"]}',
            'EXISTING_SERIES': f'{u["series"]} — {u["series_label"]}',
            'EXISTING_CHAPTER': f'{u["chapter"]} — {u["chapter_label"]}',
            'EXISTING_CONCEPT': f'{u["concept"]} — {u["concept_label"]}',
            'EXISTING_PROCESS': f'{u["process"]} — {u["process_label"]}',
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
            'CURRENT_VISUAL_STATE': 'READY_FOR_VISUAL',
            'CURRENT_INTEGRATION_STATE': 'PRODUCT_REVIEW_REQUIRED',
            'CURRENT_PUBLICATION_STATE': 'NOT_PUBLIC',
            'NEXT_GATE': 'Human product decision per unit; then integration QA; then publication decision',
        })

# Markdown channel packages.
(ROOT / 'integration-map.md').write_text('''# Wave 01A — Mapa de integración candidata\n\n**Estado del paquete:** `CONTENT_PREPARED` → `CHANNEL_ADAPTED` → `QA_CHANNEL_PASS` → `READY_FOR_PUBLICATION_DECISION`  \n**Integración pública:** `PRODUCT_REVIEW_REQUIRED`  \n**Publicación:** `NOT_PUBLIC`\n\nLa integración se prepara sobre rutas existentes y no crea una familia de páginas nueva. Cada unidad conserva sus claims aprobados, fuente, artículos, territorio México, qualifier, asset real, texto seleccionable y siguiente aprendizaje. El mapa no equivale a autorización de integración ni de publicación.\n\n| Unidad | Mundo | Serie | Capítulo existente | Concepto | Proceso | Ruta candidata | Ajuste de producto requerido |\n|---|---|---|---|---|---|---|---|\n| LM-PC-013 | Vida cotidiana | Consentimiento y obligaciones | Consentir no es solamente firmar | Consentimiento | Leer antes de aceptar | `/proceso/leer-antes-de-aceptar` | Claro: encaja con la ruta de aceptar, guardar versión y distinguir objeto/obligaciones. |\n| LM-PC-031 | Empresa y comercio | Quién obliga a la empresa | Deber profesional y contexto | Deber profesional | Organizar hechos y prueba | `/capitulo/deber-profesional` | Encaje claro en el capítulo existente; la continuidad lleva a hechos/documentos, sin reutilizar representación como claim laboral. |\n| LM-PC-065 | Empresa y comercio | Quién obliga a la empresa | Quién puede actuar por una empresa | Representación | Verificar representación | `/concepto/representacion` | Claro como revisión por capas: especie, instrumento constitutivo y facultades; mantener separación entre clasificación y validación. |\n\n## Contrato de integración\n\nLa ficha candidata debe usar HTML seleccionable para el copy educativo, una imagen como apoyo visual y bloques visibles de fuente, artículos, territorio, qualifier y siguiente aprendizaje. El componente no debe solicitar documentos, nombres, texto libre ni activar servicios. La ruta pública solo puede avanzar después de la decisión humana de producto por unidad.\n''', encoding='utf-8')

lines = ['# LinkedIn — LegalMente + Founder', '', '**Estado:** `CHANNEL_ADAPTED` / `QA_CHANNEL_PASS` / `READY_FOR_PUBLICATION_DECISION`; no publicado.', '', '## Cuenta institucional: LinkedIn LegalMente', '', 'Función: educación, autoridad editorial, conocimiento, fuentes y contexto. Formato visual: 1080 × 1350, 4:5. No engagement bait, asesoría ni promesas.', '']
for cid, u in units.items():
    lines += [f'### {cid} — {u["linkedin_title"]}', '', f'**LINKEDIN_TITLE:** {u["linkedin_title"]}', f'**LINKEDIN_OPENING:** {u["linkedin_opening"]}', f'**LINKEDIN_BODY:** {u["linkedin_body"]}', f'**LINKEDIN_SOURCE_NOTE:** Fuente: {u["source"]}. Territorio: {u["territory"]}. {u["qualifier"]}', f'**LINKEDIN_CTA:** {u["linkedin_cta"]}', f'**LINKEDIN_ALT_TEXT:** {u["alt"]}', f'**LINKEDIN_VISUAL_4X5:** `assets/{cid}_feed_4x5.png`', f'**ASSET_ID:** `{cid}_feed_4x5`', '']
lines += ['## Cuenta Founder — cola separada', '', 'La cola Founder no copia el canal institucional. Su función es criterio profesional, autoridad corporativa, reflexión jurídica y riesgo empresarial; no se publica todavía.', '']
for cid, u in units.items():
    lines += [f'### FOUNDER-{cid}', '', f'**FOUNDER_POST_ID:** `FOUNDER-{cid}-01`', f'**RELATED_CONTENT_ID:** `{cid}`', f'**ANGLE:** Separar descripción, clasificación y decisión antes de operar.', f'**CORPORATE_PROBLEM:** La empresa puede confundir una categoría general o un documento con una conclusión sobre una relación, entidad o contrato concreto.', f'**DECISION_CONTEXT:** Preparar una revisión ordenada con hechos, fuente, territorio, documento y facultades visibles.', f'**LEGAL_CONCEPT:** {u["concept_label"]}; fuente: {u["source"]}.', f'**BUSINESS_RISK:** Decidir con una etiqueta incompleta puede ocultar diferencias entre documento, operación, representación y hechos.', f'**WHAT_TO_REVIEW:** {u["previous"]} {u["next"]}', f'**LIMIT:** {u["qualifier"]} Información educativa, no asesoría individual.', f'**SOURCE:** {u["source"]} — {u["source_url"]}', f'**CTA / QUESTION:** ¿Qué capa conviene separar primero en esta revisión: hechos, documento, clasificación o facultades?', f'**VISUAL_4X5:** `assets/{cid}_feed_4x5.png`', '']
(ROOT / 'linkedin-package.md').write_text('\n'.join(lines), encoding='utf-8')

lines = ['# Instagram — Derivados Wave 01A', '', '**Estado:** `CHANNEL_ADAPTED` / `QA_CHANNEL_PASS` / `READY_FOR_PUBLICATION_DECISION`; no publicado.', '', 'Cada adaptación conserva `PARENT_CONTENT_ID`, claims, fuente, territorio y qualifier. No se crean nuevos CONTENT_ID.', '']
for cid, u in units.items():
    lines += [f'## {cid}', '', f'**PARENT_CONTENT_ID:** `{cid}`', f'**CLAIM_IDS:** `{u["claims"]}`', f'**SOURCE:** {u["source"]}', f'**TERRITORY:** {u["territory"]}', f'**QUALIFIER:** {u["qualifier"]}', f'**HOOK:** {u["ig_hook"]}', f'**INSTAGRAM_FEED_COPY:** {u["ig_caption"]}', f'**SOURCE_NOTE:** Fuente: {u["source"]}. {u["qualifier"]}', f'**CTA:** {u["ig_cta"]}', f'**ALT_TEXT:** {u["alt"]}', f'**HASHTAGS_LIMITED:** {u["hashtags"]}', f'**4X5_VISUAL:** `assets/{cid}_feed_4x5.png`', f'**9X16_VISUAL:** `assets/{cid}_vertical_9x16.png`', f'**STORY_VARIANT:** Convertir la pregunta central en tres pantallas: pregunta → fuente/contexto → siguiente aprendizaje. No introducir claims nuevos.', f'**REEL_COVER:** Usar el asset 9:16 con título corto de la unidad y zona segura amplia; sin marca de agua ni texto diminuto.', '']
(ROOT / 'instagram-package.md').write_text('\n'.join(lines), encoding='utf-8')

lines = ['# Pinterest — Preparación masiva Wave 01A', '', '**Estado:** CSV y assets `READY_FOR_BULK_UPLOAD`; autorización real de carga: `BULK_UPLOAD_AUTHORIZED = NO`; publicación: `NOT_PUBLIC`.', '', 'Se prepara un Pin base 2:3 por unidad, vinculado a un asset real y a un destino único. No se simula publicación ni se duplica destino. Los derivados 9:16 se reservan para Instagram.', '', 'Archivo: `pinterest_bulk_upload.csv`', '', '| Validación | Regla | Resultado esperado |', '|---|---|---|', '| Asset | Cada fila apunta a un PNG existente | PASS |', '| Destination | Una URL única por fila | PASS |', '| Alt | No vacío | PASS |', '| Title | No vacío | PASS |', '| Board | Usa agrupación humana compatible | PASS |', '| CONTENT_ID | Presente y estable | PASS |', '| HOLD_SOURCE | No permitido | PASS |', '| Claim | Solo claims en READY_FOR_COPY | PASS |', '| URL | Ruta candidata y no endpoint sensible | PASS |', '| Publication | Nunca `PUBLISHED` | PASS |', '']
(ROOT / 'pinterest-package.md').write_text('\n'.join(lines), encoding='utf-8')

(ROOT / 'current-state.json').write_text(json.dumps({cid: {
    'source_binding_original_state': 'HUMAN_REVIEW_REQUIRED (historical; not rewritten)',
    'human_decision_id': 'FOUNDER_DECISION_WAVE_01A_READY_FOR_COPY_2026-08-29',
    'human_decision_date': '2026-08-29',
    'current_copy_state': 'READY_FOR_COPY',
    'current_visual_state': 'READY_FOR_VISUAL',
    'current_integration_state': 'PRODUCT_REVIEW_REQUIRED',
    'current_publication_state': 'NOT_PUBLIC',
    'supersedes': 'Historical source-binding addendum remains preserved',
    'superseded_by': 'Current operational state layer in this package',
    'next_gate': 'Human product decision per unit; integration QA; publication decision',
} for cid in units}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

(ROOT / 'README.md').write_text('''# LegalMente — Wave 01A multichannel sprint\n\nEste paquete prepara cuatro carriles sin ejecutar gates humanos: integración candidata en rutas existentes, LinkedIn institucional y Founder, derivados de Instagram y Pinterest masivo. No contiene publicación, carga real, merge sensible ni deploy.\n\n## Estados\n\n- `CURRENT_COPY_STATE = READY_FOR_COPY`\n- `CURRENT_VISUAL_STATE = READY_FOR_VISUAL`\n- `CURRENT_INTEGRATION_STATE = PRODUCT_REVIEW_REQUIRED`\n- `CURRENT_PUBLICATION_STATE = NOT_PUBLIC`\n- `PINTEREST_BULK_UPLOAD_AUTHORIZED = NO`\n\n## Entregables\n\n- `integration-map.md` y `cross-channel-matrix.csv`: destino y continuidad sobre el Knowledge Graph existente.\n- `current-state.json`: capa viva de estado; los bindings históricos no se reescriben.\n- `linkedin-package.md`: cola separada para LegalMente y Founder.\n- `instagram-package.md`: feed 4:5, story/reel cover 9:16 y copy vinculado.\n- `pinterest-package.md` y `pinterest_bulk_upload.csv`: preparación masiva base 2:3.\n- `asset-registry.json` y `assets/`: derivados reales con hashes.\n''', encoding='utf-8')

print(f'Generated Wave 01A package at {ROOT}')
print(f'Assets: {len(asset_rows)}')
print(f'Units: {len(units)}')
