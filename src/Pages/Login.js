import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icônes pour le mot de passe
import { loginUser } from "../Redux/Actions/UserActions";
import loginImg from "../assets/Images/Login2.png";
import frameImg from "../assets/Images/frame.png";

const Login = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // Suppression du rôle du formulaire de connexion
  });

  const [showPassword, setShowPassword] = useState(false); // Contrôle de l'affichage du mot de passe

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)); // Soumettre les informations de connexion sans rôle
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-b from-blue-800 to-blue-500 bg-cover bg-center">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
        {/* Formulaire */}
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Welcome Back
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-richblack-100">
            Développez des compétences pour aujourd'hui, demain et au-delà. 
            </span>{" "}
            <span className="font-edu-sa font-bold italic text-blue-100">
            Une formation pour sécuriser votre avenir professionnel.
            </span>
          </p>
          <form onSubmit={handleSubmit} className="mt-6">
            {/* Champs de saisie */}
            <div className="flex flex-col gap-4">
              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
              />
              {/* Mot de passe avec l'icône œil */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Contrôle d'affichage
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 cursor-pointer text-richblack-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {/* Le rôle n'est plus nécessaire ici */}
            </div>
            {/* Rester connecté */}
            <div className="mt-4">
              <label className="flex items-center gap-2 text-richblack-5">
                <input type="checkbox" className="rounded-sm bg-richblack-700" />
                Remember me
              </label>
            </div>
            {/* Bouton de connexion */}
            <button
              type="submit"
              className="mt-4 w-full rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-semibold text-richblack-900 hover:scale-95 transition-all duration-200"
            >
              Login
            </button>
          </form>
        </div>
        {/* Section image */}
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
          <img
            src={frameImg}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
          />
          <img
            src={loginImg}
            alt="Login"
            width={558}
            height={504}
            loading="lazy"
            className="absolute -top-1 right-2 z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
