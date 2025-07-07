import { Search, ShoppingBag, X } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import logoHeader from '../../images/logo-header.png'

const Header = ({ onCartClick }: { onCartClick?: () => void }) => {
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

  const [showHeader, setShowHeader] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setShowHeader(false); // scroll down, hide
      } else {
        setShowHeader(true); // scroll up, show
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full transition-transform duration-300 z-50 ${showHeader ? 'translate-y-0' : '-translate-y-full'} fixed top-0 left-0`}> 
      <div className="w-full flex justify-center py-1 bg-white z-[99]">
        <h1 className="font-body text-sm font-semibold text-gray-600">🛒 KAPITON IS IN EARLY DEVELOPMENT</h1>
      </div>
      <div className="relative w-full flex justify-between bg-primaryContrast items-center text-white md:min-h-20 px-6">
        <a href="/"><img src={logoHeader} alt="Kapiton Logo" className="md:max-h-14 w-auto" /></a>
        <div className="font-primary absolute left-1/2 transform -translate-x-1/2 flex gap-x-4 font-semibold">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/products/collections/all">PRODUCTS</NavLink>
          <NavLink to="/merchants">MERCHANTS</NavLink>
        </div>
        {/* dynamic based on login data */}
        <div className="flex font-body gap-x-4 text-sm items-center">
          <NavLink to="/">Become a Seller</NavLink>
          <NavLink to="/auth/customer">Login/Register</NavLink>
          <button type="button" onClick={onCartClick} className="flex items-center"><ShoppingBag /></button>
        </div>
      </div>
      <div className="py-2 px-6 flex items-center justify-between bg-white relative">
        <div className="font-body text-xs gap-x-6 flex">
          {productCategories.map((pc) => (
            <React.Fragment key={pc.name}>
              <NavLink to={pc.url} className="hover:text-primary">{pc.name}</NavLink>
            </React.Fragment>
          ))}
        </div>
        <div>
          <button type="button" onClick={() => setShowSearch((v) => !v)} className="p-1"><Search className="h-5" /></button>
          {showSearch && (
            <form className="absolute right-4 mt-4 bg-white shadow-lg rounded-xl flex items-center p-2 z-50 border" onSubmit={e => { e.preventDefault(); setShowSearch(false); }}>
              <input
                type="text"
                placeholder="Search products..."
                className="rounded-lg px-2 py-2 text-sm focus:outline-none font-body"
                autoFocus
              />
              <button type="submit" className="ml-2 p-2 bg-primary text-white rounded flex items-center" aria-label="Search">
                <Search className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => setShowSearch(false)} className="ml-1 p-2 text-gray-500 hover:text-red-500 rounded flex items-center" aria-label="Close search">
                <X className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header