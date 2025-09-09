import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Mail, Phone, MapPin } from 'lucide-react';

function StudentsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');

  const students = [
    {
      id: 1,
      firstName: 'Ahmed',
      lastName: 'El Mansouri',
      email: 'ahmed.elmansouri@email.com',
      phone: '+212 6 12 34 56 78',
      level: 'B2',
      formation: 'TCF Canada',
      status: 'actif',
      joinDate: '2024-01-15',
      progress: 85,
      country: 'Maroc'
    },
    {
      id: 2,
      firstName: 'Lina',
      lastName: 'Silva',
      email: 'lina.silva@email.com',
      phone: '+55 11 99 876 5432',
      level: 'A2',
      formation: 'Formation FLE',
      status: 'actif',
      joinDate: '2024-02-20',
      progress: 65,
      country: 'Brésil'
    },
    {
      id: 3,
      firstName: 'Maria',
      lastName: 'Gonzalez',
      email: 'maria.gonzalez@email.com',
      phone: '+34 6 12 34 56 78',
      level: 'C1',
      formation: 'DALF C1',
      status: 'terminé',
      joinDate: '2023-11-10',
      progress: 100,
      country: 'Espagne'
    },
    {
      id: 4,
      firstName: 'Jin',
      lastName: 'Wang',
      email: 'jin.wang@email.com',
      phone: '+86 138 0013 8000',
      level: 'A1',
      formation: 'Formation FLE',
      status: 'actif',
      joinDate: '2024-03-05',
      progress: 35,
      country: 'Chine'
    },
    {
      id: 5,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 555 123 4567',
      level: 'B1',
      formation: 'DELF B1',
      status: 'pause',
      joinDate: '2024-01-28',
      progress: 70,
      country: 'États-Unis'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.formation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'tous' || student.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'actif':
        return 'bg-green-500';
      case 'pause':
        return 'bg-yellow-500';
      case 'terminé':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'A1':
      case 'A2':
        return 'bg-red-100 text-red-800';
      case 'B1':
      case 'B2':
        return 'bg-orange-100 text-orange-800';
      case 'C1':
      case 'C2':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Liste des Apprenants</h1>
          <p className="text-gray-400">Gestion complète de vos étudiants FLE</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Nouvel Apprenant</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un apprenant..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tous">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="pause">En pause</option>
              <option value="terminé">Terminé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Apprenant
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Formation
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Progression
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                        {student.firstName[0]}{student.lastName[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {student.country}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm text-white flex items-center">
                        <Mail className="h-3 w-3 mr-2 text-gray-400" />
                        {student.email}
                      </div>
                      <div className="text-sm text-gray-400 flex items-center">
                        <Phone className="h-3 w-3 mr-2 text-gray-400" />
                        {student.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{student.formation}</div>
                    <div className="text-sm text-gray-400">Inscrit le {new Date(student.joinDate).toLocaleDateString('fr-FR')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(student.level)}`}>
                      {student.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">{student.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full text-white ${getStatusColor(student.status)}`}>
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-1"></div>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-400 hover:bg-gray-700 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-green-400 hover:bg-gray-700 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="text-2xl font-bold text-white mb-2">
            {students.filter(s => s.status === 'actif').length}
          </div>
          <div className="text-gray-400">Apprenants Actifs</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="text-2xl font-bold text-white mb-2">
            {students.filter(s => s.status === 'terminé').length}
          </div>
          <div className="text-gray-400">Formations Terminées</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="text-2xl font-bold text-white mb-2">
            {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
          </div>
          <div className="text-gray-400">Progression Moyenne</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="text-2xl font-bold text-white mb-2">
            {new Set(students.map(s => s.country)).size}
          </div>
          <div className="text-gray-400">Pays Représentés</div>
        </div>
      </div>
    </div>
  );
}

export default StudentsList;