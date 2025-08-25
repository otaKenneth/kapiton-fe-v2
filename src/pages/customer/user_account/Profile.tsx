import { useState } from "react";
import { MDTextField, Select, useMessageDialog, TextField } from "@components";
import { useAppContext } from "@context/AppContext";
import { saveCustomerProfileInfo } from "@api"
import { useMutation, useQuery } from "@tanstack/react-query";

export default () => {
  const { state, setState } = useAppContext();
  const { showMessage } = useMessageDialog();

  const customerProfileInfoMutation = useMutation({
    mutationFn: (formData) => saveCustomerProfileInfo(state.token, formData),
    onSuccess: (resp) => {
      showMessage({
        open: true,
        message: resp.message,
        type: "success",
        title: "Profile update."
      })
      let userState = state.user
      userState = {...userState, ...form};
      setState({...state, 
        user: userState
      })
      localStorage.setItem('user', JSON.stringify(userState))
      setEditing(false)
    },
    onError: (error) => {
      setSaving(false)
      showMessage({
        open: true,
        message: error.message,
        type: "error",
        title: "Profile update."
      })
      if (error.errors != undefined) {
        setFormErrors(error.errors)
      }
    },
  });

  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: state.user.first_name || "",
    last_name: state.user.last_name || "",
    mobile: state.user.mobile || "",
    email: state.user.email || "",
    address: state.user.address || "",
    city: state.user.city || "",
    state: state.user.state || "",
    country: state.user.country || "Philippines",
    pincode: state.user.pincode || ""
  });
  const [formErrors, setFormErrors] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleEdit = () => setEditing(true);
  const handleCancel = () => setEditing(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true)
    customerProfileInfoMutation.mutate(form);
  };

  const [country, setCountry] = useState([
    {
      value: "Philippines",
      label: "Philippines"
    }
  ])

  const statesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/states/q?country=Philippines");
      return await res.json();
    },
    initialData: [],
    select: (resp) => resp.data.states.map(state => {
      return {
        value: state.name,
        label: state.name
      }
    })
  });

  return (
    <div className="">
      {/* Display View */}
      {!editing && (
        <div className="display-view bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-row justify-between align-items-center">
            <h2 className="font-bold text-2xl mb-4">Profile Information</h2>
            <button className="btn btn-primary bg-primary h-7 px-6 font-semibold rounded" onClick={handleEdit}>Edit</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">First Name:</span> <span>{state.user.first_name}</span>
            </div>
            <div>
              <span className="font-semibold">Last Name:</span> <span>{state.user.last_name}</span>
            </div>
            <div>
              <span className="font-semibold">Mobile:</span> <span>{state.user.mobile ?? "Not Set"}</span>
            </div>
            <div>
              <span className="font-semibold">Email:</span> <span>{state.user.email}</span>
            </div>
            <div className="md:col-span-2">
              <span className="font-semibold">Address:</span> <span>{state.user.address ?? "Not Set"}</span>
            </div>
          </div>
        </div>
      )}
      {/* Form View */}
      {editing && (
        <div className="form-view bg-white rounded-lg shadow p-6 mb-6">
          <div className="form-group mb-3">
            <div className="mb-3">
              <h1 className="font-bold text-xl">Name</h1>
            </div>
            <div className="flex flex-wrap gap-4">
              <div>
                <MDTextField label="First Name" value={form.first_name} 
                  onChange={e => handleChange('first_name', e.target.value)} 
                  err={formErrors.first_name}
                />
              </div>
              <div>
                <MDTextField label="Last Name" value={form.last_name} 
                  onChange={e => handleChange('last_name', e.target.value)}
                  err={formErrors.last_name}
                />
              </div>
            </div>
          </div>
          <div className="form-group mb-3">
            <div className="mb-3">
              <h1 className="font-bold text-xl">Contact Information</h1>
            </div>
            <div className="flex flex-wrap gap-4">
              <div>
                <MDTextField label="Mobile" value={form.mobile} 
                  onChange={e => handleChange('mobile', e.target.value)} 
                  err={formErrors.mobile}
                />
              </div>
              <div>
                <MDTextField label="Email" value={form.email} 
                  onChange={e => handleChange('email', e.target.value)} 
                  err={formErrors.email}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="mb-3">
              <h1 className="font-bold text-xl">Address</h1>
            </div>
            <div className="w-100 mb-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <MDTextField label="Address" value={form.address} 
                  onChange={e => handleChange('address', e.target.value)} 
                  err={formErrors.address}
                />
              </div>
              <div>
                <MDTextField label="City" value={form.city} 
                  onChange={e => handleChange('city', e.target.value)} 
                  err={formErrors.city}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <Select label="Province" options={statesQuery.data} 
                value={form.state} 
                onChange={e => handleChange('state', e.target.value)}
              />
              <Select label="Country" options={country} 
                value={form.country} 
                onChange={e => handleChange('country', e.target.value)}
              />
              <div>
                <span className="error-message text-red-500 text-sm">{formErrors.state}</span>
              </div>
            </div>
            <div className="mb-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <MDTextField label="ZIP Code" value={form.pincode} 
                  onChange={e => handleChange('pincode', e.target.value)}
                  err={formErrors.pincode}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button className={[
              "btn btn-primary bg-primary px-6 py-2 font-semibold rounded",
              saving ? "bg-gray-300":""
            ].join(" ")} disabled={saving} onClick={handleSave}>
              {saving ? "Saving...":"Save"}
            </button>
            <button className="btn btn-secondary px-6 py-2 font-semibold rounded" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}