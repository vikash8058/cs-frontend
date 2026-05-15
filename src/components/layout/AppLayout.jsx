import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, Bell, User, Plus, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import PostForm from '../post/PostForm';

export default function AppLayout() {
  const [showPostModal, setShowPostModal] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const mobileLinks = isAuthenticated ? [
    { to: '/feed',          label: 'Home',    Icon: Home },
    { to: '/explore',       label: 'Explore', Icon: Compass },
    { type: 'action',       label: 'Post',    Icon: Plus, onClick: () => setShowPostModal(true) },
    { to: `/profile/${user?.userId}`, label: 'Profile', Icon: User },
    { to: '/settings',      label: 'Settings', Icon: Settings },
  ] : [
    { to: '/feed',          label: 'Home',    Icon: Home },
    { to: '/explore',       label: 'Explore', Icon: Compass },
    { to: '/login',         label: 'Login',   Icon: User },
  ];

  return (
    <>
      <Navbar onNewPost={() => setShowPostModal(true)} />
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          <Outlet />
        </main>
        <RightPanel />
      </div>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav">
        {mobileLinks.map((link) => (
          <div
            key={link.label}
            className={`mobile-nav-item${location.pathname === link.to ? ' active' : ''}${link.label === 'Post' ? ' post-center' : ''}`}
            onClick={() => link.onClick ? link.onClick() : navigate(link.to)}
          >
            <link.Icon size={22} />
            <span>{link.label}</span>
          </div>
        ))}
      </nav>

      {/* New post modal */}
      {showPostModal && (
        <PostForm onClose={() => setShowPostModal(false)} onSuccess={() => setShowPostModal(false)} />
      )}
    </>
  );
}
