export const dynamic = "force-dynamic";
import Home from "../src/containters/Home/Home";
import { options } from "../src/shared/shared";

export function generateMetadata() {
  const social = options[0].social;
  return {
    title: social.title,
    description: social.lead,
    alternates: { canonical: "/" },
    openGraph: {
      locale: "sr-RS",
      type: "website",
      title: social.title,
      siteName: "crkveni-kalendar.net",
      images: [{ url: social.pics, width: 640, height: 480 }],
      description: social.lead,
    },
  };
}

export default function HomePage() {
  return <Home />;
}
