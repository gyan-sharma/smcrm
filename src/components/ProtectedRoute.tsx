import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from './Layout';
import Dashboard from '../pages/Dashboard';
import Opportunities from '../pages/Opportunities';
import OpportunityDetail from '../pages/OpportunityDetail';
import Users from '../pages/Users';
import AuditLog from '../pages/AuditLog';

export default function ProtectedRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="opportunities/:id" element={<OpportunityDetail />} />
        <Route path="users" element={<Users />} />
        <Route path="audit-log" element={<AuditLog />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}