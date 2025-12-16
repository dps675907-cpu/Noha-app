
import React, { useState, useEffect } from 'react';
import { Movie, User, SubscriptionPlan, AuthMode, VideoQuality } from './types';
import { MOVIES } from './constants';
import { searchWithAI } from './services/geminiService';
import Logo from './components/Logo';
import Player from './components/Player';
import Pricing from './components/Pricing';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(MOVIES);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'series'>('all');
  const [showPricingOverlay, setShowPricingOverlay] = useState(false);

  const handleAuth = (email: string) => {
    setUser({ id: '1', email, isSubscribed: false });
    setAuthMode('pricing');
  };

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    if (user) {
      setUser({ ...user, isSubscribed: true, plan });
      setShowPricingOverlay(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredMovies(MOVIES);
      return;
    }
    setIsSearching(true);
    const results = await searchWithAI(searchQuery);
    setFilteredMovies(results);
    setIsSearching(false);
  };

  useEffect(() => {
    let movies = MOVIES;
    if (activeTab === 'movies') movies = MOVIES.filter(m => m.type === 'movie');
    if (activeTab === 'series') movies = MOVIES.filter(m => m.type === 'series');
    setFilteredMovies(movies);
  }, [activeTab]);

  const getAvailableQualities = (): VideoQuality[] => {
    if (user?.plan === SubscriptionPlan.ULTRA) {
      return ['720p', '1080p', '4K'];
    }
    return ['720p', '1080p'];
  };

  if (!user) {
    return <Auth onAuth={handleAuth} initialMode={authMode === 'login' ? 'login' : 'signup'} />;
  }

  if (user && !user.isSubscribed) {
    return <Pricing onSelect={handlePlanSelect} currentUser={user} />;
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {showPricingOverlay && (
        <div className="fixed inset-0 z-[100] animate-in fade-in duration-300">
           <Pricing 
              onSelect={handlePlanSelect} 
              currentUser={user} 
              onClose={() => setShowPricingOverlay(false)} 
           />
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-gradient-to-b from-black/95 via-black/80 to-transparent px-6 py-5 flex items-center justify-between backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-10">
          <Logo className="text-3xl" />
          <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <button 
              onClick={() => setActiveTab('all')}
              className={`hover:text-white transition-all ${activeTab === 'all' ? 'text-white scale-110' : ''}`}
            >
              Browse
            </button>
            <button 
              onClick={() => setActiveTab('series')}
              className={`hover:text-white transition-all ${activeTab === 'series' ? 'text-white scale-110' : ''}`}
            >
              Original Series
            </button>
            <button 
              onClick={() => setActiveTab('movies')}
              className={`hover:text-white transition-all ${activeTab === 'movies' ? 'text-white scale-110' : ''}`}
            >
              Movies
            </button>
            <button 
              onClick={() => setShowPricingOverlay(true)}
              className="text-orange-500 hover:text-orange-400 transition-colors animate-pulse"
            >
              Upgrade Account
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <form onSubmit={handleSearch} className="relative hidden sm:block group">
            <input 
              type="text" 
              placeholder="Search cinematic universe..." 
              className="bg-white/5 border border-white/10 rounded-2xl py-2.5 px-6 focus:outline-none focus:bg-white/10 focus:border-orange-500/50 transition-all w-64 text-sm font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isSearching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="animate-spin h-4 w-4 border-2 border-orange-500 border-t-transparent rounded-full" />
              </div>
            )}
          </form>
          <div 
            onClick={() => setShowPricingOverlay(true)}
            className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-2xl border border-white/10 cursor-pointer transition-all"
          >
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Current Plan</p>
              <p className="text-xs font-black text-orange-500">{user.plan}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-black text-lg shadow-xl shadow-orange-600/20 group-hover:scale-110 transition-transform">
              {user.email[0].toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={MOVIES[0].thumbnail} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        </div>
        
        <div className="absolute bottom-0 left-0 p-12 md:p-24 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-orange-600 text-[10px] font-black px-3 py-1 rounded-sm tracking-widest uppercase shadow-lg">Original Series</span>
            <div className="flex gap-2">
              <span className="text-[10px] font-black text-white px-2 py-0.5 border border-white/20 rounded">4K HDR</span>
              <span className="text-[10px] font-black text-white px-2 py-0.5 border border-white/20 rounded">ATMOS</span>
            </div>
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter drop-shadow-2xl">
            NEON<br/><span className="text-orange-600">SHADOWS</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed font-bold max-w-2xl drop-shadow">
            Experience the future of crime in ultra-high definition. A gritty cyberpunk thriller that pushes the boundaries of cinematic storytelling.
          </p>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveMovie(MOVIES[0])}
              className="px-10 py-5 bg-white text-black rounded-[2rem] font-black text-xl flex items-center gap-3 hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-2xl shadow-white/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play Now
            </button>
            <button className="px-10 py-5 bg-white/10 text-white rounded-[2rem] font-black text-xl border border-white/10 hover:bg-white/20 transition-all backdrop-blur-xl">
              Add to List
            </button>
          </div>
        </div>
      </section>

      {/* Movie Rows */}
      <main className="px-6 md:px-12 -mt-32 relative z-10 pb-32">
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-4">
              <span className="w-1.5 h-10 bg-orange-600 rounded-full"></span>
              Trending Excellence
            </h2>
            <div className="flex gap-2">
               <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                 </svg>
               </button>
               <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {filteredMovies.map(movie => (
              <div 
                key={movie.id}
                className="group relative cursor-pointer"
                onClick={() => setActiveMovie(movie)}
              >
                <div className="aspect-[2/3] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:shadow-orange-600/10">
                  <img 
                    src={movie.thumbnail} 
                    alt={movie.title}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                    <div className="flex gap-2 mb-3">
                       <span className="px-2 py-0.5 bg-orange-600 text-[8px] font-black rounded uppercase">Premium</span>
                       <span className="px-2 py-0.5 bg-black/50 text-[8px] font-black rounded uppercase border border-white/10">4K HDR</span>
                    </div>
                    <h3 className="text-xl font-black mb-3 group-hover:translate-y-0 translate-y-4 transition-transform duration-500">{movie.title}</h3>
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 group-hover:translate-y-0 translate-y-4 transition-transform duration-500 delay-75">
                      <span>{movie.year}</span>
                      <span className="flex items-center gap-1 text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic CTA Banner */}
        <div className="rounded-[4rem] bg-gradient-to-br from-orange-600 to-orange-800 p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden relative shadow-3xl shadow-orange-600/20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/20 rounded-full blur-[120px] -ml-64 -mb-64" />
          
          <div className="max-w-2xl relative z-10">
            <h3 className="text-6xl font-black mb-8 leading-tight tracking-tighter">
              {user.plan === SubscriptionPlan.ULTRA 
                ? 'Welcome to the Ultimate Cinematic Experience' 
                : 'Unlock the Power of 4K Cinema'}
            </h3>
            <p className="text-2xl font-bold text-white/90 mb-12 leading-relaxed">
              {user.plan === SubscriptionPlan.ULTRA 
                ? 'Enjoy Dolby Vision and Atmos on all your devices. Your premium subscription is active.' 
                : 'Switch to our Ultra plan today and experience movies exactly how directors intended. Dolby Vision included.'}
            </p>
            <button 
              onClick={() => setShowPricingOverlay(true)}
              className="px-12 py-6 bg-black text-white rounded-[2.5rem] font-black text-2xl hover:scale-105 transition-all active:scale-95 shadow-2xl"
            >
              {user.plan === SubscriptionPlan.ULTRA ? 'Manage Account' : 'Upgrade to Ultra 4K'}
            </button>
          </div>
          <div className="relative z-10 hidden lg:block">
             <div className="bg-black/20 p-12 rounded-[4rem] backdrop-blur-3xl border border-white/10 rotate-3 scale-125 shadow-2xl">
                <Logo className="text-9xl mb-2" />
                <div className="text-center text-sm font-black uppercase tracking-[0.8em] opacity-50">Studio Quality</div>
             </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-white/5 py-32 px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-20">
          <div className="col-span-2 md:col-span-1">
            <Logo className="text-4xl mb-8" />
            <p className="text-gray-500 font-bold leading-relaxed text-sm">
              NOHA Streaming is the world's most advanced cinematic platform, delivering studio-grade quality directly to your home.
            </p>
            <div className="flex gap-4 mt-8">
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-orange-600 transition-colors cursor-pointer">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
               </div>
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-orange-600 transition-colors cursor-pointer">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
               </div>
            </div>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs text-gray-500">Platform</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Vision Pro & VR</li>
              <li className="hover:text-white cursor-pointer transition-colors">Gaming Consoles</li>
              <li className="hover:text-white cursor-pointer transition-colors">Mobile App</li>
              <li className="hover:text-white cursor-pointer transition-colors">Dolby certified devices</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs text-gray-500">Support</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-white cursor-pointer transition-colors">Subscription Manager</li>
              <li className="hover:text-white cursor-pointer transition-colors">Video Playback Help</li>
              <li className="hover:text-white cursor-pointer transition-colors">Technical Requirements</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs text-gray-500">Legal</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Privacy & Cookies</li>
              <li className="hover:text-white cursor-pointer transition-colors">Member Terms</li>
              <li className="hover:text-white cursor-pointer transition-colors">Intellectual Property</li>
              <li className="hover:text-white cursor-pointer transition-colors">Cookie Settings</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 text-center text-gray-600 font-black text-xs uppercase tracking-[0.5em]">
          &copy; 2024 NOHA CINEMATIC SYSTEMS. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* Video Player Portal */}
      {activeMovie && (
        <Player 
          movie={activeMovie} 
          onClose={() => setActiveMovie(null)}
          availableQualities={getAvailableQualities()}
        />
      )}
    </div>
  );
};

export default App;
