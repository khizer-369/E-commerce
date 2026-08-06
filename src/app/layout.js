import "./globals.css";
import Provider from "@/components/Provider";
import { Cormorant_Garamond } from "next/font/google";
import CartContext from "@/context/CartContext";
import Cart from "@/components/Cart";
import { Toaster } from "react-hot-toast";

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartContext>
          <Provider>
            <Toaster />
            <div className="relative">
              {children}
              <Cart />
            </div>
          </Provider>
        </CartContext>
      </body>
    </html>
  );
}
