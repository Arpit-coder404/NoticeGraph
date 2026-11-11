import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Bookmark,
  Bell,
  Calendar,
  Network,
  PenTool,
  Shield,
  RotateCcw,
  User,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { useNoticeStore } from '../../store/useNoticeStore';
import { SearchModal } from '../search/SearchModal';
import { UserRole } from '../../types';

export const TopMasthead: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentRole,
    currentUser,
    switchRole,
    savedIds,
    notifications,
    resetToDemoData
  } = useNoticeStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    setIsRoleDropdownOpen(false);
    if (role === 'publisher' && !location.pathname.startsWith('/studio')) {
      navigate('/studio');
    } else if (role === 'admin' && !location.pathname.startsWith('/admin')) {
      navigate('/admin');
    } else if (role === 'student' && (location.pathname.startsWith('/studio') || location.pathname.startsWith('/admin'))) {
      navigate('/');
    }
  };

  return (
    <>
      <header className="w-full bg-paper border-b-2 border-ink sticky top-0 z-40 select-none">
        {/* Top Thin Meta Bar */}
        <div className="border-b border-divider px-4 py-1.5 flex items-center justify-between text-[11px] font-mono text-ink-muted bg-paper-dark/40">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-ink">{todayFormatted}</span>
            <span className="hidden sm:inline text-divider">|</span>
            <span className="hidden sm:inline">CAMPUS INTELLIGENCE EDITION • VOL. 14</span>
            <span className="hidden md:inline text-divider">|</span>
            <span className="hidden md:inline text-olive font-semibold">ALL SYSTEMS SYNCHRONIZED</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Demo Reset */}
            <button
              onClick={() => {
                if (window.confirm('Reset all announcements, saved notices, and reminders to default demo data?')) {
                  resetToDemoData();
                }
              }}
              title="Reset Demo Dataset"
              className="flex items-center gap-1 hover:text-signal-orange transition text-ink-muted"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>

            {/* Demo Role Switcher Badge */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className={`flex items-center gap-1.5 px-2 py-0.5 border text-[11px] font-mono font-medium transition ${
                  currentRole === 'admin'
                    ? 'bg-ink text-paper border-ink'
                    : currentRole === 'publisher'
                    ? 'bg-cobalt text-paper border-cobalt'
                    : 'bg-paper-card text-ink border-divider hover:border-ink'
                }`}
              >
                <span className="uppercase">{currentRole}:</span>
                <span className="font-semibold">{currentUser.fullName}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-60 bg-paper-card border-2 border-ink shadow-xl z-50 p-1 divide-y divide-divider">
                  <div className="px-3 py-2 text-[10px] font-mono text-ink-muted uppercase">
                    Select Demo Perspective
                  </div>
                  
                  <button
                    onClick={() => handleRoleChange('student')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition ${
                      currentRole === 'student' ? 'bg-warm-light font-bold text-cobalt' : 'hover:bg-warm-light text-ink'
                    }`}
                  >
                    <div>
                      <div className="font-display font-medium">Student (Priya Sharma)</div>
                      <div className="text-[10px] text-ink-muted font-mono">CSE • 6th Semester</div>
                    </div>
                    {currentRole === 'student' && <CheckCircle2 className="w-3.5 h-3.5 text-cobalt" />}
                  </button>

                  <button
                    onClick={() => handleRoleChange('publisher')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition ${
                      currentRole === 'publisher' ? 'bg-warm-light font-bold text-cobalt' : 'hover:bg-warm-light text-ink'
                    }`}
                  >
                    <div>
                      <div className="font-display font-medium">Publisher (Dr. Anand Verma)</div>
                      <div className="text-[10px] text-ink-muted font-mono">Head, Placement Cell</div>
                    </div>
                    {currentRole === 'publisher' && <CheckCircle2 className="w-3.5 h-3.5 text-cobalt" />}
                  </button>

                  <button
                    onClick={() => handleRoleChange('admin')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition ${
                      currentRole === 'admin' ? 'bg-warm-light font-bold text-cobalt' : 'hover:bg-warm-light text-ink'
                    }`}
                  >
                    <div>
                      <div className="font-display font-medium">Administrator (Dean Vance)</div>
                      <div className="text-[10px] text-ink-muted font-mono">Registrar & Academic Dean</div>
                    </div>
                    {currentRole === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-cobalt" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Newspaper Masthead */}
        <div className="px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-baseline gap-3">
            <Link to="/" className="group flex items-center gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink group-hover:text-cobalt transition">
                NoticeGraph
              </span>
              <span className="w-2 h-2 bg-signal-orange inline-block rounded-none -mb-1"></span>
            </Link>
            <span className="hidden lg:inline text-xs font-mono text-ink-muted italic border-l border-divider pl-3">
              Every notice has a story. Every story has a connection.
            </span>
          </div>

          {/* Search Trigger */}
          <div className="flex-1 max-w-md hidden sm:block">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 bg-paper-dark border border-divider hover:border-ink transition text-xs font-mono text-ink-muted"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-deep" />
                <span>Search notices, scholarships, deadlines...</span>
              </div>
              <kbd className="px-1.5 py-0.5 bg-paper text-[10px] border border-divider text-ink font-semibold">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Navigation Action Links */}
          <nav className="hidden md:flex items-center gap-1 font-display text-xs font-semibold">
            <Link
              to="/"
              className={`px-3 py-1.5 transition ${
                location.pathname === '/' ? 'bg-ink text-paper' : 'hover:bg-warm-light text-ink'
              }`}
            >
              Front Page
            </Link>

            <Link
              to="/graph"
              className={`px-3 py-1.5 flex items-center gap-1.5 transition ${
                location.pathname === '/graph' ? 'bg-ink text-paper' : 'hover:bg-warm-light text-ink'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-cobalt" />
              <span>Relationship Graph</span>
            </Link>

            <Link
              to="/calendar"
              className={`px-3 py-1.5 flex items-center gap-1.5 transition ${
                location.pathname === '/calendar' ? 'bg-ink text-paper' : 'hover:bg-warm-light text-ink'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-signal-orange" />
              <span>Deadlines</span>
            </Link>

            <Link
              to="/saved"
              className={`px-3 py-1.5 flex items-center gap-1.5 transition ${
                location.pathname === '/saved' ? 'bg-ink text-paper' : 'hover:bg-warm-light text-ink'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved</span>
              {savedIds.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-cobalt text-paper text-[10px] font-mono flex items-center justify-center">
                  {savedIds.length}
                </span>
              )}
            </Link>

            <Link
              to="/inbox"
              className={`px-3 py-1.5 flex items-center gap-1.5 transition relative ${
                location.pathname === '/inbox' ? 'bg-ink text-paper' : 'hover:bg-warm-light text-ink'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Inbox</span>
              {unreadCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-signal-orange text-paper text-[10px] font-mono flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Publisher Workspace Link */}
            {(currentRole === 'publisher' || currentRole === 'admin') && (
              <Link
                to="/studio"
                className={`px-3 py-1.5 ml-1 border border-cobalt flex items-center gap-1.5 transition ${
                  location.pathname.startsWith('/studio')
                    ? 'bg-cobalt text-paper'
                    : 'bg-cobalt-soft text-cobalt hover:bg-cobalt hover:text-paper'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Publisher Studio</span>
              </Link>
            )}

            {/* Admin Institutional Portal Link */}
            {currentRole === 'admin' && (
              <Link
                to="/admin"
                className={`px-3 py-1.5 ml-1 border border-ink flex items-center gap-1.5 transition ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-ink text-paper'
                    : 'bg-warm-grey text-ink hover:bg-ink hover:text-paper'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin & Review</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 bg-paper-dark border border-divider text-ink"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 bg-ink text-paper"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-divider bg-paper-card p-4 space-y-2 text-sm font-display font-medium">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 hover:bg-warm-light"
            >
              Front Page
            </Link>
            <Link
              to="/graph"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 hover:bg-warm-light"
            >
              Relationship Graph
            </Link>
            <Link
              to="/calendar"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 hover:bg-warm-light"
            >
              Deadlines & Calendar
            </Link>
            <Link
              to="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 hover:bg-warm-light"
            >
              Saved Notices ({savedIds.length})
            </Link>
            <Link
              to="/inbox"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 hover:bg-warm-light"
            >
              Inbox ({unreadCount} unread)
            </Link>
            {(currentRole === 'publisher' || currentRole === 'admin') && (
              <Link
                to="/studio"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 bg-cobalt-soft text-cobalt font-semibold"
              >
                Publisher Studio
              </Link>
            )}
            {currentRole === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 bg-ink text-paper font-semibold"
              >
                Admin Review & Insights
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Global Command Search Overlay */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

