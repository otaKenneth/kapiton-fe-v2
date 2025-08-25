export default () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 w-full flex flex-col gap-y-6 animate-pulse">
      <div className="flex gap-5">
        <div className="bg-gray-300 rounded w-[700px] h-[700px]" />
        <div className="flex flex-col gap-5 w-[700px] h-[700px]">
          <div>
            <div className="h-6 bg-gray-300 rounded mb-2 w-1/4" />
            <div className="h-12 bg-gray-300 rounded w-3/4" />
          </div>
          <div className="flex gap-3">
            <div className="h-6 bg-gray-300 rounded w-1/6" />
            <div className="h-6 bg-gray-300 rounded w-1/6" />
          </div>
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-2" />
          <div className="h-24 bg-gray-300 rounded w-full mb-2" />
          <div className="flex gap-5">
            <div className="h-10 bg-gray-300 rounded w-1/6" />
            <div className="h-10 bg-gray-300 rounded w-1/6" />
          </div>
          <div className="h-10 bg-gray-300 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}