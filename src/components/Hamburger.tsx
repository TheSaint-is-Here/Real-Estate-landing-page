import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from "../assets/Vector.png";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = () => {
    setIsOpen(false);
  };

  return (
    <nav className="p-4 text-black flex justify-between items-center relative sm:hidden">
      <Link to="/" className="flex items-center gap-2">
      <img src={logo} alt="Logo" className="h-10 w-10" />
      <p className="text-xl font-bold">Apexioum-Homes</p>
    </Link>
      {/* Hamburger Button - Visible only on mobile */}
      <button
        onClick={toggleMenu}
        className="block md:hidden p-2 text-black hover:bg-white rounded-lg transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <X size={24} className="transition-transform duration-200" />
        ) : (
          <Menu size={24} className="transition-transform duration-200" />
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white p-5 flex flex-col gap-4 md:hidden border-t">
          <Link to="/properties" onClick={handleNavigate}>Properties</Link>
          <Link to="//FacultyandAmenities" onClick={handleNavigate}>Amenities</Link>
          <Link to="/GalleryWithFaqs" onClick={handleNavigate}>Gallery</Link>
          <Link to="/AuthFlow" onClick={handleNavigate}>Blog</Link>
        </div>
      )}

      {/* Normal Desktop Menu (Hidden on mobile) */}
      <div className="hidden md:flex gap-6">
        {/* <a href="#home" className="hover:text-blue-400">Home</a>
        <a href="#about" className="hover:text-blue-400">About</a>
        <a href="#services" className="hover:text-blue-400">Services</a> */}
        <Link to="/properties" onClick={handleNavigate}> Properties</Link>
        <Link to="/amenities" onClick={handleNavigate}> Amenities</Link>
        <Link to="/gallery" onClick={handleNavigate}> Gallery</Link>
        <Link to="/blog" > Blog</Link>
      </div>
    </nav>
  );
}