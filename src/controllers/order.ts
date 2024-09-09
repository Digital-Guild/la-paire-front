import { endpoints } from "../constants/endpoints";
import { API_URL } from "../constants/environnements";
import { OrderedProduct } from "../types/orderedProduct";

export const sendOrder = async (
  formData: FormData,
  ordered_products: OrderedProduct[]
) => {
  const { fullname, email, contact, delivery_place } = Object.fromEntries(
    formData.entries()
  );
  try {
    const response = await fetch(API_URL + endpoints.order.send, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        contact,
        delivery_place,
        ordered_products,
      }),
    });

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching hero data: ", error);
  }
};
