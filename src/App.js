import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import GalleryPage from "./Pages/GalleryPage";
import Home from "./Pages/Home";
import ProgramPage from "./Pages/ProgramPage";
import ResearchPage from "./Pages/ResearchPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/program" element={<ProgramPage />} />
        <Route path="/research" element={<ResearchPage />} />
      </Routes>
    </Layout>
  );
}
