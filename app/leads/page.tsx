'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import KanbanBoard from '@/components/KanbanBoard';

interface Lead {
  id: string;
  business_name: string;
  city: string;
  grid_score_before: number;
  status: 'NEW' | 'AUDITED' | 'CONTACTED' | 'CALLED' | 'CLOSED' | 'CLIENT';
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/extract', { method: 'POST' });
        const data = await res.json();
        setLeads(data.leads || []);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-[#FF6B00] hover:text-white transition mb-4 inline-block">← Volver</Link>
          <h1 className="text-5xl font-black uppercase tracking-widest text-white mb-2">
            LEADS PIPELINE
          </h1>
          <p className="text-[#CCCCCC]">
            {leads.length} leads extraídos • Drag & drop para mover en el pipeline
          </p>
        </div>

        {/* Kanban */}
        {loading ? (
          <div className="text-center text-[#CCCCCC] py-12">Cargando leads...</div>
        ) : (
          <KanbanBoard leads={leads} />
        )}
      </div>
    </div>
  );
}
