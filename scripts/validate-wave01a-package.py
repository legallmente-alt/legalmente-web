from __future__ import annotations

import csv
import struct
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / 'docs/social/wave-01a'
ASSETS = ROOT / 'assets'
EXPECTED = {'LM-PC-013', 'LM-PC-031', 'LM-PC-065'}


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


pins = read_csv(ROOT / 'pinterest_bulk_upload.csv')
assert len(pins) == 3, f'pin_count:{len(pins)}'
required = {'PIN_ID','PARENT_CONTENT_ID','TITLE','DESCRIPTION','ALT_TEXT','DESTINATION_URL','BOARD','SOURCE_CONTEXT','TERRITORY','ASSET_PATH','FORMAT','PUBLICATION_STATE'}
assert required.issubset(pins[0]), 'missing_pin_columns'
assert {row['PARENT_CONTENT_ID'] for row in pins} == EXPECTED, 'pin_parent_ids'
assert len({row['PIN_ID'] for row in pins}) == len(pins), 'duplicate_pin_id'
assert len({row['DESTINATION_URL'] for row in pins}) == len(pins), 'duplicate_destination'
assert len({row['ASSET_PATH'] for row in pins}) == len(pins), 'duplicate_asset'
for row in pins:
    assert all(row[field].strip() for field in required), f'empty_field:{row["PIN_ID"]}'
    assert row['PUBLICATION_STATE'] == 'READY_FOR_BULK_UPLOAD', f'bad_publication_state:{row["PIN_ID"]}'
    assert row['FORMAT'] == '1000x1500 2:3', f'bad_format:{row["PIN_ID"]}'
    assert 'HOLD_SOURCE' not in row.values(), f'hold_source:{row["PIN_ID"]}'
    asset = ROOT / row['ASSET_PATH']
    assert asset.exists(), f'missing_asset:{asset}'
    assert png_size(asset) == (1000, 1500), f'bad_asset_size:{asset}'

matrix = read_csv(ROOT / 'cross-channel-matrix.csv')
assert {row['CONTENT_ID'] for row in matrix} == EXPECTED, 'matrix_content_ids'
for row in matrix:
    assert row['CURRENT_COPY_STATE'] == 'READY_FOR_COPY', row['CONTENT_ID']
    assert row['CURRENT_VISUAL_STATE'] == 'READY_FOR_VISUAL', row['CONTENT_ID']
    assert row['CURRENT_INTEGRATION_STATE'] == 'PRODUCT_REVIEW_REQUIRED', row['CONTENT_ID']
    assert row['CURRENT_PUBLICATION_STATE'] == 'NOT_PUBLIC', row['CONTENT_ID']
    assert row['CLAIM_IDS'] and row['SOURCE_CONTEXT'] and row['TERRITORY_CONTEXT'] and row['QUALIFIER'], row['CONTENT_ID']

for cid in sorted(EXPECTED):
    for suffix, size in [('feed_4x5', (1664, 2080)), ('vertical_9x16', (1440, 2560)), ('pinterest_2x3', (1000, 1500))]:
        path = ASSETS / f'{cid}_{suffix}.png'
        assert path.exists(), f'missing_asset:{path}'
        assert png_size(path) == size, f'bad_asset_size:{path}:{png_size(path)}'

print('wave01a_package_validation=PASS')
print(f'pin_rows={len(pins)}')
print(f'matrix_rows={len(matrix)}')
print('asset_dimensions=PASS')
print('publication_authorized=NO')
