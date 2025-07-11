import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings () {
    const {data: settings, isPending: isLoading, error} = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings
    })
    // console.log(settings)
    return {settings, isLoading, error}
}