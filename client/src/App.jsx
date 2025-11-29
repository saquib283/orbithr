
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEES, ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from './graphql/queries';

import Navbar from './components/layout/Navbar';
import EmployeeTile from './components/employee/EmployeeTile';
import EmployeeGrid from './components/employee/EmployeeGrid';
import EmployeeModal from './components/employee/EmployeeModal';
import EmployeeFormModal from './components/employee/EmployeeFormModal';
import ConfirmDeleteModal from './components/common/ConfirmDeleteModal';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import ReportsDashboard from './components/reports/ReportsDashboard';
import LoginPage from './components/auth/LoginPage';


import { LayoutGrid, List, List as ListIcon, Loader2, ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  // --- AUTH STATE (Lazy Init) ---
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('orbit_token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('orbit_user');
    return stored ? JSON.parse(stored) : null;
  });

  // --- UI STATE ---
  const [viewMode, setViewMode] = useState('tile');
  const [activeTab, setActiveTab] = useState('Employees');

  // --- DATA STATE ---
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const ITEMS_PER_PAGE = 8;

  // --- MODAL STATE ---
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // --- GRAPHQL QUERY ---
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES, {
    skip: !isAuthenticated,
    variables: { page: page, limit: ITEMS_PER_PAGE, filter: searchTerm },
    fetchPolicy: 'cache-and-network'
  });

  const employees = data?.getEmployees?.employees || [];
  const totalPages = data?.getEmployees?.totalPages || 1;
  const currentPage = data?.getEmployees?.currentPage || 1;

  // --- GRAPHQL MUTATIONS ---
  const [addEmployee, { loading: addLoading }] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => {
      setIsFormOpen(false);
      toast.success('Employee added successfully!');
      refetch();
    },
    onError: (err) => toast.error(`Error: ${err.message}`)
  });

  const [updateEmployee, { loading: updateLoading }] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => {
      setIsFormOpen(false);
      setEditingEmp(null);
      toast.success('Employee updated successfully!');
      refetch();
    },
    onError: (err) => toast.error(`Error: ${err.message}`)
  });

  const [deleteEmployee, { loading: deleteLoading }] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      setIsDeleteModalOpen(false);
      setDeleteId(null);
      toast.success('Employee deleted successfully');
      refetch();
    },
    onError: (err) => {
      setIsDeleteModalOpen(false);
      toast.error(`Delete failed: ${err.message}`);
    }
  });

  // --- HANDLERS ---
  const handleLogin = (loginData) => {
    localStorage.setItem('orbit_token', loginData.token);
    localStorage.setItem('orbit_user', JSON.stringify(loginData.user));
    setUser(loginData.user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('orbit_token');
    localStorage.removeItem('orbit_user');
    setIsAuthenticated(false);
    setUser(null);
    setActiveTab('Employees');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to page 1 immediately to avoid render loops
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await deleteEmployee({ variables: { id: deleteId } });
    }
  };

  const handleEditClick = (emp) => {
    setEditingEmp(emp);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingEmp) {
        await updateEmployee({ variables: { id: editingEmp.id, input: formData } });
      } else {
        await addEmployee({ variables: { input: formData } });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white relative overflow-hidden">
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-cyan-600/20 rounded-full blur-[100px]" />
      </div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {(activeTab === 'Employees' || activeTab === 'All Staff') && (
          <>
            {/* --- HEADER (Fixed Height Inconsistency) --- */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12 animate-fade-in-up">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Team Directory</h1>
                <p className="text-gray-400 mt-2 text-lg">Manage talent, track performance, and organize roles.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                {/* Search Bar - Fixed Height h-11 */}
                <div className="relative group h-11">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    className="h-full pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all w-full sm:w-64"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* Add Button - Fixed Height h-11 */}
                <button
                  onClick={() => { setEditingEmp(null); setIsFormOpen(true); }}
                  className="h-11 flex items-center justify-center gap-2 px-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all whitespace-nowrap"
                >
                  <Plus size={20} /> Add Member
                </button>

                {/* View Switcher - Fixed Height h-11 */}
                <div className="h-11 flex items-center bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-xl w-fit">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`h-full px-3 rounded-lg flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white'}`}
                  >
                    <List size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('tile')}
                    className={`h-full px-3 rounded-lg flex items-center justify-center transition-all ${viewMode === 'tile' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white'}`}
                  >
                    <LayoutGrid size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* --- CONTENT --- */}
            {loading && <div className="flex justify-center h-64"><Loader2 className="animate-spin text-cyan-500" size={48} /></div>}

            {error && (
              <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center">
                Error loading data: {error.message}
              </div>
            )}

            {!loading && !error && (
              <>
                {employees.length > 0 ? (
                  <>
                    {viewMode === 'tile' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
                        {employees.map((emp) => (
                          <EmployeeTile
                            key={emp.id}
                            data={emp}
                            onClick={setSelectedEmp}
                            onEdit={() => handleEditClick(emp)}
                            onDelete={() => handleDeleteClick(emp.id)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="animate-fade-in-up">
                        <EmployeeGrid
                          data={employees}
                          onClick={setSelectedEmp}
                          onEdit={handleEditClick}
                          onDelete={handleDeleteClick}
                        />
                      </div>
                    )}

                    {totalPages > 1 && (
                      <div className="flex justify-center items-center mt-12 gap-6 animate-fade-in-up pb-10">
                        <button
                          onClick={() => setPage(p => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white flex items-center gap-2"
                        >
                          <ChevronLeft size={20} /> Previous
                        </button>

                        <span className="text-gray-400 font-medium">
                          Page <span className="text-cyan-400 font-bold">{currentPage}</span> of {totalPages}
                        </span>

                        <button
                          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white flex items-center gap-2"
                        >
                          Next <ChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500 animate-fade-in-up">
                    <Search size={48} className="mb-4 opacity-20" />
                    <p className="text-lg">No employees found matching your search.</p>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {activeTab === 'Analytics' && <AnalyticsDashboard />}
        {activeTab === 'Reports' && <ReportsDashboard />}

        {activeTab === 'Settings' && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <ListIcon className="text-gray-500" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-400">System Settings</h2>
            <p className="text-gray-500 mt-2">Configuration module coming soon.</p>
          </div>
        )}

      </main>

      {selectedEmp && <EmployeeModal emp={selectedEmp} onClose={() => setSelectedEmp(null)} />}

      <EmployeeFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingEmp}
        loading={addLoading || updateLoading}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />

    </div>
  );
}

export default App;