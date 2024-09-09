function Banniere2() {
  return (
    <section className="flex bg-background-primary rounded-3xl *:w-1/2 overflow-hidden">
      <div className="flex flex-col justify-center gap-y-4 flex-1 py-8 pl-[80px] items-start">
        <h3 className="text-primary-500 text-[64px] font-black w-full max-w-[434px]">
          Souscrivez a la newsletter.
        </h3>
        <p className="max-w-[434px] line-clamp-2 text-ellipsis">
          Pour ne rien rater de nos nouveates et derniers acquisitions 😎
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex mt-4 gap-x-2 items-center"
        >
          <input
            type="email"
            placeholder="Adresse mail"
            className="bg-secondary-50 rounded-md px-6 py-[18px] w-[300px] focus:outline-none border border-secondary-100"
          />
          <button className="btn bg-primary-500 px-6 py-[18px] text-shade-white font-bold rounded-md">
            <span>S’inscrire</span>
          </button>
        </form>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <img
          src="/images/homme-2.png"
          alt="banniere"
          className="size-full object-cover"
        />
      </div>
    </section>
  );
}

export default Banniere2;
