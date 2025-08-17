import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { TextField } from "@components";
import { customerLogin } from "@api"
import { useAppContext } from "@context/AppContext";

const AuthPage = () => {
  const { state, setState } = useAppContext();

  const [form, setForm] = useState({
    email: "", password: ""
  })
  const [errorObj, setErrorObj] = useState({
    message: ''
  });

  const customerLoginMutation = useMutation({
    mutationFn: (formData) => customerLogin(formData),
    onSuccess: (resp) => {
      setState({
        token: resp.data.token,
        user: resp.data.user
      })
      console.log(resp)
    },
    onError: (error) => {
      setErrorObj(error)
    }
  });

  const handleSumit = (e) => {
    e.preventDefault();
    customerLoginMutation.mutate(form)
  }

  if (state.token != null) {
    return (
      <div className="bg-primaryBackground px-6 w-full pt-8 md:pt-0">
        <h1 className="font-primary text-center font-bold text-primary py-8 sm:py-12 md:py-16 text-3xl sm:text-5xl md:text-6xl">
          You're already signed-in. Redirecting...
        </h1>
      </div>
    );
  }
  
  return (
    <div className="bg-primaryBackground px-6 w-full pt-8 md:pt-0">
      <h1 className="font-primary text-center font-bold text-primary py-8 sm:py-12 md:py-16 text-3xl sm:text-5xl md:text-6xl">
        LOGIN
      </h1>

      <div className="w-full flex items-center flex-col pb-8">
        <form className="flex flex-col gap-y-2 text-sm font-body" action="javascript:;" onSubmit={handleSumit} >
          <TextField type="text" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
          <TextField type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
          <span className="error-message text-red-500 text-sm">{errorObj.message}</span>
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
