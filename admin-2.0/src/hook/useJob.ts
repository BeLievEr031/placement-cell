import { createNewJob, deleteJob, fetchJob } from '@/http/api';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateNewJobMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-new-job"],
        mutationFn: createNewJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-all-job"] })
        }
    })
}

export const useFetchJobQuery = () => {
    return useQuery({
        queryKey: ["fetch-all-job"],
        queryFn: fetchJob
    })
}

export const useDeleteJobMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["delete-selected-job"],
        mutationFn: deleteJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-all-job"] })
        }
    })
}
