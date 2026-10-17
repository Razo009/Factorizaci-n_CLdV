import React, { useState } from 'react';

interface MirrorTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: number;
  originalExpression: string;
  factoredExpression: string;
}

export const MirrorTestModal: React.FC<MirrorTestModalProps> = ({
  isOpen,
  onClose,
  level,
  originalExpression,
  factoredExpression,
}) => {
  const [animationStep, setAnimationStep] = useState<number>(0);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mirror-modal-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-400 max-w-3xl w-full p-6 md:p-8 text-center relative overflow-hidden">
        {/* Academic top header badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-widest mb-3">
          <span>✨</span>
          <span>Prueba del Espejo Matemática</span>
          <span>✨</span>
        </div>

        <h2 id="mirror-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#0D2B52]">
          ¿Por qué sabemos que la factorización es correcta?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl mx-auto">
          La <strong>factorización</strong> y la <strong>multiplicación algebraica</strong> son operaciones inversas.
          Si multiplicamos los factores, debemos regresar con exactitud a la expresión original.
        </p>

        {/* Big Side by Side Comparison */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Factored side */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
              1. Expresión Factorizada (Producto)
            </span>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-blue-900 my-3">
              {factoredExpression}
            </div>
            <p className="text-xs text-blue-700">
              Forma compacta de factores que se multiplican entre sí.
            </p>
          </div>

          {/* Original side */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              2. Expresión Inicial (Suma de Términos)
            </span>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-900 my-3">
              {originalExpression}
            </div>
            <p className="text-xs text-emerald-700">
              Forma expandida en términos separados por suma o resta.
            </p>
          </div>
        </div>

        {/* Step-by-step Multiplication Visualizer */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left mb-6">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
            <h3 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2">
              <span className="text-xl">🔄</span> Desglose de la Propiedad Distributiva
            </h3>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
              Paso {animationStep} de 3
            </span>
          </div>

          <div className="space-y-3 font-mono text-base sm:text-lg text-slate-800">
            {animationStep >= 1 && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between animate-fade-in">
                <span className="text-slate-600 font-sans text-sm font-semibold">
                  Multiplicar primer término interior:
                </span>
                <span className="font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg">
                  Factor exterior × 1er término
                </span>
              </div>
            )}

            {animationStep >= 2 && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between animate-fade-in">
                <span className="text-slate-600 font-sans text-sm font-semibold">
                  Multiplicar segundo término interior:
                </span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                  Factor exterior × 2do término
                </span>
              </div>
            )}

            {animationStep >= 3 && (
              <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-xl flex items-center justify-between animate-fade-in">
                <div className="font-sans text-sm text-emerald-900">
                  <strong>¡Comprobación exitosa!</strong> Al sumar los productos parciales:
                </div>
                <div className="text-2xl font-bold text-emerald-900 font-mono">
                  = {originalExpression} ✔
                </div>
              </div>
            )}

            {animationStep === 0 && (
              <div className="py-4 text-center font-sans text-slate-500 text-sm">
                Presiona el botón verde <strong>&ldquo;Avanzar Multiplicación&rdquo;</strong> para observar la distribución paso a paso en el pizarrón.
              </div>
            )}
          </div>

          {/* Stepper controls */}
          <div className="mt-4 flex flex-wrap gap-2 justify-end">
            {animationStep < 3 ? (
              <button
                type="button"
                onClick={() => setAnimationStep((prev) => Math.min(prev + 1, 3))}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Avanzar Multiplicación</span>
                <span>▶</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAnimationStep(0)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
              >
                Reiniciar Demostración ↺
              </button>
            )}
          </div>
        </div>

        {/* Modal actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0D2B52] hover:bg-blue-900 text-white font-bold rounded-xl text-base shadow-sm transition-all cursor-pointer"
          >
            Entendido, volver a la clase
          </button>
        </div>
      </div>
    </div>
  );
};
