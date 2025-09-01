const CardSkeleton = () => {
  return (
    <div className="bg-dark-card rounded-lg shadow-lg p-4 flex flex-col items-center border border-dark-border">
      <div className="w-28 h-28 rounded-full bg-slate-700 animate-pulse mb-4"></div>
      <div className="h-6 w-3/4 rounded bg-slate-700 animate-pulse mb-2"></div>
      <div className="h-4 w-1/2 rounded bg-slate-700 animate-pulse mb-3"></div>
      <div className="h-6 w-24 rounded-full bg-slate-700 animate-pulse"></div>
    </div>
  );
};

export default CardSkeleton;