import { Link } from "react-router-dom"
import logoHeader from '../../images/logo-header.png'
import { Copyright, Facebook, Instagram, Linkedin, SendHorizonal } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-primaryContrast text-white py-8 px-6 flex flex-col gap-y-4">
      <div className="flex justify-between font-body text-sm">
        <div className="flex gap-x-14">
          <img src={logoHeader} alt="Kapiton Logo" className="md:max-h-14" />
          <div className="flex flex-col gap-y-1">
            <Link to='/'>About Us</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Privacy Policy</Link>
            <Link to='/'>T&C</Link>
          </div>
          <div className="flex flex-col gap-y-2">
            <Link to='/'>FAQs</Link>
            <Link to='/'>Shipping & Returns</Link>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <p>Get the latest updates, information on events, sales, & offers.</p>
          <span className="flex gap-x-4 items-center">
            <input type="text" placeholder="Email" className="w-full rounded-3xl bg-primaryContrast border-[1px] border-white px-6 py-2" />
            <SendHorizonal />
          </span>
        </div>
      </div>
      <div className="w-full flex justify-center gap-x-8">
        <span className=" bg-white rounded-full h-10 w-10 flex justify-center items-center">
          <Link to='/' ><Facebook fill="#1f1f22" className="text-primaryContrast text-sm" /></Link>
        </span>
        <span className=" bg-white rounded-full h-10 w-10 flex justify-center items-center">
          <Link to='/' ><Instagram fill="#1f1f22" className="text-white text-sm" /></Link>
        </span>
        <span className=" bg-white rounded-full h-10 w-10 flex justify-center items-center">
          <Link to='/' ><Linkedin fill="#1f1f22" className="text-primaryContrast text-sm" /></Link>
        </span>
      </div>
      <div className="flex flex-col items-center text-sm">
        <div className="w-full h-[0.1rem] bg-white"></div>
        <span className="mt-6 flex items-center gap-x-1">
          <p>{new Date().getFullYear()}</p>
          <Copyright className="h-5" />
          <p>kapiton.store</p>
        </span>
      </div>
    </footer>
  )
}

export default Footer