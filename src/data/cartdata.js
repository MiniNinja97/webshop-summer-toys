import { create } from "zustand";

const cartData = create((set) => ({
	cart: [],

	addToCart: (product) => 
		set((state) => {
			const exist = state.cart.find((p) => p.id === product.id);
			if (exist) {
				return {
					cart: state.cart.map((p) => 
						p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
					),
				};
			}
			return { cart: [...state.cart, { ...product, quantity: 1 }] };
		}),

	removeFromCart: (productId) => 
		set((state) => ({
			cart: state.cart.filter((product) => product.id !== productId),
		})),

	updateQuantity: (productId, quantity) => 
		set((state) => ({
			cart: state.cart.map((product) => 
				product.id === productId ? { ...product, quantity } : product
			),
		})),
}));

export { cartData };