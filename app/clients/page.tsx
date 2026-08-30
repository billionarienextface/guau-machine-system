'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Report {
  clients: { base: number; luxe: number; atelier: number };
  mrr_total: number;
  stats: Record<string, number>;
}

export default function ClientsPage() {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch('/api/reports');
        const data = await res.json();
        setReport(data.report);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-[#FF6B00] hover:text-white transition mb-4 inline-block">← Volver</Link>
          <h1 className="text-5xl font-black uppercase tracking-widest text-white mb-2">
            MRR DASHBOARD
          </h1>
        </div>

        {loading || !report ? (
          <div className="text-center text-[#CCCCCC] py-12">Cargando reporte...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total MRR */}
            <div className="bg-[#141414] border-2 border-[#FF0000] rounded-lg p-8">
              <p className="text-[#CCCCCC] text-sm uppercase tracking-widest mb-2">MRR Total</p>
              <p className="text-5xl font-black text-[#FF0000]">${(report.mrr_total / 1000).toFixed(1)}K</p>
            </div>

            {/* BASE */}
            <div className="bg-[#141414] border border-[#FF6B00]/20 rounded-lg p-8">
              <p className="text-[#CCCCCC] text-sm uppercase tracking-widest mb-2">Base ($147/mes)</p>
              <p className="text-4xl font-black text-white">{report.clients.base}</p>
              <p className="text-[#FF6B00] text-sm mt-2">${(report.clients.base * 147).toLocaleString()}</p>
            </div>

            {/* LUXE */}
            <div className="bg-[#141414] border border-[#FF6B00]/20 rounded-lg p-8">
              <p className="text-[#CCCCCC] text-sm uppercase tracking-widest mb-2">Luxe ($797/mes)</p>
              <p className="text-4xl font-black text-white">{report.clients.luxe}</p>
              <p className="text-[#FF6B00] text-sm mt-2">${(report.clients.luxe * 797).toLocaleString()}</p>
            </div>

            {/* ATELIER */}
            <div className="bg-[#141414] border border-[#FF6B00]/20 rounded-lg p-8">
              <p className="text-[#CCCCCC] text-sm uppercase tracking-widest mb-2">Atelier ($5K/mes)</p>
              <p className="text-4xl font-black text-white">{report.clients.atelier}</p>
              <p className="text-[#FF6B00] text-sm mt-2">${(report.clients.atelier * 5000).toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Action */}
        <div className="text-center">
          <Link href="/machine" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-[#0A0A0A] font-black px-8 py-4 rounded text-lg uppercase tracking-widest transition">
            EJECUTAR MÁQUINA
          </Link>
        </div>
      </div>
    </div>
  );
}
