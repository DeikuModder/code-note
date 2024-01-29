import { useState, type FormEventHandler } from "react";

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");

  if (errorMessage !== "") {
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  }

  const handleSignin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    "error" in data
      ? setErrorMessage(data.error)
      : window.location.replace("/dashboard");
  };

  return (
    <>
      <h2 className="text-3xl font-bold">Sign in</h2>
      <form
        className="flex flex-col border border-neutral-700 p-3 rounded-xl w-9/12 aspect-square gap-8 items-center justify-center md:w-[400px]"
        id="signin"
        onSubmit={handleSignin}
      >
        <label className="text-xl h-9 rounded-xl p-1 max-w-[250px]">
          Email
          <input
            className="w-full rounded-xl h-full p-1 border border-black"
            type="email"
            name="email"
          />
        </label>

        <label className="text-xl h-9 rounded-xl p-1 max-w-[250px]">
          Password
          <input
            className="w-full rounded-xl h-full p-1 border border-black"
            type="password"
            name="password"
          />
        </label>

        <button
          className="text-xl font-medium w-1/3 text-slate-200 rounded-lg text-center p-1 bg-neutral-900 md:text-2xl transition-all hover:scale-105"
          type="submit"
        >
          Sign in
        </button>
        {errorMessage && (
          <p className="rounded-lg py-2 px-4 text-center text-white max-w-full bg-red-700">
            {errorMessage}
          </p>
        )}
      </form>
    </>
  );
}

export default LoginForm;
