/*
 * Item category and loan type have the same values
 * Item make is decided once the item category has been selected
 */

export const availableItems: { [key: string]: string[] } = {
  // Category : [...makes]
  Housing: ["Prestige", "Aparna", "Jain", "Swargaseema"],
  Automobiles: ["Maruti", "Hyundai", "TVS", "Ola", "BMW"],
  Medicines: ["Apollo", "Tata 1mg", "Medibuddy"],
  Electronics: ["Samsung", "Apple", "LG", "Godrej"],
  Agriculture: ["Kaveri Seed", "Syngenta"],
  Furniture: ["Godrej", "IKEA", "Urban Ladder"]
}
