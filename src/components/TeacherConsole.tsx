import React from 'react';

interface TeacherConsoleProps {
  currentLevel: number;
  onSelectLevel: (lvl: number) => void;
  unlockedLevels: number[];
  onToggleUnlockLevel: (lvl: number) => void;
  onNewExercise: () => void;
  colored: boolean;
  onToggleColored: () => void;
  currentStep: number;
  totalSteps: number;
  onNextStep: () => void;
  onResetSteps: () => void;
  onOpenMirrorTest: () => void;
  onOpenFreeBoard: () => void;
  isGiantFont: boolean;
  onToggleGiantFont: () => void;
}

export const TeacherConsole: React.FC<TeacherConsoleProps> = ({
  currentLevel,
  onSelectLevel,
  unlockedLevels,
  onToggleUnlockLevel,
  onNewExercise,
  colored,
  onToggleColored,
  currentStep,
  totalSteps,
  onNextStep,
  onResetSteps,
  onOpenMirrorTest,
  onOpenFreeBoard,
  isGiantFont,
  onToggleGiantFont,
}) => {
  const levels = [
    { num: 1, name: '1. El Puente', short: 'Nivel 1' },
    { num: 2, name: '2. Arquitecto de Áreas', short: 'Nivel 2' },
    { num: 3, name: '3. Detective de Componentes', short: 'Nivel 3' },
    { num: 4, name: '4. Rompecabezas Cuadrático', short: 'Nivel 4' },
  ];

  return (
    <footer
      className="sticky bottom-0 z-40 bg-[#0D2B52] text-white border-t-4 border-amber-400 shadow-2xl px-4 py-3"
      role="region"
      aria-label="Consola de Control del Profesor"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Level Selector */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-300 mr-1 flex items-center gap-1">
            <span>🎓</span>
            <span className="hidden sm:inline">Nivel:</span>
          </span>

          {levels.map((lvl) => {
            const isActive = currentLevel === lvl.num;
            const isUnlocked = unlockedLevels.includes(lvl.num);

            return (
              <div key={lvl.num} className="relative inline-flex items-center">
                <button
                  type="button"
                  onClick={() => onSelectLevel(lvl.num)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-400 text-[#0D2B52] shadow-lg ring-2 ring-white scale-105'
                      : isUnlocked
                      ? 'bg-blue-900/80 hover:bg-blue-800 text-white'
                      : 'bg-slate-800/80 text-slate-400 opacity-60'
                  }`}
                  title={isUnlocked ? `Pasar al ${lvl.name}` : `Nivel ${lvl.num} (bloqueado por ritmo de clase)`}
                >
                  <span>{lvl.short}</span>
                  {!isUnlocked && <span className="text-[10px]">🔒</span>}
                </button>
                {/* Micro button to toggle unlock if teacher wants */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleUnlockLevel(lvl.num);
                  }}
                  className="ml-0.5 text-[10px] text-slate-400 hover:text-white px-1 py-0.5"
                  title={isUnlocked ? "Bloquear nivel" : "Desbloquear nivel para el grupo"}
                  aria-label={`Alternar bloqueo nivel ${lvl.num}`}
                >
                  {isUnlocked ? '🔓' : '🔒'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Central Pedagogy Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* New exercise button */}
          <button
            type="button"
            onClick={onNewExercise}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            title="Generar otro ejercicio aleatorio de este mismo nivel"
          >
            <span>🎲</span>
            <span>Nuevo Ejercicio</span>
          </button>

          {/* Colorize toggle button */}
          <button
            type="button"
            onClick={onToggleColored}
            className={`px-3.5 py-1.5 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer ${
              colored
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 ring-2 ring-emerald-300'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
            }`}
            title="Activar o desactivar el código de color pedagógico en las expresiones"
          >
            <span>🎨</span>
            <span>Colorear: {colored ? 'SÍ (ON)' : 'NO (OFF)'}</span>
          </button>

          {/* Reveal step / hint */}
          <div className="inline-flex rounded-xl shadow-md overflow-hidden bg-slate-800 border border-slate-600">
            <button
              type="button"
              onClick={onNextStep}
              className={`px-3.5 py-1.5 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                currentStep >= totalSteps
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
              title="Revela la siguiente pista o paso de razonamiento para guiar a la clase"
            >
              <span>💡</span>
              <span>
                {currentStep >= totalSteps ? 'Pasos Completados' : 'Siguiente Paso / Pista'}
              </span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[11px] bg-slate-900/30 text-slate-950 font-mono font-extrabold">
                {currentStep}/{totalSteps}
              </span>
            </button>
            {currentStep > 0 && (
              <button
                type="button"
                onClick={onResetSteps}
                className="px-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-bold"
                title="Reiniciar pistas a cero"
              >
                ↺
              </button>
            )}
          </div>

          {/* Mirror Test (Verify) */}
          <button
            type="button"
            onClick={onOpenMirrorTest}
            className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            title="Abrir la Prueba del Espejo con animación de multiplicación inversa"
          >
            <span>🪞</span>
            <span>Prueba del Espejo</span>
          </button>
        </div>

        {/* Freeboard and Projector Utility */}
        <div className="flex items-center gap-2">
          {/* Free blackboard */}
          <button
            type="button"
            onClick={onOpenFreeBoard}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs sm:text-sm border border-slate-600 flex items-center gap-1.5 cursor-pointer"
            title="Escribir cualquier ejercicio propio en el pizarrón"
          >
            <span>✍️</span>
            <span>Pizarrón Libre</span>
          </button>

          {/* Giant font toggle */}
          <button
            type="button"
            onClick={onToggleGiantFont}
            className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isGiantFont
                ? 'bg-amber-400 text-[#0D2B52] border-amber-300'
                : 'bg-slate-800 text-slate-300 border-slate-600 hover:text-white'
            }`}
            title="Aumentar tamaño de expresiones para proyector de salón (4.5rem+)"
            aria-label="Alternar tamaño de fuente gigante para proyector"
          >
            <span className="font-extrabold text-sm">A+</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
