
import React from 'react';
import { SubscriptionPlan, User } from '../types';
import Logo from './Logo';

interface PricingProps {
  onSelect: (plan: SubscriptionPlan) => void;
  currentUser?: User | null;
  onClose?: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onSelect, currentUser, onClose }) => {
  return (
    <div className="min-h-screen bg-orange-600 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 rounded-full blur-[150px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-[150px] -ml-64 -mb-64" />

      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-8 left-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="mb-12 relative z-10">
        <Logo className="text-6xl" />
      </div>
      
      <div className="text-center mb-12 max-w-2xl relative z-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-white drop-shadow-lg">
          {currentUser?.isSubscribed ? 'Upgrade Your Plan' : 'Choose Your Experience'}
        </h1>
        <p className="text-xl text-white font-bold opacity-90">
          Get <span className="underline decoration-4 decoration-black">4 MONTHS FREE</span> on all annual plans!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full relative z-10">
        {/* Basic Plan */}
        <div className={`bg-white text-black p-8 rounded-[2.5rem] shadow-2xl flex flex-col transition-all duration-500 ${currentUser?.plan === SubscriptionPlan.BASIC ? 'ring-8 ring-white/30 scale-95 opacity-80' : 'hover:scale-105'}`}>
          <div className="mb-6">
            <h2 className="text-2xl font-black mb-1">Standard HD</h2>
            <p className="text-gray-500 font-bold">Perfect for personal streaming</p>
          </div>
          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black">199</span>
              <span className="text-gray-400 font-bold">/ mo</span>
            </div>
          </div>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 font-bold text-sm">
              <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
              Full 1080p Resolution
            </li>
            <li className="flex items-center gap-3 font-bold text-sm">
              <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
              Stream on 2 devices
            </li>
            <li className="flex items-center gap-3 font-bold text-sm">
              <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
              Unlimited Downloads
            </li>
          </ul>
          <button 
            disabled={currentUser?.plan === SubscriptionPlan.BASIC}
            onClick={() => onSelect(SubscriptionPlan.BASIC)}
            className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-xl ${currentUser?.plan === SubscriptionPlan.BASIC ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-700 active:scale-95 shadow-orange-600/20'}`}
          >
            {currentUser?.plan === SubscriptionPlan.BASIC ? 'Current Plan' : 'Select Standard'}
          </button>
        </div>

        {/* Ultra Plan */}
        <div className={`bg-zinc-950 text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col border-4 border-orange-400 relative overflow-hidden transition-all duration-500 ${currentUser?.plan === SubscriptionPlan.ULTRA ? 'ring-8 ring-orange-400/30 scale-95 opacity-80' : 'hover:scale-105'}`}>
          <div className="absolute top-4 right-4 bg-orange-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-lg">Premium Experience</div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-black mb-1">Ultra 4K Elite</h2>
            <p className="text-gray-400 font-bold">The ultimate home cinema</p>
          </div>
          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-orange-500">299</span>
              <span className="text-gray-500 font-bold">/ mo</span>
            </div>
          </div>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 font-bold text-sm">
              <span className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs">✓</span>
              Ultra 4K + HDR10+
            </li>
            <li className="flex items-center gap-3 font-bold text-sm">
              <span className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs">✓</span>
              <span className="text-orange-500">Dolby Atmos & Vision</span>
            </li>
            <li className="flex items-center gap-3 font-bold text-sm">
              <span className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs">✓</span>
              Stream on 4 devices
            </li>
            <li className="flex items-center gap-3 font-bold text-sm">
              <span className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs">✓</span>
              Early Access to Originals
            </li>
          </ul>
          <button 
            disabled={currentUser?.plan === SubscriptionPlan.ULTRA}
            onClick={() => onSelect(SubscriptionPlan.ULTRA)}
            className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-xl ${currentUser?.plan === SubscriptionPlan.ULTRA ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-700 active:scale-95 shadow-orange-600/40'}`}
          >
            {currentUser?.plan === SubscriptionPlan.ULTRA ? 'Current Plan' : 'Go Ultra 4K'}
          </button>
        </div>
      </div>
      
      <p className="mt-12 text-white/70 text-sm max-w-lg text-center font-bold leading-relaxed relative z-10">
        Subscription automatically renews. 4 months free applies to annual billing cycle.
        NOHA works on all devices: Smart TVs, Laptops, Phones, and Tablets.
      </p>
    </div>
  );
};

export default Pricing;
