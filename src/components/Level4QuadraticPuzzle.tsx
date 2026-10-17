import React, { useState, useEffect } from 'react';
import { Level4Exercise, FactorPair } from '../types/algebra';

interface Level4QuadraticPuzzleProps {
  exercise: Level4Exercise;
  colored: boolean;
  giant: boolean;
  currentStep: number;
}

export const Level4QuadraticPuzzle: React.FC<Level4QuadraticPuzzleProps> = ({
  exercise,
  colored,
  giant,
  currentStep,
}) => {
  const [selectedPair, setSelectedPair] = useState<FactorPair | null>(null);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  // Reset on exercise change
  useEffect(() => {
    setSelectedPair(null);
    setIsSolved(false);
  }, [exercise.id]);

  const handleSelectPair = (pair: FactorPair) => {
    setSelectedPair(pair);
    if (pair.isCorrect) {
      setIsSolved(true);
    } else {
      setIsSolved(false);
    }
  };

  const handleRevealSolution = () => {
    const correct = exercise.factorPairs.find((p) => p.isCorrect);
    if (correct) {
      setSelectedPair(correct);
      setIsSolved(true);
    }
  };

  const activeM = selectedPair ? selectedPair.m : null;
  const activeN = selectedPair ? selectedPair.n : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-[#0D2B52] text-xs font-black uppercase tracking-wider mb-1">
            <span>Nivel 4</span>
            <span>•</span>
            <span>El Rompecabezas Cuadrático</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0D2B52]">
            Factorización de Trinomios con Cuadrícula 2×2
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Modelo geométrico para expresiones de la forma <strong className="font-mono">x² + bx + c</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRevealSolution}
          className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
        >
          🧩 Revelar Par Ganador
        </button>
      </div>

      {/* Main Trinomial Display */}
      <div className="bg-white border-3 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md text-center">
        <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block mb-2">
          Trinomio Cuadrático a Factorizar
        </span>
        <div className="text-4xl sm:text-6xl md:text-7xl font-mono font-black text-[#0D2B52] my-2">
          {colored ? (
            <span>
              <span className="text-slate-900">x²</span>{' '}
              <span className="text-[#DC2626] font-black">+</span>{' '}
              <span className="text-[#2563EB]">{exercise.b}</span>
              <span className="text-[#059669] italic">x</span>{' '}
              <span className="text-[#DC2626] font-black">+</span>{' '}
              <span className="text-[#2563EB]">{exercise.c}</span>
            </span>
          ) : (
            exercise.expression
          )}
        </div>
      </div>

      {/* 2x2 Grid + Factor Pair Explorer in 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Factor Pair Explorer (5 cols) */}
        <div className="lg:col-span-5 bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="text-xs font-black uppercase text-amber-900 block mb-1">
              🔎 El Acertijo del Trinomio:
            </span>
            <p className="text-sm text-amber-950 font-medium">
              Buscamos dos números <strong className="font-mono text-base">m</strong> y{' '}
              <strong className="font-mono text-base">n</strong> tales que:
            </p>
            <div className="mt-2 space-y-1 font-mono text-sm bg-white p-2.5 rounded-xl border border-amber-200">
              <div className="flex justify-between">
                <span className="text-slate-600">Multiplicados den c:</span>
                <strong className="text-blue-700">m × n = {exercise.c}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Sumados den b:</span>
                <strong className="text-emerald-700">m + n = {exercise.b}</strong>
              </div>
            </div>
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Prueba de Pares de Factores de {exercise.c}:
          </span>

          <div className="space-y-2">
            {exercise.factorPairs.map((pair, pIdx) => {
              const isSelected =
                selectedPair?.m === pair.m && selectedPair?.n === pair.n;

              return (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => handleSelectPair(pair)}
                  className={`w-full p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? pair.isCorrect
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                        : 'bg-rose-50 border-rose-300'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-mono font-bold text-slate-700 text-sm">
                      #{pIdx + 1}
                    </span>
                    <div>
                      <div className="font-mono font-bold text-base text-slate-900">
                        {pair.m} y {pair.n}
                      </div>
                      <div className="text-xs text-slate-500">
                        {pair.m} × {pair.n} = {pair.product}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-semibold block text-slate-500">
                      Suma: {pair.m} + {pair.n} =
                    </span>
                    <span
                      className={`font-mono font-bold text-sm px-2 py-0.5 rounded-md ${
                        pair.sum === exercise.b
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {pair.sum} {pair.sum === exercise.b ? '✔ (¡Da ' + exercise.b + '!)' : '✗'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: 2x2 Geometric Grid Visualization (7 cols) */}
        <div className="lg:col-span-7 bg-[#FAFAF7] border-3 border-slate-300 rounded-3xl p-6 shadow-sm flex flex-col items-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-4 block">
            Cuadrícula Geométrica 2×2 de Áreas
          </span>

          {/* Exterior top dimension: (x + n) */}
          <div className="w-full max-w-md flex justify-center mb-2">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-purple-100 text-purple-900 font-mono font-bold text-base sm:text-lg border border-purple-200">
              <span>Lado Superior = x + {activeN !== null ? activeN : 'n [ ? ]'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full max-w-md">
            {/* Exterior left dimension: (x + m) */}
            <div className="flex flex-col items-center justify-center px-2 py-3 rounded-xl bg-indigo-100 text-indigo-900 font-mono font-bold text-sm sm:text-base border border-indigo-200 writing-mode-vertical">
              <span>Lado Izquierdo = x + {activeM !== null ? activeM : 'm [ ? ]'}</span>
            </div>

            {/* 2x2 Grid Boxes */}
            <div className="flex-1 grid grid-cols-2 gap-2 bg-[#0D2B52] p-2.5 rounded-2xl shadow-xl">
              {/* Box (0,0): Top-Left = x² */}
              <div className="h-28 sm:h-36 rounded-xl bg-blue-100 border-2 border-blue-300 flex flex-col items-center justify-center p-2 text-center">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Esquina Sup-Izq</span>
                <span className="text-3xl sm:text-4xl font-mono font-black text-blue-900 mt-1">
                  x²
                </span>
                <span className="text-[10px] text-blue-600 mt-1">x · x</span>
              </div>

              {/* Box (0,1): Top-Right = nx */}
              <div
                className={`h-28 sm:h-36 rounded-xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all ${
                  activeN !== null
                    ? isSolved
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-white/80 border-slate-300 border-dashed text-slate-400'
                }`}
              >
                <span className="text-[10px] font-bold uppercase">Esquina Sup-Der</span>
                <span className="text-3xl sm:text-4xl font-mono font-black mt-1">
                  {activeN !== null ? `${activeN}x` : '[ ? ]'}
                </span>
                <span className="text-[10px] mt-1">
                  {activeN !== null ? `${activeN} · x` : 'n · x'}
                </span>
              </div>

              {/* Box (1,0): Bottom-Left = mx */}
              <div
                className={`h-28 sm:h-36 rounded-xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all ${
                  activeM !== null
                    ? isSolved
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-white/80 border-slate-300 border-dashed text-slate-400'
                }`}
              >
                <span className="text-[10px] font-bold uppercase">Esquina Inf-Izq</span>
                <span className="text-3xl sm:text-4xl font-mono font-black mt-1">
                  {activeM !== null ? `${activeM}x` : '[ ? ]'}
                </span>
                <span className="text-[10px] mt-1">
                  {activeM !== null ? `${activeM} · x` : 'm · x'}
                </span>
              </div>

              {/* Box (1,1): Bottom-Right = Constant c */}
              <div className="h-28 sm:h-36 rounded-xl bg-purple-100 border-2 border-purple-300 flex flex-col items-center justify-center p-2 text-center">
                <span className="text-[10px] font-bold text-purple-700 uppercase">Esquina Inf-Der</span>
                <span className="text-3xl sm:text-4xl font-mono font-black text-purple-900 mt-1">
                  {exercise.c}
                </span>
                <span className="text-[10px] text-purple-600 mt-1">
                  {activeM !== null && activeN !== null ? `${activeM} · ${activeN}` : 'm · n'}
                </span>
              </div>
            </div>
          </div>

          {/* Solved Banner */}
          {isSolved && (
            <div className="w-full mt-6 animate-scale-up p-5 rounded-2xl bg-emerald-100 border-3 border-emerald-400 text-emerald-950 text-center shadow-md">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-800 block mb-1">
                🎉 ¡Rompecabezas Cuadrático Resuelto! 🎉
              </span>
              <div className="text-3xl sm:text-5xl font-mono font-black text-emerald-950 my-2">
                {exercise.factoredExpression}
              </div>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                Los términos cruzados <strong>{activeM}x + {activeN}x = {exercise.b}x</strong> y los números <strong>{activeM} × {activeN} = {exercise.c}</strong>.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Guided Steps / Clues */}
      {currentStep > 0 && (
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-5 shadow-sm text-left">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-amber-950 text-base sm:text-lg flex items-center gap-2">
              <span>🧠</span> Pista del Rompecabezas (Paso {currentStep} de {exercise.steps.length})
            </h3>
            <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2.5 py-1 rounded-full">
              Pizarrón Docente
            </span>
          </div>

          <div className="space-y-2">
            {exercise.steps.slice(0, currentStep).map((stepText, sIdx) => (
              <div
                key={sIdx}
                className="p-3 bg-white border border-amber-200 rounded-xl text-sm sm:text-base font-medium text-slate-800 flex items-start gap-2.5"
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
