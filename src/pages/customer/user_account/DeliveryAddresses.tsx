import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useAppContext } from "@context/AppContext";
import { Map, Marker, useMapsLibrary, useMarkerRef } from '@vis.gl/react-google-maps';
import { useMutation, useQuery } from "@tanstack/react-query";
import { Select, useMessageDialog } from "@components";
import { 
  customerDeliveryAddresses, 
  customerNewDeliveryAddresses,
  customerDeleteDeliveryAddress 
} from "@api";


export default () => {
  const geocodingLib = useMapsLibrary('geocoding');
  const { showMessage } = useMessageDialog();
  const [markerRef] = useMarkerRef();
  const { state } = useAppContext();
  const [markerPosition, setMarkerPosition] = useState({ lat: 14.5806494, lng: 121.0203798 });
  // Replace with your actual token source
  const { data, isLoading, error } = useQuery({
    queryKey: ["customerDeliveryAddresses"],
    queryFn: () => customerDeliveryAddresses(state.token)
  });

  const newDeliveryAddressMutation = useMutation({
    mutationFn: (formData) => customerNewDeliveryAddresses(state.token, formData),
    onSuccess: (resp) => {
      showMessage({
        open: true,
        message: resp.message,
        type: "success",
        title: "New Delivery Address"
      });
      let newAddress = resp.data;
      data.push(newAddress);
      setCreating(false);
      setSaving(false)
    },
    onError: (error) => {
      showMessage({
        open: true,
        message: error.message,
        type: "error",
        title: "New Delivery Address"
      });
      setSaving(false)
      if (error.errors)
        setFormError(Object.values(error.errors)[0]);
    }
  })

  const rmDeliveryAddressMutation = useMutation({
    mutationFn: (id) => customerDeleteDeliveryAddress(state.token, id),
    onSuccess: (resp) => {
      if (resp.success) {
        let m = data.findIndex(f => f.id == resp.data.id)
        data.splice(m, 1);

        showMessage({
          open: true,
          message: resp.message,
          type: "success",
          title: "Deleted Delivery Address"
        });
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  // Form state for new address
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "Metro Manila",
    country: "Philippines",
    pincode: "",
    mobile: "",
    lat: markerPosition.lat,
    lng: markerPosition.lng
  });
  const [saving, setSaving] = useState(false)
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("")

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    var geo_obj = new geocodingLib.Geocoder;
    // If the address field changes, geocode and update marker
    if (typeof(geo_obj) == 'object' && ['address', 'city', 'state'].find(v => v === field)) {
      geo_obj.geocode({ address: value }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setMarkerPosition({ lat: lat(), lng: lng() });
          setForm(prev => ({ ...prev, lat: lat(), lng: lng() }));
        }
      });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true)
    // Replace with your actual API call to create address
    newDeliveryAddressMutation.mutate(form)
  };

  const handleMapClick = (e) => {
    const position = e.detail.latLng
    setMarkerPosition(position)
    setForm(prev => ({ ...prev, 
      ...position
    }));

    var geo_obj = new geocodingLib.Geocoder;
    // If the address field changes, geocode and update marker
    geo_obj.geocode({location: position}, (results, status) => {
      if (status === 'OK' && results[0]) {
        let address_arr = results[0].address_components.map(value => {
          let m = value.types.find(f => ['street_number', 'plus_code', 'street', 'route', 'sublocality'].includes(f))
          return m ? value.long_name:false
        }).filter(l => l);
        let address = address_arr.join(", ")

        let city = results[0].address_components.find(value => 
          value.types.find(f => f == 'locality')
        )?.long_name || "";

        let zipcode = results[0].address_components.find(value => 
          value.types.find(f => f == 'postal_code')
        )?.long_name || "";
        
        setForm(prev => ({...prev, address: address, city: city, pincode: zipcode }))
      }
    });
  }

  const handleDeleteAddress = (value) => {
    rmDeliveryAddressMutation.mutate(value)
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
        <div className="flex justify-between items-center mb-3">
          <button className="btn btn-primary bg-primary font-semibold rounded px-3 py-2" onClick={() => setCreating(true)}>Add New Address</button>
        </div>
        {creating && (
          <form className="mt-4 grid gap-2" onSubmit={handleCreate}>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-4">
                {/* Recipient + Phone Row */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="border p-2 rounded w-full"
                    placeholder="Recipient Name"
                    value={form.name}
                    onChange={e => handleChange("name", e.target.value)}
                  />
                  <div className="flex items-center border rounded p-2">
                    <span className="mr-2 text-gray-500">+63</span>
                    <input
                      className="flex-1 outline-none"
                      placeholder="Phone Number"
                      value={form.mobile}
                      onChange={e => handleChange("mobile", e.target.value)}
                    />
                  </div>
                </div>

                {/* Street Address */}
                <input
                  className="border p-2 rounded w-full"
                  placeholder="Street Address"
                  value={form.address}
                  onChange={e => handleChange("address", e.target.value)}
                />

                {/* City + Province Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
                    <input
                      className="border p-2 pb-1 rounded w-full"
                      value={form.city}
                      onChange={e => handleChange("city", e.target.value)}
                    />
                  </div>
                  <Select
                    label="Province"
                    options={statesQuery.data}
                    value={form.state}
                    onChange={e => handleChange("state", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Country */}
                  <input
                    className="border p-2 rounded w-full"
                    placeholder="Country"
                    value={form.country}
                    onChange={e => handleChange("country", e.target.value)}
                  />

                  {/* ZIP */}
                  <input
                    className="border p-2 rounded w-full"
                    placeholder="ZIP"
                    value={form.pincode}
                    onChange={e => handleChange("pincode", e.target.value)}
                  />
                </div>
              </div>

              <div className="colspan-4 iframe-map rounded overflow-hidden">
                <Map
                  style={{ width: '100%', height: '100%' }}
                  defaultCenter={markerPosition}
                  center={markerPosition}
                  defaultZoom={15}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                  onClick={handleMapClick}
                >
                  <Marker ref={markerRef} position={markerPosition} title={form.address} />
                </Map>
              </div>
            </div>

            <div className="flex justify-between mt-3 gap-2">
              <span className="text-sm text-red-600 font-bold">{formError}</span>
              <div className="flex gap-2">
                {!saving && (
                  <button className="btn btn-primary mt-2 px-4 py-2 rounded bg-primary" type="submit">Save Address</button>
                )}
                <button className="btn btn-secondary mt-2 px-4 py-2 rounded bg-red-500" type="button" onClick={() => setCreating(false)}>Cancel</button>
              </div>
            </div>
          </form>
        )}
        <div><h1 className="font-bold text-2xl">List</h1></div>
        <div className="grid grid-cols-3 gap-4 mt-3">
          {data && data.length > 0 ? (
            data.map((address: any, idx: number) => (
              <div key={idx} className="delivery-address-details p-4 border rounded w-full">
                <div className="flex justify-between">
                  <h1 className="font-semibold text-2xl">{address.name}</h1>
                  <Trash2 
                    className="text-red-500 text-sm cursor-pointer" 
                    onClick={() => handleDeleteAddress(address.id)} 
                  />
                </div>
                <div><span className="font-semibold">Mobile:</span> {address.mobile}</div>
                <div><span className="font-semibold">Street:</span> {address.address}</div>
                <div><span className="font-semibold">City:</span> {address.city}</div>
                <div><span className="font-semibold">Province:</span> {address.state}</div>
                <div><span className="font-semibold">Country:</span> {address.country}</div>
                <div><span className="font-semibold">ZIP:</span> {address.pincode}</div>
              </div>
            ))
          ) : (
            isLoading ? <div>Loading...</div>:<div>No delivery addresses found.</div>
          )}
        </div>
      </div>
    </>
  );
}