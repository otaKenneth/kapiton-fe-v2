const Input = ({ label, id, ...props }: { label: string; id: string; [key: string]: any }) => {
  return (
    <div className="relative pt-2 border-2 border-gray-300 rounded-md focus-within:border-blue-600 overflow-hidden">
      <input
        type="text"
        id={id}
        className="peer px-2 h-10 w-full text-gray-900 placeholder-transparent focus:outline-none"
        placeholder="Input Field"
      />
      <label
        htmlFor={id}
        className="absolute left-2 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:text-sm peer-focus:text-blue-600"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
