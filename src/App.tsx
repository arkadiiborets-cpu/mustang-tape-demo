import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShopProvider } from "@/store/shop";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import WhiteLabel from "./pages/WhiteLabel";
import Contacts from "./pages/Contacts";
import Delivery from "./pages/Delivery";
import Payment from "./pages/Payment";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ShopProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:categorySlug" element={<Catalog />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/pro-vyrobnyctvo" element={<About />} />
              <Route path="/opt-i-white-label" element={<WhiteLabel />} />
              <Route path="/kontakty" element={<Contacts />} />
              <Route path="/dostavka" element={<Delivery />} />
              <Route path="/oplata" element={<Payment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </ShopProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
