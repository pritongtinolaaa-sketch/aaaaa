import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  LogOut,
  KeyRound,
  ScrollText,
  Cookie,
  Menu,
  X,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { motion } from 'framer-motion';

function TierBadge({ isMaster, isPremium }) {
  if (!isMaster && !isPremium) {
    return (
      <span className="rounded-sm border border-white/10 bg-white/10 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-white/40">
        FREE
      </span>
    );
  }

  const isMasterTheme = isMaster;
  const label = isMasterTheme ? 'MASTER' : 'PREMIUM';

  const badgeClass = isMasterTheme
    ? 'border-yellow-100/90 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-300 text-amber-950 ring-amber-200/60 shadow-[0_0_14px_rgba(251,191,36,0.9),0_0_26px_rgba(245,158,11,0.55),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(146,64,14,0.35)]'
    : 'border-purple-300/40 bg-gradient-to-r from-purple-600/35 via-violet-500/30 to-purple-600/35 text-purple-200 ring-purple-400/25 shadow-[0_0_8px_rgba(168,85,247,0.35),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_1px_rgba(46,16,101,0.3)]';

  const shineClass = isMasterTheme
    ? 'from-transparent via-white/80 to-transparent'
    : 'from-transparent via-white/70 to-transparent';

  const sparkleLeftClass = isMasterTheme
    ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.98)]'
    : 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]';

  const sparkleTopClass = isMasterTheme
    ? 'text-yellow-50 drop-shadow-[0_0_8px_rgba(255,248,200,1)]'
    : 'text-violet-100 drop-shadow-[0_0_8px_rgba(200,170,255,1)]';

  const sparkleRightClass = isMasterTheme
    ? 'text-yellow-100 drop-shadow-[0_0_10px_rgba(255,248,200,1)]'
    : 'text-purple-200 drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]';

  const sparkleBottomClass = isMasterTheme
    ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.98)]'
    : 'text-violet-100 drop-shadow-[0_0_8px_rgba(216,180,255,0.95)]';

  const orbitOneClass = isMasterTheme
    ? 'bg-amber-100/90 shadow-[0_0_10px_rgba(255,235,160,0.95)]'
    : 'bg-purple-200/90 shadow-[0_0_10px_rgba(168,85,247,0.9)]';

  const orbitTwoClass = isMasterTheme
    ? 'bg-yellow-50/95 shadow-[0_0_8px_rgba(255,245,190,1)]'
    : 'bg-violet-200/95 shadow-[0_0_8px_rgba(200,170,255,1)]';

  const orbitThreeClass = isMasterTheme
    ? 'bg-amber-200/90 shadow-[0_0_8px_rgba(255,220,120,0.95)]'
    : 'bg-fuchsia-200/90 shadow-[0_0_8px_rgba(232,180,255,0.95)]';

  return (
    <div className="relative inline-flex items-center justify-center overflow-visible">
      <div className="relative inline-flex items-center justify-center overflow-visible px-3 py-2">
        <span
          className={`relative z-10 inline-flex overflow-hidden rounded-full border px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ring-1 ${badgeClass}`}
        >
          <span className="relative z-10">{label}</span>

          <motion.span
            className={`pointer-events-none absolute inset-y-0 left-[-38%] z-0 w-[36%] skew-x-[-20deg] bg-gradient-to-r ${shineClass}`}
            animate={{ x: ['0%', '340%'] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: 'easeInOut',
            }}
          />
        </span>

        <motion.span
          className={`pointer-events-none absolute left-[-10px] top-1/2 z-20 text-[10px] leading-none ${sparkleLeftClass}`}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.65, 1.15, 0.65],
            x: [0, -1, 0],
            y: [-1, -5, -1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 1.9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.1,
          }}
        >
          ✦
        </motion.span>

        <motion.span
          className={`pointer-events-none absolute left-[18%] top-[-6px] z-20 text-[9px] leading-none ${sparkleTopClass}`}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.7, 1.1, 0.7],
            y: [0, -4, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.35,
          }}
        >
          ✦
        </motion.span>

        <motion.span
          className={`pointer-events-none absolute right-[-10px] top-1/2 z-20 text-[11px] leading-none ${sparkleRightClass}`}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.65, 1.25, 0.65],
            x: [0, 2, 0],
            y: [0, -3, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 2.1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8,
          }}
        >
          ✦
        </motion.span>

        <motion.span
          className={`pointer-events-none absolute bottom-[-4px] right-[22%] z-20 text-[9px] leading-none ${sparkleBottomClass}`}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.7, 1.1, 0.7],
            y: [0, 3, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 1.9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.25,
          }}
        >
          ✦
        </motion.span>

        <motion.span
          className={`pointer-events-none absolute z-0 h-1.5 w-1.5 rounded-full ${orbitOneClass}`}
          animate={{
            x: [-18, -5, 10, 18, 8, -10, -18],
            y: [0, -10, -12, 0, 10, 8, 0],
            opacity: [0.2, 0.8, 0.95, 0.6, 0.9, 0.5, 0.2],
            scale: [0.75, 1, 1.15, 0.95, 1.1, 0.9, 0.75],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.span
          className={`pointer-events-none absolute z-0 h-1 w-1 rounded-full ${orbitTwoClass}`}
          animate={{
            x: [16, 4, -10, -18, -8, 12, 16],
            y: [0, 10, 12, 0, -10, -8, 0],
            opacity: [0.2, 0.65, 0.9, 0.55, 0.85, 0.45, 0.2],
            scale: [0.7, 0.95, 1.1, 0.9, 1.05, 0.85, 0.7],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.9,
          }}
        />

        <motion.span
          className={`pointer-events-none absolute z-0 h-1 w-1 rounded-full ${orbitThreeClass}`}
          animate={{
            x: [-4, 12, 18, 4, -14, -18, -4],
            y: [-12, -8, 0, 10, 12, 0, -12],
            opacity: [0.15, 0.55, 0.85, 0.55, 0.9, 0.45, 0.15],
            scale: [0.65, 0.9, 1.05, 0.9, 1.05, 0.85, 0.65],
          }}
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: 'linear',
            delay: 1.6,
          }}
        />
      </div>
    </div>
  );
}

