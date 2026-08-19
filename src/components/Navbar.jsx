import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, MessageSquare, LogOut, Layout, Users, Megaphone, ShoppingBag, FolderGit } from 'lucide-react';

export default function Navbar({ isLoggedIn, currentUser, logout, notifications, messages }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const unreadNotifs = notifications ? notifications.filter(n => !n.read).length : 0;
  const unreadMsg = messages ? messages.filter(m => m.unread).length : 0;

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkStyle = (path) => {
    return `text-sm font-semibold transition-colors duration-150 py-1.5 border-b-2 ${
      isActive(path)
        ? 'border-terracotta text-olive font-bold'
        : 'border-transparent text-muted hover:text-dark hover:border-sand'
    }`;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-surface border-b border-sand sticky top-0 z-50 px-4 md:px-8 py-4 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Branding Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-1.5 group">
            <span className="font-serif text-2xl font-black tracking-tight text-olive select-none">
              VES<span className="text-terracotta group-hover:text-olive transition-colors">Local</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          {isLoggedIn && (
            <div className="hidden lg:flex items-center gap-6 mt-1">
              <Link to="/dashboard" className={linkStyle('/dashboard')}>Noticeboard</Link>
              <Link to="/opportunities" className={linkStyle('/opportunities')}>Opportunities</Link>
              <Link to="/discover" className={linkStyle('/discover')}>Discover Students</Link>
              <Link to="/businesses" className={linkStyle('/businesses')}>Businesses</Link>
              <Link to="/teams" className={linkStyle('/teams')}>Collaborations</Link>
            </div>
          )}
        </div>

        {/* Desktop Quick Actions / User Settings */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Notification icon */}
              <Link 
                to="/notifications" 
                className="p-2 border border-sand hover:border-olive text-muted hover:text-olive transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-terracotta text-surface text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-surface">
                    {unreadNotifs}
                  </span>
                )}
              </Link>

              {/* Message icon */}
              <Link 
                to="/messages" 
                className="p-2 border border-sand hover:border-olive text-muted hover:text-olive transition-colors relative"
                title="Messages"
              >
                <MessageSquare className="w-4 h-4" />
                {unreadMsg > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-terracotta text-surface text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-surface">
                    {unreadMsg}
                  </span>
                )}
              </Link>

              {/* Profile Avatar */}
              <div className="h-6 w-px bg-sand"></div>

              <Link to={`/profile/${currentUser.id}`} className="flex items-center gap-2 group">
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  className="w-8 h-8 rounded-full border border-sand group-hover:border-olive transition-colors bg-bg-ves"
                />
                <div className="text-left leading-none">
                  <div className="text-xs font-bold text-dark group-hover:text-terracotta transition-colors">{currentUser.name}</div>
                  <div className="text-[10px] text-muted">{currentUser.department}</div>
                </div>
              </Link>

              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="p-2 border border-transparent hover:border-terracotta/20 text-muted hover:text-terracotta transition-colors ml-2"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-semibold text-olive hover:text-dark transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-semibold bg-olive text-surface hover:bg-olive/90 border border-olive transition-all duration-150"
              >
                Join VESLocal
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          {isLoggedIn && (
            <>
              <Link to="/notifications" className="p-2 border border-sand text-muted relative">
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 bg-terracotta text-surface text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {unreadNotifs}
                  </span>
                )}
              </Link>
              <Link to="/messages" className="p-2 border border-sand text-muted relative">
                <MessageSquare className="w-4 h-4" />
                {unreadMsg > 0 && (
                  <span className="absolute -top-1 -right-1 bg-terracotta text-surface text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {unreadMsg}
                  </span>
                )}
              </Link>
            </>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border border-sand text-dark hover:border-olive transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-sand flex flex-col gap-4 animate-fadeIn">
          {isLoggedIn ? (
            <>
              {/* Profile Preview */}
              <Link 
                to={`/profile/${currentUser.id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 bg-bg-ves border border-sand"
              >
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  className="w-10 h-10 rounded-full border border-sand bg-surface"
                />
                <div className="text-left">
                  <div className="text-sm font-bold text-dark">{currentUser.name}</div>
                  <div className="text-xs text-muted">{currentUser.year} • {currentUser.department}</div>
                </div>
              </Link>

              {/* Mobile navigation links */}
              <div className="flex flex-col gap-1 text-left">
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 p-2.5 text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'bg-sand/30 text-olive' : 'text-muted hover:bg-bg-ves'}`}
                >
                  <Layout className="w-4 h-4" /> Noticeboard
                </Link>
                <Link 
                  to="/opportunities" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 p-2.5 text-sm font-semibold transition-colors ${isActive('/opportunities') ? 'bg-sand/30 text-olive' : 'text-muted hover:bg-bg-ves'}`}
                >
                  <Megaphone className="w-4 h-4" /> Opportunities
                </Link>
                <Link 
                  to="/discover" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 p-2.5 text-sm font-semibold transition-colors ${isActive('/discover') ? 'bg-sand/30 text-olive' : 'text-muted hover:bg-bg-ves'}`}
                >
                  <Users className="w-4 h-4" /> Discover Students
                </Link>
                <Link 
                  to="/businesses" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 p-2.5 text-sm font-semibold transition-colors ${isActive('/businesses') ? 'bg-sand/30 text-olive' : 'text-muted hover:bg-bg-ves'}`}
                >
                  <ShoppingBag className="w-4 h-4" /> Student Businesses
                </Link>
                <Link 
                  to="/teams" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 p-2.5 text-sm font-semibold transition-colors ${isActive('/teams') ? 'bg-sand/30 text-olive' : 'text-muted hover:bg-bg-ves'}`}
                >
                  <FolderGit className="w-4 h-4" /> Collaborations
                </Link>
              </div>

              <div className="h-px bg-sand w-full"></div>

              {/* Logout */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 p-3 border border-transparent bg-terracotta/10 text-terracotta text-sm font-bold hover:bg-terracotta/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 p-2">
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-olive border border-sand bg-surface hover:bg-bg-ves transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold bg-olive text-surface hover:bg-olive/90 transition-colors"
              >
                Join VESLocal
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
