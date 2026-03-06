import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import {
  Cookie, Loader2, RefreshCw, Filter, Globe, CreditCard, Mail, Star, Tv, Monitor,
  Smartphone, Key, Link2, X, Calendar, Clock, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    toast.success('Copied');
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-400" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-white/40" />
      )}
    </button>
  );
}

function FilterBar({ cookies, filters, setFilters }) {
  const statuses = ['all', 'alive', 'dead'];

  const plans = useMemo(() => {
    const set = new Set(cookies.map(c => c.plan).filter(Boolean));
    const order = ['Basic', 'Basic with ads', 'Mobile', 'Standard with ads', 'Standard (HD)', 'Premium (UHD)'];
    const sorted = Array.from(set).sort((a, b) => {
      const ai = order.findIndex(o => a && a.toLowerCase().includes(o.split(' ')[0].toLowerCase()));
      const bi = order.findIndex(o => b && b.toLowerCase().includes(o.split(' ')[0].toLowerCase()));
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
    return ['all', ...sorted];
  }, [cookies]);

  const countries = useMemo(() => {
    const set = new Set(cookies.map(c => c.country).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, [cookies]);

  const selectClass =
    'bg-black/50 border border-white/10 text-white/60 text-xs rounded-lg px-3 h-8 outline-none focus:border-purple-500/40 cursor-pointer hover:border-white/20 transition-colors';

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <div className="flex items-center gap-1.5 text-white/20 mr-1">
        <Filter className="w-3.5 h-3.5" />
        <span className="text-xs font-mono uppercase tracking-wide">Filter</span>
      </div>

      <div className="flex items-center gap-1">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilters(f => ({ ...f, status: s }))}
            className={`px-3 h-8 rounded-lg text-xs font-mono uppercase tracking-wide transition-all border ${
              filters.status === s
                ? s === 'alive'
                  ? 'bg-green-500/20 text-green-400 border-green-500/40'
                  : s === 'dead'
                  ? 'bg-red-500/20 text-red-400 border-red-500/40'
                  : 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                : 'bg-transparent text-white/25 border-white/8 hover:border-white/15 hover:text-white/40'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <select
        value={filters.plan}
        onChange={e => setFilters(f => ({ ...f, plan: e.target.value }))}
        className={selectClass}
      >
        {plans.map(p => (
          <option key={p} value={p} className="bg-[#111]">
            {p === 'all' ? 'All Plans' : p}
          </option>
        ))}
      </select>

      <select
        value={filters.country}
        onChange={e => setFilters(f => ({ ...f, country: e.target.value }))}
        className={selectClass}
      >
        {countries.map(c => (
          <option key={c} value={c} className="bg-[#111]">
            {c === 'all' ? 'All Countries' : c}
          </option>
        ))}
      </select>

      {(filters.status !== 'all' || filters.plan !== 'all' || filters.country !== 'all') && (
        <button
          onClick={() => setFilters({ status: 'all', plan: 'all', country: 'all' })}
          className="px-3 h-8 rounded-lg text-xs font-mono uppercase tracking-wide text-white/25 border border-white/8 hover:text-red-400 hover:border-red-500/30 transition-all"
        >
          Reset
        </button>
      )}
    </div>
  );
}

function FreeCookieCard({
  cookie,
  index,
  onClick,
  isPremium,
  isFavorited,
  canFavorite,
  onToggleFavorite,
}) {
  const isAlive = cookie.is_alive !== false;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={onClick}
      className="group cursor-pointer rounded-xl p-4 bg-gradient-to-b from-zinc-900/80 to-black border border-white/5 hover:border-purple-500/40 hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div
            className={`w-2 h-2 rounded-full shrink-0 ${
              isAlive
                ? 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]'
                : 'bg-red-400'
            }`}
          />
          <span className="font-mono text-xs text-white/30">#{index + 1}</span>
          <Badge
            className={`border text-[10px] font-mono px-1.5 py-0 ${
              isAlive
                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                : 'bg-red-500/20 text-red-400 border-red-500/30'
            }`}
          >
            {isAlive ? 'ALIVE' : 'DEAD'}
          </Badge>
          {isPremium && (
            <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[10px] font-mono px-1.5 py-0">
              PREMIUM
            </Badge>
          )}
        </div>
        {canFavorite && (
          <button
            onClick={e => {
              e.stopPropagation();
              onToggleFavorite(cookie.id);
            }}
            className={`p-1 transition-all ${
              isFavorited
                ? 'text-yellow-400 hover:text-yellow-300'
                : 'text-white/15 hover:text-yellow-400'
            }`}
          >
            <Star
              className={`w-3.5 h-3.5 ${
                isFavorited ? 'fill-yellow-400' : ''
              }`}
            />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 mb-1.5">
        <Mail className="w-3.5 h-3.5 text-white/20 shrink-0" />
        <span className="text-white/70 text-xs font-mono truncate">
          {cookie.email || '—'}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-1.5">
        <CreditCard className="w-3.5 h-3.5 text-white/20 shrink-0" />
        <span className="text-white/40 text-xs">{cookie.plan || '—'}</span>
      </div>

      <div className="flex items-center gap-2">
        <Globe className="w-3.5 h-3.5 text-white/20 shrink-0" />
        <span className="text-white/40 text-xs">{cookie.country || '—'}</span>
      </div>

      <div className="mt-3 pt-2 border-t border-white/5 text-[10px] font-mono text-center tracking-widest text-white/15 group-hover:text-purple-400 transition-colors duration-200">
        TAP TO USE
      </div>
    </motion.div>
  );
}

function FreeCookieModal({
  cookie,
  index,
  onClose,
  isPremium,
  canFavorite,
  isFavorited,
  onToggleFavorite,
}) {
  const [tvCode, setTvCode] = useState('');
  const [tvLoading, setTvLoading] = useState(false);
  const [tvResult, setTvResult] = useState(null);
  const [tokenRefreshing, setTokenRefreshing] = useState(false);
  const [currentNftoken, setCurrentNftoken] = useState(cookie.nftoken);
  const [currentNftokenLink, setCurrentNftokenLink] = useState(cookie.nftoken_link);
  const [lastRefreshed, setLastRefreshed] = useState(cookie.last_refreshed);
  const { token } = useAuth();

  const isAlive = cookie.is_alive !== false;

  const handleTvCode = async () => {
    if (!tvCode.trim()) {
      toast.error('Enter the code from your TV');
      return;
    }
    setTvLoading(true);
    setTvResult(null);
    try {
      const res = await axios.post(
        `${API}/tv-code`,
        {
          code: tvCode,
          cookie_id: cookie.id,
          cookie_source: 'free',
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTvResult(res.data);
      if (res.data.success) toast.success(res.data.message);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to activate TV');
    } finally {
      setTvLoading(false);
    }
  };

  const handleRefreshToken = async () => {
    setTokenRefreshing(true);
    try {
      const res = await axios.post(
        `${API}/free-cookies/${cookie.id}/refresh-token`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setCurrentNftoken(res.data.nftoken);
      setCurrentNftokenLink(res.data.nftoken_link);
      setLastRefreshed(new Date().toISOString());
      toast.success('Token refreshed!');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to refresh token');
    } finally {
      setTokenRefreshing(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-40 flex items-center justify-center pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-[calc(100vw-2rem)] sm:w-[500px] max-h-[85vh] bg-[#0a0a0a] border border-purple-500/20 rounded-2xl z-10 flex flex-col overflow-hidden shadow-[inset_0_1px_0_rgba(168,85,247,0.1),0_24px_48px_rgba(0,0,0,0.8)]"
        >
          <div className="px-5 py-4 border-b border-purple-500/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 flex-wrap">
              <div
                className={`w-2 h-2 rounded-full ${
                  isAlive
                    ? 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]'
                    : 'bg-red-400'
                }`}
              />
              <span className="font-mono text-xs text-white/40">
                FREE COOKIE #{index + 1}
              </span>
              <Badge
                className={`border text-[10px] font-mono px-1.5 ${
                  isAlive
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}
              >
                {isAlive ? 'ALIVE' : 'DEAD'}
              </Badge>
              {lastRefreshed && (
                <span className="text-[10px] text-white/15 font-mono flex items-center gap-1">
                  <RefreshCw className="w-2.5 h-2.5" />
                  {new Date(lastRefreshed).toLocaleTimeString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {canFavorite && (
                <button
                  onClick={() => onToggleFavorite(cookie.id)}
                  className={`p-1.5 rounded-lg transition-all ${
                    isFavorited
                      ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20'
                      : 'text-white/20 hover:text-yellow-400 hover:bg-yellow-400/10'
                  }`}
                  title={
                    isFavorited
                      ? 'Remove from favorites'
                      : 'Add to favorites'
                  }
                >
                  <Star
                    className={`w-4 h-4 ${
                      isFavorited ? 'fill-yellow-400' : ''
                    }`}
                  />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-white/30 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            <div className="px-5 py-4 space-y-3">
              <InfoRow
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                value={cookie.email}
              />
              <InfoRow
                icon={<CreditCard className="w-4 h-4" />}
                label="Plan"
                value={cookie.plan}
              />
              <InfoRow
                icon={<Globe className="w-4 h-4" />}
                label="Country"
                value={cookie.country}
              />
              <InfoRow
                icon={<Calendar className="w-4 h-4" />}
                label="Since"
                value={cookie.member_since}
              />
              <InfoRow
                icon={<Clock className="w-4 h-4" />}
                label="Next Bill"
                value={cookie.next_billing}
              />
              {cookie.profiles?.length > 0 && (
                <InfoRow
                  icon={<Users className="w-4 h-4" />}
                  label="Profiles"
                  value={cookie.profiles.join(', ')}
                />
              )}
            </div>

            {currentNftoken && (
              <div className="px-5 py-4 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-purple-400/60" />
                    <span className="text-xs text-white/40 uppercase tracking-wide">
                      NFToken
                    </span>
                  </div>
                  <button
                    onClick={handleRefreshToken}
                    disabled={tokenRefreshing}
                    className="flex items-center gap-1 text-[10px] text-white/30 hover:text-purple-400 transition-colors disabled:opacity-50"
                  >
                    {tokenRefreshing ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <RefreshCw className="w-3 h-3" />
                    )}
                    <span className="uppercase tracking-wide font-mono">
                      Refresh Token
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 font-mono text-xs text-purple-400/80 bg-black/40 px-3 py-2 rounded-lg truncate">
                    {currentNftoken}
                  </code>
                  <CopyBtn text={currentNftoken} />
                </div>
                {currentNftokenLink && (
                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <a
                      href={currentNftokenLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bebas tracking-widest uppercase bg-purple-500/15 text-purple-400 border border-purple-500/30 hover:bg-purple-500/25 transition-all"
                    >
                      <Link2 className="w-4 h-4" />
                      Open Netflix with Token
                    </a>
                    <a
                      href={`https://www.netflix.com/?nftoken=${currentNftoken}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bebas tracking-widest uppercase bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500/25 transition-all"
                    >
                      <Smartphone className="w-4 h-4" />
                      Open in Phone
                    </a>
                  </div>
                )}
              </div>
            )}

            {isAlive && (
              <div className="px-5 py-4 border-t border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Tv className="w-4 h-4 text-blue-400/60" />
                  <span className="text-xs text-white/40 uppercase tracking-wide">
                    Sign In on TV
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    value={tvCode}
                    onChange={e => setTvCode(e.target.value)}
                    placeholder="Enter TV code (e.g. 12345678)"
                    className="flex-1 bg-black/50 border border-white/10 focus:border-blue-400 text-white placeholder:text-white/20 h-10 font-mono text-sm rounded-xl px-3 outline-none"
                    disabled={tvLoading}
                    onKeyDown={e => e.key === 'Enter' && handleTvCode()}
                  />
                  <button
                    onClick={handleTvCode}
                    disabled={tvLoading || !tvCode.trim()}
                    className="bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500/25 font-bebas tracking-widest uppercase rounded-xl h-10 px-5 shrink-0 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {tvLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Monitor className="w-4 h-4" />
                        ACTIVATE
                      </>
                    )}
                  </button>
                </div>
                {tvResult && (
                  <div
                    className={`mt-2 text-xs px-3 py-2 rounded-xl ${
                      tvResult.success
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {tvResult.message}
                  </div>
                )}
                <p className="text-[10px] text-white/15 mt-2">
                  Open Netflix on your TV, select "Sign In" and enter the 8-digit
                  code shown.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3">
      <span className="text-white/20">{icon}</span>
      <span className="text-white/40 text-xs uppercase tracking-wide w-24 shrink-0">
        {label}
      </span>
      <span className="text-white/90 text-sm font-medium truncate">
        {value}
      </span>
    </div>
  );
}

export default function FreeCookiesPage() {
  const { token, user } = useAuth();
  const [cookies, setCookies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(24);
  const [filters, setFilters] = useState({
    status: 'all',
    plan: 'all',
    country: 'all',
  });
  const [selectedCookie, setSelectedCookie] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [activeTab, setActiveTab] = useState('all');
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [favoriteCookies, setFavoriteCookies] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  const headers = { Authorization: `Bearer ${token}` };
  const isMaster = user?.is_master === true;
  const isPremium = user?.tier === 'premium' && !isMaster;
  const canFavorite = isMaster || isPremium;

  const fetchCookies = async (pageParam = 1, filtersParam = filters) => {
    setLoading(true);
    try {
      const params = {
        page: pageParam,
        page_size: pageSize,
      };
      if (filtersParam.status !== 'all') params.status = filtersParam.status;
      if (filtersParam.plan !== 'all') params.plan = filtersParam.plan;
      if (filtersParam.country !== 'all') params.country = filtersParam.country;

      const res = await axios.get(`${API}/free-cookies`, {
        headers,
        params,
      });
      setCookies(res.data.cookies || []);
      setTotal(res.data.total || 0);
    } catch {
      toast.error('Failed to load free cookies');
    } finally {
      setLoading(false);
    }
  };

  const fetchFavoriteIds = async () => {
    if (!canFavorite) return;
    try {
      const res = await axios.get(`${API}/favorites/ids`, { headers });
      setFavoriteIds(new Set(res.data.favorites || []));
    } catch {
      // ignore
    }
  };

  const fetchFavorites = async () => {
    if (!canFavorite) return;
    setFavoritesLoading(true);
    try {
      const res = await axios.get(`${API}/favorites`, { headers });
      const all = res.data.cookies || [];
      const freeOnly = all.filter(c => c.source === 'free');
      setFavoriteCookies(freeOnly);
    } catch {
      toast.error('Failed to load favorites');
    } finally {
      setFavoritesLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchCookies(1, filters);
    fetchFavoriteIds();
  }, [token]); // eslint-disable-line

  useEffect(() => {
    if (activeTab === 'favorites') {
      fetchFavorites();
    }
  }, [activeTab]); // eslint-disable-line

  const onFilterChange = newFilters => {
    setFilters(newFilters);
    setPage(1);
    fetchCookies(1, newFilters);
  };

  const refreshTokens = async () => {
    setRefreshing(true);
    try {
      const res = await axios.post(
        `${API}/admin/free-cookies/refresh`,
        {},
        { headers },
      );
      toast.success(res.data.message);
      fetchCookies(page, filters);
    } catch {
      toast.error('Failed to refresh tokens');
    } finally {
      setRefreshing(false);
    }
  };

  const toggleFavorite = async cookieId => {
    if (!canFavorite) {
      toast.error('Favorites are only for premium and master keys');
      return;
    }
    try {
      const res = await axios.post(
        `${API}/favorites/${cookieId}`,
        {},
        { headers },
      );
      const newIds = new Set(favoriteIds);
      if (res.data.favorited) {
        newIds.add(cookieId);
        toast.success('Added to favorites ★');
        // remove from current listing immediately
        setCookies(prev => prev.filter(c => c.id !== cookieId));
      } else {
        newIds.delete(cookieId);
        toast.success('Removed from favorites');
        if (activeTab === 'favorites') {
          setFavoriteCookies(prev => prev.filter(c => c.id !== cookieId));
        }
        // when un-favoriting, cookie becomes public again; refetch main list
        fetchCookies(page, filters);
      }
      setFavoriteIds(newIds);
    } catch (err) {
      const msg = err.response?.data?.detail || 'Failed to update favorites';
      toast.error(msg);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchCookies(newPage, filters);
  };

  const selectedIndex = selectedCookie
    ? cookies.findIndex(c => c.id === selectedCookie.id)
    : -1;

  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="max-w-5xl mx-auto px-6 py-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <Cookie className="w-7 h-7 text-emerald-400" />
              <h1 className="font-bebas text-4xl sm:text-5xl tracking-wider text-white">
                FREE <span className="text-emerald-400">COOKIES</span>
              </h1>
            </div>
            {!loading && cookies.length > 0 && activeTab === 'all' && (
              <span className="font-bebas text-lg tracking-widest text-emerald-400">
                {cookies.length}/{total} COOKIES
              </span>
            )}
          </div>
        </motion.div>

        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 h-9 rounded-xl text-xs font-mono uppercase tracking-wide border transition-all ${
              activeTab === 'all'
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : 'text-white/30 border-white/8 hover:border-emerald-500/20 hover:text-emerald-400/60'
            }`}
          >
            <Cookie className="w-3.5 h-3.5" />
            All Free
          </button>
          {canFavorite && (
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-2 px-4 h-9 rounded-xl text-xs font-mono uppercase tracking-wide border transition-all ${
                activeTab === 'favorites'
                  ? 'bg-yellow-400/15 text-yellow-400 border-yellow-400/30'
                  : 'text-white/30 border-white/8 hover:border-yellow-400/20 hover:text-yellow-400/60'
              }`}
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  activeTab === 'favorites' ? 'fill-yellow-400' : ''
                }`}
              />
              Favorites
              {favoriteIds.size > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    activeTab === 'favorites'
                      ? 'bg-yellow-400/20 text-yellow-400'
                      : 'bg-white/10 text-white/30'
                  }`}
                >
                  {favoriteIds.size}
                </span>
              )}
            </button>
          )}
        </div>

        {isMaster && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-b from-emerald-500/10 to-white/[0.03] border border-emerald-500/20 rounded-2xl p-6 mb-8 shadow-[inset_0_1px_0_rgba(16,185,129,0.15),0_8px_24px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="w-4 h-4 text-white/40" />
              <h2 className="font-bebas text-lg tracking-wider text-white">
                FREE COOKIES CONTROL
              </h2>
            </div>
            <p className="text-xs text-white/20 mb-4">
              Visible to everyone, but favorites from premium/master users will
              temporarily hide them from free and other premium keys.
            </p>
            <div className="flex items-center gap-4">
              <Button
                onClick={refreshTokens}
                disabled={refreshing || cookies.length === 0}
                className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 font-bebas tracking-widest uppercase rounded-xl h-10 px-6"
              >
                {refreshing ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                REFRESH TOKENS NOW
              </Button>
              <span className="text-xs text-white/20">
                Force-refresh NFTokens for all free cookies
              </span>
            </div>
          </motion.div>
        )}

        {activeTab === 'favorites' && canFavorite ? (
          <>
            {favoritesLoading ? (
              <div className="text-center py-20">
                <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto" />
              </div>
            ) : favoriteCookies.length === 0 ? (
              <div className="text-center py-20 text-white/30">
                <Star className="w-12 h-12 mx-auto mb-3 text-white/10" />
                <p>No favorites yet</p>
                <p className="text-xs text-white/15 mt-1">
                  Tap the ★ on any free cookie to save it here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {favoriteCookies.map((cookie, idx) => (
                  <FreeCookieCard
                    key={cookie.id}
                    cookie={cookie}
                    index={idx}
                    isPremium={isPremium}
                    canFavorite={canFavorite}
                    isFavorited={favoriteIds.has(cookie.id)}
                    onToggleFavorite={toggleFavorite}
                    onClick={() => setSelectedCookie(cookie)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <div className="text-center py-20">
                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              </div>
            ) : cookies.length === 0 ? (
              <div className="text-center py-20 text-white/30">
                <Cookie className="w-12 h-12 mx-auto mb-3 text-white/10" />
                <p>No free cookies available</p>
              </div>
            ) : (
              <>
                <FilterBar
                  cookies={cookies}
                  filters={filters}
                  setFilters={onFilterChange}
                />
                {cookies.length === 0 ? (
                  <div className="text-center py-16 text-white/30">
                    <Filter className="w-10 h-10 mx-auto mb-3 text-white/10" />
                    <p>No cookies match your filters</p>
                    <button
                      onClick={() =>
                        onFilterChange({
                          status: 'all',
                          plan: 'all',
                          country: 'all',
                        })
                      }
                      className="mt-2 text-xs text-white/20 hover:text-emerald-400 transition-colors font-mono"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {cookies.map((cookie, idx) => (
                        <FreeCookieCard
                          key={cookie.id}
                          cookie={cookie}
                          index={idx}
                          isPremium={isPremium}
                          canFavorite={canFavorite}
                          isFavorited={favoriteIds.has(cookie.id)}
                          onToggleFavorite={toggleFavorite}
                          onClick={() => setSelectedCookie(cookie)}
                        />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-3 mt-8">
                        <button
                          disabled={page === 1}
                          onClick={() => handlePageChange(page - 1)}
                          className="text-xs text-white/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Prev
                        </button>
                        <span className="text-xs text-white/40 font-mono">
                          Page {page} of {totalPages}
                        </span>
                        <button
                          disabled={page === totalPages}
                          onClick={() => handlePageChange(page + 1)}
                          className="text-xs text-white/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>

      {selectedCookie && (
        <FreeCookieModal
          cookie={selectedCookie}
          index={selectedIndex >= 0 ? selectedIndex : 0}
          isPremium={isPremium}
          canFavorite={canFavorite}
          isFavorited={favoriteIds.has(selectedCookie.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedCookie(null)}
        />
      )}
    </div>
  );
}
