import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Catalog - Luxury Gifts from NYC, Paris, & Beyond | CuratedCities",
  description: "Browse our entire collection of 75+ iconic local treasures. Filter by region, city, or category to find the perfect luxury gift. Authentic items delivered worldwide.",
  keywords: ["luxury gift catalog", "global gifts", "NYC gifts", "Paris gifts", "London gifts", "Tokyo gifts", "Shanghai gifts"],
};

export default function GiftsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
