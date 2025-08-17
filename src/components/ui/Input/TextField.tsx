export default ({ label, id, value, onChange, ...props }: { label: string; id: string; [key: string]: any, value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className="my-2">
      <input 
        placeholder={label} 
        value={value} 
        onChange={onChange}
        className="w-[20rem] bg-white font-body px-4 py-2 rounded-lg border-[1px] border-primaryContrast"
        {...props}
      />
      <span className="error-message text-red-500 text-sm">{props.err}</span>
    </div>
  );
}