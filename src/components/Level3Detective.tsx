import React, { useState, useEffect } from 'react';
import { Level3Exercise } from '../types/algebra';
import { ColoredExpression } from './ColoredExpression';
import { toSuperscript } from '../utils/algebra';

interface Level3DetectiveProps {
  exercise: Level3Exercise;
  colored: boolean;
  giant: boolean;
  currentStep: number;
}

export const Level3Detective: React.FC<Level3DetectiveProps> = ({
  exercise,
  colored,
  giant,
  currentStep,
}) => {
  // Station 1: Selected GCD
  const [userGCD, setUserGCD] = useState<number | null>(null);
  // Station 2: Selected common variables
  const [selectedVars, setSelectedVars] = useState<string[]>([]);
  // Station 3: Selected exponents for each var
  const [selectedExponents, setSelectedExponents] = useState<Record<string, number>>({});
  // Division step index: 0, 1, 2, ...
  const [divisionIndex, setDivisionIndex] = useState<number>(0);

  // Reset when exercise changes
  useEffect(() => {
    setUserGCD(null);
    setSelectedVars([]);
    setSelectedExponents({});
    setDivisionIndex(0);
  }, [exercise.id]);

  const isStation1Complete = userGCD === exercise.gcd;
  const isStation2Complete =
    exercise.commonVariables.every((v) => selectedVars.includes(v)) &&
    selectedVars.length === exercise.commonVariables.length;
  const isStation3Complete =
    isStation2Complete &&
    exercise.commonVariables.every(
      (v) => selectedExponents[v] === exercise.variableMinExponents[v]
    );

  const isFactorCommonReady = isStation1Complete && isStation2Complete && isStation3Complete;

  const handleToggleVar = (varName: string) => {
    if (selectedVars.includes(varName)) {
      setSelectedVars(selectedVars.filter((v) => v !== varName));
    } else {
      setSelectedVars([...selectedVars, varName]);
    }
  };

  const handleSelectExponent = (varName: string, exp: number) => {
    setSelectedExponents({ ...selectedExponents, [varName]: exp });
  };

  const handleRevealAllStations = () => {
    setUserGCD(exercise.gcd);
    setSelectedVars(exercise.commonVariables);
    setSelectedExponents(exercise.variableMinExponents);
    setDivisionIndex(exercise.quotients.length);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Level Header */}
      <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#0D2B52] text-xs font-black uppercase tracking-wider mb-1">
            <span>Nivel 3</span>
            <span>•</span>
            <span>El Detective de Componentes</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0D2B52]">
            Extracción Sistemática del Factor Común Monomio
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Analiza por separado: Coeficientes (MCD) → Literales comunes → Menores exponentes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRevealAllStations}
          className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
        >
          🔍 Resolver Estaciones con la Clase
        </button>
      </div>

      {/* Main Display Expression */}
      <div className="bg-white border-3 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md text-center">
        <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block mb-3">
          Polinomio en Inspección
        </span>
        <div className="flex justify-center">
          <ColoredExpression
            terms={exercise.terms}
            colored={colored}
            giant={giant}
            interactive={true}
          />
        </div>
      </div>

      {/* 3 Inspection Stations in responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Estación 1: Coeficientes */}
        <div
          className={`p-5 rounded-3xl border-2 transition-all ${
            isStation1Complete
              ? 'bg-blue-50/90 border-blue-400 ring-2 ring-blue-300 shadow-md'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
              Estación 1
            </span>
            {isStation1Complete ? (
              <span className="text-xs font-bold text-emerald-600">✓ Completada</span>
            ) : (
              <span className="text-xs text-slate-400">Inspeccionando</span>
            )}
          </div>
          <h3 className="font-extrabold text-slate-900 text-base mb-1">
            Coeficientes y MCD
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Observa los números:{' '}
            <strong className="text-blue-700 font-mono text-sm">
              {exercise.coefficients.join(', ')}
            </strong>
            . ¿Cuál es su Máximo Común Divisor (MCD)?
          </p>

          <div className="flex flex-wrap gap-2">
            {exercise.gcdOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setUserGCD(opt)}
                className={`flex-1 min-w-[50px] py-2 rounded-xl font-mono text-lg font-bold border transition-all cursor-pointer ${
                  userGCD === opt
                    ? opt === exercise.gcd
                      ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                      : 'bg-red-50 text-red-600 border-red-300'
                    : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {userGCD && userGCD !== exercise.gcd && (
            <p className="text-xs text-red-600 mt-2 font-medium">
              Ese divisor no es el máximo común. ¡Prueba otro!
            </p>
          )}
        </div>

        {/* Estación 2: Literales Comunes */}
        <div
          className={`p-5 rounded-3xl border-2 transition-all ${
            isStation2Complete
              ? 'bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-300 shadow-md'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
              Estación 2
            </span>
            {isStation2Complete ? (
              <span className="text-xs font-bold text-emerald-600">✓ Completada</span>
            ) : (
              <span className="text-xs text-slate-400">Inspeccionando</span>
            )}
          </div>
          <h3 className="font-extrabold text-slate-900 text-base mb-1">
            Literales Comunes
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Haz clic en las letras que aparecen en <strong>TODOS</strong> los términos sin excepción:
          </p>

          <div className="flex flex-wrap gap-2">
            {exercise.allVariables.map((v) => {
              const isSelected = selectedVars.includes(v);
              const isCommon = exercise.commonVariables.includes(v);
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleToggleVar(v)}
                  className={`flex-1 py-2 px-3 rounded-xl font-mono text-lg font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span>{v}</span>
                  <span className="text-xs">{isSelected ? '✓' : ''}</span>
                </button>
              );
            })}
          </div>
          {selectedVars.length > 0 && !isStation2Complete && (
            <p className="text-xs text-amber-700 mt-2 font-medium">
              Verifica que estén seleccionadas todas y únicamente las que están en cada término.
            </p>
          )}
        </div>

        {/* Estación 3: Menores Exponentes */}
        <div
          className={`p-5 rounded-3xl border-2 transition-all ${
            isStation3Complete
              ? 'bg-purple-50/90 border-purple-400 ring-2 ring-purple-300 shadow-md'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full">
              Estación 3
            </span>
            {isStation3Complete ? (
              <span className="text-xs font-bold text-emerald-600">✓ Completada</span>
            ) : (
              <span className="text-xs text-slate-400">Inspeccionando</span>
            )}
          </div>
          <h3 className="font-extrabold text-slate-900 text-base mb-1">
            Menores Exponentes
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Elige la potencia más pequeña de cada letra común:
          </p>

          <div className="space-y-2">
            {exercise.commonVariables.map((v) => {
              const currentExp = selectedExponents[v];
              return (
                <div key={v} className="flex items-center justify-between gap-2 p-1.5 bg-slate-50 rounded-xl">
                  <span className="font-mono font-bold text-emerald-800 text-sm ml-2">
                    Variable {v}:
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((expNum) => (
                      <button
                        key={expNum}
                        type="button"
                        onClick={() => handleSelectExponent(v, expNum)}
                        className={`w-7 h-7 rounded-lg text-xs font-mono font-bold cursor-pointer ${
                          currentExp === expNum
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                        }`}
                      >
                        {toSuperscript(expNum) || expNum}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Assembly of the Common Factor */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center">
        <span className="text-xs font-black uppercase tracking-widest text-amber-300 block mb-2">
          {isFactorCommonReady ? '✨ Factor Común Ensamblado con Éxito ✨' : 'Ensamblaje del Factor Común Monomio'}
        </span>

        <div className="text-4xl sm:text-6xl font-mono font-black my-3">
          {isFactorCommonReady ? (
            <span className="bg-amber-400 text-slate-950 px-6 py-2 rounded-2xl shadow-lg ring-4 ring-amber-300/40 inline-block animate-scale-up">
              {exercise.commonFactorString}
            </span>
          ) : (
            <span className="text-slate-400 font-light border-2 border-dashed border-slate-600 px-6 py-2 rounded-2xl inline-block">
              [ Completa las 3 estaciones ]
            </span>
          )}
        </div>

        {/* Division step-by-step module */}
        {isFactorCommonReady && (
          <div className="mt-8 pt-6 border-t border-indigo-700/60 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-indigo-200 uppercase tracking-wide">
                División de cada término entre {exercise.commonFactorString}:
              </span>
              <button
                type="button"
                onClick={() =>
                  setDivisionIndex((prev) =>
                    Math.min(prev + 1, exercise.quotients.length)
                  )
                }
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm cursor-pointer shadow-sm"
              >
                {divisionIndex >= exercise.quotients.length
                  ? 'Términos Divididos'
                  : 'Dividir Siguiente Término ➡️'}
              </button>
            </div>

            <div className="space-y-2">
              {exercise.quotients.slice(0, divisionIndex).map((q, qIdx) => (
                <div
                  key={qIdx}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center justify-between text-base sm:text-lg font-mono animate-fade-in"
                >
                  <span className="text-slate-200">
                    ({q.original}) ÷ <strong className="text-amber-300">{exercise.commonFactorString}</strong>
                  </span>
                  <span className="text-amber-400 font-bold">
                    = {q.divided}
                  </span>
                </div>
              ))}
            </div>

            {/* Final Factorization Result */}
            {divisionIndex >= exercise.quotients.length && (
              <div className="mt-6 p-4 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-200 animate-scale-up">
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-300 block mb-1">
                  Resultado Final Factorizado
                </span>
                <span className="text-2xl sm:text-4xl font-mono font-black text-white">
                  {exercise.factoredExpression}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Guided Steps / Clues */}
      {currentStep > 0 && (
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-5 shadow-sm text-left">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-amber-950 text-base sm:text-lg flex items-center gap-2">
              <span>🧠</span> Pista del Detective (Paso {currentStep} de {exercise.steps.length})
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
