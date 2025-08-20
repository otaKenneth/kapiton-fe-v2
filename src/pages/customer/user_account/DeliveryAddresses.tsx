import { useState , useEffect} from "react";
import { useAppContext } from "@context/AppContext";
import { Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useMutation, useQuery } from "@tanstack/react-query";
import { Select } from "@components";
import { 
  customerDeliveryAddresses, 
  customerNewDeliveryAddresses 
} from "@api";


export default () => {
  const map = useMap();
  const geocodingLib = useMapsLibrary('geocoding');
  const { state } = useAppContext();
  const [markerPosition, setMarkerPosition] = useState({ lat: 14.5806494, lng: 121.0203798 });
  // Replace with your actual token source
  const { data, error } = useQuery({
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

  useEffect(() => {
    if (!map && !geocodingLib) return;
  }, [map, geocodingLib]);

  // Form state for new address
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    province: "Metro Manila",
    country: "Philippines",
    pincode: "",
    mobile: "",
    lat: markerPosition.lat,
    lng: markerPosition.lng
  });
  const [creating, setCreating] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // If the address field changes, geocode and update marker
    // if (geocodingLib !== null && ['address', 'city', 'province'].find(v => v === field)) {
    //   geocodingLib.Geocoder.geocode({ address: value }, (results, status) => {
    //     if (status === 'OK' && results[0]) {
    //       const { lat, lng } = results[0].geometry.location;
    //       setMarkerPosition({ lat: lat, lng: lng });
    //       setForm(prev => ({ ...prev, lat: lat, lng: lng }));
    //     }
    //   });
    // }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your actual API call to create address
    newDeliveryAddressMutation.mutate(form)
    setCreating(false);
    // Optionally refetch addresses here
  };

  const handleMapClick = (e) => {
    console.log(e)
  }

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
            <div className="grid grid-cols-2 gap-4">
              <div className="colspan-5 grid gap-2">
                <input className="border p-2 rounded" placeholder="Recipient Name" value={form.name} onChange={e => handleChange('recipient', e.target.value)} />
                <input className="border p-2 rounded" placeholder="Phone Number" value={form.mobile} onChange={e => handleChange('phone', e.target.value)} />
                <input className="border p-2 rounded" placeholder="Street Address" value={form.address} onChange={e => handleChange('address', e.target.value)} />
                <input className="border p-2 rounded" placeholder="City" value={form.city} onChange={e => handleChange('city', e.target.value)} />
                <Select 
                  label="Province" 
                  options={statesQuery.data} 
                  value={form.province} 
                  onChange={e => handleChange('province', e.target.value)}
                />
                <input className="border p-2 rounded" placeholder="Country" value={form.country} onChange={e => handleChange('country', e.target.value)} />
                <input className="border p-2 rounded" placeholder="ZIP" value={form.pincode} onChange={e => handleChange('zip', e.target.value)} />
              </div>

              <div className="colspan-4 iframe-map rounded overflow-hidden">
                <Map
                    style={{ width: '100%', height: '100%' }}
                    defaultCenter={markerPosition}
                    defaultZoom={15}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    onClick={handleMapClick}
                  >
                    <Marker position={markerPosition} title={form.address} />
                  </Map>
              </div>
            </div>

            <div className="flex justify-end mt-3 gap-2">
              <button className="btn btn-primary mt-2 px-4 py-2 rounded bg-primary" type="submit">Save Address</button>
              <button className="btn btn-secondary mt-2 px-4 py-2 rounded bg-red-500" type="button" onClick={() => setCreating(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}