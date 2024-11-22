import React from 'react';
import HighLightedText from '../Components/core/HighLightedText';

const Home = () => {
    return (
        <div
            className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-800 to-blue-500 bg-cover bg-center"
        >
            {/* <div className='text-4xl font-semibold mt-7 text-center'>
                <p>Empower Your Future with <HighLightedText text={"Coding Skills"} /> </p>
            </div> */}
            <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Bienvenue sur notre site !</h1>
                <p className="text-xl">Ceci est la page d'accueil. Profitez de votre visite !</p>
            </div>
        </div>
    );
};

export default Home;
