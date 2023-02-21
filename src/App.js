import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import GalleryPage from "./Pages/GalleryPage";
import Home from "./Pages/Home";
import ProgramPage from "./Pages/ProgramPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/program" element={<ProgramPage />} />
      </Routes>
    </Layout>
  );
}
