import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "./api";

export function useMe(enabled: boolean) {
  return useQuery({
    queryKey: ["me"],
    queryFn: getUserInfo,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}
``;
