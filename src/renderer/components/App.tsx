import React, { useState, useEffect } from 'react';
import SystemInfo from './SystemInfo';
import MessageSection from './MessageSection';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Electron + TypeScript + Webpack + React</h1>
      <SystemInfo />
      <MessageSection />
    </div>
  );
};

export default App;