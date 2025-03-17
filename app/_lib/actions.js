"use server";
import { addUsertoDB } from "./data-service";
import { supabase } from "./supabase";
import { setSession, getSession } from "./auth"; // Import session handler
export async function RegisterUser(formData) {
  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email"),
    password: formData.get("password"),
    options: {
      user_metadata: {
        display_name: formData.get("fullName"),
      },
    },
  });

  if (error) {
    console.log("Cannot register", error);
    return { error };
  }

  // Store user in the database even if email is not confirmed
  await addUsertoDB(data.user.id, data.user.email, {
    name: formData.get("name"),
    emailConfirmed: data.user.email_confirmed_at ? true : false,
  });

  if (data?.user && data?.session) {
    await setSession(data.session); // Store session in cookies
  }

  console.log("REGISTER DATA", data);
  return {
    user: data.user,
    session: data.session,
    message:
      "Your account has been created. Please check your email to confirm before logging in.",
  };
}

export async function Login(formData) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (error) {
      console.error("Login error:", error.message);
      return { error: error.message };
    }

    if (data?.session) {
      await setSession(data.session); // Store full session in cookies
    }

    console.log("LOGIN SUCCESS", data);
    return { user: data.user, session: data.session };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}
