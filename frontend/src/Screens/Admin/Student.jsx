import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  MdOutlineDelete, 
  MdEdit, 
  MdOutlineSearch,
  MdOutlineFilterList,
  MdOutlineRefresh,
  MdOutlinePerson,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineCalendarToday,
  MdOutlineLocationOn,
  MdOutlineBloodtype,
  MdOutlineWc,
  MdOutlineEmergency,
  MdOutlineCloudUpload,
  MdOutlineClose,
  MdOutlineSchool,
  MdOutlineMenuBook,
  MdOutlineBadge,
  MdOutlineAssignmentInd
} from "react-icons/md";
import { 
  IoMdAdd, 
  IoMdPerson,
  IoMdPeople,
  IoMdMail,
  IoMdCall,
  IoMdSchool,
  IoMdBook,
  IoMdCalendar,
  IoMdPin,
  IoMdHeart
} from "react-icons/io";
import { 
  FaUserGraduate, 
  FaVenusMars,
  FaIdCard,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaTint,
  FaUsers,
  FaUserPlus,
  FaUserEdit,
  FaUserTimes,
  FaGraduationCap,
  FaUniversity
} from "react-icons/fa";
import { GiGraduateCap, GiTeacher, GiBookshelf } from "react-icons/gi";
import { CgDanger } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "../../components/Heading";
import DeleteConfirm from "../../components/DeleteConfirm";
import axiosWrapper from "../../utils/AxiosWrapper";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";

