import React from 'react';

interface ProgressBarProps {
  currentValue: number;
  maxValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentValue, maxValue }) => {
  const percentage = maxValue > 0 ? Math.min((10000 / maxValue) * 100, 100) : 0;

  return (
    <div className="w-full">
      <div className="text-center mb-3">
   
        <h4 className="text-lg font-semibold mb-1" style={{fontFamily: 'var(--font-serif)', color: 'var(--text-bronze)'}}>
          Progresso das Doações
        </h4>
        <span className="text-2xl font-bold" style={{color: 'var(--accent-blue)'}}>{percentage.toFixed(0)}%</span>
      </div>
      
      <div className="w-full rounded-full h-6 overflow-hidden shadow-inner " style={{
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderColor: 'var(--accent-blue)'
      }}>
        <div
          className="h-6 rounded-full transition-all duration-700 ease-out shadow-sm bg-slate-500"
          style={{ 
            width: `${percentage}%`,
      
          }}
          role="progressbar"
          aria-valuenow={currentValue}
          aria-valuemin={0}
          aria-valuemax={maxValue}
        ></div>
      </div>
      
      <div className="flex justify-between items-center mt-3 text-base font-semibold">
    
        <span style={{color: 'var(--text-warm)'}}>Meta: R$ {maxValue.toLocaleString('pt-BR')}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
