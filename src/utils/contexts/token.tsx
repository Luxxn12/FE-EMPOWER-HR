import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { getSchedule } from "@/utils/apis/schedule/api";
import { ISchedule } from "@/utils/apis/schedule/type";

interface AuthContextProps {
  schedules: ISchedule[];
  setSchedules: (schedules: ISchedule[]) => void;
  error: string | null;
  setError: (error: string | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  fetchSchedules: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const saveToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  const logout = () => {
    saveToken(null);
  };

  const fetchSchedules = async () => {
    try {
      const resp = await getSchedule();
      setSchedules(resp.data);
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        schedules,
        setSchedules,
        error,
        setError,
        token,
        setToken: saveToken,
        logout,
        fetchSchedules,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
