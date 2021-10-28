import { useContext } from 'react';
import './index.css';
import App from './App';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { SpotifyContext } from './contexts/SpotifyContext';
import { AppleMusicContext } from './contexts/AppleMusicContext';

const Router = () => {
  const { spotify } = useContext(SpotifyContext)
  const { appleMusic } = useContext(AppleMusicContext)


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="spotify" element={<App vendor={spotify} secondaryVendor={appleMusic} />} />
      <Route path="apple-music" element={<App vendor={appleMusic} secondaryVendor={spotify} />} />
    </Routes>
  );
};

export default Router;
