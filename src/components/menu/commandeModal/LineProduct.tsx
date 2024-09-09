import { API_URL } from "../../../constants/environnements";
import { useDataFlow } from "../../../stores/dataFlow";
import { ProductCard } from "../../../types/product";
import { formatMoney } from "../../../utils/formatManager";

type LineProductProps = {
  product: ProductCard;
  handleLessQuantity: (product: ProductCard) => void;
};
function LineProduct({ product, handleLessQuantity }: LineProductProps) {
  return (
    <div className="flex items-center justify-between bg-background-primary px-4 py-[12px] shrink-0 h-fit rounded-md">
      <div className="flex gap-x-1 items-center h-[65px]">
        <img
          src={API_URL + product.medias[0].path}
          className="w-[62px] h-full object-contain py-1 bg-secondary-50 rounded-md"
          alt="shoes"
        />
        <div className="flex flex-col gap-y-1">
          <p className="text-secondary-500 max-w-[116px] line-clamp-2 text-ellipsis text-sm">
            {product.name}
          </p>
          <p className="text-secondary-500 text-sm">
            <span>Taille: </span>
            <strong className="font-semibold">
              {product.size ? product.size : ""}
            </strong>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end h-full">
        <h4 className="font-bold text-sm">
          {formatMoney(product.price!, "fcfa")}
        </h4>
        <div className="flex items-center gap-x-8">
          <button onClick={() => handleLessQuantity(product)} className="btn">
            <img src="/icons/less.svg" alt="minus" className="size-6" />
          </button>
          <span className="text-secondary-600 font-medium w-8 text-center">
            {product.quantity! < 10 ? `0${product.quantity}` : product.quantity}
          </span>
          <button
            onClick={() => useDataFlow.getState().addQuantity(product)}
            className="btn"
          >
            <img src="/icons/more.svg" alt="plus" className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LineProduct;
