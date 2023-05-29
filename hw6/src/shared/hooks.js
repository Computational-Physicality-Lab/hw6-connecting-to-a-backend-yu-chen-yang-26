import { create } from "zustand";
const useHook = create((set) => ({
  cart: [],
  setCart: (param) => set((state) => ({ cart: param })),
  profile: [],
  setProfile: (param) => set((state) => ({ profile: param })),
  data: [],
  setData: (param) => set((state) => ({ data: param })),
  cartNumber: 0,
  setCartNumber: (param) => set((state) => ({ cartNumber: param })),
}));
export { useHook };
