import { useState } from 'react';
import { BootScreen } from './components/BootScreen';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { TechConstellation } from './components/TechConstellation';
import { Architecture } from './components/Architecture';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';

function App() {
  const [booting, setBooting] = useState(true);

  return (
    <>
      {booting ? (
        <BootScreen onComplete={() => setBooting(false)} />
      ) : (
        <div className="relative min-h-screen">
          <Background />
          <Navbar />
          
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <TechConstellation />
            <Architecture />
            <Education />
            <Certifications />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
