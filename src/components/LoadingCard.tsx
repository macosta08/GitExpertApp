import React from 'react';

const LoadingCard = () => {
  return (
    <div className=" w-full pb-8 overflow-hidden rounded-lg bg-gray-200 shadow">
      <div className="animate-pulse  flex flex-col gap-10">
        <div className=" inset-0 h-52 w-full group-hover:opacity-75 rounded-md bg-slate-400"></div>
        <div className="space-y-3 px-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-6 bg-slate-400 rounded col-span-2"></div>
            <div className="h-6 bg-slate-400 rounded col-span-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
