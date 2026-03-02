import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  MdOutlineDelete, 
  MdEdit, 
  MdOutlineMenuBook,
  MdOutlineCode,
  MdOutlineSchool,
  MdOutlineCreditCard,
  MdOutlineSearch,
  MdOutlineFilterList,
  MdOutlineRefresh,
  MdOutlineBook,
  MdOutlineLibraryBooks,
  MdOutlineBookmarkBorder,
  MdOutlineBookmarkAdded,
  MdOutlineClose
} from "react-icons/md";
import { 
  IoMdAdd, 
  IoMdBook,
  IoMdSchool,
  IoMdCalendar,
  IoMdPricetag
} from "react-icons/io";
import { 
  FaBook, 
  FaBookOpen, 
  FaCode, 
  FaGraduationCap,
  FaLayerGroup,
  FaStar,
  FaRegBookmark,
  FaBookmark
} from "react-icons/fa";
import { GiBookshelf, GiNotebook, GiOpenBook, GiBookCover } from "react-icons/gi";
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

// Subject Card Component
const SubjectCard = ({ subject, onEdit, onDelete, index }) => {
  // Get semester color
  const getSemesterColor = (sem) => {
    const colors = {
      1: "from-blue-500 to-blue-600",
      2: "from-green-500 to-green-600",
      3: "from-yellow-500 to-yellow-600",
      4: "from-orange-500 to-orange-600",
      5: "from-red-500 to-red-600",
      6: "from-purple-500 to-purple-600",
      7: "from-pink-500 to-pink-600",
      8: "from-indigo-500 to-indigo-600"
    };
    return colors[sem] || "from-gray-500 to-gray-600";
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
      <div className={`h-2 bg-gradient-to-r ${getSemesterColor(subject.semester)}`} />
      
      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${getSemesterColor(subject.semester)} bg-opacity-10`}>
              <GiNotebook className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{subject.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <MdOutlineCode className="text-blue-500" />
                Code: {subject.code}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(subject)}
              className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <MdEdit className="text-lg" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(subject._id)}
              className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
            >
              <MdOutlineDelete className="text-lg" />
            </motion.button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-sm">
              <IoMdSchool className="text-blue-500 text-lg" />
              <div>
                <p className="text-gray-500 text-xs">Branch</p>
                <p className="font-medium text-gray-800">{subject.branch?.name}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-sm">
              <FaLayerGroup className="text-purple-500 text-lg" />
              <div>
                <p className="text-gray-500 text-xs">Semester</p>
                <p className="font-medium text-gray-800">Sem {subject.semester}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-3 col-span-2">
            <div className="flex items-center gap-2 text-sm">
              <MdOutlineCreditCard className="text-green-500 text-lg" />
              <div>
                <p className="text-gray-500 text-xs">Credits</p>
                <p className="font-medium text-gray-800">{subject.credits} Credits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaBookOpen className="text-blue-400" />
              <span className="text-xs text-gray-500">Subject Details</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getSemesterColor(subject.semester)} text-white`}>
              Semester {subject.semester}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Subject Form Modal
const SubjectFormModal = ({ isOpen, onClose, onSubmit, data, setData, branches, isEditing, dataLoading }) => {
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
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-2xl">
                  {isEditing ? <MdEdit className="text-3xl text-white" /> : <GiOpenBook className="text-3xl text-white" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {isEditing ? "Edit Subject" : "Add New Subject"}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {isEditing ? "Update subject information" : "Create a new subject for the curriculum"}
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
              {/* Subject Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <GiNotebook className="text-blue-600" />
                  Subject Name
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  placeholder="e.g., Data Structures"
                  required
                />
              </div>

              {/* Subject Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MdOutlineCode className="text-blue-600" />
                  Subject Code
                </label>
                <input
                  type="text"
                  value={data.code}
                  onChange={(e) => setData({ ...data, code: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  placeholder="e.g., CS101"
                  required
                />
              </div>

              {/* Branch Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <IoMdSchool className="text-blue-600" />
                  Branch
                </label>
                <select
                  value={data.branch}
                  onChange={(e) => setData({ ...data, branch: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  required
                >
                  <option value="">Select Branch</option>
                  {branches.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester and Credits Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaLayerGroup className="text-blue-600" />
                    Semester
                  </label>
                  <select
                    value={data.semester}
                    onChange={(e) => setData({ ...data, semester: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MdOutlineCreditCard className="text-blue-600" />
                    Credits
                  </label>
                  <input
                    type="number"
                    value={data.credits}
                    onChange={(e) => setData({ ...data, credits: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    placeholder="e.g., 3"
                    min="1"
                    max="10"
                    required
                  />
                </div>
              </div>

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
                  disabled={dataLoading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEditing ? "Update Subject" : "Add Subject"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Subject = () => {
  const [data, setData] = useState({
    name: "",
    code: "",
    branch: "",
    semester: "",
    credits: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [dataLoading, setDataLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSemester, setFilterSemester] = useState("all");
  const [filterBranch, setFilterBranch] = useState("all");

  useEffect(() => {
    getSubjectHandler();
    getBranchHandler();
  }, []);

  const getSubjectHandler = async () => {
    try {
      setDataLoading(true);
      const response = await axiosWrapper.get(`/subject`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setSubjects(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setSubjects([]);
      } else {
        toast.error(error.response?.data?.message || "Error fetching subjects");
      }
    } finally {
      setDataLoading(false);
    }
  };

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
        toast.error(error.response?.data?.message || "Error fetching branches");
      }
    }
  };

  const addSubjectHandler = async () => {
    if (
      !data.name ||
      !data.code ||
      !data.branch ||
      !data.semester ||
      !data.credits
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setDataLoading(true);
      toast.loading(isEditing ? "Updating Subject" : "Adding Subject");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      };
      let response;
      if (isEditing) {
        response = await axiosWrapper.patch(
          `/subject/${selectedSubjectId}`,
          data,
          { headers }
        );
      } else {
        response = await axiosWrapper.post(`/subject`, data, { headers });
      }
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
        getSubjectHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setDataLoading(false);
    }
  };

  const resetForm = () => {
    setData({
      name: "",
      code: "",
      branch: "",
      semester: "",
      credits: "",
    });
    setShowModal(false);
    setIsEditing(false);
    setSelectedSubjectId(null);
  };

  const deleteSubjectHandler = async (id) => {
    setIsDeleteConfirmOpen(true);
    setSelectedSubjectId(id);
  };

  const editSubjectHandler = (subject) => {
    setData({
      name: subject.name,
      code: subject.code,
      branch: subject.branch?._id,
      semester: subject.semester,
      credits: subject.credits,
    });
    setSelectedSubjectId(subject._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      setDataLoading(true);
      toast.loading("Deleting Subject");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      };
      const response = await axiosWrapper.delete(
        `/subject/${selectedSubjectId}`,
        { headers }
      );
      toast.dismiss();
      if (response.data.success) {
        toast.success("Subject has been deleted successfully");
        setIsDeleteConfirmOpen(false);
        getSubjectHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setDataLoading(false);
    }
  };

  // Filter subjects
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = 
      subject.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.branch?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSemester = filterSemester === "all" || subject.semester?.toString() === filterSemester;
    const matchesBranch = filterBranch === "all" || subject.branch?._id === filterBranch;
    
    return matchesSearch && matchesSemester && matchesBranch;
  });

  // Calculate stats
  const stats = {
    total: subjects.length,
    totalCredits: subjects.reduce((acc, subj) => acc + (parseInt(subj.credits) || 0), 0),
    branches: new Set(subjects.map(s => s.branch?._id)).size,
    avgCredits: subjects.length > 0 
      ? (subjects.reduce((acc, subj) => acc + (parseInt(subj.credits) || 0), 0) / subjects.length).toFixed(1)
      : 0
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
            <h1 className="text-3xl font-bold text-gray-800">Subject Management</h1>
            <p className="text-gray-600 mt-1">Manage and organize all academic subjects</p>
          </div>
          {branches.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <IoMdAdd className="text-xl" />
              Add New Subject
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      {branches.length > 0 && subjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<GiBookshelf />}
            label="Total Subjects"
            value={stats.total}
            color="from-blue-600 to-blue-700"
            delay={0.1}
          />
          <StatCard
            icon={<MdOutlineCreditCard />}
            label="Total Credits"
            value={stats.totalCredits}
            color="from-green-600 to-green-700"
            delay={0.2}
          />
          <StatCard
            icon={<IoMdSchool />}
            label="Branches Covered"
            value={stats.branches}
            color="from-purple-600 to-purple-700"
            delay={0.3}
          />
          <StatCard
            icon={<FaStar />}
            label="Avg Credits"
            value={stats.avgCredits}
            color="from-orange-600 to-orange-700"
            delay={0.4}
          />
        </div>
      )}

      {/* Branch Check */}
      {!dataLoading && branches.length === 0 && (
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
            Please add branches before adding subjects. Subjects need to be associated with specific branches.
          </p>
        </motion.div>
      )}

      {/* Search and Filter Bar */}
      {branches.length > 0 && (
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
                placeholder="Search by name, code, or branch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterSemester}
                onChange={(e) => setFilterSemester(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="all">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="all">All Branches</option>
                {branches.map(branch => (
                  <option key={branch._id} value={branch._id}>{branch.name}</option>
                ))}
              </select>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterSemester("all");
                  setFilterBranch("all");
                }}
                className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <MdOutlineRefresh className="text-xl text-gray-600" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Subjects Grid */}
      {dataLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : (
        branches.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject, index) => (
                <SubjectCard
                  key={subject._id}
                  subject={subject}
                  onEdit={editSubjectHandler}
                  onDelete={deleteSubjectHandler}
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
                  <GiBookshelf className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Subjects Found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || filterSemester !== "all" || filterBranch !== "all" 
                    ? "Try adjusting your search filters" 
                    : "Get started by adding a new subject"}
                </p>
                {(searchTerm || filterSemester !== "all" || filterBranch !== "all") ? (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilterSemester("all");
                      setFilterBranch("all");
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Add Your First Subject
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        )
      )}

      {/* Subject Form Modal */}
      <SubjectFormModal
        isOpen={showModal}
        onClose={resetForm}
        onSubmit={addSubjectHandler}
        data={data}
        setData={setData}
        branches={branches}
        isEditing={isEditing}
        dataLoading={dataLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this subject? This action cannot be undone."
      />
    </div>
  );
};

export default Subject;