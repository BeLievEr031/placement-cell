import { createNewPurchase, fetchAllPurchases, fetchSinglePurchase, } from '@/http/api';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateNewPurchaseMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-new-Purchase"],
        mutationFn: createNewPurchase,
        onSuccess: () => {
            console.log("🔥🔥🔥🔥🔥🔥");
            queryClient.invalidateQueries({
                queryKey: ["fetch-all-Purchase", "fetch-single-Purchase"]
            })
        }
    })
}

export const useFetchSinglePurchaseQuery = (query: { clerkId: string; courseId: string }) => {
    return useQuery({
        queryKey: ["fetch-single-Purchase"],
        queryFn: () => fetchSinglePurchase(query)
    })
}

export const useFetchAllPurchaseQuery = (query: { clerkId: string; }) => {
    return useQuery({
        queryKey: ["fetch-all-Purchase"],
        queryFn: () => fetchAllPurchases(query.clerkId)
    })
}

// export const useDeletePurchaseMutation = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationKey: ["delete-selected-Purchase"],
//         mutationFn: deletePurchase,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["fetch-all-Purchase"] })
//         }
//     })
// }
