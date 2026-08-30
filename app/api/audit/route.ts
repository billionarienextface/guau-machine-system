import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { lead_id } = await request.json();

    // Generate fake grid data: 25 points with random ranks
    const points = Array.from({ length: 25 }).map((_, i) => ({
      lat: 25.76 + Math.random() * 0.05,
      lng: -80.19 + Math.random() * 0.05,
      rank: Math.floor(Math.random() * 20 + 1),
      index: i,
    }));

    const topThreeCount = points.filter(p => p.rank <= 3).length;
    const score = topThreeCount;
    const total = 25;

    const audit = {
      id: `audit-${Date.now()}`,
      lead_id,
      grid_data: {
        points,
        score,
        total,
      },
      map_png_url: `https://placeholder.com/600x600?text=Grid+${score}`,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      audit,
      message: `Auditoría completada: ${score}/25 en Top 3`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Audit failed' }, { status: 500 });
  }
}
