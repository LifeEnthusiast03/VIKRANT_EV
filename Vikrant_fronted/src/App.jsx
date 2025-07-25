
import React, { useState } from 'react';
import Navbar from './components/common/Navbar/navbar';
import HomePage from './pages/Home/Home';
import TeamPage from './pages/Team/Team';
import ContactPage from './pages/Contact/Contact';
import ProjectPage from './pages/Project/Project';
import ServiceBooking from './pages/Service/service';
import Dashboard from './pages/Dashboard/dashboard';
import ElectricBikeChatbot from './components/ui/ChatBot/ChatBot';



const App = () => {
  const [currentSection, setCurrentSection] = useState('home');
  // Render current section
  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'team':
        return <TeamPage />;
      case 'project':
        return <ProjectPage />;
      case 'contact':
        return <ContactPage />;
      case 'dashboard':
        return <Dashboard/>
      case 'service':
        return <ServiceBooking/>
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative">
      <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection} />
      {renderCurrentSection()}
      <ElectricBikeChatbot/>
    </div>
  );
};

export default App;