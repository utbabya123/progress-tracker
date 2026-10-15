import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Home from './pages/Home'
import ProjectLayout from './pages/project/ProjectLayout'
import ProjectHome from './pages/project/ProjectHome'
import ProgressUpdates from './pages/project/ProgressUpdates'
import Board from './pages/project/Board'
import Placeholder from './pages/project/Placeholder'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/project/:projectId" element={<ProjectLayout />}>
          <Route index element={<ProjectHome />} />
          <Route path="updates" element={<ProgressUpdates />} />
          <Route path="board" element={<Board />} />
          <Route path="roadmap" element={<Placeholder title="Roadmap" />} />
          <Route path="settings" element={<Placeholder title="Project Settings" />} />
          <Route path="members" element={<Placeholder title="Members" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
