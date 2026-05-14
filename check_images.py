import re
import urllib.request
from pathlib import Path

def extract_urls(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all http/https URLs that look like image sources
    urls = []
    
    # For constants.ts
    for match in re.finditer(r'image:\s*"([^"]+)"', content):
        urls.append(match.group(1))
        
    # For img tags
    for match in re.finditer(r'<img[^>]+src=["\']([^"\']+)["\']', content):
        src = match.group(1)
        if src.startswith("http"):
            urls.append(src)
            
    return urls

root_dir = Path(r"c:\Users\aksha\OneDrive\Desktop\varshita\drip-shopping-app\src")
all_urls = set()

for file_path in root_dir.rglob("*.*"):
    if file_path.suffix in [".ts", ".tsx"]:
        urls = extract_urls(file_path)
        all_urls.update(urls)

print(f"Found {len(all_urls)} unique image URLs. Checking them...")

for url in all_urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req, timeout=5)
        if response.status != 200:
            print(f"BROKEN [{response.status}]: {url}")
        else:
            print(f"OK: {url}")
    except Exception as e:
        print(f"ERROR checking {url}: {e}")
