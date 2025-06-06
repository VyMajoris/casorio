import React from 'react';
import GiftItem from './GiftItem'; // Import the GiftItem component
import { Gift } from '@/lib/gifts'; // Import the Gift interface

interface GiftListProps {
  gifts: Gift[];
  totalDonated: number;
}

const GiftList: React.FC<GiftListProps> = ({ gifts, totalDonated }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 sm:gap-3 gap-2">
      {gifts
        .map((gift) => (
          <GiftItem
            key={gift.sort_order}
            gift={gift}
            isUnlocked={totalDonated >= gift.value}
          />
        ))}
    </div>
  );
};

export default GiftList;
