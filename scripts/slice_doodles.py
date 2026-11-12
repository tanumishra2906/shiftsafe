import os
from PIL import Image

sheet_path = r"C:\Project\shiftsafe\design\doodle-sheet.png"
out_dir = r"C:\Project\shiftsafe\public\doodles"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(sheet_path).convert("RGBA")
width, height = img.size
cell_w = 256
cell_h = 256
print(f"Sheet dimensions: {width}x{height}")

targets = [
    (1, 2, "shield-female.png"),
    (1, 4, "phone-route.png"),
    (4, 2, "phone-bell.png"),
    (2, 5, "calendar.png"),
    (3, 3, "laptop-lock.png"),
    (2, 6, "map-pin.png"),
]

for row, col, filename in targets:
    x0 = (col - 1) * cell_w
    y0 = (row - 1) * cell_h
    x1 = col * cell_w
    y1 = row * cell_h
    cell = img.crop((x0, y0, x1, y1))
    
    # Auto-crop transparent padding
    bbox = cell.getbbox()
    if bbox:
        cropped = cell.crop(bbox)
    else:
        cropped = cell
    
    out_path = os.path.join(out_dir, filename)
    cropped.save(out_path, format="PNG", optimize=True)
    print(f"Saved ({row},{col}) -> {filename}: {cropped.size} (original bbox: {bbox})")

print("All doodles sliced and saved successfully!")
