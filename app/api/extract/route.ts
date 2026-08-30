import { NextRequest, NextResponse } from 'next/server';

const mockBusinesses = [
  'Brickell Realty', 'Lamborghini Miami', 'Wynwood Boutique', 'South Beach Dental',
  'Miami Fitness Club', 'Aventura Spa', 'Coral Gables Café', 'Homestead Auto',
  'Doral Kitchen', 'Palmetto Clinic', 'Sunny Isles Resort', 'Kendall Pharmacy',
  'Tamiami Tech', 'Westchester Salon', 'Cutler Bay Repairs', 'Buena Vista Bar',
  'Allapattah Studios', 'Midtown Gallery', 'Design District Atelier', 'Edgewater Marina',
];

const mockCategories = ['Realty', 'Automotive', 'Beauty', 'Dental', 'Restaurant', 'Fitness', 'Pharmacy', 'Technology'];
const mockCities = ['Miami', 'Brickell', 'Wynwood', 'Coral Gables', 'Homestead', 'Aventura', 'Doral'];

export async function POST(request: NextRequest) {
  try {
    const leads = Array.from({ length: 50 }).map((_, i) => ({
      id: `lead-${Date.now()}-${i}`,
      business_name: mockBusinesses[Math.floor(Math.random() * mockBusinesses.length)],
      category: mockCategories[Math.floor(Math.random() * mockCategories.length)],
      city: mockCities[Math.floor(Math.random() * mockCities.length)],
      phone: `+1${Math.random().toString().slice(2, 12)}`,
      whatsapp: `+1${Math.random().toString().slice(2, 12)}`,
      google_place_id: `place-${Math.random().toString(36).slice(2, 11)}`,
      rating: (Math.random() * 4 + 1).toFixed(1),
      review_count: Math.floor(Math.random() * 500 + 10),
      level: ['BASE', 'LUXE', 'ATELIER'][Math.floor(Math.random() * 3)],
      status: 'NEW',
      grid_score_before: Math.floor(Math.random() * 20 + 3),
      created_at: new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      count: leads.length,
      leads,
      message: `Extrados ${leads.length} leads de Miami`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Extraction failed' }, { status: 500 });
  }
}
