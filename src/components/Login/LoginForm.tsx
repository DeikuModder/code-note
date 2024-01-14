function LoginForm() {
  return (
    <>
      <h2 className="text-3xl font-bold">Sign in</h2>
      <form
        className="flex flex-col border border-neutral-700 p-3 rounded-xl w-9/12 aspect-square gap-8 items-center justify-center"
        name="signin"
        action="/api/auth/signin"
        method="post"
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
      </form>
    </>
  );
}

export default LoginForm;
