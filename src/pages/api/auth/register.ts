import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    const password = data.get("password")?.toString();
    const email = data.get("email")?.toString();

    //validations
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

    const res = await supabase.auth.signUp({
      email,
      password,
    });

    if (res.error) {
      return new Response(JSON.stringify({ error: res.error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ message: "Success!" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "An error ocurred" }), {
      status: 500,
    });
  }
};
