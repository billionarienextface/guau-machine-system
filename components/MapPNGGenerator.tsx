'use client';

import { useRef } from 'react';

interface GridPoint {
  lat: number;
  lng: number;
  rank: number;
}

interface MapPNGGeneratorProps {
  grid_data: {
    points: GridPoint[];
    score: number;
    total: number;
  };
  businessName: string;
}

export default function MapPNGGenerator({ grid_data, businessName }: MapPNGGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const exportPNG = () => {
    if (!canvasRef.current) return;

    const link = document.createElement('a');
    link.href = canvasRef.current.toDataURL('image/png');
    link.download = `guau-grid-${businessName}-${Date.now()}.png`;
    link.click();
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 600;
    const height = 600;
    canvas.width = width;
    canvas.height = height;

    // Background
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, width, height);

    // Grid
    const gridSize = 5;
    const cellSize = (width - 60) / gridSize;
    const startX = 30;
    const startY = 30;

    grid_data.points.forEach((point, idx) => {
      const row = Math.floor(idx / gridSize);
      const col = idx % gridSize;
      const x = startX + col * cellSize;
      const y = startY + row * cellSize;

      // Cell background
      ctx.fillStyle = point.rank <= 3 ? '#22C55E' : '#EF4444';
      ctx.fillRect(x, y, cellSize - 5, cellSize - 5);

      // Rank text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(point.rank), x + cellSize / 2 - 2.5, y + cellSize / 2 - 2.5);
    });

    // Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('GUAU Machine Audit', 20, 550);

    // Score
    ctx.fillStyle = '#FF6B00';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`Score: ${grid_data.score}/${grid_data.total}`, 20, 580);

    // Logo placeholder (GUAU en esquina)
    ctx.fillStyle = '#FF0000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('GUAU', width - 20, height - 20);
  };

  return (
    <div className="bg-[#0A0A0A] border border-[#FF6B00]/20 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">Mapa Grid PNG</h3>
        <p className="text-[#CCCCCC] text-sm">{businessName}</p>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full max-w-md bg-black rounded mb-4 hidden"
        onLoad={drawCanvas}
      />

      <div className="w-full max-w-md bg-black rounded mb-4 overflow-hidden">
        <canvas
          className="w-full"
          width={600}
          height={600}
          ref={(el) => {
            if (el && canvasRef.current === null) {
              canvasRef.current = el;
              drawCanvas();
            }
          }}
        />
      </div>

      <button
        onClick={() => {
          drawCanvas();
          setTimeout(exportPNG, 100);
        }}
        className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-[#0A0A0A] font-bold py-2 px-4 rounded transition"
      >
        Descargar PNG
      </button>
    </div>
  );
}
