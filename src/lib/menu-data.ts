export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  veg: boolean;
  spicy?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

// Prices in INR. Placeholder menu drafted from the restaurant's description —
// swap in real dishes/prices whenever ready.
export const menu: MenuCategory[] = [
  {
    id: "starters",
    name: "Starters",
    items: [
      { id: "paneer-tikka", name: "Paneer Tikka", description: "Chargrilled cottage cheese marinated in yogurt and spices.", price: 280, veg: true, spicy: true },
      { id: "hara-bhara-kebab", name: "Hara Bhara Kebab", description: "Spinach and green pea patties with a crisp crust.", price: 240, veg: true },
      { id: "aloo-tikki-chaat", name: "Aloo Tikki Chaat", description: "Spiced potato patties with tangy chutneys and yogurt.", price: 180, veg: true },
      { id: "chicken-tikka", name: "Chicken Tikka", description: "Char-grilled chicken marinated in yogurt and roasted spices.", price: 320, veg: false, spicy: true },
      { id: "fish-amritsari", name: "Fish Amritsari", description: "Crispy batter-fried fish with carom seed and spices.", price: 380, veg: false },
      { id: "tandoori-prawns", name: "Tandoori Prawns", description: "Jumbo prawns marinated in tandoori spice and char-grilled.", price: 450, veg: false, spicy: true },
    ],
  },
  {
    id: "tandoori",
    name: "From the Tandoor",
    items: [
      { id: "tandoori-chicken-half", name: "Tandoori Chicken (Half)", description: "Classic clay-oven roasted chicken, half portion.", price: 340, veg: false, spicy: true },
      { id: "tandoori-chicken-full", name: "Tandoori Chicken (Full)", description: "Classic clay-oven roasted chicken, full portion.", price: 620, veg: false, spicy: true },
      { id: "tandoori-pomfret", name: "Tandoori Pomfret", description: "Whole pomfret marinated and roasted in the tandoor — a Goan coastal favourite.", price: 550, veg: false },
      { id: "paneer-tikka-skewers", name: "Paneer Tikka Skewers", description: "Cottage cheese, peppers, and onion, char-roasted on skewers.", price: 300, veg: true },
    ],
  },
  {
    id: "gravies",
    name: "Rich Gravies",
    items: [
      { id: "paneer-butter-masala", name: "Paneer Butter Masala", description: "Cottage cheese simmered in a velvety tomato-butter gravy.", price: 320, veg: true },
      { id: "dal-makhani", name: "Dal Makhani", description: "Black lentils slow-cooked overnight with butter and cream.", price: 260, veg: true },
      { id: "malai-kofta", name: "Malai Kofta", description: "Vegetable and cheese dumplings in a mildly sweet, creamy gravy.", price: 300, veg: true },
      { id: "palak-paneer", name: "Palak Paneer", description: "Cottage cheese in a smooth spiced spinach gravy.", price: 290, veg: true },
      { id: "butter-chicken", name: "Butter Chicken", description: "Tandoori chicken simmered in a rich tomato-butter gravy.", price: 380, veg: false },
      { id: "mutton-rogan-josh", name: "Mutton Rogan Josh", description: "Slow-braised mutton in an aromatic Kashmiri-style gravy.", price: 450, veg: false, spicy: true },
      { id: "goan-fish-curry", name: "Goan Fish Curry", description: "Local catch in a tangy coconut and kokum curry.", price: 420, veg: false, spicy: true },
      { id: "chicken-curry", name: "Chicken Curry", description: "Home-style chicken curry with classic North Indian spices.", price: 340, veg: false },
    ],
  },
  {
    id: "breads-rice",
    name: "Flatbreads & Rice",
    items: [
      { id: "tandoori-roti", name: "Tandoori Roti", description: "Whole wheat bread baked in the tandoor.", price: 40, veg: true },
      { id: "butter-naan", name: "Butter Naan", description: "Leavened bread brushed with butter.", price: 60, veg: true },
      { id: "garlic-naan", name: "Garlic Naan", description: "Naan topped with fresh garlic and coriander.", price: 70, veg: true },
      { id: "lachha-paratha", name: "Lachha Paratha", description: "Multi-layered, flaky whole wheat bread.", price: 65, veg: true },
      { id: "jeera-rice", name: "Jeera Rice", description: "Basmati rice tempered with cumin.", price: 180, veg: true },
      { id: "veg-biryani", name: "Vegetable Biryani", description: "Fragrant basmati rice layered with spiced vegetables.", price: 280, veg: true },
      { id: "chicken-biryani", name: "Chicken Biryani", description: "Fragrant basmati rice layered with spiced chicken.", price: 340, veg: false },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      { id: "gulab-jamun", name: "Gulab Jamun", description: "Soft milk dumplings soaked in rose-cardamom syrup.", price: 120, veg: true },
      { id: "rasmalai", name: "Rasmalai", description: "Cottage cheese dumplings in saffron-cardamom milk.", price: 140, veg: true },
      { id: "kulfi", name: "Kulfi", description: "Traditional Indian ice cream, cardamom & pistachio.", price: 130, veg: true },
      { id: "gajar-halwa", name: "Gajar Halwa", description: "Slow-cooked carrot halwa with nuts and ghee.", price: 150, veg: true },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    items: [
      { id: "masala-chai", name: "Masala Chai", description: "Spiced Indian tea.", price: 60, veg: true },
      { id: "lassi", name: "Lassi", description: "Sweet or salted yogurt drink.", price: 90, veg: true },
      { id: "lime-soda", name: "Fresh Lime Soda", description: "Sweet, salted, or mixed.", price: 80, veg: true },
      { id: "soft-drink", name: "Soft Drink", description: "Assorted soft drinks.", price: 60, veg: true },
    ],
  },
];

export const allMenuItems: MenuItem[] = menu.flatMap((c) => c.items);
export const findMenuItem = (id: string) => allMenuItems.find((i) => i.id === id);
