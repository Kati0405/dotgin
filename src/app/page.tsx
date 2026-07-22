import ProductHero from "@/components/ProductHero";
import Story from "@/components/Story";
import TastingProfile from "@/components/TastingProfile";
import Serve from "@/components/Serve";
import AboutUs from "@/components/AboutUs";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";

export default function Home() {
  return (
    <div id="top" className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <ProductHero />
        <WaveDivider fill="var(--background-alt)" />
        <Story />
        <WaveDivider fill="var(--background)" />
        <TastingProfile />
        <WaveDivider fill="var(--background-alt)" />
        <Serve />
        <WaveDivider fill="var(--background)" />
        <AboutUs />
        <WaveDivider fill="var(--background-alt)" />
        <OrderForm />
        <WaveDivider fill="var(--accent)" />
      </div>
      <Footer />
    </div>
  );
}
