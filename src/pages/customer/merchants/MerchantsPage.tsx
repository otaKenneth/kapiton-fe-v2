import { Outlet, useMatch } from 'react-router-dom'

const MerchantsPage = () => {

  const merchants = [
  {
    photo: "",
    name: "Green Leaf Bistro",
    owner: "Liam Nguyen",
    address: "45 Elm Street, Austin, TX 73301",
    reviews: null,
    id: "cafe-002"
  },
  {
    photo: "",
    name: "Blue Moon Bakery",
    owner: "Sofia Martinez",
    address: "88 Ocean Blvd, Santa Monica, CA 90401",
    reviews: null,
    id: "cafe-003"
  },
  {
    photo: "",
    name: "Rustic Grind",
    owner: "Jackson Lee",
    address: "210 River Road, Boise, ID 83702",
    reviews: null,
    id: "cafe-004"
  },
  {
    photo: "",
    name: "Copper Kettle Cafe",
    owner: "Isabella Harris",
    address: "9 Maple Lane, Portland, ME 04101",
    reviews: null,
    id: "cafe-005"
  },
  {
    photo: "",
    name: "Velvet Bean",
    owner: "Ethan Johnson",
    address: "321 Pine Avenue, Denver, CO 80203",
    reviews: null,
    id: "cafe-006"
  },
  {
    photo: "",
    name: "Golden Hour Espresso",
    owner: "Mia Patel",
    address: "777 Sunset Drive, San Diego, CA 92101",
    reviews: null,
    id: "cafe-007"
  },
  {
    photo: "",
    name: "Crimson Cup",
    owner: "Noah Brown",
    address: "64 Broadway Ave, Nashville, TN 37203",
    reviews: null,
    id: "cafe-008"
  },
  {
    photo: "",
    name: "The Cozy Mug",
    owner: "Amelia Garcia",
    address: "501 Spruce St, Madison, WI 53703",
    reviews: null,
    id: "cafe-009"
  },
  {
    photo: "",
    name: "Willow & Oak",
    owner: "James Anderson",
    address: "180 Forest Way, Asheville, NC 28801",
    reviews: null,
    id: "cafe-010"
  },
  {
    photo: "",
    name: "Morning Roast",
    owner: "Charlotte Wilson",
    address: "299 Bay Street, Savannah, GA 31401",
    reviews: null,
    id: "cafe-011"
  }
]

  const isIndex = useMatch('/merchants');

  return (
    <div className='bg-primaryBackground px-2 pt-8 md:pt-0 sm:px-4 md:px-6'>
      <h1 className="font-primary text-center font-bold text-primary py-8 sm:py-12 md:py-16 text-3xl sm:text-5xl md:text-6xl">
          MERCHANTS
      </h1>
      {isIndex && (
        <div className='px-6 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 sm:gap-x-4 gap-y-6 py-4 sm:py-8'>
          {merchants.map((m) => (
            <div key={m.id} className='bg-white py-6 sm:py-8 rounded-2xl flex flex-col items-center min-h-[22rem] sm:min-h-[26rem] md:min-h-[30rem] px-2 sm:px-4'>
              <div className='h-24 w-24 sm:h-32 sm:w-32 bg-primary'></div>
              <div className='mt-4 text-center px-2 sm:px-4'>
                <h1 className='font-primary font-bold text-base sm:text-lg'>{m.name}</h1>
                <p className='font-body text-xs sm:text-sm mt-2'>{m.owner}</p>
                <p className='font-body text-xs sm:text-sm'>{m.address}</p>
              </div>
              <div className='mt-6 flex flex-col items-center gap-y-4'>
                <p className='font-body font-semibold text-xs sm:text-sm'>{m.reviews ? m.reviews : 'No Reviews'}</p>
                <a href={`/merchants/${m.id}`} className='bg-primaryContrast text-white rounded-full px-6 sm:px-8 py-2 text-xs sm:text-base'>View Store</a>
              </div>
            </div>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  )
}

export default MerchantsPage