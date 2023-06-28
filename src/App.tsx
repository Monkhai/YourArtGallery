import { useState } from 'react';
import HomeScreen from './Screens/HomeScreen';
import NavBar from './components/NavBar/NavBar';
import ArtScreen from './Screens/ArtScreen';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Art } from './hooks/useGetArtwork';

function App() {
  const [selectedArt, setSelectedArt] = useState<Art | null>(null);
  const navigate = useNavigate();

  const handleArtClick = (art: Art) => {
    setSelectedArt(art);
    navigate(`/artwork/${art.id}`);
  };

  return (
    <>
      <NavBar
        onLogoClick={() => {
          navigate('/');
        }}
        position={'sticky'}
        top={0}
        zIndex={10}
      />
      <Routes>
        <Route path="/" element={<HomeScreen onArtClick={handleArtClick} />} />
        <Route path="/artwork/:id" element={<ArtScreen art={selectedArt} />} />
      </Routes>
    </>
  );
}

export default App;
