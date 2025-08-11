import Input from "@components/ui/Input";
import Select from "@components/ui/Select";

const BecomeMerchant = () => {
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
                <Input label="First Name" id="first_name" />
                <Input label="Last Name" id="last_name" />
                <span className="error-message text-red-500 text-sm"></span>
              </div>
            </div>
            <div className="form-group">
              <div className="title-2 text-xl">Contact Details</div>
              <div className="text-input-container space-y-3">
                <Input label="Email" id="email" />
                <Input label="Contact Number" id="contact_no" />
                <span className="error-message text-red-500 text-sm"></span>
              </div>
            </div>
            <div className="form-group">
              <div className="title-2 text-xl">Business Name</div>
              <div className="text-input-container">
                <div>
                  <Input label="Business Name" id="business_name" />
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
                ]} />
                <span className="error-message text-red-500 text-sm"></span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button type="submit" className="btn primary">Submit</button>
            </div>
          </div>
        </div>
        <div className="e-con"></div>
      </div>
    </div>
  );
}

export default BecomeMerchant;