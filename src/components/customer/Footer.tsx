import { Link } from "react-router-dom"
import logoHeader from '../../images/logo-header.png'
import { Copyright, Facebook, Instagram, Linkedin, SendHorizonal } from "lucide-react"

const Footer = () => {
  return (
    <>
      {/* CTA */}
      <div className="h-[28rem] w-full bg-primary py-10 px-8">
        <div className="w-1/2 py-6 flex flex-col gap-y-2">
          <h1 className="text-6xl font-bold font-primary text-white">
            Become a merchant
          </h1>
          <p className="text-xl mt-4 font-semibold font-secondary">
            Join us in this exciting journey
          </p>
          <p className="text-sm font-body">
            Whether you're a student entrepreneur ready to showcase your
            creations or a local brand looking for a stage to shine, Kapiton
            invites you to join us in this exciting journey of innovation and
            community. Explore, connect, and be part of a movement that believes
            in the power of student-led entrepreneurship.
          </p>
          <p className="text-sm font-body mt-2">
            Kapiton – Where Creativity Meets Commerce, and Every Student is an
            Entrepreneurial Star!
          </p>

          <Link
            to="/register-vendor" 
            className="px-4 font-primary font-semibold mt-6 py-2 rounded-full w-fit border-2 border-primaryContrast"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    <footer className="bg-primaryContrast text-white py-8 px-4 sm:px-6 flex flex-col gap-y-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-y-8 md:gap-y-0 font-body text-sm w-full">
        <div className="flex md:flex-row flex-col gap-y-6 md:gap-y-0 gap-x-8 md:gap-x-14 w-full md:w-auto items-start">
          <img src={logoHeader} alt="Kapiton Logo" className="max-h-14 md:max-h-20 mb-2 md:mb-0 mx-auto md:mx-0" />
          <div className="flex justify-between gap-x-8">
            <div className="flex flex-col gap-x-6 md:gap-x-0 gap-y-1 md:gap-y-1 text-left">
              <Link to='/'>About Us</Link>
              <Link to='/'>Careers</Link>
              <Link to='/'>Privacy Policy</Link>
              <Link to='/'>T&C</Link>
            </div>
            <div className="flex flex-col gap-x-6 md:gap-x-0 gap-y-2 md:gap-y-2 text-left">
              <Link to='/'>FAQs</Link>
              <Link to='/'>Shipping & Returns</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 w-full md:w-auto items-center md:items-end">
          <p className="text-center md:text-right">Get the latest updates, information on events, sales, & offers.</p>
          <span className="flex w-full max-w-xs gap-x-2 items-center">
            <input type="text" placeholder="Email" className="w-full rounded-3xl bg-primaryContrast border-[1px] border-white px-4 py-2 text-xs md:text-sm" />
            <button className="p-2 bg-white rounded-full text-primaryContrast flex items-center justify-center"><SendHorizonal className="h-4 w-4" /></button>
          </span>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-8">
        <span className="bg-white rounded-full h-10 w-10 flex justify-center items-center">
          <Link to='/' ><Facebook fill="#1f1f22" className="text-primaryContrast text-sm" /></Link>
        </span>
        <span className="bg-white rounded-full h-10 w-10 flex justify-center items-center">
          <Link to='/' ><Instagram fill="#1f1f22" className="text-white text-sm" /></Link>
        </span>
        <span className="bg-white rounded-full h-10 w-10 flex justify-center items-center">
          <Link to='/' ><Linkedin fill="#1f1f22" className="text-primaryContrast text-sm" /></Link>
        </span>
      </div>
      <div className="flex flex-col items-center text-xs md:text-sm">
        <div className="w-full h-[0.1rem] bg-white"></div>
        <span className="mt-6 flex items-center gap-x-1">
          <p>{new Date().getFullYear()}</p>
          <Copyright className="h-5" />
          <p>kapiton.store</p>
        </span>
      </div>
    </footer>
    </>
  )
}

export default Footer