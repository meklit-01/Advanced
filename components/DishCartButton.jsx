
"use client";

import { useContext } from "react";
import { CartContext } from "@/components/CartProvider";

export default function DishCartButton({ dish }) {
  const { cart, addToCart, removeFromCart } =
    useContext(CartContext);

  const inCart = cart.some(
    (item) => item.id === dish.id
  );

  return (
    <div className="dish-cart-actions">
      {inCart ? (
        <button
          type="button"
          onClick={() => removeFromCart(dish.id)}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          type="button"
          onClick={() => addToCart(dish)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
