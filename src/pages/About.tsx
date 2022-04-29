import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto min-h-[90vh] px-4">
      <h3 className="mt-8 mb-4 text-2xl font-medium">Features</h3>
      <ol className="ml-8 list-decimal text-lg">
        <li>Search Autocomplete</li>
        <li>Global crypto stats</li>
        <li>Crypto details</li>
      </ol>
      <h3 className="mt-8 mb-4 text-2xl font-medium">Js Library</h3>
      <ol className="ml-8 list-decimal text-lg">
        <li>react</li>
        <li>react-router-dom</li>
        <li>typescript</li>
        <li>reacr-redux</li>
        <li>@reduxjs/toolkit</li>
        <li>millify</li>
        <li>axios</li>
        <li>html-react-parser</li>
        <li>chart.js</li>
        <li>react-chartjs-2</li>
      </ol>
      <h3 className="mt-8 mb-4 text-2xl font-medium">Css Framework</h3>
      <ol className="ml-8 list-decimal text-lg">
        <li>TailwindCss</li>
        <li>PostCss</li>
      </ol>
      <h3 className="mt-8 mb-4 text-2xl font-medium">Api</h3>
      <ol className="ml-8 list-decimal text-lg">
        <li>Rapid Api/coinranking</li>
      </ol>
    </div>
  );
};

export default About;
