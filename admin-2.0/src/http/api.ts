import { Job } from "@/pages/Jobs/Jobs";
import { Event } from "@/pages/Event/Event";
import api from ".";

export const createNewJob = (data: Job) => api.post("/job", data)
export const fetchJob = () => api.get("/job")
export const filterJob = (query: { title: string, jobType: string }) => api.get(`/job/filter?title=${query.title}&jobType=${query.jobType}`)
export const deleteJob = (id: string) => api.delete(`/job/${id}`)

export const createNewEvent = (data: Event) => api.post("/event", data)
export const fetchEvent = () => api.get("/event")
export const filterEvent = (query: { title: string, jobType: string }) => api.get(`/event/filter?title=${query.title}&jobType=${query.jobType}`)
export const deleteEvent = (id: string) => api.delete(`/event/${id}`)