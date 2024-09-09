import { endpoints } from "../constants/endpoints";
import { API_URL } from "../constants/environnements";

export const getHeroData = async () => {
  try {
    const response = await fetch(API_URL + endpoints.home.hero);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching hero data: ", error);
  }
};

export const getMostPopularData = async () => {
  try {
    const response = await fetch(API_URL + endpoints.home.mostpopular);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching most popular data: ", error);
  }
};

export const getbestRatedData = async () => {
  try {
    const response = await fetch(API_URL + endpoints.home.bestrated);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching best rated data: ", error);
  }
};

export const getOneProduct = async (slug: string) => {
  try {
    const response = await fetch(API_URL + endpoints.product.one + slug);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching one product data: ", error);
  }
};
