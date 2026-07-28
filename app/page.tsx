import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Showcase } from "@/components/landing/showcase";
import { FAQ } from "@/components/landing/faq";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Background Glow Effects */}
      <div
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full blur-[180px]"
        style={{
          background:
            "color-mix(in srgb, var(--primary) 12%, transparent)",
        }}
      />

      <div
        className="absolute right-0 top-[500px] h-[500px] w-[500px] rounded-full blur-[180px]"
        style={{
          background:
            "color-mix(in srgb, var(--primary) 8%, transparent)",
        }}
      />

      {/* Landing Page */}
      <Navbar />

      <Hero />

      <TrustedBy />

      <Features />

      <HowItWorks />

      <Showcase />

      <FAQ />

      <Testimonials />

      <CTA />

      <Footer />
    </main>
  );
}