import BestSellerCard from "./bestseller/BestSellerCard";

function BestSeller() {
  return (
    <section className="flex items-center gap-x-5">
      <BestSellerCard
        title="La nouvelle sortie 
de Nike Low"
        description="Lorem ipsum dolor sit amet  Fringilla lectus lectusconsectetur. Fringilla lectus non elit qui egestas consequat. Natoque elit semper sque mauris in sit. Tempor eleifend libero bibendum laoreet."
        image="/temp/shoe2.png"
      />
      <BestSellerCard
        title="La nouvelle sortie 
de New balance"
        description="Lorem ipsum dolor sit amet  Fringilla lectus lectusconsectetur. Fringilla lectus non elit qui egestas consequat. Natoque elit semper sque mauris in sit. Tempor eleifend libero bibendum laoreet."
        image="/temp/shoe3.png"
      />
    </section>
  );
}

export default BestSeller;
