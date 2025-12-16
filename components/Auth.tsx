
import React, { useState } from 'react';
import Logo from './Logo';

interface AuthProps {
  onAuth: (email: string) => void;
  initialMode: 'login' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ onAuth, initialMode }) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onAuth(email);
    }
  };

  return (
    <div className="min-h-screen bg-orange-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/40 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/10">
        <div className="flex justify-center mb-10">
          <Logo className="text-5xl" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-8">
          {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-orange-500 focus:outline-none transition-all text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password"
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-orange-500 focus:outline-none transition-all text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black text-xl transition-all active:scale-95 shadow-lg shadow-orange-600/20"
          >
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-400 font-medium">
          {mode === 'login' ? (
            <p>New to NOHA? <button onClick={() => setMode('signup')} className="text-white hover:underline font-bold">Sign up now</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setMode('login')} className="text-white hover:underline font-bold">Sign in</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
