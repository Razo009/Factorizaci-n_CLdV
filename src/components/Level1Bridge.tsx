import React, { useState } from 'react';
import { Level1Exercise } from '../types/algebra';
import { ColoredExpression } from './ColoredExpression';
import { toSuperscript } from '../utils/algebra';

interface Level1BridgeProps {
  exercise: Level1Exercise;
  colored: boolean;
  giant: boolean;
  currentStep: number;
  activeFilter: 'sign' | 'coefficient' | 'variable' | 'exponent' | null;
}

export const Level1Bridge: React.FC<Level1BridgeProps> = ({
  exercise,
  colored,
  giant,
  currentStep,
  activeFilter,
}) => {
  // Mode: 'sum' (separated blocks) vs 'factors' (bracket multiplication)
  const [viewMode, setViewMode] = useState<'sum' | 'factors'>('sum');
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Level Header / Banner */}
      <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0D2B52] text-xs font-black uppercase tracking-wider mb-1">
            <span>Nivel 1</span>
            <span>•</span>
            <span>El Puente Conceptual</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0D2B52]">
            ¿Términos o Factores? La Transformación Fundamental
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Toca cada elemento de la expresión para ver su nombre algebraico o activa el interruptor de modo.
          </p>
        </div>

        {/* Big Switch: Suma vs Factores */}
        <div className="flex items-center p-1.5 bg-slate-100 border-2 border-slate-300 rounded-2xl shadow-inner">
          <button
            type="button"
            onClick={() => setViewMode('sum')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              viewMode === 'sum'
                ? 'bg-[#0D2B52] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>➕</span>
            <span>Modo Suma de Términos</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('factors')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              viewMode === 'factors'
                ? 'bg-purple-700 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>✖️</span>
            <span>Modo Multiplicación (Factores)</span>
          </button>
        </div>
      </div>

      {/* Main Expression Showcase on Blackboard Canvas */}
      <div className="bg-gradient-to-b from-white to-slate-50 border-3 border-slate-300 rounded-3xl p-6 sm:p-10 shadow-lg text-center relative overflow-hidden">
        <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block mb-3">
          Expresión Algebraica Proyectada
        </span>

        {viewMode === 'sum' ? (
          <div>
            <div className="flex justify-center mb-6">
              <ColoredExpression
                terms={exercise.terms}
                colored={colored}
                giant={giant}
                interactive={true}
                activeFilter={activeFilter}
              />
            </div>

            {/* Visual Physical Blocks Representation */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                Visualización como Bloques Físicos Sumados
              </span>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {exercise.terms.map((t, idx) => (
                  <React.Fragment key={t.id}>
                    {idx > 0 && (
                      <span className="text-3xl sm:text-4xl font-black text-red-600">
                        {t.sign === '+' ? '+' : '−'}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedTermId(selectedTermId === t.id ? null : t.id)}
                      className={`p-4 sm:p-6 rounded-2xl border-3 transition-all cursor-pointer flex flex-col items-center ${
                        selectedTermId === t.id
                          ? 'border-blue-600 bg-blue-50 shadow-lg scale-105 ring-4 ring-blue-200'
                          : 'border-slate-300 bg-white hover:border-slate-400 hover:shadow-md'
                      }`}
                    >
                      <span className="text-xs uppercase font-bold text-slate-400 mb-1">
                        Término {idx + 1}
                      </span>
                      <span className="text-3xl sm:text-4xl font-mono font-black text-[#0D2B52]">
                        {t.coefficient}
                        {t.variables.map((v) => `${v.name}${toSuperscript(v.exponent)}`).join('')}
                      </span>
                      <span className="text-xs text-slate-500 mt-2 font-medium">
                        {t.variables.length > 0 ? `${t.variables.map((v) => v.name).join(', ')} con potencias` : 'Constante'}
                      </span>
                    </button>
                  </React.Fragment>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-4 max-w-lg mx-auto">
                En una suma, los bloques están <strong>separados</strong> por signos + o −. Cada uno es una cantidad independiente.
              </p>
            </div>
          </div>
        ) : (
          /* Factored View */
          <div className="py-4 animate-scale-up">
            <span className="text-xs font-extrabold px-3 py-1 bg-purple-100 text-purple-900 rounded-full inline-block mb-4">
              ✨ Expresión Reempaquetada en Factores ✨
            </span>

            <div className="text-5xl sm:text-6xl md:text-7xl font-mono font-black text-purple-950 my-6 tracking-tight flex items-center justify-center flex-wrap gap-2">
              <span className="px-4 py-2 bg-purple-100 border-2 border-purple-300 rounded-2xl text-purple-800 shadow-sm">
                {exercise.commonFactor}
              </span>
              <span className="text-slate-400 font-light">•</span>
              <span className="px-4 py-2 bg-indigo-50 border-2 border-indigo-200 rounded-2xl text-indigo-900 shadow-sm">
                ({exercise.parenthesisFactor})
              </span>
            </div>

            {/* Factoring Definition Box */}
            <div className="max-w-2xl mx-auto bg-purple-50/80 border-2 border-purple-200 rounded-2xl p-4 text-left">
              <h4 className="font-bold text-purple-900 text-base flex items-center gap-2">
                <span>💡</span> ¿Qué significa realmente factorizar?
              </h4>
              <p className="text-sm text-purple-800 mt-1 leading-relaxed">
                <strong>Factorizar es transformar una suma de términos en una multiplicación de factores equivalentes.</strong>
                <br />
                En lugar de calcular <span className="font-mono font-bold">{exercise.expression}</span> por separado, hemos extraído el divisor común <span className="font-mono font-bold">{exercise.commonFactor}</span> para multiplicar a <span className="font-mono font-bold">({exercise.parenthesisFactor})</span>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Guided Steps / Clues Section (Controlling class rhythm) */}
      {currentStep > 0 && (
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-5 shadow-sm text-left">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-amber-950 text-base sm:text-lg flex items-center gap-2">
              <span>🧠</span> Pista de Razonamiento Guiado (Paso {currentStep} de {exercise.steps.length})
            </h3>
            <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2.5 py-1 rounded-full">
              Docente en vivo
            </span>
          </div>

          <div className="space-y-2">
            {exercise.steps.slice(0, currentStep).map((stepText, sIdx) => (
              <div
                key={sIdx}
                className="p-3 bg-white border border-amber-200 rounded-xl shadow-xs text-sm sm:text-base font-medium text-slate-800 flex items-start gap-2.5"
              >
                <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {sIdx + 1}
                </span>
                <span>{stepText}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
