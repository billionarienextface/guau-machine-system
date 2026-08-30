'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';

interface Lead {
  id: string;
  business_name: string;
  city: string;
  grid_score_before: number;
  status: 'NEW' | 'AUDITED' | 'CONTACTED' | 'CALLED' | 'CLOSED' | 'CLIENT';
}

const columns = ['NEW', 'AUDITED', 'CONTACTED', 'CALLED', 'CLOSED'];
const statusColors: Record<string, string> = {
  NEW: 'border-l-4 border-l-blue-500',
  AUDITED: 'border-l-4 border-l-purple-500',
  CONTACTED: 'border-l-4 border-l-yellow-500',
  CALLED: 'border-l-4 border-l-orange-500',
  CLOSED: 'border-l-4 border-l-green-500',
};

export default function KanbanBoard({ leads }: { leads: Lead[] }) {
  const [items, setItems] = useState<Record<string, Lead[]>>({});

  useEffect(() => {
    const grouped: Record<string, Lead[]> = {};
    columns.forEach(col => (grouped[col] = []));
    leads.forEach(lead => {
      if (grouped[lead.status]) {
        grouped[lead.status].push(lead);
      }
    });
    setItems(grouped);
  }, [leads]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    setItems(prev => {
      const newItems = { ...prev };
      const [movedLead] = newItems[sourceCol].splice(source.index, 1);
      newItems[destCol].splice(destination.index, 0, movedLead);
      return newItems;
    });

    // TODO: Llamar API para actualizar status en Supabase
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-5 gap-4">
        {columns.map(status => (
          <Droppable key={status} droppableId={status}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`bg-[#141414] border border-[#FF6B00]/20 rounded-lg p-4 min-h-[600px] ${
                  snapshot.isDraggingOver ? 'bg-[#1A1A1A]' : ''
                }`}
              >
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">{status}</h3>
                <div className="space-y-2">
                  {items[status]?.map((lead, index) => (
                    <Draggable key={lead.id} draggableId={lead.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-[#0A0A0A] p-3 rounded border ${statusColors[status]} ${
                            snapshot.isDragging ? 'shadow-lg shadow-[#FF6B00]/50' : ''
                          } cursor-move hover:border-[#FF6B00]/50 transition`}
                        >
                          <p className="font-bold text-white text-sm">{lead.business_name}</p>
                          <p className="text-[#CCCCCC] text-xs">{lead.city}</p>
                          <p className="text-[#FF6B00] text-xs mt-1">Score: {lead.grid_score_before}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
