function Banniere() {
  return (
    <section className="flex bg-background-primary rounded-3xl *:w-1/2 overflow-hidden">
      <div className="flex flex-col justify-center gap-y-4 flex-1 py-8 pl-[80px] items-start">
        <h3 className="text-primary-500 text-[64px] font-black w-full max-w-[434px]">
          Nous vous livrons partout
        </h3>
        <p className="max-w-[434px] line-clamp-2 text-ellipsis">
          Lorem ipsum dolor sit amet consectetur. Fringilla lectus non egestas
          consequat. Natoque elit semper quisque mauris in sit. Tempor eleifend
          libero bibendum laoreet.
        </p>
        <button className="btn text-primary-500 flex self-start items-center font-bold gap-x-2 py-3 mt-4">
          <span>Voir plus</span>
          <img src="/icons/arrow.svg" className="size-4" />
        </button>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <img
          src="/images/homme-1.png"
          alt="banniere"
          className="size-full object-cover"
        />
      </div>
    </section>
  );
}

export default Banniere;
