import { deleteLecture, fetchLecture, } from '@/http/api';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// export const useCreateNewLectureMutation = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationKey: ["create-new-Lecture"],
//         mutationFn: createNewLecture,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["fetch-all-Lecture"] })
//         }
//     })
// }

export const useFetchLectureQuery = (trainingId: string) => {
    return useQuery({
        queryKey: ["fetch-all-Lecture"],
        queryFn: () => fetchLecture(trainingId)
    })
}

export const useDeleteLectureMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["delete-selected-Lecture"],
        mutationFn: deleteLecture,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-all-Lecture"] })
        }
    })
}
