import React from 'react';

interface ClassroomGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClassroomGuideModal: React.FC<ClassroomGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full p-6 md:p-8 text-left relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-100 text-[#0D2B52] rounded-xl text-xl">📖</span>
            <div>
              <h2 id="guide-modal-title" className="text-xl sm:text-2xl font-black text-[#0D2B52]">
                Guía Didáctica para el Salón de Clases
              </h2>
              <p className="text-xs text-slate-500">
                Estrategias pedagógicas de proyección y uso didáctico en secundaria
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-slate-700 text-sm">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <h3 className="font-bold text-amber-900 text-base flex items-center gap-2 mb-1">
              <span>🎯</span> Objetivo de Aprendizaje
            </h3>
            <p className="text-amber-800 text-xs sm:text-sm">
              Superar el obstáculo común donde los alumnos memorizan fórmulas sin sentido geométrico o algebraico.
              El software conecta la <strong>descomposición visual</strong> con la <strong>propiedad distributiva inversa</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0D2B52] block mb-1">
                Nivel 1: El Puente
              </span>
              <p className="text-xs text-slate-600">
                Pide a los alumnos señalar qué parte es el coeficiente y cuál la variable.
                Alterna entre el Modo Suma y Modo Multiplicación para que vean el empaquetado.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0D2B52] block mb-1">
                Nivel 2: Arquitecto de Áreas
              </span>
              <p className="text-xs text-slate-600">
                Pregunta: &ldquo;¿Cuál es la altura que comparten ambos rectángulos?&rdquo;.
                Permite que los alumnos de atrás griten números para probarlos en vivo.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0D2B52] block mb-1">
                Nivel 3: Detective de Componentes
              </span>
              <p className="text-xs text-slate-600">
                Aisla estación por estación. Resuelve primero los números (MCD), luego las letras que se repiten en todos, y finalmente el exponente más pequeño.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0D2B52] block mb-1">
                Nivel 4: Rompecabezas Cuadrático
              </span>
              <p className="text-xs text-slate-600">
                Usa el acertijo: &ldquo;Multiplicados dan 12 y sumados dan 7&rdquo;.
                La cuadrícula 2×2 demuestra visualmente por qué se forman los binomios (x + m)(x + n).
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
            <h4 className="font-bold text-blue-900 text-sm mb-1">
              💡 Consejos para Proyección en Salón con Luz Ambiental
            </h4>
            <ul className="list-disc list-inside text-xs text-blue-800 space-y-1">
              <li>
                Activa el botón <strong>&ldquo;Colorear Componentes&rdquo;</strong> para alto contraste pedagógico.
              </li>
              <li>
                Utiliza el botón <strong>&ldquo;A+&rdquo;</strong> (Modo Proyector Gigante) para aumentar las letras si los alumnos están a más de 8 metros del pizarrón.
              </li>
              <li>
                Usa la <strong>&ldquo;Prueba del Espejo&rdquo;</strong> para cerrar cada ejercicio comprobando que la multiplicación regresa a la expresión original.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-[#0D2B52] hover:bg-blue-900 text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer"
          >
            Cerrar Guía
          </button>
        </div>
      </div>
    </div>
  );
};
