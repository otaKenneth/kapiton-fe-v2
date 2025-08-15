import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendForgotPassEmail } from '@api'

export default () => {
  const [form, setForm] = useState({
    email: ""
  });

  const submitForgotPassEmail = useMutation({
    mutationFn: (formData) => sendForgotPassEmail(formData),
    onSuccess: (resp) => {
      console.log(resp)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleSumit = (e) => {
    e.preventDefault();
    submitForgotPassEmail.mutate(form)
  }

  return (
    <>
      <div className="bg-primaryBackground px-6 w-full py-8 sm:py-12 md:py-16">
        <div className="mb-4 m-auto font-bold text-5xl text-gray-600 text-center text-primary">
          FORGOT YOUR PASSWORD?
        </div>
        <div className="text-center">
          We will send you an email to reset your password
        </div>
        
        <div className="w-full flex items-center flex-col pt-8">
          <form className="flex flex-col gap-y-2 text-sm font-body" action="javascript:;" onSubmit={handleSumit}>
            <input 
              type="text" 
              placeholder="Email" 
              className="w-[20rem] bg-white font-body px-4 py-2 rounded-lg border-[1px] border-primaryContrast" 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <span className="text-sm text-red error"></span>

            <div className="mt-9 flex flex-col gap-y-2">
              <button type="submit" className="font-primary font-bold bg-primaryContrast px-8 py-2 w-[20rem] text-white flex justify-center items-center rounded-full">Submit</button>

              <a href="/auth/customer" className="underline text-center mt-4">Back to Login</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}