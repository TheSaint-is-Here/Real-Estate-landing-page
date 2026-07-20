import logo from "../assets/Vector.png";
import Navbar from "./Navbar";
import ActionButtons from "./ActionButtons";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";


function Header() {
  return (<div> 
    <div className="p-10 hidden md:block">
     <div className="border-b">
  {/* Mobile header */}
  <div className="flex items-center justify-between px-4 py-3 md:hidden">
    <Link to="/" className="flex items-center gap-2">
      <img src={logo} alt="Logo" className="h-10 w-10" />
      <p className="text-xl font-bold">Apexioum-Homes</p>
    </Link>
    <ActionButtons />
  </div>

  {/* Desktop header */}
  <div className="hidden md:flex items-center gap-2 justify-between px-6 py-3">
    <Link to="/" className="flex items-center gap-2">
      <img src={logo} alt="Logo" className="h-10 w-10" />
      <p className="text-xl font-bold">Apexioum-Homes</p>
    </Link>
    <Navbar />
    <ActionButtons />
  </div>
</div>
      <div>
        
      </div>
    </div>
    <div>
      <div > 
        <Hamburger />

      </div>
     
    </div>
    </div>
  );
}

export default Header