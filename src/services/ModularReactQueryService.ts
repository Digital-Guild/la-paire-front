import { useQuery } from "react-query";

export type QueryFnProps = {
  queryKey: string[] | string;
  queryFn: () => Promise<any>;
  staleTime?: number;
  infinite?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number | false;
  retry?: number;
};
export const useModularRQuery = ({
  queryKey,
  queryFn,
  staleTime = 1,
  infinite = true,
  refetchInterval = false,
  refetchOnWindowFocus = true,
  retry = 3,
}: QueryFnProps) => {
  return useQuery({
    queryKey,
    queryFn,
    retry,
    refetchOnWindowFocus,
    staleTime: 1000 * 60 * staleTime,
    refetchInterval: refetchInterval ? 1000 * 60 * refetchInterval : false,
    cacheTime: infinite ? 0 : 1000 * 60 * staleTime,
  });
};
