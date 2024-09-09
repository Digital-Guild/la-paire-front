import { usePageStore } from "../stores/pageStore";

type RequestWithLoaderProps = {
  asyncVoidFunction: () => Promise<any | null>;
  showLoader?: boolean;
  setLoading?: (payload: boolean) => void;
  fakeLoader?: number;
  loaderStay?: boolean;
  loaderStayTime?: number;
};
export const apiLoaderRequest = async ({
  asyncVoidFunction,
  showLoader = true,
  setLoading,
  fakeLoader = 0,
  loaderStay = false,
  loaderStayTime = 2500,
}: RequestWithLoaderProps) => {
  setLoading && setLoading(true);
  showLoader && usePageStore.getState().setLoading(true);
  if (fakeLoader > 0)
    await new Promise((resolve) => setTimeout(resolve, fakeLoader));
  const response = await asyncVoidFunction();
  if (loaderStay && response) {
    await new Promise((resolve) => setTimeout(resolve, loaderStayTime));
  }
  setLoading && setLoading(false);
  showLoader && usePageStore.getState().setLoading(false);
  return response;
};
