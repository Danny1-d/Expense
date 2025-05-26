import { auth } from "@/auth"

export const getCurrentUser = async () => {
  try {
    const session = await auth();
    return session?.user || null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}