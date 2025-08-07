import React from 'react';

interface QuantityInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const QuantityInput = ({ label, value, onChange, min = 1, max = 99 }: QuantityInputProps) => {
  const handleChange = (e) => {
    const val = Math.max(min, Math.min(max, Number(e.target.value)));
    onChange(val);
  };

  return (
    <div className="w-full max-w-xs">
      {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          −
        </button>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          className="w-16 text-center px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-sm text-gray">/ {max}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
