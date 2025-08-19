import { useState } from "react";
import { useAppContext } from "@context/AppContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { 
  customerDeliveryAddresses, 
  customerNewDeliveryAddresses 
} from "@api";

export default () => {
  const { state } = useAppContext();
  // Replace with your actual token source
  const { data, isLoading, error } = useQuery({
    queryKey: ["customerDeliveryAddresses"],
    queryFn: () => customerDeliveryAddresses(state.token)
  });

  const newDeliveryAddressMutation = useMutation({
    mutationFn: (formData) => customerNewDeliveryAddresses(state.token, formData),
    onSuccess: (resp) => {
      console.log(resp)
    },
    onError: (error) => {
      console.error(error)
    }
  })

  // Form state for new address
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    province: "",
    country: "",
    pincode: "",
    mobile: "",
    lat: "",
    lng: ""
  });
  const [creating, setCreating] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your actual API call to create address
    newDeliveryAddressMutation.mutate(form)
    setCreating(false);
    // Optionally refetch addresses here
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading addresses</div>;

  return (
    <>
      <div className="bg-white rounded-lg shadow px-3 py-3">
        <div className="grid gap-4">
          {data && data.addresses && data.addresses.length > 0 ? (
            data.addresses.map((address: any, idx: number) => (
              <div key={idx} className="delivery-address-details p-4 border rounded">
                <div><span className="font-semibold">Street:</span> {address.street}</div>
                <div><span className="font-semibold">City:</span> {address.city}</div>
                <div><span className="font-semibold">Province:</span> {address.province}</div>
                <div><span className="font-semibold">Country:</span> {address.country}</div>
                <div><span className="font-semibold">ZIP:</span> {address.zip}</div>
              </div>
            ))
          ) : (
            <div>No delivery addresses found.</div>
          )}
        </div>
        <div className="flex justify-between items-center mb-4">
          <button className="btn btn-primary bg-primary font-semibold rounded px-3 py-2" onClick={() => setCreating(true)}>Add New Address</button>
        </div>
        {creating && (
          <form className="mt-4 grid gap-2" onSubmit={handleCreate}>
              <input className="border p-2 rounded" placeholder="Recipient Name" value={form.name} onChange={e => handleChange('recipient', e.target.value)} />
              <input className="border p-2 rounded" placeholder="Phone Number" value={form.mobile} onChange={e => handleChange('phone', e.target.value)} />
              <input className="border p-2 rounded" placeholder="Street" value={form.address} onChange={e => handleChange('street', e.target.value)} />
              <input className="border p-2 rounded" placeholder="City" value={form.city} onChange={e => handleChange('city', e.target.value)} />
              <input className="border p-2 rounded" placeholder="Province" value={form.province} onChange={e => handleChange('province', e.target.value)} />
              <input className="border p-2 rounded" placeholder="Country" value={form.country} onChange={e => handleChange('country', e.target.value)} />
              <input className="border p-2 rounded" placeholder="ZIP" value={form.pincode} onChange={e => handleChange('zip', e.target.value)} />
            <button className="btn btn-primary mt-2" type="submit">Save Address</button>
            <button className="btn btn-secondary mt-2" type="button" onClick={() => setCreating(false)}>Cancel</button>
          </form>
        )}
      </div>
    </>   
  );
}