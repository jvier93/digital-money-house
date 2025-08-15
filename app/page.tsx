import HeroSection from "@/app/components/layout/hero-section";
import ServicesSection from "@/app/components/layout/service-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-[url('/images/landing/landing-background-mobile.jpg')] bg-cover bg-center bg-no-repeat md:justify-between md:bg-[url('/images/landing/landing-background-tablet.png')] xl:bg-[url('/images/landing/landing-background-desktop.png')]">
      <HeroSection />
      <ServicesSection />
    </main>
  );
}
