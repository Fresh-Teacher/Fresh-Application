import React, { useEffect, useState } from 'react';
import './App.css';

const repo = "https://fresh-teacher.github.io";
let deferredPrompt;

function App() {
  const [installable, setInstallable] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      console.log('INSTALL: Success');
    });
  }, []);

  const handleInstallClick = () => {
    setInstallable(false);
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  useEffect(() => {
    let timer;
    if (installable && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [installable, countdown]);

  return (
    <div className="App">
      <header className="App-header">
        {/* Logo Image */}
        <img src="logo.png" alt="FRESH Logo" className="App-logo" />
  
        {/* Company Heading */}
        <h2>FRESH TEACHER'S TECHNOLOGIES</h2>

        {/* Countdown Timer */}
        <p>
                <strong>The Install Button <em>may</em> appear in {countdown} seconds.</strong>
              </p>

        {installable ? (
          countdown > 0 ? (
            <>

              <button className="install-button" onClick={handleInstallClick}>
                <strong>INSTALL THE FRESH APP</strong> 📥
              </button>
            </>
          ) : (
            <>
              <p>
                If the installation button did not appear, click{' '}
                <a href="https://github.com/Fresh-Teacher/Fresh-Application/raw/main/Fresh%20App.apk" download>
                  here
                </a>{' '}
                to download the APK.
              </p>
              <p>
                {' '}
                <a href={repo}>
                  <strong>Go to Homepage</strong>
                </a>{' '}
              </p>
            </>
          )
        ) : (
          <p>
            <a href={repo}>
              <strong>Go to Homepage</strong>
            </a>
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
