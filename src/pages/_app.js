import NoInternetConnection from "@/components/NoConnection";
import "../../public/styles/globals.min.css";
import { ModalContextProvider } from "@/context/modalContext";
import { ThemeProvider } from "@/context/themeContext";
import { CartProvider } from "@/context/cartContext";
import { ProductProvider } from "@/context/productContext";



export default function App({ Component, pageProps }) {
  return (
    <>
      <NoInternetConnection>
        <ThemeProvider>
          <ModalContextProvider>
            <ProductProvider>
              <CartProvider>
                <Component {...pageProps} />
              </CartProvider>
            </ProductProvider>
          </ModalContextProvider>
        </ThemeProvider>
      </NoInternetConnection>
    </>
  )
}
