import { Search, ShoppingBag } from "lucide-react"
import React from "react"
import { NavLink } from "react-router-dom"
import logoHeader from '../../images/logo-header.png'

const Header = () => {

  const productCategories = [
    {name: 'Clothing', url: '/products/clothing'},
    {name: 'Electronics', url: '/products/electronics'},
    {name: 'Home and Living', url: '/products/home-and-living'},
    {name: 'Toys and Games', url: '/products/toys-and-games'},
    {name: 'Pet', url: '/products/pet'},
    {name: 'Handicrafts', url: '/products/handicrafts'},
    {name: 'Agricultural Products', url: '/products/agricultural-products'},
    {name: 'Trinkets and Accessories', url: '/products/trinkets-and-accessories'},
  ]

  return (
    <header className="w-full">
      <div className="w-full flex justify-center py-1">
        <h1 className="font-body text-sm font-semibold text-gray-600">🛒 KAPITON IS IN EARLY DEVELOPMENT</h1>
      </div>
      <div className="relative w-full flex justify-between bg-primaryContrast items-center text-white md:min-h-20 px-6">
        <img src={logoHeader} alt="Kapiton Logo" className="md:max-h-14 w-auto" />
        <div className="font-primary absolute left-1/2 transform -translate-x-1/2 flex gap-x-4 font-semibold">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/">PRODUCTS</NavLink>
          <NavLink to="/">MERCHANTS</NavLink>
        </div>
        {/* dynamic based on login data */}
        <div className="flex font-body gap-x-4 text-sm items-center">
          <NavLink to="/">Become a Seller</NavLink>
          <NavLink to="/">Login/Register</NavLink>
          <NavLink to="/"><ShoppingBag /></NavLink>
        </div>
      </div>
      <div className="py-2 px-6 flex items-center justify-between">
        <div className="font-body text-xs gap-x-6 flex">
          {productCategories.map((pc) => (
            <React.Fragment key={pc.name}>
              <NavLink to={pc.url}>{pc.name}</NavLink>
            </React.Fragment>
          ))}
        </div>
        <div>
          <Search className="h-5" />
        </div>
      </div>
    </header>
  )
}

export default Header