// Stats Card Component
const StatCard = ({ icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/80 text-sm font-medium mb-1">{label}</p>
        <p className="text-white text-3xl font-bold">{value}</p>
      </div>
      <div className="text-white/50 text-4xl">{icon}</div>
    </div>
  </motion.div>
);

// Student Card Component
const StudentCard = ({ student, onEdit, onDelete, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 25px 30px -12px rgba(0, 0, 0, 0.25)" }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-300"
    >
      <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-xl">
            {student.profile ? (
              <img 
                src={`${process.env.REACT_APP_MEDIA_LINK}/${student.profile}`}
                alt={`${student.firstName}'s profile`}
                className="w-full h-full rounded-xl object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop";
                }}
              />
            ) : (
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <FaUserGraduate className="text-4xl text-blue-600" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-16 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {student.firstName} {student.middleName} {student.lastName}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <FaIdCard className="text-blue-500" />
              Enrollment: {student.enrollmentNo}
            </p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(student)}
              className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <MdEdit className="text-lg" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(student._id)}
              className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
            >
              <MdOutlineDelete className="text-lg" />
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-sm">
              <FaGraduationCap className="text-purple-500" />
              <div>
                <p className="text-gray-500 text-xs">Semester</p>
                <p className="font-medium text-gray-800">Sem {student.semester}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-sm">
              <FaUniversity className="text-green-500" />
              <div>
                <p className="text-gray-500 text-xs">Branch</p>
                <p className="font-medium text-gray-800">{student.branchId?.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <FaEnvelope className="text-gray-400" />
            <span className="text-gray-600">{student.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaPhoneAlt className="text-gray-400" />
            <span className="text-gray-600">{student.phone}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaTint className="text-red-400" />
              <span className="text-sm font-medium">{student.bloodGroup || "N/A"}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              student.status === 'active' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {student.status}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Search Form Component
const SearchForm = ({ searchParams, setSearchParams, onSearch, branches, dataLoading }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
    >
      <form onSubmit={onSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FaIdCard className="text-blue-600" />
              Enrollment Number
            </label>
            <input
              type="text"
              name="enrollmentNo"
              value={searchParams.enrollmentNo}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
              placeholder="e.g., ENR2024001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FaUserGraduate className="text-blue-600" />
              Student Name
            </label>
            <input
              type="text"
              name="name"
              value={searchParams.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
              placeholder="Enter student name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FaGraduationCap className="text-blue-600" />
              Semester
            </label>
            <select
              name="semester"
              value={searchParams.semester}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
            >
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FaUniversity className="text-blue-600" />
              Branch
            </label>
            <select
              name="branch"
              value={searchParams.branch}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
            >
              <option value="">All Branches</option>
              {branches?.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setSearchParams({
                enrollmentNo: "",
                name: "",
                semester: "",
                branch: "",
              });
            }}
            className="px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <MdOutlineRefresh className="text-lg" />
            Clear
          </button>
          <button
            type="submit"
            disabled={dataLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <MdOutlineSearch className="text-lg" />
            {dataLoading ? "Searching..." : "Search Students"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Student Form Modal
const StudentFormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData, 
  setFormData, 
  branches, 
  isEditing, 
  file, 
  setFile,
  handleEmergencyContactChange 
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-2xl">
                  {isEditing ? <FaUserEdit className="text-3xl text-white" /> : <FaUserPlus className="text-3xl text-white" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {isEditing ? "Edit Student" : "Add New Student"}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {isEditing ? "Update student information" : "Register a new student"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <MdOutlineClose className="text-2xl text-white" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
              {/* Profile Photo */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Profile Photo
                </label>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden">
                    {file ? (
                      <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                    ) : formData.profile ? (
                      <img src={`${process.env.REACT_APP_MEDIA_LINK}/${formData.profile}`} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <FaUserGraduate className="text-3xl text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="hidden"
                      accept="image/*"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <MdOutlineCloudUpload className="text-lg" />
                      <span>Upload Photo</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUserGraduate className="text-blue-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      value={formData.middleName}
                      onChange={(e) => handleInputChange("middleName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaGraduationCap className="text-blue-600" />
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Semester
                    </label>
                    <select
                      value={formData.semester}
                      onChange={(e) => handleInputChange("semester", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                      <option value="">Select Semester</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <option key={sem} value={sem}>
                          Semester {sem}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Branch
                    </label>
                    <select
                      value={formData.branchId}
                      onChange={(e) => handleInputChange("branchId", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                      <option value="">Select Branch</option>
                      {branches?.map((branch) => (
                        <option key={branch._id} value={branch._id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MdOutlinePhone className="text-blue-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (will be generated)
                    </label>
                    <input
                      type="email"
                      value={`${formData.enrollmentNo || "enrollment"}@student.edu`}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaVenusMars className="text-blue-600" />
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange("dob", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Group
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="">Select Blood Group</option>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MdOutlineLocationOn className="text-blue-600" />
                  Address Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MdOutlineEmergency className="text-blue-600" />
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact.name}
                      onChange={(e) => handleEmergencyContactChange("name", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relationship
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact.relationship}
                      onChange={(e) => handleEmergencyContactChange("relationship", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => handleEmergencyContactChange("phone", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password Info */}
              {!isEditing && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Default Login Credentials:</span><br />
                    Email: {formData.enrollmentNo || "enrollment_no"}@student.edu<br />
                    Password: student123
                  </p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  {isEditing ? "Update Student" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Student = () => {
  const [searchParams, setSearchParams] = useState({
    enrollmentNo: "",
    name: "",
    semester: "",
    branch: "",
  });
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const userToken = localStorage.getItem("userToken");

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    semester: "",
    branchId: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    profile: "",
    status: "active",
    bloodGroup: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
  });

  useEffect(() => {
    getBranchHandler();
  }, []);

  const getBranchHandler = async () => {
    try {
      const response = await axiosWrapper.get(`/branch`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setBranches(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setBranches([]);
      } else {
        console.error(error);
        toast.error(error.response?.data?.message || "Error fetching branches");
      }
    }
  };

  const searchStudents = async (e) => {
    e.preventDefault();

    if (
      !searchParams.enrollmentNo &&
      !searchParams.name &&
      !searchParams.semester &&
      !searchParams.branch
    ) {
      toast.error("Please select at least one filter");
      return;
    }

    setDataLoading(true);
    setHasSearched(true);
    try {
      const response = await axiosWrapper.post(
        `/student/search`,
        searchParams,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (response.data.success) {
        if (response.data.data.length === 0) {
          setStudents([]);
          toast.success("No students found matching your criteria");
        } else {
          toast.success(`${response.data.data.length} students found!`);
          setStudents(response.data.data);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setStudents([]);
      toast.error(error.response?.data?.message || "Error searching students");
    } finally {
      setDataLoading(false);
    }
  };

  const handleEmergencyContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value,
      },
    }));
  };

  const addStudentHandler = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`,
      };

      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === "emergencyContact") {
          for (const subKey in formData.emergencyContact) {
            formDataToSend.append(
              `emergencyContact[${subKey}]`,
              formData.emergencyContact[subKey]
            );
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      if (file) {
        formDataToSend.append("file", file);
      }

      let response;
      if (isEditing) {
        response = await axiosWrapper.patch(
          `/student/${selectedStudentId}`,
          formDataToSend,
          { headers }
        );
      } else {
        response = await axiosWrapper.post(
          `/student/register`,
          formDataToSend,
          { headers }
        );
      }

      if (response.data.success) {
        if (!isEditing) {
          toast.success("Student created successfully! Default password: student123");
        } else {
          toast.success(response.data.message);
        }
        resetForm();
        if (hasSearched) {
          searchStudents({ preventDefault: () => {} });
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const deleteStudentHandler = (id) => {
    setIsDeleteConfirmOpen(true);
    setSelectedStudentId(id);
  };

  const editStudentHandler = (student) => {
    setFormData({
      firstName: student.firstName || "",
      middleName: student.middleName || "",
      lastName: student.lastName || "",
      phone: student.phone || "",
      semester: student.semester || "",
      branchId: student.branchId?._id || "",
      gender: student.gender || "",
      dob: student.dob?.split("T")[0] || "",
      address: student.address || "",
      city: student.city || "",
      state: student.state || "",
      pincode: student.pincode || "",
      country: student.country || "",
      profile: student.profile || "",
      status: student.status || "active",
      bloodGroup: student.bloodGroup || "",
      emergencyContact: {
        name: student.emergencyContact?.name || "",
        relationship: student.emergencyContact?.relationship || "",
        phone: student.emergencyContact?.phone || "",
      },
    });
    setSelectedStudentId(student._id);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const confirmDelete = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axiosWrapper.delete(
        `/student/${selectedStudentId}`,
        { headers }
      );
      if (response.data.success) {
        toast.success("Student has been deleted successfully");
        setIsDeleteConfirmOpen(false);
        if (hasSearched) {
          searchStudents({ preventDefault: () => {} });
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      semester: "",
      branchId: "",
      gender: "",
      dob: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      profile: "",
      status: "active",
      bloodGroup: "",
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
    });
    setShowAddForm(false);
    setIsEditing(false);
    setSelectedStudentId(null);
    setFile(null);
  };

  // Calculate stats
  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    branches: new Set(students.map(s => s.branchId?._id)).size,
    semesters: new Set(students.map(s => s.semester)).size
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
            <p className="text-gray-600 mt-1">Manage and track all student records</p>
          </div>
          {branches.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <IoMdAdd className="text-xl" />
              Add New Student
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Stats Grid - Only show when students exist */}
      {hasSearched && students.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FaUsers />}
            label="Total Students"
            value={stats.total}
            color="from-blue-600 to-blue-700"
            delay={0.1}
          />
          <StatCard
            icon={<FaUserGraduate />}
            label="Active Students"
            value={stats.active}
            color="from-green-600 to-green-700"
            delay={0.2}
          />
          <StatCard
            icon={<FaUniversity />}
            label="Branches"
            value={stats.branches}
            color="from-purple-600 to-purple-700"
            delay={0.3}
          />
          <StatCard
            icon={<FaGraduationCap />}
            label="Semesters"
            value={stats.semesters}
            color="from-orange-600 to-orange-700"
            delay={0.4}
          />
        </div>
      )}

      {/* Branch Check */}
      {branches.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center items-center flex-col w-full mt-24"
        >
          <div className="bg-yellow-50 rounded-full p-8 mb-6">
            <CgDanger className="w-20 h-20 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Branches Found</h2>
          <p className="text-gray-600 text-center max-w-md">
            Please add branches before adding students. Students need to be associated with specific branches.
          </p>
        </motion.div>
      )}

      {/* Search Form */}
      {branches.length > 0 && (
        <SearchForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={searchStudents}
          branches={branches}
          dataLoading={dataLoading}
        />
      )}

      {/* Initial State - No Search */}
      {branches.length > 0 && !hasSearched && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 flex flex-col items-center justify-center bg-white rounded-3xl p-12 shadow-lg mx-auto max-w-2xl"
        >
          <div className="w-48 h-48 mb-6">
            <img
              src="https://illustrations.popsy.co/amber/searching.svg"
              alt="Search students"
              className="w-full h-full"
            />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Search for Students
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            Use the filters above to search for students by enrollment number, name, semester, or branch.
          </p>
        </motion.div>
      )}

      {/* Loading State */}
      {dataLoading && (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      )}

      {/* Search Results */}
      {hasSearched && !dataLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {students.length === 0 ? (
            <div className="text-center mt-12 flex flex-col items-center justify-center bg-white rounded-3xl p-12 shadow-lg mx-auto max-w-2xl">
              <div className="w-48 h-48 mb-6">
                <img
                  src="https://illustrations.popsy.co/amber/no-data.svg"
                  alt="No students found"
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No Students Found
              </h3>
              <p className="text-gray-600 text-center max-w-md">
                No students match your search criteria. Try adjusting your filters or add a new student.
              </p>
              <button
                onClick={() => {
                  setSearchParams({
                    enrollmentNo: "",
                    name: "",
                    semester: "",
                    branch: "",
                  });
                }}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Search Results ({students.length} {students.length === 1 ? 'student' : 'students'} found)
                </h2>
                <button
                  onClick={() => {
                    setSearchParams({
                      enrollmentNo: "",
                      name: "",
                      semester: "",
                      branch: "",
                    });
                    setHasSearched(false);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  New Search
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((student, index) => (
                  <StudentCard
                    key={student._id}
                    student={student}
                    onEdit={editStudentHandler}
                    onDelete={deleteStudentHandler}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Student Form Modal */}
      <StudentFormModal
        isOpen={showAddForm}
        onClose={resetForm}
        onSubmit={addStudentHandler}
        formData={formData}
        setFormData={setFormData}
        branches={branches}
        isEditing={isEditing}
        file={file}
        setFile={setFile}
        handleEmergencyContactChange={handleEmergencyContactChange}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this student? This action cannot be undone."
      />
    </div>
  );
};

export default Student;