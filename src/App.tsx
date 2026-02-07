import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './app/layout/AppShell';
import Home from './app/routes/home';
import Messages from './app/routes/messages';
import Profiles from './app/routes/profiles';
import Images from './app/routes/images';
import Email from './app/routes/email';
import About from './app/routes/about';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/images" element={<Images />} />
        <Route path="/email" element={<Email />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
