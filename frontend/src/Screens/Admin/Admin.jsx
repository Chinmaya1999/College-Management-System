import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { 
  MdOutlineDelete, 
  MdEdit, 
  MdOutlineAdminPanelSettings,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineBadge,
  MdOutlineWork,
  MdOutlineCalendarToday,
  MdOutlineAttachMoney,
  MdOutlineLocationOn,
  MdOutlineBloodtype,
  MdOutlinePersonOutline,
  MdOutlineWc,
  MdOutlineEmergency,
  MdOutlineCloudUpload,
  MdOutlineClose,
  MdOutlineSearch,
  MdOutlineFilterList,
  MdOutlineRefresh,
  MdOutlineMoreVert
} from "react-icons/md";
import { 
  IoMdAdd, 
  IoMdClose,
  IoMdPeople,
  IoMdPerson,
  IoMdMail,
  IoMdCall,
  IoMdBriefcase,
  IoMdCalendar,
  IoMdCash,
  IoMdPin,
  IoMdHeart,
  IoMdFemale,
  IoMdMale,
  IoMdTransgender
} from "react-icons/io";
import { 
  FaUserTie, 
  FaUserGraduate, 
  FaVenusMars,
  FaIdCard,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaDollarSign,
  FaTint,
  FaUsers,
  FaUserPlus,
  FaUserEdit,
  FaUserTimes
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import DeleteConfirm from "../../components/DeleteConfirm";
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

// Admin Card Component
const AdminCard = ({ admin, onEdit, onDelete, index }) => (
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
          {admin.profile ? (
            <img 
              src={admin.profile} 
              alt={`${admin.firstName} ${admin.lastName}`}
              className="w-full h-full rounded-xl object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <FaUserTie className="text-4xl text-blue-600" />
            </div>
          )}
        </div>
      </div>
    </div>

    <div className="pt-16 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {admin.firstName} {admin.lastName}
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <FaIdCard className="text-blue-500" />
            ID: {admin.employeeId}
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(admin)}
            className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <MdEdit className="text-lg" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(admin._id)}
            className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
          >
            <MdOutlineDelete className="text-lg" />
          </motion.button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <FaEnvelope className="text-gray-400" />
          <span className="text-gray-600">{admin.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaPhoneAlt className="text-gray-400" />
          <span className="text-gray-600">{admin.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaUserTie className="text-gray-400" />
          <span className="text-gray-600 font-medium">{admin.designation}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaCalendarAlt className="text-gray-400" />
          <span className="text-gray-600">Joined: {new Date(admin.joiningDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaTint className="text-red-400" />
            <span className="text-sm font-medium">{admin.bloodGroup}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            admin.status === 'active' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {admin.status}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

// Form Modal Component
const AdminFormModal = ({ isOpen, onClose, onSubmit, data, setData, isEditing, file, setFile }) => {
  if (!isOpen) return null;

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
                    {isEditing ? "Edit Admin" : "Add New Admin"}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {isEditing ? "Update administrator information" : "Create a new administrator account"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <IoMdClose className="text-2xl text-white" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <form onSubmit={onSubmit}>
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden">
                      {file ? (
                        <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                      ) : data.profile ? (
                        <img src={data.profile} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <FaUserTie className="text-3xl text-blue-600" />
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
                    <MdOutlinePersonOutline className="text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={data.firstName}
                        onChange={(e) => setData({ ...data, firstName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={data.lastName}
                        onChange={(e) => setData({ ...data, lastName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={data.dob}
                        onChange={(e) => setData({ ...data, dob: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MdOutlineEmail className="text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
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
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MdOutlineWork className="text-blue-600" />
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        value={data.gender}
                        onChange={(e) => setData({ ...data, gender: e.target.value })}
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
                        Blood Group
                      </label>
                      <select
                        value={data.bloodGroup}
                        onChange={(e) => setData({ ...data, bloodGroup: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      >
                        <option value="">Select Blood Group</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Designation
                      </label>
                      <input
                        type="text"
                        value={data.designation}
                        onChange={(e) => setData({ ...data, designation: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Joining Date
                      </label>
                      <input
                        type="date"
                        value={data.joiningDate}
                        onChange={(e) => setData({ ...data, joiningDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salary
                      </label>
                      <input
                        type="number"
                        value={data.salary}
                        onChange={(e) => setData({ ...data, salary: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={data.status}
                        onChange={(e) => setData({ ...data, status: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
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
                        value={data.address}
                        onChange={(e) => setData({ ...data, address: e.target.value })}
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
                          value={data.city}
                          onChange={(e) => setData({ ...data, city: e.target.value })}
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
                          value={data.state}
                          onChange={(e) => setData({ ...data, state: e.target.value })}
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
                          value={data.pincode}
                          onChange={(e) => setData({ ...data, pincode: e.target.value })}
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
                          value={data.country}
                          onChange={(e) => setData({ ...data, country: e.target.value })}
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
                        value={data.emergencyContact.name}
                        onChange={(e) => setData({
                          ...data,
                          emergencyContact: { ...data.emergencyContact, name: e.target.value }
                        })}
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
                        value={data.emergencyContact.relationship}
                        onChange={(e) => setData({
                          ...data,
                          emergencyContact: { ...data.emergencyContact, relationship: e.target.value }
                        })}
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
                        value={data.emergencyContact.phone}
                        onChange={(e) => setData({
                          ...data,
                          emergencyContact: { ...data.emergencyContact, phone: e.target.value }
                        })}
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
                      <span className="font-semibold">Default Password:</span> admin123
                    </p>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="mt-8 flex justify-end gap-3">
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
                  {isEditing ? "Update Admin" : "Add Admin"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Admin = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    gender: "",
    dob: "",
    designation: "",
    joiningDate: "",
    salary: "",
    status: "active",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
    bloodGroup: "",
  });
  const [admins, setAdmins] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [file, setFile] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    getAdminsHandler();
  }, []);

  const getAdminsHandler = async () => {
    try {
      setDataLoading(true);
      const response = await axiosWrapper.get(`/admin`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setAdmins(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setAdmins([]);
        return;
      }
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching admins");
    } finally {
      setDataLoading(false);
    }
  };

  const addAdminHandler = async (e) => {
    e.preventDefault();

    try {
      toast.loading(isEditing ? "Updating Admin" : "Adding Admin");
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`,
      };

      const formData = new FormData();
      for (const key in data) {
        if (key === "emergencyContact") {
          for (const subKey in data.emergencyContact) {
            formData.append(
              `emergencyContact[${subKey}]`,
              data.emergencyContact[subKey]
            );
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      if (file) {
        formData.append("file", file);
      }

      let response;
      if (isEditing) {
        response = await axiosWrapper.patch(
          `/admin/${selectedAdminId}`,
          formData,
          { headers }
        );
      } else {
        response = await axiosWrapper.post(`/admin/register`, formData, {
          headers,
        });
      }

      toast.dismiss();
      if (response.data.success) {
        if (!isEditing) {
          toast.success("Admin created successfully! Default password: admin123");
        } else {
          toast.success(response.data.message);
        }
        resetForm();
        getAdminsHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const deleteAdminHandler = async (id) => {
    setIsDeleteConfirmOpen(true);
    setSelectedAdminId(id);
  };

  const editAdminHandler = (admin) => {
    setData({
      firstName: admin.firstName || "",
      lastName: admin.lastName || "",
      email: admin.email || "",
      phone: admin.phone || "",
      profile: admin.profile || "",
      address: admin.address || "",
      city: admin.city || "",
      state: admin.state || "",
      pincode: admin.pincode || "",
      country: admin.country || "",
      gender: admin.gender || "",
      dob: admin.dob?.split("T")[0] || "",
      designation: admin.designation || "",
      joiningDate: admin.joiningDate?.split("T")[0] || "",
      salary: admin.salary || "",
      status: admin.status || "active",
      emergencyContact: {
        name: admin.emergencyContact?.name || "",
        relationship: admin.emergencyContact?.relationship || "",
        phone: admin.emergencyContact?.phone || "",
      },
      bloodGroup: admin.bloodGroup || "",
    });
    setSelectedAdminId(admin._id);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const confirmDelete = async () => {
    try {
      toast.loading("Deleting Admin");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axiosWrapper.delete(`/admin/${selectedAdminId}`, {
        headers,
      });
      toast.dismiss();
      if (response.data.success) {
        toast.success("Admin has been deleted successfully");
        setIsDeleteConfirmOpen(false);
        getAdminsHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const resetForm = () => {
    setData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profile: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      gender: "",
      dob: "",
      designation: "",
      joiningDate: "",
      salary: "",
      status: "active",
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
      bloodGroup: "",
    });
    setShowAddForm(false);
    setIsEditing(false);
    setSelectedAdminId(null);
    setFile(null);
  };

  // Filter admins based on search and status
  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = 
      admin.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.employeeId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || admin.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: admins.length,
    active: admins.filter(a => a.status === 'active').length,
    inactive: admins.filter(a => a.status === 'inactive').length,
    newThisMonth: admins.filter(a => {
      const joinDate = new Date(a.joiningDate);
      const now = new Date();
      return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
    }).length
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
            <h1 className="text-3xl font-bold text-gray-800">Admin Management</h1>
            <p className="text-gray-600 mt-1">Manage and oversee all administrator accounts</p>
          </div>
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
            Add New Admin
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaUsers />}
          label="Total Admins"
          value={stats.total}
          color="from-blue-600 to-blue-700"
          delay={0.1}
        />
        <StatCard
          icon={<FaUserPlus/>}
          label="Active Admins"
          value={stats.active}
          color="from-green-600 to-green-700"
          delay={0.2}
        />
        <StatCard

          label="Inactive Admins"
          value={stats.inactive}
          color="from-orange-600 to-orange-700"
          delay={0.3}
        />
        <StatCard
          icon={<FaUserPlus />}
          label="New This Month"
          value={stats.newThisMonth}
          color="from-purple-600 to-purple-700"
          delay={0.4}
        />
      </div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-4 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by name, email, or employee ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <MdOutlineRefresh className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Admin Cards Grid */}
      {dataLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((admin, index) => (
              <AdminCard
                key={admin._id}
                admin={admin}
                onEdit={editAdminHandler}
                onDelete={deleteAdminHandler}
                index={index}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaUsers className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Admins Found</h3>
              <p className="text-gray-500 mb-4">Get started by adding a new admin</p>
              <button
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Add Your First Admin
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Form Modal */}
      <AdminFormModal
        isOpen={showAddForm}
        onClose={resetForm}
        onSubmit={addAdminHandler}
        data={data}
        setData={setData}
        isEditing={isEditing}
        file={file}
        setFile={setFile}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this admin? This action cannot be undone."
      />
    </div>
  );
};

export default Admin;