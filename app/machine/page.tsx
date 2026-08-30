'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MachinePage() {
  const [activeTab, setActiveTab] = useState('extraction');

  const modules = [
    { id: 'extraction', label: 'EXTRACCIÓN', icon: '🎯' },
    { id: 'audit', label: 'AUDITORÍA', icon: '📍' },
    { id: 'attack', label: 'ATAQUE', icon: '⚡' },
    { id: 'fulfillment', label: 'FULFILLMENT', icon: '📦' },
    { id: 'duplication', label: 'DUPLICACIÓN', icon: '🔁' },
  ];

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
              onClick={() => setActiveTab(m.id)}
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
              <button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-[#0A0A0A] font-black px-6 py-3 rounded transition">
                EJECUTAR {modules.find(m => m.id === activeTab)?.label?.toUpperCase()}
              </button>
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
