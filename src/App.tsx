import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PreferencesProvider } from './contexts/PreferencesContext';
import AppShell from './app/layout/AppShell';
import Home from './app/routes/home';
import Messages from './app/routes/messages';
import Profiles from './app/routes/profiles';
import Images from './app/routes/images';
import Email from './app/routes/email';
import About from './app/routes/about';
import More from './app/routes/more';
import Dashboard from './app/routes/dashboard';
import Account from './app/routes/account';
import Pricing from './app/routes/pricing';

export default function App() {
  return (
    <PreferencesProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/images" element={<Images />} />
          <Route path="/email" element={<Email />} />
          <Route path="/about" element={<About />} />
          <Route path="/more" element={<More />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </PreferencesProvider>
  );
}
