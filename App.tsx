import React, { useState } from 'react';
import GamePage from './components/GamePage';
import NavigationPage from './components/NavigationPage';
import MemoriesPage from './components/MemoriesPage';
import WishesPage from './components/WishesPage';
import SpecialMessagePage from './components/SpecialMessagePage';

type Page = 'game' | 'navigation' | 'memories' | 'wishes' | 'message';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('game');

  const handleGameComplete = () => {
    setCurrentPage('navigation');
  };

  const handleNavigate = (page: 'game' | 'memories' | 'wishes' | 'message') => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage('navigation');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'game':
        return <GamePage onGameComplete={handleGameComplete} />;
      case 'navigation':
        return <NavigationPage onNavigate={handleNavigate} />;
      case 'memories':
        return <MemoriesPage onBack={handleBack} />;
      case 'wishes':
        return <WishesPage onBack={handleBack} />;
      case 'message':
        return <SpecialMessagePage onBack={handleBack} />;
      default:
        return <GamePage onGameComplete={handleGameComplete} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;