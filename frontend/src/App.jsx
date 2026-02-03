import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './Pages/Landing.jsx';
import BuildOutfit from './Pages/BuildOutfit';
import OutfitCollection from './Pages/OutfitCollection';
import OutfitPreview from './Pages/OutfitPreview';
import ClothingPreview from './Pages/ClothingPreview';
import ClothingUpload from './Pages/ClothingUpload';
import ClothingCollection from './Pages/ClothingCollection';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AccountPage from './Pages/AccountPage';
import CuratedCollection from './Pages/CuratedCollection';
import SearchPage from "./Pages/SearchPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Account */}
        <Route path="/account" element={<AccountPage />} />

        {/* Clothing */}
        <Route path="/wardrobe" element={<ClothingCollection />} />
        <Route path="/wardrobe/new" element={<ClothingUpload />} />
        <Route path="/wardrobe/:id" element={<ClothingPreview />} />

        {/* Outfits */}
        <Route path="/outfits" element={<OutfitCollection />} />
        <Route path="/outfits/build" element={<BuildOutfit />} />
        <Route path="/outfits/:id" element={<OutfitPreview />} />

        {/* Curated */}
        <Route path="/curated" element={<CuratedCollection />} />

        {/* Search */}
        <Route path="/search" element={<SearchPage />} />

        {/* Optional 404 */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
