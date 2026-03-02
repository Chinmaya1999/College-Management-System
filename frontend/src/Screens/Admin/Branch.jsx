import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  MdOutlineDelete, 
  MdEdit, 
  MdOutlineAccountTree,
  MdOutlineSearch,
  MdOutlineFilterList,
  MdOutlineRefresh,
  MdOutlineDateRange,
  MdOutlineCode,
  MdOutlineBusinessCenter,
  MdOutlineClose
} from "react-icons/md";
import { 
  IoMdAdd, 
  IoMdSchool,
  IoMdBookmarks,
  IoMdGitBranch
} from "react-icons/io";
import { 
  FaUniversity, 
  FaBuilding, 
  FaLandmark, 
  FaTree,
  FaCode,
  FaCalendarAlt,
  FaClock
} from "react-icons/fa";
import { GiSchoolBag, GiGraduateCap, GiBookshelf } from "react-icons/gi";
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

// Branch Card Component
const BranchCard = ({ branch, onEdit, onDelete, index }) => {
  // Get random gradient color based on branch name
  const getBranchGradient = (name) => {
    const gradients = [
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600",
      "from-purple-500 to-purple-600",
      "from-orange-500 to-orange-600",
      "from-pink-500 to-pink-600",
      "from-indigo-500 to-indigo-600",
      "from-red-500 to-red-600",
      "from-teal-500 to-teal-600"
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash) + name.charCodeAt(i);
      hash = hash & hash;
    }
    return gradients[Math.abs(hash) % gradients.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 25px 30px -12px rgba(0, 0, 0, 0.25)" }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-300"
    >
      {/* Header with gradient */}
      <div className={`h-2 bg-gradient-to-r ${getBranchGradient(branch.name)}`} />
      
      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${getBranchGradient(branch.name)} bg-opacity-10`}>
              <FaLandmark className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{branch.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <MdOutlineCode className="text-blue-500" />
                ID: {branch.branchId}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(branch)}
              className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <MdEdit className="text-lg" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(branch._id)}
              className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
            >
              <MdOutlineDelete className="text-lg" />
            </motion.button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-sm">
              <FaCalendarAlt className="text-purple-500" />
              <div>
                <p className="text-gray-500 text-xs">Created</p>
                <p className="font-medium text-gray-800 text-xs">
                  {new Date(branch.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-sm">
              <FaClock className="text-orange-500" />
              <div>
                <p className="text-gray-500 text-xs">Updated</p>
                <p className="font-medium text-gray-800 text-xs">
                  {new Date(branch.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GiSchoolBag className="text-blue-400" />
              <span className="text-xs text-gray-500">Department Details</span>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
              {branch.branchId}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Branch Form Modal
const BranchFormModal = ({ isOpen, onClose, onSubmit, data, setData, isEditing, processLoading }) => {
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
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-2xl">
                  {isEditing ? <MdEdit className="text-3xl text-white" /> : <FaLandmark className="text-3xl text-white" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {isEditing ? "Edit Branch" : "Add New Branch"}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {isEditing ? "Update branch information" : "Create a new academic branch"}
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
          <div className="p-6">
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-5">
              {/* Branch Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaUniversity className="text-blue-600" />
                  Branch Name
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  placeholder="e.g., Computer Science"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the full name of the branch/department
                </p>
              </div>

              {/* Branch ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MdOutlineCode className="text-blue-600" />
                  Branch ID
                </label>
                <input
                  type="text"
                  value={data.branchId}
                  onChange={(e) => setData({ ...data, branchId: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  placeholder="e.g., CS101"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter a unique identifier for the branch
                </p>
              </div>

              {/* Preview Card */}
              {(data.name || data.branchId) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                >
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Preview</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <FaBuilding className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{data.name || "Branch Name"}</p>
                      <p className="text-xs text-gray-500">{data.branchId || "Branch ID"}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processLoading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {isEditing ? "Updating..." : "Adding..."}
                    </span>
                  ) : (
                    isEditing ? "Update Branch" : "Add Branch"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Branch = () => {
  const [data, setData] = useState({
    name: "",
    branchId: "",
  });
  const [branches, setBranches] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    getBranchHandler();
  }, []);

  const getBranchHandler = async () => {
    setDataLoading(true);
    try {
      const response = await axiosWrapper.get(`/branch`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (response.data.success) {
        setBranches(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setBranches([]);
        return;
      }
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching branches");
    } finally {
      setDataLoading(false);
    }
  };

  const addBranchHandler = async () => {
    if (!data.name || !data.branchId) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setProcessLoading(true);
      toast.loading(isEditing ? "Updating Branch" : "Adding Branch");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      };
      let response;
      if (isEditing) {
        response = await axiosWrapper.patch(
          `/branch/${selectedBranchId}`,
          data,
          { headers }
        );
      } else {
        response = await axiosWrapper.post(`/branch`, data, { headers });
      }
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        setData({ name: "", branchId: "" });
        setShowAddForm(false);
        setIsEditing(false);
        setSelectedBranchId(null);
        getBranchHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setProcessLoading(false);
    }
  };

  const deleteBranchHandler = async (id) => {
    setIsDeleteConfirmOpen(true);
    setSelectedBranchId(id);
  };

  const editBranchHandler = (branch) => {
    setData({
      name: branch.name,
      branchId: branch.branchId,
    });
    setSelectedBranchId(branch._id);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const confirmDelete = async () => {
    try {
      toast.loading("Deleting Branch");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      };
      const response = await axiosWrapper.delete(`/branch/${selectedBranchId}`, { headers });
      toast.dismiss();
      if (response.data.success) {
        toast.success("Branch has been deleted successfully");
        setIsDeleteConfirmOpen(false);
        getBranchHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error");
    }
  };

  // Filter and sort branches
  const filteredBranches = branches
    .filter(branch => 
      branch.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.branchId?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  // Calculate stats
  const stats = {
    total: branches.length,
    newThisMonth: branches.filter(b => {
      const created = new Date(b.createdAt);
      const now = new Date();
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length,
    oldestBranch: branches.length > 0 
      ? new Date(Math.min(...branches.map(b => new Date(b.createdAt)))).toLocaleDateString()
      : "N/A"
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
            <h1 className="text-3xl font-bold text-gray-800">Branch Management</h1>
            <p className="text-gray-600 mt-1">Manage and organize all academic branches and departments</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setData({ name: "", branchId: "" });
              setIsEditing(false);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <IoMdAdd className="text-xl" />
            Add New Branch
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      {branches.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<FaUniversity />}
            label="Total Branches"
            value={stats.total}
            color="from-blue-600 to-blue-700"
            delay={0.1}
          />
          <StatCard
            icon={<FaCalendarAlt />}
            label="Added This Month"
            value={stats.newThisMonth}
            color="from-green-600 to-green-700"
            delay={0.2}
          />
          <StatCard
            icon={<FaClock />}
            label="Oldest Branch"
            value={stats.oldestBranch}
            color="from-purple-600 to-purple-700"
            delay={0.3}
          />
        </div>
      )}

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-4 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by branch name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setSortBy("newest");
              }}
              className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <MdOutlineRefresh className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Loading State */}
      {dataLoading && (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      )}

      {/* Branches Grid */}
      {!dataLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredBranches.length > 0 ? (
            filteredBranches.map((branch, index) => (
              <BranchCard
                key={branch._id}
                branch={branch}
                onEdit={editBranchHandler}
                onDelete={deleteBranchHandler}
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
                <FaUniversity className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {branches.length === 0 ? "No Branches Found" : "No Matching Branches"}
              </h3>
              <p className="text-gray-500 mb-4 text-center max-w-md">
                {branches.length === 0 
                  ? "Get started by adding your first academic branch"
                  : "Try adjusting your search or filter to find what you're looking for"}
              </p>
              {branches.length === 0 ? (
                <button
                  onClick={() => {
                    setData({ name: "", branchId: "" });
                    setIsEditing(false);
                    setShowAddForm(true);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Add Your First Branch
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSortBy("newest");
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Branch Form Modal */}
      <BranchFormModal
        isOpen={showAddForm}
        onClose={() => {
          setShowAddForm(false);
          setIsEditing(false);
          setData({ name: "", branchId: "" });
        }}
        onSubmit={addBranchHandler}
        data={data}
        setData={setData}
        isEditing={isEditing}
        processLoading={processLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this branch? This action cannot be undone and may affect related data."
      />
    </div>
  );
};

export default Branch;