import React from 'react';
import { LayoutDashboard, Calendar, Users, BarChart3, Settings, Calendar as CalendarIcon } from 'lucide-react';

function Sidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: Calendar
    },
    {
      id: 'students',
      label: 'Apprenants',
      icon: Users
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings
    }
  ];

  return (
    <div className="w-72 bg-gray-900 border-r border-gray-700/50 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center space-x-3 mb-1">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <CalendarIcon className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">DesignHub</h1>
        </div>
        <p className="text-gray-400 text-sm">hello@designhub.com</p>
      </div>

      {/* Main Menu Label */}
      <div className="px-6 pt-6 pb-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3.5 text-left rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 mr-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Schedule Management Card in Sidebar */}
      <div className="p-4 mx-4 mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">Manage your schedule right now</h4>
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
          Our AI systems will need direct instructions for scheduling everything you need.
        </p>
        <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black py-2.5 rounded-lg font-semibold text-sm transition-all">
          OK, Let's go
        </button>
      </div>

      {/* Calendar Admin Footer */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="text-xs text-gray-500 mb-2">Calendar Admin</div>
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="Admin"
            className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-400">Administrateur</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;