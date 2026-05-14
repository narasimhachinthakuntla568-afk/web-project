export const disc = (p: number, op: number) => Math.round((1 - p / op) * 100);

export const catIcon = (c: string) => ({ 
  Tops: "👕", 
  Bottoms: "👖", 
  Outerwear: "🧥", 
  Dresses: "👗", 
  Accessories: "👜" 
}[c] || "🛍️");

export const stockColor = (n: number) => n <= 5 ? "#c00" : n <= 15 ? "#b36b00" : "#2d7a2d";
export const stockBg    = (n: number) => n <= 5 ? "#ffe0e0" : n <= 15 ? "#fff3e0" : "#e8f5e8";
