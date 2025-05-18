import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import AgentList from './components/agents/AgentList';
import ListUpload from './components/lists/ListUpload';
import ListView from './components/lists/ListView';

// Layout component for protected routes
const ProtectedLayout = () => {
	return (
		<div className="min-h-screen bg-gray-100">
			<div className="fixed top-0 left-0 right-0 z-50">
				<Navbar />
			</div>
			<div className="flex pt-16">
				<div className="fixed left-0 top-16 h-[calc(100vh-4rem)]">
					<Sidebar />
				</div>
				<main className="flex-1 ml-64 p-6 min-h-[calc(100vh-4rem)]">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					
					{/* Protected Routes */}
					<Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
						<Route index element={<Navigate to="/dashboard" replace />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="agents" element={<AgentList />} />
						<Route path="lists/upload" element={<ListUpload />} />
						<Route path="lists" element={<ListView />} />
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
