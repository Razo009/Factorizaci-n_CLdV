import React from 'react';

interface PedagogicalLegendProps {
  colored: boolean;
  activeFilter: 'sign' | 'coefficient' | 'variable' | 'exponent' | null;
  onSelectFilter: (filter: 'sign' | 'coefficient' | 'variable' | 'exponent' | null) => void;
}

export const PedagogicalLegend: React.FC<PedagogicalLegendProps> = ({
  colored,
  activeFilter,
  onSelectFilter,
}) => {
  const items = [
    {
      id: 'sign' as const,
      name: 'Signo (+ / −)',
      colorBg: 'bg-red-50 border-red-300 text-[#DC2626]',
      badgeBg: 'bg-[#DC2626] text-white',
      desc: 'Separa términos y define positivo o negativo',
      example: '+ / −',
    },
    {
      id: 'coefficient' as const,
      name: 'Coeficiente',
      colorBg: 'bg-blue-50 border-blue-300 text-[#2563EB]',
      badgeBg: 'bg-[#2563EB] text-white',
      desc: 'Número grande que multiplica a las letras',
      example: '6, 12, 4',
    },
    {
      id: 'variable' as const,
      name: 'Literal (Variable)',
      colorBg: 'bg-emerald-50 border-emerald-300 text-[#059669]',
      badgeBg: 'bg-[#059669] text-white',
      desc: 'Letra o cantidad desconocida',
      example: 'x, y, a, b',
    },
    {
      id: 'exponent' as const,
      name: 'Exponente (Potencia)',
      colorBg: 'bg-purple-50 border-purple-300 text-[#7C3AED]',
      badgeBg: 'bg-[#7C3AED] text-white',
      desc: 'Número pequeño superior: veces que se multiplica',
      example: '², ³, ⁴',
    },
  ];

  return (
    <div
      className="w-full bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-3 shadow-sm"
      role="region"
      aria-label="Código de color pedagógico"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Código de Color Pedagógico
          </span>
          {!colored && (
            <span className="text-[11px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
              Colores desactivados (Activa el botón &ldquo;Colorear&rdquo;)
            </span>
          )}
        </div>
        <div className="text-xs text-slate-600 flex items-center gap-1.5">
          <span>Toca una tarjeta para aislar ese componente:</span>
          {activeFilter && (
            <button
              type="button"
              onClick={() => onSelectFilter(null)}
              className="font-bold text-blue-700 hover:underline px-1.5 py-0.5 rounded bg-blue-50 text-[11px]"
            >
              Mostrar todos ✕
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {items.map((item) => {
          const isSelected = activeFilter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectFilter(isSelected ? null : item.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                colored ? item.colorBg : 'bg-slate-50 border-slate-200 text-slate-600'
              } ${
                isSelected
                  ? 'ring-3 ring-blue-500 shadow-md scale-[1.02]'
                  : 'hover:border-slate-400 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-extrabold text-sm tracking-tight">{item.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-md font-mono font-bold ${
                    colored ? item.badgeBg : 'bg-slate-300 text-slate-800'
                  }`}
                >
                  {item.example}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-tight">{item.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
