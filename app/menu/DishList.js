
"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartProvider";

export default function DishList({ dishes }) {
  const { cart, addToCart, removeFromCart } =
    useContext(CartContext);

  return (
    <div className="dish-grid">
      {dishes.map((dish) => {
        const inCart = cart.some(
          (item) => item.id === dish.id
        );

        return (
          <article key={dish.id}>
            <Image
              src={`/${dish.image}`}
              alt={dish.name}
              width={320}
              height={220}
              sizes="(max-width: 700px) 100vw, 320px"
            />

            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
            <p>{dish.price} ETB</p>

            <div className="card-button">
              <Link href={`/menu/${dish.id}`}>
              View Details
            </Link>

            {inCart ? (
              <button
                onClick={() => removeFromCart(dish.id)}
              >
                Remove
              </button>
            ) : (
              <button
                onClick={() => addToCart(dish)}
              >
                Add to Cart
              </button>
            )}
            </div>
            
          </article>
        );
      })}
    </div>
  );
}
