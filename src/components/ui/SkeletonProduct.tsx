function SkeletonProduct() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="relative flex justify-center items-center h-[255px] bg-secondary-50 rounded-lg animate-pulse"></div>
      <div className="flex flex-col gap-y-2 pb-4 px-2">
        <span className="text-lg font-bold line-clamp-1 text-ellipsis h-[28px] animate-pulse bg-secondary-50 w-2/3 rounded-full" />
        <div className="flex items-center gap-x-2 ">
          <span className="w-1/3 animate-pulse bg-secondary-50 h-[18px] rounded-full" />
          <span className="animate-pulse bg-secondary-50 h-[20px] rounded-full w-1/4" />
        </div>
        <span className="mt-2 h-[42px] animate-pulse bg-secondary-50 rounded-full w-2/3" />
      </div>
    </div>
  );
}

export default SkeletonProduct;
