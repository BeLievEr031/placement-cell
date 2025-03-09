import { createNewEvent, deleteEvent, fetchEvent } from '@/http/api';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateNewEventMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-new-Event"],
        mutationFn: createNewEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-all-Event"] })
        }
    })
}

export const useFetchEventQuery = () => {
    return useQuery({
        queryKey: ["fetch-all-Event"],
        queryFn: fetchEvent
    })
}

export const useDeleteEventMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["delete-selected-Event"],
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-all-Event"] })
        }
    })
}
