"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { FaTrash, FaArrowRight, FaTimes, FaShoppingCart } from "react-icons/fa";

export default function CartSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    cart,
    removeFromCart,
    getCartTotal,
    isCartOpen,
    toggleCart,
    clearCart,
  } = useCart();

  /*
   * Close the cart when navigating to another page.
   */
  useEffect(() => {
    if (isCartOpen) {
      toggleCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /*
   * Checkout
   */
  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    toggleCart();
    router.push("/home/order-confirmation");
  };

  /*
   * Do not render when cart is closed.
   */
  if (!isCartOpen) {
    return null;
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* =====================================================
          BACKDROP
      ====================================================== */}
      <button
        type="button"
        aria-label="Close shopping cart"
        onClick={toggleCart}
        className="
          absolute
          inset-0
          cursor-default
          border-0
          bg-black/50
          p-0
          backdrop-blur-sm
        "
      />

      {/* =====================================================
          CART SIDEBAR
      ====================================================== */}
      <aside
        className="
          relative
          z-10
          flex
          h-full
          w-full
          max-w-md
          flex-col
          border-l
          border-border
          bg-background
          shadow-2xl
        "
      >
        {/* ===================================================
            HEADER
        ==================================================== */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-border
            px-6
            py-5
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-primary/10
                text-primary
              "
            >
              <FaShoppingCart className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground">Your Cart</h2>

              <p className="text-xs text-foreground/55">
                {cartCount === 0
                  ? "No items"
                  : `${cartCount} ${cartCount === 1 ? "item" : "items"}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleCart}
            aria-label="Close cart"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-border
              text-foreground/60
              transition-all
              duration-200
              hover:border-primary/40
              hover:bg-primary/10
              hover:text-primary
              active:scale-95
            "
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        {/* ===================================================
            CART CONTENT
        ==================================================== */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div
                className="
                  mb-5
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-primary/10
                  text-primary
                "
              >
                <FaShoppingCart className="h-7 w-7" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-foreground">
                Your cart is empty
              </h3>

              <p className="max-w-xs text-sm leading-6 text-foreground/55">
                Looks like you have not added anything to your cart yet.
              </p>

              <button
                type="button"
                onClick={toggleCart}
                className="
                  mt-6
                  rounded-xl
                  bg-primary
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-primary-foreground
                  transition-all
                  duration-200
                  hover:bg-primary-hover
                  hover:-translate-y-0.5
                  active:scale-[0.98]
                "
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="
                    group
                    flex
                    gap-4
                    rounded-2xl
                    border
                    border-border/70
                    bg-card
                    p-3
                    transition-all
                    duration-200
                    hover:border-primary/30
                    hover:shadow-md
                  "
                >
                  {/* PRODUCT IMAGE */}
                  <div
                    className="
                      relative
                      h-20
                      w-20
                      flex-shrink-0
                      overflow-hidden
                      rounded-xl
                      bg-muted
                    "
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-foreground/40">
                        No image
                      </div>
                    )}
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-semibold text-foreground">
                        {item.name}
                      </h4>

                      <p className="mt-1 text-xs text-foreground/50">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 text-sm font-bold text-primary">
                        {item.price.toLocaleString()} FCFA
                      </p>
                    </div>

                    {/* DELETE */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="
                        flex
                        h-9
                        w-9
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        text-red-500
                        transition-all
                        duration-200
                        hover:bg-red-500/10
                        hover:text-red-600
                        active:scale-95
                      "
                    >
                      <FaTrash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===================================================
            FOOTER
        ==================================================== */}
        {cart.length > 0 && (
          <div
            className="
              border-t
              border-border
              bg-muted/20
              px-6
              py-5
            "
          >
            {/* TOTAL */}
            <div className="mb-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/55">Subtotal</span>

                <span className="text-sm font-semibold text-foreground">
                  {getCartTotal().toLocaleString()} FCFA
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-foreground">
                  Total
                </span>

                <span className="text-xl font-bold text-primary">
                  {getCartTotal().toLocaleString()} FCFA
                </span>
              </div>
            </div>

            {/* CHECKOUT */}
            <button
              type="button"
              onClick={handleCheckout}
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-primary
                px-5
                py-3.5
                text-sm
                font-bold
                text-primary-foreground
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-primary-hover
                hover:shadow-lg
                hover:shadow-primary/20
                active:translate-y-0
                active:scale-[0.98]
              "
            >
              Proceed to Checkout
              <FaArrowRight
                className="
                  h-3.5
                  w-3.5
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>

            {/* CLEAR CART */}
            <button
              type="button"
              onClick={clearCart}
              className="
                mt-3
                w-full
                rounded-xl
                px-4
                py-2.5
                text-xs
                font-semibold
                text-foreground/50
                transition-colors
                duration-200
                hover:bg-muted
                hover:text-red-500
              "
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
