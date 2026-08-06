import ProductHero from "@/components/ProductHero";
import Story from "@/components/Story";
import TastingProfile from "@/components/TastingProfile";
import Serve from "@/components/Serve";
import AboutUs from "@/components/AboutUs";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Джин .G Genebra",
  description:
    "Крафтовий сухий джин з власного пшеничного дистиляту потрійної дистиляції. Хвойні ноти ялівцю та свіжий цитрусовий післясмак.",
  image: "https://www.ukrcraft.com.ua/bottle_cutout.png",
  brand: {
    "@type": "Brand",
    name: ".G",
  },
  offers: {
    "@type": "Offer",
    url: "https://www.ukrcraft.com.ua/#order",
    priceCurrency: "UAH",
    price: "400",
    availability: "https://schema.org/InStock",
  },
};

export default function Home() {
  return (
    <div id="top" className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
      </div>
      <Footer />
    </div>
  );
}
