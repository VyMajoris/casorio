import React from "react";

interface ProgressBarProps {
  currentValue: number;
  maxValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentValue,
  maxValue,
}) => {
  const percentage = maxValue > 0 ? Math.min((10000 / maxValue) * 100, 100) : 0;

  return (
    <div className="w-full">
      <div className="text-center mb-3">
        <span
          className="text-xl font-bold"
          style={{ color: "var(--accent-blue)" }}
        >
        Agradecemos os {percentage.toFixed(0)}% dos presentes já recebidos
        </span>
      </div>

      <div
        className="w-full rounded-full h-6 overflow-hidden shadow-inner "
        style={{
          backgroundColor: "rgba(212, 175, 55, 0.1)",
          borderColor: "var(--accent-blue)",
        }}
      >
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
    </div>
  );
};

export default ProgressBar;
