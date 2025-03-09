import { Job } from "@/pages/Jobs/Jobs";
import { Event } from "@/pages/Event/Event";
import api from ".";
import { TrainingProgram } from "@/pages/Training/Training";

export const createNewJob = (data: Job) => api.post("/job", data)
export const fetchJob = () => api.get("/job")
export const filterJob = (query: { title: string, jobType: string }) => api.get(`/job/filter?title=${query.title}&jobType=${query.jobType}`)
export const deleteJob = (id: string) => api.delete(`/job/${id}`)

export const createNewEvent = (data: Event) => api.post("/event", data)
export const fetchEvent = () => api.get("/event")
export const filterEvent = (query: { title: string, jobType: string }) => api.get(`/event/filter?title=${query.title}&jobType=${query.jobType}`)
export const deleteEvent = (id: string) => api.delete(`/event/${id}`)

export const createNewTraining = (data: TrainingProgram) => api.post("/training", data)
export const fetchTraining = () => api.get("/training")
export const filterTraining = (query: { title: string, jobType: string }) => api.get(`/training/filter?title=${query.title}&jobType=${query.jobType}`)
export const deleteTraining = (id: string) => api.delete(`/training/${id}`)