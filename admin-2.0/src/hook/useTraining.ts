import { createNewTraining, deleteTraining, fetchTraining } from '@/http/api';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateNewTrainingMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-new-Training"],
        mutationFn: createNewTraining,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-all-Training"] })
        }
    })
}

export const useFetchTrainingQuery = () => {
    return useQuery({
        queryKey: ["fetch-all-Training"],
        queryFn: fetchTraining
    })
}

export const useDeleteTrainingMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["delete-selected-Training"],
        mutationFn: deleteTraining,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-all-Training"] })
        }
    })
}
