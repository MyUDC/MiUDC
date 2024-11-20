import { Session } from "next-auth";
import { getUserData } from "@/shared/actions/User/getUserData";

export async function canCreatePost(
  session: Session | null,
  postType: "TESTIMONY" | "QUESTION",
  currentCareerSlug: string
): Promise<{ allowed: boolean; alertType: "student" | "aspirant" | null }> {
  // If no session, always return aspirant alert
  if (!session?.user) {
    return { allowed: false, alertType: "aspirant" };
  }
  
  // Student-specific logic
  if (session.user.role === "STUDENT") {
    // Allow students to post questions anywhere
    if (postType === "QUESTION") {
      return { allowed: true, alertType: null };
    }

    // For testimonies, check if it's their own career
    if (postType === "TESTIMONY") {
      // Fetch user data to get the most up-to-date career information
      const userId = session.user.id;
      if (!userId) {
        return { allowed: false, alertType: "student" };
      }
      const userData = await getUserData(userId);
      
      // Check if user has a career and it matches the current career
      if (userData.career?.slug === currentCareerSlug) {
        return { allowed: true, alertType: null };
      }
      
      // Show alert if trying to post testimony in a different career
      return { allowed: false, alertType: "student" };
    }
  }

  // Aspirant-specific logic
  if (session.user.role === "ASPIRANT") {
    // Aspirants can only post questions
    if (postType === "TESTIMONY") {
      return { allowed: false, alertType: "aspirant" };
    }
    
    // Allow aspirants to post questions in any career
    return { allowed: true, alertType: null };
  }

  // Default case - disallow posting
  return { allowed: false, alertType: null };
}