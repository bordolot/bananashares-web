import { useEffect, useRef, useState } from 'react';
// import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
// import BlockchainEngine from './services/blockchain/Engine';
// import Info from './components/Info/Info';
// import Docs from './components/Info/Docs';
import About from './components/WebWindows/About';
import { CreateAsset } from './components/WebWindows/CreateAsset/CreateAsset';
import Docs from './components/WebWindows/Docs';
import FindAsset from './components/WebWindows/FindAsset/FindAsset';
import GettingStarted from './components/WebWindows/GettingStarted';
import Governance from './components/WebWindows/Governance';
import Help from './components/WebWindows/Help';
// import { WalletInterface } from './blockchain/WalletInterface';

import { WalletProvider } from './blockchain/WalletInterface';

function App() {
  const [activeComponent, setActiveComponent] = useState<string>('About');
  // const aboutRef = useRef<HTMLDivElement>(null);
  // const howItWorksRef = useRef<HTMLDivElement>(null);
  // const faqRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // console.clear();
    console.log("rayman App start!")
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  const handleNavbarClick = (item: string) => {
    setActiveComponent(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <>
      <WalletProvider>
        <Navbar onNavbarClick={handleNavbarClick} navbarRef={navbarRef} />
        <div className="flex flex-col mt-24 bgStandard">
          {/* @TODO consider utility class className="container" */}

          {activeComponent === 'Governance' && <Governance />}
          {activeComponent === 'Create Asset' && <CreateAsset />}
          {activeComponent === 'Find Asset' && <FindAsset />}
          {activeComponent === 'About' && <About onNavbarClick={handleNavbarClick} navbarRef={navbarRef} />}
          {activeComponent === 'Getting started' && <GettingStarted navbarHeight={navbarHeight} />}
          {activeComponent === 'Docs' && <Docs navbarHeight={navbarHeight} />}
          {activeComponent === 'Help' && <Help />}

        </div>
      </WalletProvider>
      <Footer />



    </>




  );
}

export default App;

