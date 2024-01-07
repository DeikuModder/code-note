import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === null || password === null) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing fields" }),
        { status: 400 }
      );
    }

    if (email === undefined || password === undefined) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing fields" }),
        { status: 400 }
      );
    }

    if (password.length < 3) {
      return new Response(
        JSON.stringify({
          error: "Password must be greater than 3 digits",
        }),
        { status: 422 }
      );
    }

    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Not a valid email!" }), {
        status: 422,
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message, error.name);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 422,
      });
    }

    const { access_token, refresh_token } = data.session;
    cookies.set("sb-access-token", access_token, {
      path: "/",
      httpOnly: true,
    });
    cookies.set("sb-refresh-token", refresh_token, {
      path: "/",
      httpOnly: true,
    });
    return redirect("/dashboard");
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error has ocurred" }), {
      status: 500,
    });
  }
};
