import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';

const CVProcessing = ({ currentStep, steps, fileName }) => {
  return (
    <div className="w-full bg-white rounded-[32px] border border-border p-8 md:p-12 shadow-sm flex flex-col items-center justify-center">
      {/* Animated Spinner Icon */}
      <div className="mb-8">
        <LoadingSpinner size="lg" label="" />
      </div>

      {/* Headline */}
      <h3 className="text-xl md:text-2xl font-bold text-primary-text mb-2 text-center">
        Sedang Menganalisis CV Anda
      </h3>
      <p className="text-body-sm font-medium text-secondary-text mb-10 text-center max-w-md">
        Berkas: <span className="text-primary font-bold">{fileName}</span>. AI kami sedang mengekstrak dan mengevaluasi isi CV Anda.
      </p>

      {/* Progress Steps List */}
      <div className="w-full max-w-md space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <div 
              key={index} 
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
                ${isActive 
                  ? 'border-primary bg-primary-light/30 shadow-sm translate-x-1' 
                  : isCompleted 
                    ? 'border-border/60 bg-canvas-white/60 opacity-80' 
                    : 'border-border/40 opacity-40'
                }
              `}
            >
              {/* Status Indicator */}
              <div className="shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                ) : (
                  <Circle className="w-5 h-5 text-secondary-text" />
                )}
              </div>

              {/* Step Text */}
              <span className={`text-sm font-semibold leading-none
                ${isActive 
                  ? 'text-primary-text' 
                  : isCompleted 
                    ? 'text-secondary-text line-through decoration-secondary-text/30' 
                    : 'text-secondary-text'
                }
              `}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CVProcessing;
