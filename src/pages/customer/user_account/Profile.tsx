import { useState } from "react";
import { MDTextField, Select, TextField } from "@components";
import { useAppContext } from "@context/AppContext";
import { saveCustomerProfileInfo } from "@api"
import { useMutation, useQuery } from "@tanstack/react-query";

export default () => {
  const { state } = useAppContext();

  const customerProfileInfoMutation = useMutation({
    mutationFn: (token, formData) => saveCustomerProfileInfo(token, formData),
    onSuccess: (resp) => {
      console.log(resp)
    }
  });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: state.user.first_name || "",
    last_name: state.user.last_name || "",
    mobile: state.user.mobile || "",
    email: state.user.email || "",
    address: state.user.address || "",
    city: state.user.city || "",
    state: state.user.state || "",
    country: state.user.country || "",
    pincode: state.user.pincode || ""
  });

  const handleEdit = () => setEditing(true);
  const handleCancel = () => setEditing(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    customerProfileInfoMutation.mutate(state.token, form);
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
                <MDTextField label="First Name" value={form.first_name} onChange={e => handleChange('first_name', e.target.value)} />
              </div>
              <div>
                <MDTextField label="Last Name" value={form.last_name} onChange={e => handleChange('last_name', e.target.value)} />
              </div>
            </div>
          </div>
          <div className="form-group mb-3">
            <div className="mb-3">
              <h1 className="font-bold text-xl">Contact Information</h1>
            </div>
            <div className="flex flex-wrap gap-4">
              <div>
                <MDTextField label="Mobile" value={form.mobile} onChange={e => handleChange('mobile', e.target.value)} />
              </div>
              <div>
                <MDTextField label="Email" value={form.email} onChange={e => handleChange('email', e.target.value)} />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="mb-3">
              <h1 className="font-bold text-xl">Address</h1>
            </div>
            <div className="w-100 mb-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <MDTextField label="Address" value={form.address} onChange={e => handleChange('address', e.target.value)} />
              </div>
              <div>
                <MDTextField label="City" value={form.city} onChange={e => handleChange('city', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <Select label="Province" options={statesQuery.data} value={form.state} onChange={e => handleChange('state', e.target.value)} />
              <Select label="Country" options={country} value={form.country} onChange={e => handleChange('country', e.target.value)} />
            </div>
            <div className="mb-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <MDTextField label="ZIP Code" value={form.pincode} onChange={e => handleChange('pincode', e.target.value)} />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button className="btn btn-primary bg-primary px-6 py-2 font-semibold rounded" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary px-6 py-2 font-semibold rounded" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}