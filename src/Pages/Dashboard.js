import React, { useState } from 'react';
import { FaUser, FaCog, FaEnvelope, FaBook, FaQuestionCircle } from 'react-icons/fa';
import MonCompte from './MonCompte'; // Importez le composant
import Settings from './Settings';
import Resources from './Resources';
import Courses from './Courses';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("profile"); // Section active par défaut

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="h-screen flex bg-blue-800">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-4 fixed h-full">
        <div className="flex flex-col space-y-6">
          <div className="text-xl font-bold">Dashboard</div>
          <div className="space-y-4">
            <div
              className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${activeSection === 'moncompte' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
              onClick={() => handleSectionChange('moncompte')}
            >
              <FaUser size={20} />
              <span>Mon Compte</span>
            </div>
            <div
              className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${activeSection === 'settings' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
              onClick={() => handleSectionChange('settings')}
            >
              <FaCog size={20} />
              <span>Settings</span>
            </div>
            <div
              className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${activeSection === 'messages' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
              onClick={() => handleSectionChange('messages')}
            >
              <FaEnvelope size={20} />
              <span>Messages</span>
            </div>
            <div
              className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${activeSection === 'courses' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
              onClick={() => handleSectionChange('courses')}
            >
              <FaBook size={20} />
              <span>Courses</span>
            </div>
            <div
              className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${activeSection === 'help' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
              onClick={() => handleSectionChange('help')}
            >
              <FaQuestionCircle size={20} />
              <span>Help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 w-full p-8">
        {activeSection === 'moncompte' && <MonCompte />} {/* Rendu du composant */}
        {activeSection === 'settings' && <Settings />}
        {activeSection === 'messages' && (
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3>Messages</h3>
            <p>Voir vos messages ici...</p>
          </div>
        )}
        {activeSection === 'courses' && <Resources />}
        {activeSection === 'help' && (
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3>Help</h3>
            <p>Aide et support ici...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
