import React, { useState, useEffect } from 'react';
import { Level2Exercise } from '../types/algebra';

interface Level2AreaArchitectProps {
  exercise: Level2Exercise;
  colored: boolean;
  giant: boolean;
  currentStep: number;
}

export const Level2AreaArchitect: React.FC<Level2AreaArchitectProps> = ({
  exercise,
  colored,
  giant,
  currentStep,
}) => {
  // Height input (can be selected or typed)
  const [selectedHeight, setSelectedHeight] = useState<string>('');
  const [typedHeight, setTypedHeight] = useState<string>('');
  // User widths for each section
  const [userWidths, setUserWidths] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Reset inputs when exercise changes
  useEffect(() => {
    setSelectedHeight('');
    setTypedHeight('');
    setUserWidths({});
    setIsSuccess(false);
  }, [exercise.id]);

  const activeHeight = typedHeight.trim() || selectedHeight;

  // Check if everything is solved
  const checkAnswer = () => {
    const isHeightCorrect =
      activeHeight.toLowerCase().replace(/\s+/g, '') ===
      exercise.height.toLowerCase().replace(/\s+/g, '');

    const areWidthsCorrect = exercise.sections.every(
      (sec) =>
        (userWidths[sec.id] || '').toLowerCase().replace(/\s+/g, '') ===
        sec.widthValue.toLowerCase().replace(/\s+/g, '')
    );

    if (isHeightCorrect && areWidthsCorrect) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  const handleRevealAll = () => {
    setSelectedHeight(exercise.height);
    const newWidths: Record<string, string> = {};
    exercise.sections.forEach((sec) => {
      newWidths[sec.id] = sec.widthValue;
    });
    setUserWidths(newWidths);
    setIsSuccess(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Level Header */}
      <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0D2B52] text-xs font-black uppercase tracking-wider mb-1">
            <span>Nivel 2</span>
            <span>•</span>
            <span>El Arquitecto de Áreas</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0D2B52]">
            Factor Común como Altura y Base de un Rectángulo
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Área Total = Altura (Factor Común) × Base Total. ¿Cuáles son las dimensiones?
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={checkAnswer}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>✔️</span>
            <span>Verificar Dimensiones</span>
          </button>
          <button
            type="button"
            onClick={handleRevealAll}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
            title="Revelar todas las dimensiones para discusión guiada"
          >
            Revelar
          </button>
        </div>
      </div>

      {/* Geometric Interactive Blueprint */}
      <div className="bg-[#FAFAF7] border-3 border-slate-300 rounded-3xl p-6 sm:p-10 shadow-lg text-center relative overflow-hidden">
        {/* Sum of areas expression badge */}
        <div className="mb-6 inline-block bg-white border border-slate-300 px-5 py-2 rounded-2xl shadow-sm">
          <span className="text-xs uppercase font-extrabold text-slate-400 block mb-0.5">
            Área total como suma de partes:
          </span>
          <span className="text-3xl sm:text-4xl font-mono font-bold text-[#0D2B52]">
            {exercise.expression}
          </span>
        </div>

        {/* Blueprint container: Grid with left height and top base inputs */}
        <div className="max-w-4xl mx-auto my-4 flex items-center justify-center gap-4 sm:gap-6">
          {/* Left: Height Dimension Control (Factor Común) */}
          <div className="flex flex-col items-center shrink-0">
            <span className="text-xs font-black uppercase tracking-wider text-blue-800 mb-2">
              Altura Común
            </span>

            {/* Height input box */}
            <div
              className={`w-24 sm:w-28 h-28 sm:h-36 rounded-2xl border-3 flex flex-col items-center justify-center p-2 transition-all ${
                isSuccess
                  ? 'bg-blue-100 border-blue-500 ring-4 ring-blue-300'
                  : 'bg-white border-blue-400 border-dashed shadow-md'
              }`}
            >
              <span className="text-xs text-slate-400 mb-1 font-semibold">Altura =</span>
              <input
                type="text"
                value={activeHeight}
                onChange={(e) => {
                  setTypedHeight(e.target.value);
                  setSelectedHeight('');
                }}
                placeholder="[ ? ]"
                className="w-full text-center text-2xl sm:text-3xl font-mono font-black text-blue-700 bg-transparent focus:outline-none"
                aria-label="Altura común o factor común"
              />
            </div>

            {/* Suggested options for teacher/students */}
            <div className="mt-3 flex flex-wrap justify-center gap-1 max-w-[120px]">
              {exercise.heightOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setSelectedHeight(opt);
                    setTypedHeight('');
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                    activeHeight === opt
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Sections with Top Widths and Internal Areas */}
          <div className="flex-1 max-w-2xl">
            {/* Top base widths */}
            <div className="flex items-center gap-3 mb-2 px-1">
              {exercise.sections.map((sec, idx) => (
                <div key={sec.id} className="flex-1 flex flex-col items-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">
                    Base {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={userWidths[sec.id] || ''}
                    onChange={(e) =>
                      setUserWidths({ ...userWidths, [sec.id]: e.target.value })
                    }
                    placeholder="[ ? ]"
                    className="w-full max-w-[120px] py-1.5 text-center text-xl sm:text-2xl font-mono font-bold text-slate-800 bg-white border-2 border-dashed border-slate-400 rounded-xl focus:border-emerald-500 focus:outline-none shadow-xs"
                    aria-label={`Base para sección ${sec.termString}`}
                  />
                </div>
              ))}
            </div>

            {/* Partitioned Rectangle Canvas */}
            <div className="flex items-stretch gap-2 h-28 sm:h-36 rounded-2xl border-4 border-[#0D2B52] bg-white p-2 shadow-xl">
              {exercise.sections.map((sec) => (
                <div
                  key={sec.id}
                  className={`flex-1 rounded-xl border-2 flex flex-col items-center justify-center p-3 transition-all ${
                    sec.colorBg
                  } ${isSuccess ? 'scale-[1.01] shadow-inner' : ''}`}
                >
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    Área Sección
                  </span>
                  <span className="text-2xl sm:text-4xl font-mono font-black text-slate-900 mt-1">
                    {sec.termString}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Equality Banner */}
        {isSuccess ? (
          <div className="mt-8 animate-scale-up p-5 rounded-2xl bg-emerald-100 border-3 border-emerald-400 text-emerald-950 shadow-md">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 block mb-1">
              🎉 ¡Áreas y Dimensiones Comprobadas! 🎉
            </span>
            <div className="text-2xl sm:text-4xl md:text-5xl font-mono font-black tracking-tight flex items-center justify-center flex-wrap gap-2 my-2">
              <span className="text-blue-900 bg-white px-3 py-1 rounded-xl border border-blue-200">
                {exercise.expression}
              </span>
              <span className="text-emerald-700 font-extrabold">=</span>
              <span className="text-purple-900 bg-white px-3 py-1 rounded-xl border border-purple-200">
                {exercise.factoredExpression}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-xl mx-auto mt-2">
              Área total como suma de recuadros es exactamente igual al producto de la altura por la base: <strong>{exercise.height} × ({exercise.totalBase})</strong>.
            </p>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-500 mt-4">
            Pide al grupo que proponga la <strong>Altura Común</strong> y la <strong>Base</strong> de cada sección. Presiona &ldquo;Verificar Dimensiones&rdquo; para validar.
          </p>
        )}
      </div>

      {/* Guided Steps / Clues */}
      {currentStep > 0 && (
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-5 shadow-sm text-left">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-amber-950 text-base sm:text-lg flex items-center gap-2">
              <span>🧠</span> Pista del Arquitecto (Paso {currentStep} de {exercise.steps.length})
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
