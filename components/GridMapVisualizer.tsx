'use client';

interface GridPoint {
  lat: number;
  lng: number;
  rank: number;
  business?: string;
}

interface GridMapVisualizerProps {
  grid_data: {
    points: GridPoint[];
    score: number;
    total: number;
  };
}

export default function GridMapVisualizer({ grid_data }: GridMapVisualizerProps) {
  const { points, score, total } = grid_data;
  const topThreeCount = points.filter(p => p.rank <= 3).length;

  return (
    <div className="bg-[#0A0A0A] border border-[#FF6B00]/20 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2">Grid de 25 Puntos</h3>
        <p className="text-[#CCCCCC]">{topThreeCount}/25 en Top 3 • Score: {score}/{total}</p>
      </div>

      {/* 5x5 Grid */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {Array.from({ length: 25 }).map((_, i) => {
          const point = points[i];
          const isTopThree = point && point.rank <= 3;
          const color = isTopThree ? 'bg-green-500' : 'bg-red-500';

          return (
            <div
              key={i}
              className={`w-12 h-12 rounded flex items-center justify-center text-white text-xs font-bold ${color}/80 hover:${color}/100 transition`}
              title={point?.business || `Punto ${i + 1}`}
            >
              {point?.rank || '-'}
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <p className="text-[#CCCCCC]">Top 3</p>
          <p className="text-green-500 font-bold text-lg">{topThreeCount}</p>
        </div>
        <div>
          <p className="text-[#CCCCCC]">Score</p>
          <p className="text-[#FF6B00] font-bold text-lg">{score}</p>
        </div>
        <div>
          <p className="text-[#CCCCCC]">Total</p>
          <p className="text-white font-bold text-lg">{total}</p>
        </div>
      </div>
    </div>
  );
}
