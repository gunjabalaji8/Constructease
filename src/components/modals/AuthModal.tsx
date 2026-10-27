import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck, HardHat } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, login, registerUser, switchRoleDemo } = useApp();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('customer');

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      if (!name || !email) return;
      registerUser({ name, email, phone, role });
    } else {
      if (!email) return;
      login(email, role);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#142B4A] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#F28C28]">
              <HardHat className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">
                {isRegistering ? 'Create Constructease Account' : 'Sign In to Constructease'}
              </h3>
              <p className="text-[11px] text-slate-300">
                Transparent construction marketplace
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Switcher Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5">
          <p className="text-[11px] text-slate-500 font-medium mb-1.5">
            Quick 1-Click Demo Login:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                switchRoleDemo('customer');
                setAuthModalOpen(false);
              }}
              className="px-2 py-1.5 text-[11px] font-semibold bg-white border border-slate-200 hover:border-[#142B4A] rounded text-slate-800 transition-colors text-center cursor-pointer"
            >
              Customer Demo
            </button>
            <button
              onClick={() => {
                switchRoleDemo('provider');
                setAuthModalOpen(false);
              }}
              className="px-2 py-1.5 text-[11px] font-semibold bg-white border border-slate-200 hover:border-[#F28C28] rounded text-[#F28C28] transition-colors text-center cursor-pointer"
            >
              Worker Demo
            </button>
            <button
              onClick={() => {
                switchRoleDemo('admin');
                setAuthModalOpen(false);
              }}
              className="px-2 py-1.5 text-[11px] font-semibold bg-white border border-slate-200 hover:border-slate-800 rounded text-[#142B4A] transition-colors text-center cursor-pointer"
            >
              Admin Demo
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isRegistering && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Balaji Gunja"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98450 00000"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`py-2 text-xs font-medium rounded-lg border cursor-pointer ${
                      role === 'customer'
                        ? 'border-[#142B4A] bg-[#142B4A] text-white'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Homeowner / Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('provider')}
                    className={`py-2 text-xs font-medium rounded-lg border cursor-pointer ${
                      role === 'provider'
                        ? 'border-[#F28C28] bg-[#F28C28] text-white'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Service Provider
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer shadow-sm mt-2"
          >
            {isRegistering ? 'Complete Registration' : 'Sign In'}
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs text-slate-600 hover:text-[#142B4A] font-medium cursor-pointer"
            >
              {isRegistering
                ? 'Already have an account? Sign in here'
                : "Don't have an account yet? Register here"}
            </button>
          </div>
        </form>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted session with role-based access security</span>
        </div>
      </div>
    </div>
  );
};
