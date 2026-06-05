import os
from PIL import Image

def make_background_transparent_floodfill():
    img_path = r"c:\Users\nishk\OneDrive\Desktop\ai-academy\public\hero iamge.png"
    output_path = r"c:\Users\nishk\OneDrive\Desktop\ai-academy\public\hero-transparent.png"
    
    if not os.path.exists(img_path):
        print(f"Error: File {img_path} not found.")
        return
        
    img = Image.open(img_path)
    img = img.convert("RGBA")
    width, height = img.size
    
    # We will perform a flood fill from the corners.
    # We want to identify the background pixels.
    # Since the background color might vary slightly, we use a color distance threshold.
    # The corner pixels are around (243, 241, 243) or (250, 247, 248).
    # Let's say a pixel is "background" if it's close to the color of the start pixel.
    
    # Let's do a BFS/DFS from the corners:
    visited = set()
    pixels = img.load()
    
    # We will check color distance:
    def is_bg_color(color, ref_color=(245, 243, 243)):
        # Color is (r, g, b, a)
        r, g, b, _ = color
        ref_r, ref_g, ref_b = ref_color
        # If it is light cream/white/grey:
        # Distance to reference background color:
        dist = ((r - ref_r)**2 + (g - ref_g)**2 + (b - ref_b)**2)**0.5
        # Also check if it's just very light overall
        if dist < 45 or (r > 235 and g > 235 and b > 230):
            return True
        return False
        
    # Queue for BFS
    queue = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    for x, y in queue:
        visited.add((x, y))
        
    print("Starting flood fill BFS...")
    while queue:
        cx, cy = queue.pop(0)
        
        # Make the current background pixel transparent
        r, g, b, a = pixels[cx, cy]
        pixels[cx, cy] = (255, 255, 255, 0)
        
        # Check neighbors (4-connectivity)
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    # Check if neighbor has a background-like color
                    neighbor_color = pixels[nx, ny]
                    if is_bg_color(neighbor_color):
                        visited.add((nx, ny))
                        queue.append((nx, ny))
                        
    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    make_background_transparent_floodfill()
