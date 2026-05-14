import os
import re

files_to_fix = [
    "src/pages/ShopPage.tsx",
    "src/pages/WishlistPage.tsx",
    "src/pages/ProductPage.tsx",
    "src/pages/OrdersPage.tsx",
    "src/pages/HomePage.tsx",
    "src/pages/admin/AdminPanel.tsx",
    "src/contexts/AuthContext.tsx",
    "src/contexts/ProductsContext.tsx",
    "src/contexts/WishlistContext.tsx",
    "src/components/common/ProductCard.tsx",
    "src/components/admin/AddProductModal.tsx",
    "src/reducers/productsReducer.ts",
    "src/utils/constants.ts"
]

root_dir = "c:/Users/aksha/OneDrive/Desktop/varshita/drip-shopping-app"

for rel_path in files_to_fix:
    full_path = os.path.join(root_dir, rel_path)
    if os.path.exists(full_path):
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace import { ... } from ".*types" with import type { ... } from ".*types"
        # Only if it's not already using import type
        new_content = re.sub(r'import \{ ([^}]+) \} from "([^"]*types)"', r'import type { \1 } from "\2"', content)
        
        if new_content != content:
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed {rel_path}")
        else:
            print(f"No changes needed for {rel_path}")
    else:
        print(f"File not found: {rel_path}")
