from __future__ import annotations

import csv
import json
import struct
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1] / 'docs/social/wave-01a'
ASSETS = ROOT / 'assets'
EXPECTED = {'LM-PC-013', 'LM-PC-031', 'LM-PC-065'}

state = json.loads((ROOT / 'current-state.json').read_text(encoding='utf-8'))
visual_receipt = ROOT / 'LM-PC-013-031-065-human-visual-gate-decision-receipt-2026-08-29.md'
semantic_receipt = ROOT / 'LM-PC-031-065-human-semantic-binding-decision-receipt-2026-08-29.md'
assert visual_receipt.exists(), 'missing_visual_gate_receipt'
assert semantic_receipt.exists(), 'missing_semantic_binding_receipt'
for cid in EXPECTED:
    unit = state[cid]
    assert unit['visual_gate_provenance'] == 'VALID_HUMAN_PROVENANCE', cid
    assert unit['current_visual_state'] == 'VISUAL_QA_PASS_PROVENANCE_VALID_HUMAN', cid
    assert unit['visual_gate_authorization'] == 'HUMAN_VISUAL_GATE_APPROVED', cid
    assert unit['current_publication_state'] == 'NOT_PUBLIC', cid
assert state['LM-PC-013']['current_integration_state'] == 'PUBLIC_INTEGRATION_APPROVED'
assert state['LM-PC-031']['current_integration_state'] == 'EDUCATIONAL_INTEGRATION_APPROVED_EXISTING_PROCESS'
assert state['LM-PC-031']['candidate_public_route'] == '/proceso/organizar-hechos-y-prueba'
assert state['LM-PC-031']['integration_decision'] == 'APPROVE_INTEGRATION:/proceso/organizar-hechos-y-prueba'
assert state['LM-PC-031']['integration_receipt'] == 'LM-PC-031-065-human-integration-decision-receipt-2026-08-30.md'
assert state['LM-PC-065']['current_integration_state'] == 'SEMANTIC_BINDING_RESOLVED_INTEGRATION_NOT_APPROVED'
assert state['LM-PC-065']['integration_decision'] == 'KEEP_RELATED_ONLY_NO_PUBLIC_INTEGRATION'
assert state['LM-PC-065']['integration_receipt'] == 'LM-PC-031-065-human-integration-decision-receipt-2026-08-30.md'
for cid in ('LM-PC-031', 'LM-PC-065'):
    assert state[cid]['semantic_binding_receipt'] == semantic_receipt.name, cid


def png_size(path: Path) -> tuple[int, int]:
    with path.open('rb') as fh:
        signature = fh.read(8)
        if signature != b'\x89PNG\r\n\x1a\n':
            raise AssertionError(f'not_png:{path}')
        length = struct.unpack('>I', fh.read(4))[0]
        chunk = fh.read(4)
        if chunk != b'IHDR' or length < 8:
            raise AssertionError(f'missing_ihdr:{path}')
        width, height = struct.unpack('>II', fh.read(8))
        return width, height


def read_csv(path: Path):
    with path.open(encoding='utf-8', newline='') as fh:
        return list(csv.DictReader(fh))


def assert_public_media(url: str) -> None:
    request = Request(url, headers={'User-Agent': 'LegalMente-Wave01A-validator/1.0'})
    with urlopen(request, timeout=15) as response:
        content_type = response.headers.get('content-type', '')
        assert response.status == 200, f'media_status:{url}:{response.status}'
        assert content_type.startswith('image/'), f'media_content_type:{url}:{content_type}'
        assert response.read(8) == b'\x89PNG\r\n\x1a\n', f'media_not_png:{url}'


pins = read_csv(ROOT / 'pinterest_bulk_upload.csv')
pinterest_fields = {'Title', 'Media URL', 'Pinterest board', 'Thumbnail', 'Description', 'Link', 'Publish date', 'Keywords'}
assert len(pins) == 3, f'pin_count:{len(pins)}'
assert set(pins[0]) == pinterest_fields, f'unexpected_pin_columns:{set(pins[0])}'
assert len({row['Media URL'] for row in pins}) == len(pins), 'duplicate_media_url'

