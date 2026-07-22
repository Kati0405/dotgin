import ProductHero from "@/components/ProductHero";
import Story from "@/components/Story";
import TastingProfile from "@/components/TastingProfile";
import Serve from "@/components/Serve";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
        <ProductHero />
        <Story />
        <TastingProfile />
        <Serve />
        <OrderForm />
      </div>
      <Footer />
    </div>
  );
}
