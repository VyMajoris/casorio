import React from "react";
import { Gift } from '@/lib/gifts'; // Import the Gift interface

interface GiftItemProps {
  gift: Gift;
  isUnlocked: boolean;
}

const GiftItem: React.FC<GiftItemProps> = ({ gift, isUnlocked }) => {
  return (
    <div
      className={`flex flex-col justify-between p-5 border rounded-lg shadow-md mb-3 transition-all duration-300 ${
        isUnlocked ? "shadow-lg" : ""
      }`}
      style={{
        borderColor: isUnlocked ? 'var(--accent-blue)' : 'rgba(212, 175, 55, 0.3)',
        backgroundColor: isUnlocked 
          ? 'rgba(212, 175, 55, 0.1)' 
          : 'rgba(250, 246, 237, 0.8)'
      }}
    >
      <div className="flex items-center space-x-4">
        <span className="text-3xl" style={{filter: isUnlocked ? 'none' : 'grayscale(50%)'}}>{gift.icon}</span>
        <div>
          <p className="font-semibold text-lg" style={{
            fontFamily: 'var(--font-body)',
            color: isUnlocked ? 'var(--accent-blue)' : 'var(--text-bronze)'
          }}>
            {gift.name}
          </p>
          <p className="text-base font-medium" style={{
            color: isUnlocked ? 'var(--text-bronze)' : 'var(--accent-blue)'
          }}>
            R$ {gift.value.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
      <div className="justify-start flex items-center mt-3">
        {isUnlocked && (
          <span 
            className="text-xs font-semibold px-4 py-2 rounded-full shadow-md"
            style={{
              backgroundColor: 'var(--accent-blue)',
              color: 'white',
              fontFamily: 'var(--font-body)'
            }}
          >
            Recebido com gratidão 🙏
          </span>
        )}
      </div>
    </div>
  );
};

export default GiftItem;
