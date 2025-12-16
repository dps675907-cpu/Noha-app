
import React, { useRef, useState } from 'react';
import { Movie, VideoQuality } from '../types';

interface PlayerProps {
  movie: Movie;
  onClose: () => void;
  availableQualities: VideoQuality[];
}

const Player: React.FC<PlayerProps> = ({ movie, onClose, availableQualities }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentQuality, setCurrentQuality] = useState<VideoQuality>(availableQualities[availableQualities.length - 1]);
  const [showSettings, setShowSettings] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleQualityChange = (q: VideoQuality) => {
    setCurrentQuality(q);
    setShowSettings(false);
    // In a real app, you would switch the video source URL here
    console.log(`Switched to ${q}`);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center">
      <button 
        onClick={onClose}
        className="absolute top-6 left-6 z-[70] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/10 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <div className="relative group w-full h-full cursor-pointer" onClick={togglePlay}>
        <video 
          ref={videoRef}
          src={movie.videoUrl}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          autoPlay
        />

        {/* Custom Controls UI */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 md:p-12 pointer-events-none">
          <div className="pointer-events-auto">
            <div className="flex items-end justify-between mb-6">
               <div>
                  <h2 className="text-3xl font-black tracking-tight mb-2">{movie.title}</h2>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{movie.genre.join(' • ')}</span>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 border border-orange-500 text-orange-500 text-[10px] font-black rounded">DOLBY VISION</span>
                      <span className="px-2 py-0.5 border border-orange-500 text-orange-500 text-[10px] font-black rounded">DOLBY ATMOS</span>
                    </div>
                  </div>
               </div>
               <div className="text-right hidden md:block">
                  <span className="text-gray-500 text-sm font-bold block mb-1">CURRENT QUALITY</span>
                  <span className="text-white font-black text-xl">{currentQuality} HDR</span>
               </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-gray-600/50 rounded-full mb-8 cursor-pointer overflow-hidden group/bar">
              <div 
                className="h-full bg-orange-600 relative" 
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full scale-0 group-hover/bar:scale-100 transition-transform" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <button onClick={togglePlay} className="p-3 bg-white text-black rounded-full hover:scale-110 transition-all active:scale-95">
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                
                <div className="flex items-center gap-6 text-gray-400">
                  <button className="hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  </button>
                  <button className="hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="relative">
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-bold text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Quality: {currentQuality}
                </button>

                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-4 w-48 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 p-3">Video Quality</p>
                    {availableQualities.map(q => (
                      <button 
                        key={q}
                        onClick={(e) => { e.stopPropagation(); handleQualityChange(q); }}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between font-bold text-sm transition-colors ${currentQuality === q ? 'bg-orange-600 text-white' : 'hover:bg-white/5 text-gray-300'}`}
                      >
                        {q}
                        {currentQuality === q && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
