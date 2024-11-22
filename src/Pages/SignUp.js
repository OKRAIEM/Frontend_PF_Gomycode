import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/Actions/UserActions";
import signupImg from "../assets/Images/Signup1.png";
import frameImg from "../assets/Images/frame.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Ajout des icônes pour afficher/masquer le mot de passe

const SignUp = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "", // Rôle laissé vide pour obliger l'utilisateur à choisir
    phone: "",
    photo: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Mise à jour des valeurs dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Envoi des données du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(formData)); // Envoi des données via Redux
  };

  useEffect(() => {
    if (user) {
      navigate("/Profile");
    }
  }, [user, navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-b from-blue-800 to-blue-500 bg-cover bg-center">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
        {/* Form Section */}
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.675rem] font-semibold leading-[2.375rem] text-richblack-5">
          Rejoignez CPIconnect et excellez dans les outils de conception moderne.
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-richblack-100">
            Développez vos compétences pour aujourd'hui, demain et au-delà.
            </span>{" "}
            <span className="font-edu-sa font-bold italic text-blue-100">
            Une formation qui façonnera votre avenir professionnel.
            </span>
          </p>
          <form onSubmit={handleSubmit} className="mt-2">
            {/* Input Fields */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-10 text-richblack-5 outline-none"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[15px] z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={25} fill="#3B82F6" />
                  ) : (
                    <AiOutlineEye fontSize={25} fill="#3B82F6" />
                  )}
                </span>
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
                required
              >
                <option value="" disabled>Select Role</option> {/* Ajout d'une option vide */}
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Admin">Admin</option>
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
              />
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                value={formData.photo}
                onChange={handleChange}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-semibold text-richblack-900 hover:scale-95 transition-all duration-200"
            >
              Sign Up
            </button>
          </form>
        </div>
        {/* Image Section */}
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
          <img
            src={frameImg}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
          />
          <img
            src={signupImg}
            alt="Sign Up"
            width={558}
            height={504}
            loading="lazy"
            className="absolute -top-3 right-2 z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
