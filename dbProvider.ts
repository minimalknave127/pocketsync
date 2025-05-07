import axios from "./axios";
import { tNewServiceEntry } from "./ts/services";
import { tNewWorkoutEntry } from "./ts/workouts";

export const authProvider = {
  signUp: async (data: any) => {
    const res = await axios.post("/auth/register/trainers", data);
    return res;
  },
  signIn: async (data: any) => {
    const res = await axios.post("/auth/login", data);
    return res;
  },
  signOut: async () => {
    const res = await axios.post("/auth/signout");
    return res;
  },
  getCurrentUser: async () => {
    const res = await axios.get("/users/current-user");
    return res;
  },
};

export const clientProvider = {
  createClient: async (data: any) => {
    const res = await axios.post("/auth/register/trainers/invitation", data);
    return res;
  },
  getClients: async (offset?: number, search?: string) => {
    const params = new URLSearchParams();
    if (offset) params.append("offset", offset.toString());
    if (search) params.append("search", search);
    const res = await axios.get(`/trainers/customers${params.toString()}`);
    return res;
  },
  getClient: async (id: string) => {
    const res = await axios.get(`/trainers/customers/${id}`);
    return res;
  },
};

export const goalsProvider = {
  getGoals: async () => {
    const res = await axios.get("/targets");
    return res;
  },
  getGoal: async (id: string) => {
    const res = await axios.get(`/targets/${id}`);
    return res;
  },
  create: async (data: any): Promise<string> => {
    const res = await axios.post("/targets", data);
    return res.data?.created_id;
  },
  update: async (id: string, data: any) => {
    const res = await axios.patch(`/targets/${id}`, data);
    return res;
  },
  updateOrder: async (data: any) => {
    const res = await axios.patch("/targets", data);
    return res;
  },
  delete: async (id: string) => {
    const res = await axios.delete(`/targets/${id}`);
    return res;
  },
};

export const servicesProvider = {
  getServices: async () => {
    const res = await axios.get("/services");
    return res;
  },
  getService: async (id: string, only_options: boolean = false) => {
    const res = await axios.get(`/services/${id}?only_options=${only_options}`);
    return res;
  },
  create: async (data: tNewServiceEntry): Promise<string> => {
    const res = await axios.post("/services", data);
    return res.data?.created_id;
  },
  update: async (id: string, data: any) => {
    const res = await axios.patch(`/services/${id}`, data);
    return res;
  },
  updateOrder: async (data: any) => {
    const res = await axios.patch("/services", data);
    return res;
  },
  delete: async (id: string) => {
    const res = await axios.delete(`/services/${id}`);
    return res;
  },
};

export const workoutsProvider = {
  getWorkouts: async () => {
    const res = await axios.get("/workouts");
    return res;
  },
  getWorkout: async (id: string, only_steps: boolean = false) => {
    const res = await axios.get(`/workouts/${id}?only_steps=${only_steps}`);
    return res;
  },
  create: async (data: tNewWorkoutEntry): Promise<string> => {
    const res = await axios.post("/workouts", data);
    return res.data?.created_id;
  },
  update: async (id: string, data: any) => {
    const res = await axios.patch(`/workouts/${id}`, data);
    return res;
  },
  updateOrder: async (data: any) => {
    const res = await axios.patch("/workouts", data);
    return res;
  },
  delete: async (id: string) => {
    const res = await axios.delete(`/workouts/${id}`);
    return res;
  },
};
