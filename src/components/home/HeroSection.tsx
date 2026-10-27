import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import heroImage from '../../assets/images/hero_construction_home_1793115490935.jpg';

export const HeroSection: React.FC = () => {
  const { setActivePage, selectedCity, pincode, setPincode } = useApp();
  const [category, setCategory] = useState('workers');
  const [localPin, setLocalPin] = useState(pincode);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localPin) setPincode(localPin);
    setActivePage(category);
  };

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#0D1E35] text-white overflow-hidden">
      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Modern residential dream home under construction at golden hour"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/hero_construction_home.jpg';
          }}
          className="w-full h-full object-cover object-center scale-102 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1E35]/95 via-[#0D1E35]/85 to-[#0D1E35]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Trust Kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
            <ShieldCheck className="w-4 h-4 text-[#F28C28]" />
            <span>Direct Marketplace · Transparent Rates · Zero Hidden Charges</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
            Build Your Dream Home, The Smarter Way.
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
            Find trusted construction professionals, compare quality materials at competitive prices, and transform your living space with expert interior designers—all in one place.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('workers')}
              className="px-5 py-3 text-xs font-bold text-white bg-[#F28C28] hover:bg-[#D9771B] rounded-lg transition-colors shadow-lg shadow-orange-950/20 cursor-pointer flex items-center gap-2"
            >
              <span>Find Workers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('materials')}
              className="px-5 py-3 text-xs font-bold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 rounded-lg transition-colors cursor-pointer"
            >
              Explore Materials
            </button>
            <button
              onClick={() => setActivePage('interiors')}
              className="px-5 py-3 text-xs font-bold text-slate-200 hover:text-white bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-lg transition-colors cursor-pointer"
            >
              Design My Home
            </button>
          </div>

          {/* Search Panel Box */}
          <div className="mt-8 bg-white text-slate-900 rounded-xl p-4 sm:p-5 shadow-2xl border border-white/20 max-w-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Search Nearby Services & Materials in {selectedCity}
            </p>
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4 relative">
                <MapPin className="w-4 h-4 text-[#F28C28] absolute left-3 top-3" />
                <input
                  type="text"
                  value={localPin}
                  onChange={e => setLocalPin(e.target.value)}
                  placeholder="PIN code / Area"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                />
              </div>

              <div className="sm:col-span-5">
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A] bg-white font-medium text-slate-700"
                >
                  <option value="workers">Construction Workers (Masons, Electricians...)</option>
                  <option value="materials">Building Materials (Cement, Steel, Bricks...)</option>
                  <option value="contractors">Civil Contractors (Turnkey & Residential)</option>
                  <option value="interiors">Interior Designers (Modular & Full Home)</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-bold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm h-full"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Adjacency Proof Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#F28C28]" />
              <span>Verified Local Trade Licenses</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#F28C28]" />
              <span>Depot Direct Wholesale Inquiries</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#F28C28]" />
              <span>No Advance Commitment Necessary</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
