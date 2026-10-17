import React, { useState } from 'react';
import { TermData } from '../types/algebra';
import { toSuperscript } from '../utils/algebra';

interface ColoredExpressionProps {
  terms: TermData[];
  colored: boolean;
  giant?: boolean;
  interactive?: boolean;
  activeFilter?: 'sign' | 'coefficient' | 'variable' | 'exponent' | null;
  onComponentClick?: (componentType: string, value: string, explanation: string) => void;
}

export const ColoredExpression: React.FC<ColoredExpressionProps> = ({
  terms,
  colored,
  giant = false,
  interactive = true,
  activeFilter = null,
  onComponentClick,
}) => {
  const [hoveredInfo, setHoveredInfo] = useState<{
    type: string;
    label: string;
    value: string;
    explanation: string;
  } | null>(null);

  const handleItemClick = (type: string, label: string, value: string, explanation: string) => {
    setHoveredInfo({ type, label, value, explanation });
    if (onComponentClick) {
      onComponentClick(type, value, explanation);
    }
  };

  const getSignClass = () => {
    if (!colored) return 'text-slate-800';
    if (activeFilter && activeFilter !== 'sign') return 'opacity-30 text-slate-400';
    return 'text-[#DC2626] font-black scale-105';
  };

  const getCoeffClass = () => {
    if (!colored) return 'text-slate-900';
    if (activeFilter && activeFilter !== 'coefficient') return 'opacity-30 text-slate-400';
    return 'text-[#2563EB] font-black drop-shadow-sm';
  };

  const getVarClass = () => {
    if (!colored) return 'text-slate-900 italic';
    if (activeFilter && activeFilter !== 'variable') return 'opacity-30 text-slate-400 italic';
    return 'text-[#059669] font-bold italic';
  };

  const getExpClass = () => {
    if (!colored) return 'text-slate-800';
    if (activeFilter && activeFilter !== 'exponent') return 'opacity-30 text-slate-400';
    return 'text-[#7C3AED] font-black';
  };

  const textSizeClass = giant ? 'text-5xl sm:text-6xl md:text-7xl font-mono' : 'text-3xl sm:text-4xl md:text-5xl font-mono';

  return (
    <div className="relative inline-flex flex-col items-center">
      <div
        className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-3 py-3 px-6 rounded-2xl bg-white border-2 border-slate-300 shadow-sm select-none ${textSizeClass}`}
        role="region"
        aria-label="Expresión algebraica interactiva"
      >
        {terms.map((term, index) => {
          const isFirst = index === 0;
          const showSign = !isFirst || term.sign === '-';
          const signSymbol = term.sign === '-' ? '−' : '+';

          return (
            <div
              key={term.id}
              className="inline-flex items-center group relative px-2 py-1 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {/* Sign */}
              {showSign && (
                <button
                  type="button"
                  onClick={() =>
                    interactive &&
                    handleItemClick(
                      'sign',
                      'Signo de operación',
                      signSymbol,
                      term.sign === '+'
                        ? 'Signo positivo (+): Suma una cantidad o separa un término nuevo.'
                        : 'Signo negativo (−): Resta una cantidad e indica valor negativo del término.'
                    )
                  }
                  className={`mx-1.5 cursor-pointer transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-red-400 rounded ${getSignClass()}`}
                  title="Clic para inspeccionar el signo"
                  aria-label={`Signo ${term.sign === '+' ? 'positivo' : 'negativo'}`}
                >
                  {signSymbol}
                </button>
              )}

              {/* Coefficient */}
              <button
                type="button"
                onClick={() =>
                  interactive &&
                  handleItemClick(
                    'coefficient',
                    'Coeficiente Numérico',
                    String(term.coefficient),
                    `Coeficiente ${term.coefficient}: Es el factor numérico que multiplica a la parte literal. Indica cuántas veces se tiene esa cantidad.`
                  )
                }
                className={`cursor-pointer transition-transform hover:scale-115 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${getCoeffClass()}`}
                title="Clic para inspeccionar el coeficiente"
                aria-label={`Coeficiente numérico ${term.coefficient}`}
              >
                {term.coefficient === 1 && term.variables.length > 0 ? (colored ? '1' : '') : term.coefficient}
              </button>

              {/* Variables and Exponents */}
              {term.variables.map((v, vIdx) => (
                <span key={vIdx} className="inline-flex items-baseline">
                  <button
                    type="button"
                    onClick={() =>
                      interactive &&
                      handleItemClick(
                        'variable',
                        'Literal o Variable',
                        v.name,
                        `Literal "${v.name}": Letra que representa un número o valor desconocido que puede variar.`
                      )
                    }
                    className={`cursor-pointer transition-transform hover:scale-115 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded ${getVarClass()}`}
                    title="Clic para inspeccionar la variable"
                    aria-label={`Variable literal ${v.name}`}
                  >
                    {v.name}
                  </button>

                  {/* Exponent */}
                  {v.exponent !== 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        interactive &&
                        handleItemClick(
                          'exponent',
                          'Exponente o Potencia',
                          String(v.exponent),
                          `Exponente ${v.exponent}: Indica cuántas veces se multiplica la base "${v.name}" por sí misma (${v.name}^${v.exponent}).`
                        )
                      }
                      className={`text-[0.6em] relative -top-3 cursor-pointer transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded ${getExpClass()}`}
                      title="Clic para inspeccionar el exponente"
                      aria-label={`Exponente potencia ${v.exponent}`}
                    >
                      {toSuperscript(v.exponent)}
                    </button>
                  ) : colored ? (
                    <button
                      type="button"
                      onClick={() =>
                        interactive &&
                        handleItemClick(
                          'exponent',
                          'Exponente Implícito',
                          '1',
                          `Exponente implícito 1: Cuando una variable no tiene exponente visible, su exponente siempre es 1 (${v.name}¹).`
                        )
                      }
                      className="text-[0.55em] relative -top-3 text-[#7C3AED] opacity-75 font-bold cursor-pointer"
                      title="Exponente implícito 1"
                      aria-label="Exponente 1"
                    >
                      ¹
                    </button>
                  ) : null}
                </span>
              ))}
            </div>
          );
        })}
      </div>

      {/* Floating educational inspector note */}
      {hoveredInfo && (
        <div className="mt-3 w-full max-w-xl animate-fade-in bg-slate-900 text-white rounded-xl p-3 shadow-lg flex items-start gap-3 border border-slate-700">
          <div className="p-2 rounded-lg bg-slate-800 text-amber-400 text-xl font-bold">
            🔍
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                {hoveredInfo.label}: <strong className="text-white text-sm">{hoveredInfo.value}</strong>
              </span>
              <button
                type="button"
                onClick={() => setHoveredInfo(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded bg-slate-800"
              >
                Cerrar ✕
              </button>
            </div>
            <p className="text-sm mt-1 text-slate-100">{hoveredInfo.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};
