import useAuthStore from "@/stores/authStore";
import axiosInstance from "@/utils/axiosProtectedInstance";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  userRole: string;
}

interface LoginError {
  message: string;
}

const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/login",
    credentials
  );
  return data;
};

const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation<LoginResponse, LoginError, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: (data: any) => {
      setAuth(data.userRole);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
    },
  });
};

export default useLogin;
