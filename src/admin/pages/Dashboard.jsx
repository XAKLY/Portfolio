import React from 'react';
import { Users, Calendar, BookOpen, TrendingUp, UserCheck, Clock, Award, Globe } from 'lucide-react';

function Dashboard() {
  const stats = [
    {
      title: 'Apprenants Actifs',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Cours ce Mois',
      value: '89',
      change: '+8%',
      changeType: 'positive',
      icon: Calendar
    },
    {
      title: 'Formations Complétées',
      value: '156',
      change: '+23%',
      changeType: 'positive',
      icon: BookOpen
    },
    {
      title: 'Taux de Réussite',
      value: '94%',
      change: '+2%',
      changeType: 'positive',
      icon: TrendingUp
    }
  ];

  const recentActivities = [
    {
      type: 'inscription',
      message: 'Nouvel apprenant inscrit: Marie Dubois',
      time: 'Il y a 2 heures',
      icon: UserCheck
    },
    {
      type: 'cours',
      message: 'Cours FLE B2 programmé pour demain',
      time: 'Il y a 4 heures',
      icon: Clock
    },
    {
      type: 'certification',
      message: 'Ahmed El Mansouri a réussi son TCF Canada',
      time: 'Il y a 6 heures',
      icon: Award
    },
    {
      type: 'visa',
      message: 'Dossier visa approuvé pour Lina Silva',
      time: 'Il y a 8 heures',
      icon: Globe
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Vue d'ensemble de votre centre FLE</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Activités Récentes</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="w-10 h-10 bg-orange-500 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.message}</p>
                    <p className="text-gray-400 text-sm mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Actions Rapides</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
              Nouveau Cours
            </button>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
              Ajouter Apprenant
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
              Programmer Événement
            </button>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
              Rapport Mensuel
            </button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Aperçu des Formations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Formation FLE Débutant</span>
              <span className="text-white">85%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Préparation TCF Canada</span>
              <span className="text-white">92%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">DELF B2</span>
              <span className="text-white">78%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;