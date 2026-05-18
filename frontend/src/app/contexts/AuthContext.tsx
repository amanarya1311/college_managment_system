import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";

type User = {

  _id?: string;

  studentId?: string;

  role?: string;

  name?: string;

  email?: string;

  rollNo?: string;

  [key: string]: any;

};

interface AuthContextType {

  user: User | null;

  login: (
    userData: User
  ) => void;

  logout: () => void;

  isLoading: boolean;

}

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

export function AuthProvider({
  children
}: {
  children: ReactNode
}) {

  const [user, setUser] =
    useState<User | null>(
      null
    );

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (
      storedUser &&
      storedUser !==
        "undefined"
    ) {

      try {

        const parsedUser =
          JSON.parse(
            storedUser
          );

        setUser(
          parsedUser
        );

      } catch {

        localStorage.removeItem(
          "user"
        );

      }

    }

    setIsLoading(false);

  }, []);

  const login = (
    userData: User
  ) => {

    console.log(
      "Logged In User:",
      userData
    );

    setUser(userData);

    localStorage.setItem(

      "user",

      JSON.stringify(
        userData
      )

    );

  };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{

        user,

        login,

        logout,

        isLoading

      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  const context =
    useContext(
      AuthContext
    );

  if (
    context === undefined
  ) {

    throw new Error(

      "useAuth must be used within an AuthProvider"

    );

  }

  return context;

}