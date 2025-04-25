import axios from "./axios";

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
