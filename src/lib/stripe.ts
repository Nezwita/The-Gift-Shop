import Stripe from 'stripe';

// Initialize Stripe server-side client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-03-31.chocolatey' as any,
  typescript: true,
});

// Product price mapping — these are placeholder IDs until marketer finalizes the "Launch 15" list
// Once Stripe products/prices are created in the dashboard, replace these values
export const PLACEHOLDER_PRICE_IDS: Record<string, string> = {
  // New York
  'Statue of Liberty Replica': 'price_placeholder_ny_liberty',
  'New York Style Bagels Gift Box': 'price_placeholder_ny_bagels',
  'Broadway Show Ticket Voucher': 'price_placeholder_ny_broadway',
  'Manhattan Skyline Art Print': 'price_placeholder_ny_skyline',
  'Greenwich Village Leather Journal': 'price_placeholder_ny_journal',
  // Paris
  'Ladurée Macaron Collection': 'price_placeholder_paris_macaron',
  'Eiffel Tower Miniature': 'price_placeholder_paris_eiffel',
  'Parisian Perfume Sampler': 'price_placeholder_paris_perfume',
  'Seine River Painting Set': 'price_placeholder_paris_seine',
  'French Beret & Scarf Set': 'price_placeholder_paris_beret',
  // Tokyo
  'Matcha Tea Ceremony Set': 'price_placeholder_tokyo_matcha',
  'Japanese Calligraphy Kit': 'price_placeholder_tokyo_calligraphy',
  'Vintage Kimono Fabric': 'price_placeholder_tokyo_kimono',
  'Tokyo Skyline Woodblock Print': 'price_placeholder_tokyo_print',
  'Sakura Sake Set': 'price_placeholder_tokyo_sake',
  // San Francisco
  'Napa Valley Wine Gift Set': 'price_placeholder_sf_wine',
  // London
  'Fortnum & Mason Tea Selection': 'price_placeholder_london_tea',
  // Rome
  'Roman Leather Passport Holder': 'price_placeholder_rome_leather',
  'Murano Glass Vase': 'price_placeholder_rome_murano',
  'Tuscan Olive Oil Collection': 'price_placeholder_rome_olive',
  // Shanghai
  'Ming Dynasty Style Tea Set': 'price_placeholder_shanghai_tea',
  'Silk Embroidery Art': 'price_placeholder_shanghai_silk',
};

/**
 * Get a price ID for a given product name.
 * Falls back to a generic placeholder if not found.
 */
export function getPriceId(productName: string): string {
  return PLACEHOLDER_PRICE_IDS[productName] || 'price_placeholder_generic';
}

/**
 * Format amount for Stripe (convert dollars to cents)
 */
export function formatAmountForStripe(amountInDollars: number): number {
  return Math.round(amountInDollars * 100);
}
