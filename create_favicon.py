from PIL import Image
import os

source_path = r"c:\Users\michi\OneDrive\デスクトップ\Vibe Coding\code\2026.01.20_michiyo_official_website\images\favicon-source.jpg"
dest_path = r"c:\Users\michi\OneDrive\デスクトップ\Vibe Coding\code\2026.01.20_michiyo_official_website\favicon.ico"

try:
    img = Image.open(source_path)
    width, height = img.size
    min_dim = min(width, height)

    # Center crop
    left = (width - min_dim) / 2
    top = (height - min_dim) / 2
    right = (width + min_dim) / 2
    bottom = (height + min_dim) / 2

    img_cropped = img.crop((left, top, right, bottom))
    img_resized = img_cropped.resize((64, 64), Image.Resampling.LANCZOS)
    img_resized.save(dest_path, format='ICO')
    print("Favicon created at", dest_path)
except Exception as e:
    print(f"Error: {e}")