export default function Navbar() {
  const { user, logout, isMaster, isPremium } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (!user || location.pathname === '/auth') return null;

  const isActive = path => location.pathname === path;

  const NavLink = ({ to, icon: Icon, label, testId, activeClass, inactiveClass }) => (
    <Link
      to={to}
      data-testid={testId}
      onClick={() => setOpen(false)}
      className={`flex items-center gap-2.5 rounded-sm px-4 py-2.5 text-sm transition-colors ${
        isActive(to)
          ? `bg-white/10 text-white ${activeClass || ''}`
          : `${inactiveClass || 'text-white/50 hover:text-white'} hover:bg-white/5`
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );

  return (
    <nav
      data-testid="navbar"
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          data-testid="nav-logo"
          onClick={() => setOpen(false)}
        >
          <img src="/logo.png" alt="Schiro" className="h-9 w-9 object-contain" />
          <span className="font-bebas text-xl tracking-wider text-white">SCHIRO</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            icon={LayoutDashboard}
            label="Dashboard"
            testId="nav-dashboard-link"
          />
          {isMaster && (
            <NavLink
              to="/checker"
              icon={Terminal}
              label="Cookie Checker"
              testId="nav-cookie-checker-link"
            />
          )}
          <NavLink
            to="/free-cookies"
            icon={Cookie}
            label="Free Cookies"
            testId="nav-free-cookies-link"
            inactiveClass="text-green-400/70 hover:text-green-400"
          />

          {(isMaster || isPremium) && (
            <NavLink
              to="/admin/cookies"
              icon={ShieldCheck}
              label="Admin Cookies"
              testId="nav-admin-cookies-link"
              inactiveClass="text-purple-400/70 hover:text-purple-400"
            />
          )}

          {isMaster && (
            <>
              <NavLink
                to="/admin"
                icon={KeyRound}
                label="Keys"
                testId="nav-admin-link"
                inactiveClass="text-primary/70 hover:text-primary"
              />
              <NavLink
                to="/admin/logs"
                icon={ScrollText}
                label="Logs"
                testId="nav-logs-link"
                inactiveClass="text-white/50 hover:text-white"
              />
            </>
          )}

          <div className="mx-2 h-6 w-px bg-white/10" />

          <div className="mr-2 flex flex-col items-center">
            <span
              className="leading-tight text-sm text-white/40"
              data-testid="nav-username"
            >
              {user.label}
            </span>
            <TierBadge isMaster={isMaster} isPremium={isPremium} />
          </div>

          <button
            onClick={logout}
            data-testid="nav-logout-btn"
            className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-white/40 transition-colors hover:bg-white/5 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          data-testid="nav-mobile-toggle"
          className="flex h-10 w-10 items-center justify-center rounded-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          className="border-t border-white/5 bg-black/95 backdrop-blur-xl md:hidden"
          data-testid="nav-mobile-menu"
        >
          <div className="space-y-1 px-4 py-3">
            <NavLink
              to="/"
              icon={LayoutDashboard}
              label="Dashboard"
              testId="nav-dashboard-link-mobile"
            />
            {isMaster && (
              <NavLink
                to="/checker"
                icon={Terminal}
                label="Cookie Checker"
                testId="nav-cookie-checker-link-mobile"
              />
            )}
            <NavLink
              to="/free-cookies"
              icon={Cookie}
              label="Free Cookies"
              testId="nav-free-cookies-link-mobile"
              inactiveClass="text-green-400/70 hover:text-green-400"
            />

            {(isMaster || isPremium) && (
              <NavLink
                to="/admin/cookies"
                icon={ShieldCheck}
                label="Admin Cookies"
                testId="nav-admin-cookies-link-mobile"
                inactiveClass="text-purple-400/70 hover:text-purple-400"
              />
            )}

            {isMaster && (
              <>
                <NavLink
                  to="/admin"
                  icon={KeyRound}
                  label="Keys"
                  testId="nav-admin-link-mobile"
                  inactiveClass="text-primary/70 hover:text-primary"
                />
                <NavLink
                  to="/admin/logs"
                  icon={ScrollText}
                  label="Logs"
                  testId="nav-logs-link-mobile"
                  inactiveClass="text-white/50 hover:text-white"
                />
              </>
            )}

            <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
              <div className="flex flex-col gap-0.5">
                <span
                  className="leading-tight text-sm text-white/40"
                  data-testid="nav-username-mobile"
                >
                  {user.label}
                </span>
                <TierBadge isMaster={isMaster} isPremium={isPremium} />
              </div>

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                data-testid="nav-logout-btn-mobile"
                className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-red-400/60 transition-colors hover:bg-white/5 hover:text-red-400"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
