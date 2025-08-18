import React from 'react';

interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ label, options, value, onChange }: SelectProps) => {
  return (
    <div className="max-w-sm">
      {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} data-label={label}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
