import React, { useState } from 'react';
import {
  LEVEL_1_EXERCISES,
  LEVEL_2_EXERCISES,
  LEVEL_3_EXERCISES,
  LEVEL_4_EXERCISES,
} from './data/exercises';
import {
  Level1Exercise,
  Level2Exercise,
  Level3Exercise,
  Level4Exercise,
} from './types/algebra';
import { TeacherConsole } from './components/TeacherConsole';
import { PedagogicalLegend } from './components/PedagogicalLegend';
import { Level1Bridge } from './components/Level1Bridge';
import { Level2AreaArchitect } from './components/Level2AreaArchitect';
import { Level3Detective } from './components/Level3Detective';
import { Level4QuadraticPuzzle } from './components/Level4QuadraticPuzzle';
import { MirrorTestModal } from './components/MirrorTestModal';
import { FreeBoardModal } from './components/FreeBoardModal';
import { ClassroomGuideModal } from './components/ClassroomGuideModal';

export default function App() {
  // Navigation & Level State
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1, 2, 3, 4]);

  // Exercise indices per level
  const [l1Idx, setL1Idx] = useState<number>(0);
  const [l2Idx, setL2Idx] = useState<number>(0);
  const [l3Idx, setL3Idx] = useState<number>(0);
  const [l4Idx, setL4Idx] = useState<number>(0);

  // Custom exercises from FreeBoard
  const [customL1, setCustomL1] = useState<Level1Exercise | null>(null);
  const [customL2, setCustomL2] = useState<Level2Exercise | null>(null);
  const [customL3, setCustomL3] = useState<Level3Exercise | null>(null);
  const [customL4, setCustomL4] = useState<Level4Exercise | null>(null);

  // Display toggles
  const [colored, setColored] = useState<boolean>(true);
  const [isGiantFont, setIsGiantFont] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<
    'sign' | 'coefficient' | 'variable' | 'exponent' | null
  >(null);

  // Step guidance (for pacing classroom questions)
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Modals
  const [isMirrorOpen, setIsMirrorOpen] = useState<boolean>(false);
  const [isFreeBoardOpen, setIsFreeBoardOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Active exercises
  const activeL1 = customL1 || LEVEL_1_EXERCISES[l1Idx % LEVEL_1_EXERCISES.length];
  const activeL2 = customL2 || LEVEL_2_EXERCISES[l2Idx % LEVEL_2_EXERCISES.length];
  const activeL3 = customL3 || LEVEL_3_EXERCISES[l3Idx % LEVEL_3_EXERCISES.length];
  const activeL4 = customL4 || LEVEL_4_EXERCISES[l4Idx % LEVEL_4_EXERCISES.length];

  // Current exercise metadata
  const getCurrentExerciseInfo = () => {
    switch (currentLevel) {
      case 1:
        return {
          original: activeL1.expression,
          factored: activeL1.factoredExpression,
          totalSteps: activeL1.steps.length,
        };
      case 2:
        return {
          original: activeL2.expression,
          factored: activeL2.factoredExpression,
          totalSteps: activeL2.steps.length,
        };
      case 3:
        return {
          original: activeL3.expression,
          factored: activeL3.factoredExpression,
          totalSteps: activeL3.steps.length,
        };
      case 4:
        return {
          original: activeL4.expression,
          factored: activeL4.factoredExpression,
          totalSteps: activeL4.steps.length,
        };
      default:
        return { original: '', factored: '', totalSteps: 4 };
    }
  };

  const currentInfo = getCurrentExerciseInfo();

  // Handlers
  const handleSelectLevel = (lvl: number) => {
    if (!unlockedLevels.includes(lvl)) {
      // Unlock automatically if teacher clicks
      setUnlockedLevels([...unlockedLevels, lvl]);
    }
    setCurrentLevel(lvl);
    setCurrentStep(0);
  };

  const handleToggleUnlockLevel = (lvl: number) => {
    if (unlockedLevels.includes(lvl)) {
      setUnlockedLevels(unlockedLevels.filter((l) => l !== lvl));
    } else {
      setUnlockedLevels([...unlockedLevels, lvl]);
    }
  };

  const handleNewExercise = () => {
    setCurrentStep(0);
    if (currentLevel === 1) {
      setCustomL1(null);
      setL1Idx((prev) => (prev + 1) % LEVEL_1_EXERCISES.length);
    } else if (currentLevel === 2) {
      setCustomL2(null);
      setL2Idx((prev) => (prev + 1) % LEVEL_2_EXERCISES.length);
    } else if (currentLevel === 3) {
      setCustomL3(null);
      setL3Idx((prev) => (prev + 1) % LEVEL_3_EXERCISES.length);
    } else if (currentLevel === 4) {
      setCustomL4(null);
      setL4Idx((prev) => (prev + 1) % LEVEL_4_EXERCISES.length);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, currentInfo.totalSteps));
  };

  const handleResetSteps = () => {
    setCurrentStep(0);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-slate-800 font-sans selection:bg-amber-200">
      {/* Editorial Academic Top Bar */}
      <header className="bg-[#0D2B52] text-white border-b-2 border-slate-700 shadow-md px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Academic Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-[#0D2B52] flex items-center justify-center font-black text-xl shadow-md">
              F
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>FactorizaLab</span>
                <span className="text-amber-400 font-light text-base sm:text-lg">
                  | De Términos a Factores
                </span>
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
                Laboratorio Visual y Pedagógico de Álgebra para Salón de Secundaria
              </p>
            </div>
          </div>

          {/* Quick Academic Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="px-3 py-1.5 bg-blue-900/80 hover:bg-blue-800 text-blue-100 font-semibold rounded-xl text-xs border border-blue-700/60 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Abrir la guía pedagógica para docentes"
            >
              <span>📖</span>
              <span>Guía Didáctica</span>
            </button>
            <button
              type="button"
              onClick={handleToggleFullscreen}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs border border-slate-600 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Alternar pantalla completa para proyector"
            >
              <span>⛶</span>
              <span>Pantalla Completa</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Classroom Projection Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 pb-36 space-y-5">
        {/* Color Legend (Always visible or toggleable) */}
        <PedagogicalLegend
          colored={colored}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />

        {/* Level Views */}
        {currentLevel === 1 && (
          <Level1Bridge
            exercise={activeL1}
            colored={colored}
            giant={isGiantFont}
            currentStep={currentStep}
            activeFilter={activeFilter}
          />
        )}

        {currentLevel === 2 && (
          <Level2AreaArchitect
            exercise={activeL2}
            colored={colored}
            giant={isGiantFont}
            currentStep={currentStep}
          />
        )}

        {currentLevel === 3 && (
          <Level3Detective
            exercise={activeL3}
            colored={colored}
            giant={isGiantFont}
            currentStep={currentStep}
          />
        )}

        {currentLevel === 4 && (
          <Level4QuadraticPuzzle
            exercise={activeL4}
            colored={colored}
            giant={isGiantFont}
            currentStep={currentStep}
          />
        )}
      </main>

      {/* Teacher Console (Fixed Classroom Controller) */}
      <TeacherConsole
        currentLevel={currentLevel}
        onSelectLevel={handleSelectLevel}
        unlockedLevels={unlockedLevels}
        onToggleUnlockLevel={handleToggleUnlockLevel}
        onNewExercise={handleNewExercise}
        colored={colored}
        onToggleColored={() => setColored((prev) => !prev)}
        currentStep={currentStep}
        totalSteps={currentInfo.totalSteps}
        onNextStep={handleNextStep}
        onResetSteps={handleResetSteps}
        onOpenMirrorTest={() => setIsMirrorOpen(true)}
        onOpenFreeBoard={() => setIsFreeBoardOpen(true)}
        isGiantFont={isGiantFont}
        onToggleGiantFont={() => setIsGiantFont((prev) => !prev)}
      />

      {/* Modals */}
      <MirrorTestModal
        isOpen={isMirrorOpen}
        onClose={() => setIsMirrorOpen(false)}
        level={currentLevel}
        originalExpression={currentInfo.original}
        factoredExpression={currentInfo.factored}
      />

      <FreeBoardModal
        isOpen={isFreeBoardOpen}
        onClose={() => setIsFreeBoardOpen(false)}
        currentLevel={currentLevel}
        onApplyLevel1={(ex) => {
          setCustomL1(ex);
          setCurrentStep(0);
        }}
        onApplyLevel2={(ex) => {
          setCustomL2(ex);
          setCurrentStep(0);
        }}
        onApplyLevel3={(ex) => {
          setCustomL3(ex);
          setCurrentStep(0);
        }}
        onApplyLevel4={(ex) => {
          setCustomL4(ex);
          setCurrentStep(0);
        }}
      />

      <ClassroomGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
