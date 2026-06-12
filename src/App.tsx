import { useState, useCallback } from 'react';
import LandingPage from './pages/LandingPage';
import ImaginationPage from './pages/ImaginationPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'imagination'>('landing');

  const navigateToImagination = useCallback(() => {
    setCurrentPage('imagination');
  }, []);

  const navigateToLanding = useCallback(() => {
    setCurrentPage('landing');
  }, []);

  if (currentPage === 'imagination') {
    return <ImaginationPage onBack={navigateToLanding} />;
  }

  return <LandingPage onGetStarted={navigateToImagination} />;
}
