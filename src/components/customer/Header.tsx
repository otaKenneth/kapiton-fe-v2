import { Search, ShoppingBag, X, Menu } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import logoHeader from '../../images/logo-header.png'

const Header = ({ onCartClick }: { onCartClick?: () => void }) => {
  const productCategories = [
    {name: 'Clothing', url: '/products/collections/clothing'},
    {name: 'Electronics', url: '/products/collections/electronics'},
    {name: 'Home and Living', url: '/products/collections/home-and-living'},
    {name: 'Toys and Games', url: '/products/collections/toys-and-games'},
    {name: 'Pet', url: '/products/collections/pet'},
    {name: 'Handicrafts', url: '/products/collections/handicrafts'},
    {name: 'Agricultural Products', url: '/products/collections/agricultural-products'},
    {name: 'Trinkets and Accessories', url: '/products/collections/trinkets-and-accessories'},
  ]

  const [showHeader, setShowHeader] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMobileMenu && !(event.target as Element).closest('.mobile-menu')) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMobileMenu]);

  return (
    <header className={`w-full transition-transform duration-300 shadow-xl z-50 ${showHeader ? 'translate-y-0' : '-translate-y-full'} fixed top-0 left-0`}> 
      {/* Top banner - hidden on mobile */}
      <div className="w-full justify-center py-1 bg-white z-[99] hidden sm:flex">
        <h1 className="font-body text-sm font-semibold text-gray-600">🛒 KAPITON IS IN EARLY DEVELOPMENT</h1>
      </div>
      
      {/* Main header */}
      <div className="relative w-full flex justify-between bg-primaryContrast items-center text-white min-h-16 md:min-h-20 px-4 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img src={logoHeader} alt="Kapiton Logo" className="h-10 sm:h-12 md:max-h-14 w-auto" />
        </a>
        
        {/* Desktop Navigation - hidden on mobile */}
        <div className="font-primary absolute left-1/2 transform -translate-x-1/2 hidden lg:flex gap-x-4 font-semibold">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/products/collections/all">PRODUCTS</NavLink>
          <NavLink to="/merchants">MERCHANTS</NavLink>
        </div>
        
        {/* Right side actions */}
        <div className="flex font-body gap-x-2 sm:gap-x-4 text-xs sm:text-sm items-center">
          {/* Desktop auth links - hidden on mobile */}
          <div className="hidden md:flex gap-x-4">
            <NavLink to="/become-merchant">Become a Seller</NavLink>
            <NavLink to="/auth/customer">Login/Register</NavLink>
          </div>
          
          {/* Mobile auth links - compact */}
          <div className="flex md:hidden gap-x-2">
            <NavLink to="/auth/customer" className="text-xs">Login</NavLink>
          </div>
          
          {/* Cart button */}
          <button type="button" onClick={onCartClick} className="flex items-center p-2">
            <ShoppingBag className="h-5 w-5" />
          </button>
          
          {/* Mobile menu button */}
          <button 
            type="button" 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        
        {/* Mobile menu dropdown */}
        {showMobileMenu && (
          <div className="mobile-menu mt-8 font-primary text-sm absolute top-full left-0 w-full bg-primaryContrast border-t border-gray-600 lg:hidden">
            <div className="flex flex-col p-4">
              <NavLink to="/" className="py-2 border-b border-gray-600 last:border-b-0" onClick={() => setShowMobileMenu(false)}>
                HOME
              </NavLink>
              <NavLink to="/products/collections/all" className="py-2 border-b border-gray-600 last:border-b-0" onClick={() => setShowMobileMenu(false)}>
                PRODUCTS
              </NavLink>
              <NavLink to="/merchants" className="py-2 border-b border-gray-600 last:border-b-0" onClick={() => setShowMobileMenu(false)}>
                MERCHANTS
              </NavLink>
              <NavLink to="/become-merchant" className="py-2 border-b border-gray-600 last:border-b-0 md:hidden" onClick={() => setShowMobileMenu(false)}>
                Become a Seller
              </NavLink>
            </div>
          </div>
        )}
      </div>
      
      {/* Categories bar */}
      <div className="py-2 px-4 sm:px-6 flex gap-x-4 items-center justify-between bg-white relative">
        {/* Categories - responsive layout */}
        <div className="font-body text-xs gap-x-3 sm:gap-x-4 lg:gap-x-6 flex overflow-x-auto scrollbar-hide">
          {productCategories.map((pc) => (
            <React.Fragment key={pc.name}>
              <NavLink 
                to={pc.url} 
                className="hover:text-primary whitespace-nowrap flex-shrink-0"
              >
                {pc.name}
              </NavLink>
            </React.Fragment>
          ))}
        </div>
        
        {/* Search button */}
        <div className="flex-shrink-0">
          <button type="button" onClick={() => setShowSearch((v) => !v)} className="p-1">
            <Search className="h-5 w-5" />
          </button>
          
          {/* Search form */}
          {showSearch && (
            <form 
              className="absolute right-4 mt-4 bg-white shadow-lg rounded-xl flex items-center p-2 z-50 border w-72 sm:w-80" 
              onSubmit={e => { e.preventDefault(); setShowSearch(false); }}
            >
              <input
                type="text"
                placeholder="Search products..."
                className="rounded-lg px-2 py-2 text-sm focus:outline-none font-body flex-1"
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