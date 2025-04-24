import axios from "./axios";

export const authProvider = {
  signUp: async (data: any) => {
    const res = await axios.post("/auth/register/trainers", data);
    return res;
  },
};
