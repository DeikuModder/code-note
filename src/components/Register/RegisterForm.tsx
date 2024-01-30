import { useState, type FormEventHandler } from "react";

function RegisterForm() {
  const [responseMessage, setResponseMessage] = useState("");
  const [errorClass, setErrorClass] = useState(false);

  if (responseMessage !== "") {
    setTimeout(() => {
      setResponseMessage("");
    }, 4000);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target as HTMLFormElement);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message);
        setTimeout(() => {
          window.location.replace("/signin");
        }, 5000);
      } else {
        data.error && setResponseMessage(data.error);
        setErrorClass(true);
      }
    } catch (error) {
      console.error(error);
      setResponseMessage("Internal server error");
      setErrorClass(true);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold">Sign Up</h2>
      <form
        className="flex flex-col border border-neutral-700 p-3 rounded-xl w-9/12 aspect-square gap-8 items-center justify-center md:w-[400px]"
        name="register"
        onSubmit={handleSubmit}
      >
        <label className="text-xl h-9 rounded-xl p-1 max-w-[250px]">
          Email:
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
          type="submit"
          className="bg-neutral-900 w-1/3 text-xl font-medium text-slate-200 rounded-lg text-center p-1 cursor-pointer md:text-2xl transition-all hover:scale-105"
        >
          Sign Up
        </button>
        <p
          className={`mt-4 ${!responseMessage ? "hidden" : ""} ${
            errorClass ? "bg-red-700" : "bg-green-500"
          }
        rounded-lg py-2 px-4 text-center text-white max-w-full`}
        >
          {responseMessage}
        </p>
      </form>
    </>
  );
}

export default RegisterForm;
