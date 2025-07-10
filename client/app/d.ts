export const mainNavigationLinks = [
  { id: 0, text: "Home", href: "/" },
  { id: 1, text: "Inventory", href: "/inventory" },
]

export const measurementUnits = [
  "g",
  "mg",
  "kg",
  "oz",
  "lb",
  "fl oz",
  "cup",
  "gal",
  "tsp",
  "tbsp",
  "pinch",
  "each",
]

export type InventoryItem = {
  id: string
  name: string
  room: string
  quantity: number
  maxQuantity?: number
  unit?: string
  description?: string
  dateAdded: Date
}
