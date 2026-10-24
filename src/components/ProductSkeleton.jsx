export const ProductSkeleton = () => {
  return (
    <div className="border border-slate-700/50 rounded-2xl p-4 bg-slate-800/40 animate-pulse flex flex-col justify-between h-full">
      <div>
        <div className="w-full h-48 bg-slate-700/60 rounded-xl mb-4"></div>
        <div className="h-5 bg-slate-700/60 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-slate-700/60 rounded w-1/3 mb-4"></div>
      </div>

      <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between mt-4">
        <div className="h-6 bg-slate-700/60 rounded w-1/4"></div>
        <div className="h-9 bg-slate-700/60 rounded-xl w-24"></div>
      </div>
    </div>
  );
};