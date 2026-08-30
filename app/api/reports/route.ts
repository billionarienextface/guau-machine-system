import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const report = {
      id: `report-${Date.now()}`,
      week: new Date().toISOString().slice(0, 10),
      stats: {
        new_leads: 47,
        audits_completed: 42,
        contacted: 35,
        calls_scheduled: 12,
        closed: 3,
        mrr_added: 447 * 3, // BASE * 3
      },
      clients: {
        total: 44, // 30 BASE + 12 LUXE + 2 ATELIER
        base: 30,
        luxe: 12,
        atelier: 2,
      },
      mrr_total: 30 * 147 + 12 * 797 + 2 * 5000, // $26,481
      efficiency: {
        extraction_speed: '50 leads/día',
        audit_speed: '6 puntos/hora',
        contact_rate: '82%',
      },
      next_actions: [
        'Revisar 5 leads CALLED para cierre',
        'Generar reporte de referidos',
        'Auditar prospecto Aventura Spa',
      ],
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Report generation failed' }, { status: 500 });
  }
}
