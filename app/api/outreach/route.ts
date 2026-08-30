import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { lead_id, template_type } = await request.json();

    const templates = {
      email: {
        subject: 'Tu ranking competitivo en Miami',
        body: 'Hola, descubrimos dónde estás perdiendo contra tu competencia. Grid de 25 puntos adjunto.',
      },
      whatsapp: {
        message: '🎯 Descubrimos tu ranking en Miami: Score 6/25. Hablemos en 15 min?',
      },
      loom: {
        url: 'https://loom.com/share/guau-machine-audit',
        title: 'Tu auditoría GUAU Machine',
      },
    };

    const outreach = {
      id: `outreach-${Date.now()}`,
      lead_id,
      type: template_type || 'email',
      template: templates[template_type as keyof typeof templates] || templates.email,
      status: 'SCHEDULED',
      sent_at: null,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      outreach,
      message: `Secuencia de ataque programada: ${template_type}`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Outreach failed' }, { status: 500 });
  }
}
