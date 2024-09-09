type CardProps = {
  title: string;
  description: string;
  image: string;
};
function BestSellerCard({ title, description, image }: CardProps) {
  return (
    <div className="flex gap-x-5 bg-secondary-50 py-6 px-4 rounded-2xl">
      <div className="flex-1 gap-x-4 ">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="line-clamp-3 text-ellipsis">{description}</p>
          <button className="btn text-primary-500 flex self-start items-center font-bold gap-x-2 py-3">
            <span>Voir plus</span>
            <img src="/icons/arrow.svg" className="size-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 relative justify-center items-center">
        <img
          src={image}
          alt="logo"
          className="size-full object-contain absolute"
        />
      </div>
    </div>
  );
}

export default BestSellerCard;
