import React, { useState, useEffect } from "react";
import { FiLogIn, FiMail, FiLock, FiUser, FiBookOpen, FiUsers, FiShield } from "react-icons/fi";
import { HiOutlineAcademicCap, HiOutlineUserGroup } from "react-icons/hi";
import { GiGraduateCap, GiTeacher, GiOfficeChair } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setUserToken } from "../redux/actions";
import { useDispatch } from "react-redux";
import CustomButton from "../components/CustomButton";
import axiosWrapper from "../utils/AxiosWrapper";

const USER_TYPES = {
  STUDENT: "Student",
  FACULTY: "Faculty",
  ADMIN: "Admin",
};

const USER_ICONS = {
  [USER_TYPES.STUDENT]: <GiGraduateCap className="text-2xl" />,
  [USER_TYPES.FACULTY]: <GiTeacher className="text-2xl" />,
  [USER_TYPES.ADMIN]: <GiOfficeChair className="text-2xl" />,
};

const LoginForm = ({ selected, onSubmit, formData, setFormData }) => (
  <motion.form
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="w-full p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20"
    onSubmit={onSubmit}
  >
    <div className="mb-6">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 mb-2"
      >
        <FiMail className="text-blue-600" />
        <label
          className="block text-gray-700 text-sm font-semibold"
          htmlFor="email"
        >
          {selected} Email Address
        </label>
      </motion.div>
      <motion.input
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        type="email"
        id="email"
        required
        className="w-full px-5 py-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
    </div>
    
    <div className="mb-4">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 mb-2"
      >
        <FiLock className="text-blue-600" />
        <label
          className="block text-gray-700 text-sm font-semibold"
          htmlFor="password"
        >
          Password
        </label>
      </motion.div>
      <motion.input
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
        type="password"
        id="password"
        required
        className="w-full px-5 py-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
        placeholder="Enter your password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="flex items-center justify-between mb-8"
    >
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
        <span className="text-sm text-gray-600">Remember me</span>
      </label>
      <Link
        className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all"
        to="/forget-password"
      >
        Forgot Password?
      </Link>
    </motion.div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <CustomButton
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 flex justify-center items-center gap-3 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
      >
        <span>Login as {selected}</span>
        <FiLogIn className="text-lg group-hover:translate-x-1 transition-transform" />
      </CustomButton>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="mt-6 text-center"
    >
      <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
          Contact Administrator
        </Link>
      </p>
    </motion.div>
  </motion.form>
);

const UserTypeSelector = ({ selected, onSelect }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="flex justify-center gap-3 mb-8"
  >
    {Object.values(USER_TYPES).map((type, index) => (
      <motion.button
        key={type}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        onClick={() => onSelect(type)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-2 ${
          selected === type
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-200"
            : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200"
        }`}
      >
        {USER_ICONS[type]}
        {type}
      </motion.button>
    ))}
  </motion.div>
);

const FloatingElement = ({ children, delay, duration, x, y }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: 0.6,
      x: [0, x, 0],
      y: [0, y, 0],
    }}
    transition={{
      opacity: { duration: 1, delay },
      x: { duration, repeat: Infinity, ease: "easeInOut" },
      y: { duration, repeat: Infinity, ease: "easeInOut" },
    }}
    className="absolute"
  >
    {children}
  </motion.div>
);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [selected, setSelected] = useState(USER_TYPES.STUDENT);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserTypeSelect = (type) => {
    const userType = type.toLowerCase();
    setSelected(type);
    setSearchParams({ type: userType });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Logging in...");

    try {
      const response = await axiosWrapper.post(
        `/${selected.toLowerCase()}/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token } = response.data.data;
      localStorage.setItem("userToken", token);
      localStorage.setItem("userType", selected);
      dispatch(setUserToken(token));
      
      toast.dismiss(loadingToast);
      toast.success("Login successful! Redirecting...");
      
      setTimeout(() => {
        navigate(`/${selected.toLowerCase()}`);
      }, 1500);
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      navigate(`/${localStorage.getItem("userType").toLowerCase()}`);
    }
  }, [navigate]);

  useEffect(() => {
    if (type) {
      const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
      if (Object.values(USER_TYPES).includes(capitalizedType)) {
        setSelected(capitalizedType);
      }
    }
  }, [type]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <FloatingElement delay={0} duration={20} x={20} y={10}>
        <HiOutlineAcademicCap className="text-8xl text-blue-200/30" />
      </FloatingElement>
      
      <FloatingElement delay={1} duration={25} x={-15} y={20}>
        <HiOutlineUserGroup className="text-8xl text-indigo-200/30" />
      </FloatingElement>
      
      <FloatingElement delay={2} duration={18} x={25} y={-15}>
        <FiBookOpen className="text-8xl text-purple-200/30" />
      </FloatingElement>

      {/* Main Content */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 relative z-10">
        {/* Left Side - Hero Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl mb-6"
          >
            <HiOutlineAcademicCap className="text-5xl text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
          >
            College Management System
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Streamlining education management with cutting-edge technology
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            {[
              { icon: <FiUsers />, text: "Student Portal" },
              { icon: <FiBookOpen />, text: "Faculty Dashboard" },
              { icon: <FiShield />, text: "Admin Control" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm"
              >
                <span className="text-blue-600">{item.icon}</span>
                <span className="text-sm font-medium text-gray-700">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full max-w-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/40 backdrop-blur-xl rounded-3xl p-1 shadow-2xl"
          >
            <div className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-3xl p-8">
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl font-bold text-center mb-2"
              >
                Welcome Back!
              </motion.h2>
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 text-center mb-8"
              >
                Please select your role and login to continue
              </motion.p>
              
              <UserTypeSelector selected={selected} onSelect={handleUserTypeSelect} />
              
              <AnimatePresence mode="wait">
                <LoginForm
                  key={selected}
                  selected={selected}
                  onSubmit={handleSubmit}
                  formData={formData}
                  setFormData={setFormData}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#363636',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
            borderRadius: '10px',
          },
        }}
      />
    </div>
  );
};

export default Login;