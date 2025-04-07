import { create } from "zustand";

const getCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const useCartStore = create((set) => ({
  cart: getCartFromStorage(),
  totalPrice: getCartFromStorage().reduce((t, i) => t + i.price, 0),

  addToCart: (product) =>
    set((state) => {
      const updatedCart = [...state.cart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        cart: updatedCart,
        totalPrice: updatedCart.reduce((t, i) => t + i.price, 0),
      };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        cart: updatedCart,
        totalPrice: updatedCart.reduce((t, i) => t + i.price, 0),
      };
    }),

  clearCart: () =>
    set(() => {
      localStorage.removeItem("cart");
      return { cart: [], totalPrice: 0 };
    }),
}));

export default useCartStore;
