import { Job } from "@/pages/Jobs/Jobs";
import api from ".";

export const createNewJob = (data: Job) => api.post("/job", data)
export const fetchJob = () => api.get("/job")
export const filterJob = (query: { title: string, jobType: string }) => api.get(`/filter?title=${query.title}&jobType=${query.jobType}`)
export const deleteJob = (id: string) => api.delete(`/job/${id}`)