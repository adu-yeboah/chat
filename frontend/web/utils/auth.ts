import { User, UserCreate } from "@/types/chat";


async function registerUser(data: UserCreate): Promise<User> {
    const response = await fetch("register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Registration failed");
    return response.json();
  }
  
  // Usage in a component
  const handleRegister = async () => {
    const userData: UserCreate = { username: "john", email: "john@example.com", password: "pass123" };
    const user = await registerUser(userData);
    console.log(user); // Typed as User
  };