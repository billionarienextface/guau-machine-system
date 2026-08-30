'use client';

import { useState } from 'react';
import Link from 'next/link';

type ModuleId = 'extraction' | 'audit' | 'attack' | 'fulfillment' | 'duplication';

const endpoints: Record<ModuleId, { url: string; method: string; body?: object }> = {
  extraction: { url: '/api/extract', method: 'POST' },
  audit: { url: '/api/audit', method: 'POST', body: { lead_id: 'demo-lead-001' } },
  attack: { url: '/api/outreach', method: 'POST', body: { lead_id: 'demo-lead-001', template_type: 'email' } },
  fulfillment: { url: '/api/reports', method: 'GET' },
  duplication: { url: '/api/reports', method: 'GET' },
};

export default function MachinePage() {
  const [activeTab, setActiveTab] = useState<ModuleId>('extraction');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const modules: { id: ModuleId; label: string; icon: string }[] = [
    { id: 'extraction', label: 'EXTRACCIÓN', icon: '🎯' },
    { id: 'audit', label: 'AUDITORÍA', icon: '📍' },
    { id: 'attack', label: 'ATAQUE', icon: '⚡' },
    { id: 'fulfillment', label: 'FULFILLMENT', icon: '📦' },
    { id: 'duplication', label: 'DUPLICACIÓN', icon: '🔁' },
  ];

  const runModule = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const config = endpoints[activeTab];
      const res = await fetch(config.url, {
        method: config.method,
        headers: config.body ? { 'Content-Type': 'application/json' } : undefined,
        body: config.body ? JSON.stringify(config.body) : undefined,
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (id: ModuleId) => {
    setActiveTab(id);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-[#FF6B00] hover:text-white transition mb-6 inline-block">← Volver</Link>
          <h1 className="text-6xl font-black uppercase tracking-widest text-white mb-4">
            LA MÁQUINA
            <span className="text-[#FF6B00]"> — 5 MÓDULOS</span>
          </h1>
          <p className="text-[#CCCCCC] text-lg max-w-2xl">
            Sistema operativo completo. Extrae 50 leads/día, audita, contacta, cierra, replica.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-[#FF6B00]/20 pb-6">
          {modules.map(m => (
            <button
              key={m.id}
              onClick={() => switchTab(m.id)}
              className={`px-6 py-3 uppercase font-black tracking-widest text-sm transition ${
                activeTab === m.id
                  ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]'
                  : 'text-[#CCCCCC] hover:text-white'
              }`}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-[#141414] border border-[#FF6B00]/20 rounded-lg p-8">
              <h2 className="text-3xl font-black uppercase text-white mb-4">
                {modules.find(m => m.id === activeTab)?.label}
              </h2>
              <p className="text-[#CCCCCC] mb-6 leading-relaxed">
                {activeTab === 'extraction' && 'Extrae 50 leads/día de tu ciudad. Outscraper + Google Places API. Filtrado por nicho y nivel.'}
                {activeTab === 'audit' && 'Grid de 25 puntos. Mapas automáticos. Loom scripts. Muestra competencia en video.'}
                {activeTab === 'attack' && 'Secuencia 3 toques: email (mapa) → WhatsApp (48h) → Loom (día 3). Pipeline NEW→CLOSED.'}
                {activeTab === 'fulfillment' && 'Reporte semanal automático. Antes/después PNG + Loom + email. El cliente ve resultados.'}
                {activeTab === 'duplication' && 'Día 21: caso de éxito + Instagram post. Día 30: pide referido. Referido = 1 mes gratis.'}
              </p>
              <button
                onClick={runModule}
                disabled={loading}
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 disabled:opacity-50 disabled:cursor-not-allowed text-[#0A0A0A] font-black px-6 py-3 rounded transition"
              >
                {loading ? 'EJECUTANDO...' : `EJECUTAR ${modules.find(m => m.id === activeTab)?.label?.toUpperCase()}`}
              </button>

              {/* Result */}
              {error && (
                <div className="mt-6 bg-red-950/40 border border-red-500/40 rounded p-4 text-red-400 text-sm">
                  Error: {error}
                </div>
              )}
              {result && (
                <div className="mt-6 bg-[#0A0A0A] border border-green-500/40 rounded p-4">
                  <p className="text-green-500 text-sm font-bold mb-2">✓ {String(result.message ?? 'Ejecutado correctamente')}</p>
                  <pre className="text-[#CCCCCC] text-xs overflow-x-auto max-h-64 overflow-y-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="bg-[#141414] border border-[#FF6B00]/20 rounded-lg p-6">
              <p className="text-[#CCCCCC] text-sm mb-2">EFICIENCIA</p>
              <p className="text-4xl font-black text-[#FF6B00]">50</p>
              <p className="text-white text-sm">Leads/día</p>
            </div>
            <div className="bg-[#141414] border border-[#FF6B00]/20 rounded-lg p-6">
              <p className="text-[#CCCCCC] text-sm mb-2">CONVERSIÓN</p>
              <p className="text-4xl font-black text-green-500">82%</p>
              <p className="text-white text-sm">Lead → Contact</p>
            </div>
            <div className="bg-[#141414] border border-[#FF6B00]/20 rounded-lg p-6">
              <p className="text-[#CCCCCC] text-sm mb-2">MRR POTENCIAL</p>
              <p className="text-4xl font-black text-[#FF0000]">$26K</p>
              <p className="text-white text-sm">Con 3 personas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
