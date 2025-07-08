const AuthPage = () => {
  return (
    <div className="bg-primaryBackground px-6 w-full pt-8 md:pt-0">
      <h1 className="font-primary text-center font-bold text-primary py-8 sm:py-12 md:py-16 text-3xl sm:text-5xl md:text-6xl">
        LOGIN
      </h1>

      <div className="w-full flex items-center flex-col pb-8">
        <form className="flex flex-col gap-y-2 text-sm font-body">
          <input type="text" placeholder="Email" className="w-[20rem] bg-white font-body px-4 py-2 rounded-lg border-[1px] border-primaryContrast" />
          <input type="password" placeholder="Password" className="w-[20rem] bg-white font-body px-4 py-2 rounded-lg border-[1px] border-primaryContrast" />
          <a href="/auth/customer/forgot-password" className="underline text-center">Forgot your password?</a>

          <div className="mt-12 flex flex-col gap-y-2">
            <button type="submit" className="font-primary font-bold bg-primaryContrast px-8 py-2 w-[20rem] text-white flex justify-center items-center rounded-full">SIGN IN</button>
            <button type="button" className="font-primary font-bold bg-primary px-8 py-2 w-[20rem] text-white flex justify-center items-center rounded-full">SIGN IN WITH GOOGLE</button>
            <a href="/auth/customer/forgot-password" className="underline text-center mt-4">Create Account</a>
          </div>
        </form>

        
      </div>
    </div>
  );
};

export default AuthPage;
