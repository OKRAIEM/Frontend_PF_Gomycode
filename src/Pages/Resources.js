import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';  // Import de l'icône "Ajouter"
import ResourceList from './ResourceList';


const Resources = () => {
  return (
    <div className="h-screen flex bg-blue-800">
      <div className="text-center text-white w-full">
        <h1 className="text-5xl font-bold mb-4">Bienvenue dans votre espace Instructeur!</h1>
        <p className="text-xl mb-6">Ici, vous pouvez rajouter vos cours, les modifier ou les supprimer</p>

        {/* Bouton "Ajouter Cours" avec une icône */}

        <ResourceList/>

{/*         <button 
          className="flex items-center justify-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
          onClick={() => alert("Ajouter un cours")}  
        >
          <FaPlusCircle size={20} className="mr-2" />  
          Ajouter Cours
        </button> */}
      </div>
    </div>
  );
};

export default Resources;
