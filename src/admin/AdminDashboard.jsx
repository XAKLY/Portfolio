import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/AdminPanel';
import StudentsList from './pages/StudentsList';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <Calendar />;
      case 'students':
        return <StudentsList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          {renderCurrentSection()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;