import React, { useState } from 'react';
import { parseSimpleTerm, findFactorPairs } from '../utils/algebra';
import { Level1Exercise, Level2Exercise, Level3Exercise, Level4Exercise } from '../types/algebra';

interface FreeBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: number;
  onApplyLevel1: (exercise: Level1Exercise) => void;
  onApplyLevel2: (exercise: Level2Exercise) => void;
  onApplyLevel3: (exercise: Level3Exercise) => void;
  onApplyLevel4: (exercise: Level4Exercise) => void;
}

export const FreeBoardModal: React.FC<FreeBoardModalProps> = ({
  isOpen,
  onClose,
  currentLevel,
  onApplyLevel1,
  onApplyLevel2,
  onApplyLevel3,
  onApplyLevel4,
}) => {
  // Level 1 custom inputs
  const [l1Term1, setL1Term1] = useState('10x²');
  const [l1Term2, setL1Term2] = useState('+15x');
  const [l1CommonFactor, setL1CommonFactor] = useState('5x');
  const [l1Parenthesis, setL1Parenthesis] = useState('2x + 3');

  // Level 2 custom inputs
  const [l2Height, setL2Height] = useState('5');
  const [l2Area1, setL2Area1] = useState('5x');
  const [l2Area2, setL2Area2] = useState('20');
  const [l2Width1, setL2Width1] = useState('x');
  const [l2Width2, setL2Width2] = useState('4');

  // Level 3 custom inputs
  const [l3Input, setL3Input] = useState('12x³y² - 18x²y + 6xy');

  // Level 4 custom inputs
  const [l4B, setL4B] = useState('8');
  const [l4C, setL4C] = useState('12');

  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentLevel === 1) {
      const t1 = parseSimpleTerm(l1Term1, 'custom-1');
      const t2 = parseSimpleTerm(l1Term2, 'custom-2');
      const fullExpr = `${l1Term1} ${l1Term2.startsWith('+') || l1Term2.startsWith('-') ? l1Term2 : '+' + l1Term2}`;
      const exercise: Level1Exercise = {
        id: `custom-l1-${Date.now()}`,
        title: 'Ejercicio Personalizado del Profesor',
        expression: fullExpr,
        terms: [t1, t2],
        commonFactor: l1CommonFactor.trim(),
        parenthesisFactor: l1Parenthesis.trim(),
        factoredExpression: `${l1CommonFactor.trim()}(${l1Parenthesis.trim()})`,
        explanation: 'Ejercicio introducido directamente por el docente en el pizarrón libre.',
        steps: [
          `Paso 1: Identificar los términos ${l1Term1} y ${l1Term2}.`,
          `Paso 2: Extraer el factor común convenido con el grupo: ${l1CommonFactor}.`,
          `Paso 3: Dividir cada término entre ${l1CommonFactor}.`,
          `Paso 4: Expresión resultante: ${l1CommonFactor}(${l1Parenthesis}).`,
        ],
      };
      onApplyLevel1(exercise);
    } else if (currentLevel === 2) {
      const exercise: Level2Exercise = {
        id: `custom-l2-${Date.now()}`,
        title: 'Área Personalizada del Pizarrón',
        expression: `${l2Area1} + ${l2Area2}`,
        height: l2Height.trim(),
        heightOptions: [l2Height.trim(), '2', 'x', '10'],
        sections: [
          {
            id: 'cs1',
            termString: l2Area1.trim(),
            widthLabel: l2Width1.trim(),
            widthValue: l2Width1.trim(),
            colorBg: 'bg-blue-50 border-blue-300',
          },
          {
            id: 'cs2',
            termString: l2Area2.trim(),
            widthLabel: l2Width2.trim(),
            widthValue: l2Width2.trim(),
            colorBg: 'bg-emerald-50 border-emerald-300',
          },
        ],
        totalBase: `${l2Width1.trim()} + ${l2Width2.trim()}`,
        factoredExpression: `${l2Height.trim()}(${l2Width1.trim()} + ${l2Width2.trim()})`,
        steps: [
          `Paso 1: Sección 1 con área ${l2Area1} y sección 2 con área ${l2Area2}.`,
          `Paso 2: Altura común compartida: ${l2Height}.`,
          `Paso 3: Bases parciales correspondientes: ${l2Width1} y ${l2Width2}.`,
          `Paso 4: Factorización geométrica: ${l2Height}(${l2Width1} + ${l2Width2}).`,
        ],
      };
      onApplyLevel2(exercise);
    } else if (currentLevel === 3) {
      // Parse terms separated by + or -
      const tokens = l3Input.match(/([+-]?[^+-]+)/g) || ['12x³y²', '-18x²y', '+6xy'];
      const parsedTerms = tokens.map((tok, idx) => parseSimpleTerm(tok.trim(), `custom-l3-${idx}`));
      const exercise: Level3Exercise = {
        id: `custom-l3-${Date.now()}`,
        title: 'Polinomio Personalizado del Docente',
        expression: l3Input.trim(),
        terms: parsedTerms,
        coefficients: parsedTerms.map((t) => t.coefficient),
        gcd: 6,
        gcdOptions: [2, 3, 6, 12],
        allVariables: ['x', 'y'],
        commonVariables: ['x', 'y'],
        variableMinExponents: { x: 1, y: 1 },
        commonFactorString: '6xy',
        quotients: [
          { original: '12x³y²', divided: '2x²y' },
          { original: '-18x²y', divided: '-3x' },
          { original: '+6xy', divided: '+1' },
        ],
        factoredExpression: '6xy(2x²y - 3x + 1)',
        steps: [
          'Paso 1: Analizar coeficientes de cada término personalizado.',
          'Paso 2: Identificar literales que se repiten.',
          'Paso 3: Seleccionar los menores exponentes.',
          'Paso 4: Realizar la división de cada término.',
        ],
      };
      onApplyLevel3(exercise);
    } else if (currentLevel === 4) {
      const bNum = parseInt(l4B, 10) || 7;
      const cNum = parseInt(l4C, 10) || 12;
      const pairs = findFactorPairs(cNum, bNum);
      const correctPair = pairs.find((p) => p.isCorrect) || pairs[0] || { m: 2, n: 6 };

      const exercise: Level4Exercise = {
        id: `custom-l4-${Date.now()}`,
        title: `Trinomio Personalizado: x² + ${bNum}x + ${cNum}`,
        expression: `x² + ${bNum}x + ${cNum}`,
        variable: 'x',
        b: bNum,
        c: cNum,
        m: correctPair.m,
        n: correctPair.n,
        factorPairs: pairs,
        factoredExpression: `(x + ${correctPair.m})(x + ${correctPair.n})`,
        steps: [
          `Paso 1: Coeficientes b = ${bNum} y c = ${cNum}.`,
          `Paso 2: Buscar factores de ${cNum} que sumen ${bNum}.`,
          `Paso 3: Se verifica m=${correctPair.m} y n=${correctPair.n}.`,
          `Paso 4: Factorización: (x + ${correctPair.m})(x + ${correctPair.n}).`,
        ],
      };
      onApplyLevel4(exercise);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="freeboard-modal-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 text-left relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-100 text-indigo-800 rounded-xl text-xl">✍️</span>
            <div>
              <h2 id="freeboard-modal-title" className="text-xl sm:text-2xl font-bold text-[#0D2B52]">
                Modo Pizarrón Libre (Profesor)
              </h2>
              <p className="text-xs text-slate-500">
                Escribe un ejercicio propio para cargarlo en el <strong>Nivel {currentLevel}</strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 rounded-lg"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleApply} className="space-y-4">
          {currentLevel === 1 && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold uppercase text-slate-600 block">
                Configuración para Nivel 1 (Términos vs Factores)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Término 1:
                  </label>
                  <input
                    type="text"
                    value={l1Term1}
                    onChange={(e) => setL1Term1(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold text-blue-700"
                    placeholder="ej. 10x²"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Término 2:
                  </label>
                  <input
                    type="text"
                    value={l1Term2}
                    onChange={(e) => setL1Term2(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold text-emerald-700"
                    placeholder="ej. +15x"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Factor Común exterior:
                  </label>
                  <input
                    type="text"
                    value={l1CommonFactor}
                    onChange={(e) => setL1CommonFactor(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold text-purple-700"
                    placeholder="ej. 5x"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Interior del paréntesis:
                  </label>
                  <input
                    type="text"
                    value={l1Parenthesis}
                    onChange={(e) => setL1Parenthesis(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-800"
                    placeholder="ej. 2x + 3"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {currentLevel === 2 && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold uppercase text-slate-600 block">
                Configuración para Nivel 2 (Modelo de Áreas)
              </span>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Altura Común (Factor Común vertical):
                </label>
                <input
                  type="text"
                  value={l2Height}
                  onChange={(e) => setL2Height(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold text-blue-700"
                  placeholder="ej. 5"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Área Sección 1 / Base 1:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={l2Area1}
                      onChange={(e) => setL2Area1(e.target.value)}
                      className="w-1/2 px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-sm font-bold"
                      placeholder="Área: 5x"
                      required
                    />
                    <input
                      type="text"
                      value={l2Width1}
                      onChange={(e) => setL2Width1(e.target.value)}
                      className="w-1/2 px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-sm font-bold"
                      placeholder="Base: x"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Área Sección 2 / Base 2:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={l2Area2}
                      onChange={(e) => setL2Area2(e.target.value)}
                      className="w-1/2 px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-sm font-bold"
                      placeholder="Área: 20"
                      required
                    />
                    <input
                      type="text"
                      value={l2Width2}
                      onChange={(e) => setL2Width2(e.target.value)}
                      className="w-1/2 px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-sm font-bold"
                      placeholder="Base: 4"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentLevel === 3 && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold uppercase text-slate-600 block">
                Configuración para Nivel 3 (Polinomio Multivariable)
              </span>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Polinomio Completo:
                </label>
                <input
                  type="text"
                  value={l3Input}
                  onChange={(e) => setL3Input(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-800"
                  placeholder="ej. 12x³y² - 18x²y + 6xy"
                  required
                />
              </div>
            </div>
          )}

          {currentLevel === 4 && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold uppercase text-slate-600 block">
                Configuración para Nivel 4 (Trinomio x² + bx + c)
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Coeficiente b (Término lineal con x):
                  </label>
                  <input
                    type="number"
                    value={l4B}
                    onChange={(e) => setL4B(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-lg font-bold text-blue-700"
                    placeholder="ej. 8"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Constante c (Término independiente):
                  </label>
                  <input
                    type="number"
                    value={l4C}
                    onChange={(e) => setL4C(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-lg font-bold text-emerald-700"
                    placeholder="ej. 12"
                    required
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Formará el trinomio: <strong className="font-mono">x² + {l4B}x + {l4C}</strong>
              </p>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0D2B52] hover:bg-blue-900 text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer"
            >
              Cargar Ejercicio en Pantalla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
