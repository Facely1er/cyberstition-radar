import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppShell from './app/layout/AppShell';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './app/routes/home';
import Messages from './app/routes/messages';
import Profiles from './app/routes/profiles';
import Images from './app/routes/images';
import Email from './app/routes/email';
import About from './app/routes/about';
import More from './app/routes/more';
import Login from './app/routes/login';
import Signup from './app/routes/signup';
import Dashboard from './app/routes/dashboard';
import Account from './app/routes/account';

export default function App() {
  return (
    <AuthProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/images" element={<Images />} />
          <Route path="/email" element={<Email />} />
          <Route path="/about" element={<About />} />
          <Route path="/more" element={<More />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </AuthProvider>
  );
}