for row in pins:
    assert row['Title'].strip() and len(row['Title']) <= 100, f'bad_title:{row["Title"]}'
    assert row['Media URL'].startswith(('https://', 'http://')), f'bad_media_url:{row["Title"]}'
    assert row['Pinterest board'].strip(), f'empty_board:{row["Title"]}'
    assert not row['Thumbnail'].strip(), f'image_thumbnail_must_be_empty:{row["Title"]}'
    assert row['Description'].strip() and len(row['Description']) <= 500, f'bad_description:{row["Title"]}'
    assert not row['Link'].strip() or row['Link'].startswith(('https://', 'http://')), f'bad_link:{row["Title"]}'
    assert not row['Publish date'].strip(), f'unexpected_publish_date:{row["Title"]}'
    assert row['Keywords'].strip(), f'empty_keywords:{row["Title"]}'
    assert 'HOLD_SOURCE' not in row.values(), f'hold_source:{row["Title"]}'
    asset_name = row['Media URL'].rsplit('/', 1)[-1]
    asset = ASSETS / asset_name
    assert asset.exists(), f'missing_asset:{asset}'
    assert png_size(asset) == (1000, 1500), f'bad_asset_size:{asset}'
    assert_public_media(row['Media URL'])

matrix = read_csv(ROOT / 'cross-channel-matrix.csv')
assert {row['CONTENT_ID'] for row in matrix} == EXPECTED, 'matrix_content_ids'
for row in matrix:
    cid = row['CONTENT_ID']
    assert row['CURRENT_COPY_STATE'] == 'READY_FOR_COPY', cid
    assert row['CURRENT_VISUAL_STATE'] == 'VISUAL_QA_PASS_PROVENANCE_VALID_HUMAN', cid
    assert row['VISUAL_ASSET_STATE'] == 'EXISTS', cid
    assert row['VISUAL_QA_STATE'] == 'PASS', cid
    assert row['VISUAL_GATE_PROVENANCE'] == 'VALID_HUMAN_PROVENANCE', cid
    assert row['COPY_CHANNEL_QA'] == 'PASS', cid
    assert row['ART_BASE_STATE'] == 'READY', cid
    assert row['SOCIAL_COMPOSITION_STATE'] == 'REVIEW_REQUIRED', cid
    assert row['MEDIA_URL_STATE'] == 'TEMPORARY_VALIDATION_URL', cid
    assert row['CURRENT_PUBLICATION_STATE'] == 'NOT_PUBLIC', cid
    assert row['CLAIM_IDS'] and row['SOURCE_CONTEXT'] and row['TERRITORY_CONTEXT'] and row['QUALIFIER'], cid
    assert row['ALT_TEXT'].strip(), f'empty_alt:{cid}'
    assert not any(bad in row['ALT_TEXT'] for bad in ('hojas transparentes', 'Tablero editorial', 'Tres objetos de archivo conectados')), f'non_literal_alt:{cid}'
    assert '/capitulo/deber-profesional' not in row['CANDIDATE_PUBLIC_ROUTE']
    assert '/concepto/representacion' not in row['CANDIDATE_PUBLIC_ROUTE']
    if cid == 'LM-PC-013':
        assert row['CURRENT_INTEGRATION_STATE'] == 'PUBLIC_INTEGRATION_APPROVED', cid
        assert row['CANDIDATE_PUBLIC_ROUTE'] == '/proceso/leer-antes-de-aceptar', cid
    elif cid == 'LM-PC-031':
        assert row['CURRENT_INTEGRATION_STATE'] == 'EDUCATIONAL_INTEGRATION_APPROVED_EXISTING_PROCESS', cid
        assert row['CANDIDATE_PUBLIC_ROUTE'] == '/proceso/organizar-hechos-y-prueba', cid
    else:
        assert row['CURRENT_INTEGRATION_STATE'] == 'SEMANTIC_BINDING_RESOLVED_INTEGRATION_NOT_APPROVED', cid
        assert not row['CANDIDATE_PUBLIC_ROUTE'], cid
        assert not row['EXISTING_SERIES'] and not row['EXISTING_CHAPTER'] and not row['EXISTING_CONCEPT'], cid

for cid in sorted(EXPECTED):
    for suffix, size in [('feed_4x5', (1664, 2080)), ('vertical_9x16', (1440, 2560)), ('pinterest_2x3', (1000, 1500))]:
        path = ASSETS / f'{cid}_{suffix}.png'
        assert path.exists(), f'missing_asset:{path}'
        assert png_size(path) == size, f'bad_asset_size:{path}:{png_size(path)}'

print('wave01a_package_validation=PASS')
print(f'pin_rows={len(pins)}')
print(f'matrix_rows={len(matrix)}')
print('official_pinterest_schema=PASS')
print('public_media_urls=PASS')
print('asset_dimensions=PASS')
print('publication_authorized=NO')
