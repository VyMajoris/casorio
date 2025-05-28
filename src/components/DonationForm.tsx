"use client"; // Needed for useState

import React, { useState } from 'react';

interface DonationFormProps {
  onDonate: (amount: number) => void; // Function to call when donation is submitted
}

const DonationForm: React.FC<DonationFormProps> = ({ onDonate }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationAmount = parseFloat(amount);

    if (isNaN(donationAmount) || donationAmount <= 0) {
      setError('Por favor, insira um valor válido.');
      return;
    }

    setError('');
    onDonate(donationAmount); // Call the parent function to update the total
    setAmount(''); // Clear the input field
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="donationAmount" className="sr-only">Valor da doação</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            R$
          </span>
          <input
            type="number"
            id="donationAmount"
            name="donationAmount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Valor da doação"
            step="0.01" // Allow cents
            min="0.01"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out"
      >
        Contribuir
      </button>
    </form>
  );
};

export default DonationForm;
