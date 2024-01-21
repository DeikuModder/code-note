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
        className="flex flex-col border border-neutral-700 p-3 rounded-xl w-9/12 aspect-square gap-8 items-center justify-center"
        id="signin"
        onSubmit={handleSignin}
      >
        <label className="text-xl h-9 rounded-xl p-1">
          Email
          <input
            className="w-full rounded-xl h-full p-1"
            type="email"
            name="email"
          />
        </label>

        <label className="text-xl h-9 rounded-xl p-1">
          Password
          <input
            className="w-full rounded-xl h-full p-1"
            type="password"
            name="password"
          />
        </label>

        <label className="w-1/3">
          <input
            type="submit"
            value="Signin"
            className="text-xl font-medium w-full text-slate-200 rounded-xl text-center p-1"
            style={{ backgroundColor: "#141222" }}
          />
        </label>
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
