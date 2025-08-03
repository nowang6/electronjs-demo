import React, { useState, useEffect } from 'react';

const SystemInfo: React.FC = () => {
  const [electronVersion, setElectronVersion] = useState<string>('Loading...');
  const [platform, setPlatform] = useState<string>('Loading...');

  useEffect(() => {
    if (window.electronAPI) {
      setElectronVersion(window.electronAPI.getVersion());
      setPlatform(window.electronAPI.getPlatform());
    }
  }, []);

  return (
    <div className="info-section">
      <h2>System Information</h2>
      <p>Electron Version: <span id="electron-version">{electronVersion}</span></p>
      <p>Platform: <span id="platform">{platform}</span></p>
    </div>
  );
};

export default SystemInfo;