import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import {becomeMerchant} from "@api";

const BecomeMerchant = () => {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const becomeMerchantMutation = useMutation({
    mutationFn: (formData) => becomeMerchant(formData),
    onSuccess: (resp) => {
      console.log(resp)
      setForm({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        shop_name: "",
        wdyfu: ""
      });
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    }
  });

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    shop_name: "",
    wdyfu: "facebook"
  });

  useEffect(() => {
    grecaptcha.enterprise.ready(() => {
      grecaptcha.enterprise.execute("6Lc8YjErAAAAAI4c_4rpCJVI0VjevDquLHmRe17X")
        .then((token) => {
          if (token) {
            setEnableSubmit(true);
            setForm((prevForm) => ({
              ...prevForm,
              "g-recaptcha-response": token
            }));
          }
        })
    })
  }, [grecaptcha.enterprise]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    becomeMerchantMutation.mutate(form);
  }

  return (
    <div className="elementor py-10">
      <div className="e-con flex flex-wrap justify-around">
        <div className="e-con">
          <div><img src="/src/images/2024-04-become-next-merchant2.png" alt="shopping cart" /></div>
          <div className="text-left uppercase text-5xl font-bold">Become</div>
          <div className="text-left uppercase text-5xl font-bold">The Next</div>
          <div className="text-left uppercase text-5xl font-bold">Kapiton Merchant!</div>
        </div>
        <div className="e-con">
          <div className="bg-white rounded-md py-10 px-5 flex flex-col">
            <div className="title font-bold text-2xl text-center">Let's Talk!</div>
            <div className="text-center">We will get in touch with you within 7 days.</div>
            <div className="my-5"></div>
            <div className="form-group">
              <div className="title-2 text-xl">Business Owner / Representative</div>
              <div className="text-input-container space-y-3">
                <Input label="First Name" id="firstname" value={form.firstname} onChange={(e) => setForm({ ...form, firstname: e.target.value })} />
                <Input label="Last Name" id="lastname" value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
                <span className="error-message text-red-500 text-sm"></span>
              </div>
            </div>
            <div className="form-group">
              <div className="title-2 text-xl">Contact Details</div>
              <div className="text-input-container space-y-3">
                <Input label="Email" id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input label="Contact Number" id="contact_no" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
                <span className="error-message text-red-500 text-sm"></span>
              </div>
            </div>
            <div className="form-group">
              <div className="title-2 text-xl">Business Name</div>
              <div className="text-input-container">
                <div>
                  <Input label="Business Name" id="business_name" value={form.shop_name} onChange={(e) => setForm({ ...form, shop_name: e.target.value })} />
                </div>
                <span className="error-message text-red-500 text-sm"></span>
              </div>
            </div>
            <div className="form-group">
              <div className="text-input-container">
                <Select label="Where did you find us?" id="referral_source" options={[
                  { value: "facebook", label: "Facebook" },
                  { value: "instagram", label: "Instagram" },
                  { value: "linkedin", label: "LinkedIn" },
                  { value: "referral", label: "Referral" },
                  { value: "word-of-mouth", label: "Word of Mouth" },
                ]} value={form.wdyfu} onChange={(e) => setForm({ ...form, wdyfu: e.target.value })} />
                <span className="error-message text-red-500 text-sm"></span>
              </div>
            </div>
            <div id="recaptcha-container"></div>
            {enableSubmit ? (
              <div className="flex justify-center items-center">
                <button 
                  className="g-recaptcha btn primary"
                  type="submit" onClick={handleSubmit}>Submit</button>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <span>Waiting for reCaptcha verification...</span>
              </div>
            )}
          </div>
        </div>
        <div className="e-con"></div>
      </div>
    </div>
  );
}

export default BecomeMerchant;