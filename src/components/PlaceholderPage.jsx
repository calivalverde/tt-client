import React from 'react';

const PlaceholderPage = ({ title, description }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-700/50 rounded-lg">
    <h1 className="text-4xl font-bungee mb-4 text-green-400">{title}</h1>
    <p className="text-xl text-gray-300">{description}</p>
    <p className="mt-8 font-mono text-green-400 animate-pulse">Launching Soon...</p>
  </div>
);

export default PlaceholderPage;
