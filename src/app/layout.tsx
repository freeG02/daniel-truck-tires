import type { Metadata } from "next";
import { Big_Shoulders, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/CartDrawer";
import { site } from "@/data/site";

// Fonts matched to gmining.com: Big Shoulders (headings) + Noto Sans (body).
// Google consolidated "Big Shoulders Display" into the "Big Shoulders" family.
const bigShoulders = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "es_DO",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  description: site.description,
  email: site.email,
  address: site.address,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bigShoulders.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SmoothScroll />
        <PageLoader />
        <CartProvider>
          <Header />
          {/* Content sits above the fixed footer (which has a negative z-index) and
              reserves space for it, so the footer is revealed underneath as the
              page scrolls up (parallax). main stays non-positioned so the intro
              can still lift the left rail above the loader tiles. */}
          <main
            className="flex-1 bg-background"
            style={{ marginBottom: "var(--footer-h, 0px)" }}
          >
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
