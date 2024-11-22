import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logoutUser } from '../Redux/Actions/UserActions';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io'; // Import de l'icône de flèche
import Logo from '../assets/Logo/LOGO.png';
import { NavbarLinks } from '../data/NavbarLinks';
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

function Navb() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const { user } = useSelector(state => state.UserReducer || {});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // Nouveau state pour le menu utilisateur

  return (
    <div className="bg-blue-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to={"/"}>
          <img src={Logo} alt="Logo" width={160} height={55} loading='lazy' />
        </Link>

        {/* Navbar links - desktop */}
        <div className="hidden md:flex space-x-6">
          {NavbarLinks.map((link, index) => (
            link.subLinks ? (
              // "Catalog" avec sous-liens et icône de flèche vers le bas
              <div key={index} className="relative group">
                <p className="text-white cursor-pointer flex items-center gap-1 rounded-lg px-3 py-2 hover:bg-yellow-200">
                  {link.title} <IoIosArrowDown className="text-sm" />
                </p>
                <div className="absolute left-0 hidden group-hover:block bg-blue-700 text-white p-4 rounded-lg mt-1">
                  {link.subLinks.map((subLink, idx) => (
                    <Link key={idx} to={subLink.path}>
                      <p className="hover:bg-yellow-100 p-1 rounded-md">{subLink.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              // Autres liens avec bordures arrondies et effet de survol jaune
              <Link
                key={index}
                to={link.path}
                className="text-white rounded-lg px-3 py-2 hover:bg-yellow-200"
              >
                {link.title}
              </Link>
            )
          ))}
        </div>

        {/* User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              {/* Bouton avec le prénom */}
              <button
                className="text-white bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-900"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                {`${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}
                <img
                  src={user.photo || '/default-profile.png'} // Utilise une photo par défaut si aucune n'est définie
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-8 h-8 rounded-full object-cover" // Cercle avec une taille de 32px
                />
                <IoIosArrowDown className="text-sm" />
              </button>

              {/* Menu déroulant */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 bg-yellow-100 text-blue-800 shadow-md rounded-lg py-2 w-40">
                  <Link
                    to="/Dashboard"
                    className="block px-4 py-2 hover:bg-blue-100 rounded-md flex items-center gap-2"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <CgProfile size={20} /> {/* Icône devant le texte */}
                    Mon espace
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-md flex items-center gap-2"
                    onClick={() => {
                      handleLogout();
                      setUserMenuOpen(false);
                    }}
                  >
                    <MdLogout size={20} /> {/* Icône devant le texte */}
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="border border-yellow-500 text-white px-4 py-2 rounded-lg hover:border-yellow-100 focus:bg-yellow-500 active:bg-yellow-400">
                  Login
                </button>
              </Link>
              <Link to="/Signup">
                <button className="border border-yellow-500 text-white px-4 py-2 rounded-lg hover:border-yellow-100 focus:bg-yellow-500 active:bg-yellow-400">
                  Sign UP
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <HiOutlineMenuAlt3 size={30} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700 p-4 space-y-2">
          {NavbarLinks.map((link, index) => (
            link.subLinks ? (
              <div key={index} className="relative group">
                <p className="text-white cursor-pointer flex items-center gap-1">
                  {link.title}
                </p>
                <div className="ml-4 mt-1 space-y-2">
                  {link.subLinks.map((subLink, idx) => (
                    <Link key={idx} to={subLink.path}>
                      <p className="text-white hover:bg-blue-600 p-2 rounded-sm">{subLink.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={index} to={link.path} className="text-white block hover:bg-blue-600 p-2 rounded-sm">
                {link.title}
              </Link>
            )
          ))}
          <div className="mt-4">
            {user ? (
              <button
                className="bg-red-500 w-full text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:bg-yellow-500 active:bg-yellow-400"
                onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className="w-full border border-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-800 focus:bg-yellow-500 active:bg-yellow-400 mb-2">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="w-full bg-blue-100 text-white px-4 py-2 rounded-lg hover:bg-blue-800 focus:bg-yellow-500 active:bg-yellow-400">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navb;
