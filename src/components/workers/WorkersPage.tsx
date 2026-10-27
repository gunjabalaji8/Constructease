import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Filter,
  CheckCircle2,
  Calendar,
  Briefcase,
  Wrench,
  Clock,
  Phone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WorkerCategory, Worker } from '../../types';

export const WorkersPage: React.FC = () => {
  const { workers, selectedCity, pincode, openBookingModal } = useApp();

  const [searchSkill, setSearchSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [maxDailyRate, setMaxDailyRate] = useState<number>(1500);

  const categories: WorkerCategory[] = [
    'Mason',
    'Electrician',
    'Plumber',
    'Carpenter',
    'Painter',
    'Tile Worker',
    'Welder',
    'General Construction Worker'
  ];

  const filteredWorkers = workers.filter(w => {
    // City filter
    if (w.city.toLowerCase() !== selectedCity.toLowerCase()) {
      // allow seeing workers in active city or fallback
      return false;
    }
    // Category
    if (selectedCategory !== 'all' && w.category !== selectedCategory) {
      return false;
    }
    // Verified
    if (verifiedOnly && !w.isVerified) {
      return false;
    }
    // Availability
    if (selectedAvailability !== 'all' && w.availability !== selectedAvailability) {
      return false;
    }
    // Rate
    if (w.dailyRate > maxDailyRate) {
      return false;
    }
    // Skill search
    if (searchSkill.trim()) {
      const q = searchSkill.toLowerCase();
      const matchName = w.name.toLowerCase().includes(q);
      const matchSkill = w.skills.some(s => s.toLowerCase().includes(q));
      const matchBio = w.bio.toLowerCase().includes(q);
      if (!matchName && !matchSkill && !matchBio) return false;
    }
    return true;
  });

  return (
    <div className="py-10 bg-[#F4F6F8] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#F28C28] uppercase tracking-wider">
            <Wrench className="w-4 h-4" />
            <span>Skilled Construction Labor Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight mt-1">
            Find Construction Workers in {selectedCity}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Directly connect with certified masons, electricians, carpenters, and laborers. Transparent daily or hourly labor rates with zero broker markups.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchSkill}
                onChange={e => setSearchSkill(e.target.value)}
                placeholder="Search by skill, e.g. plastering, wiring, conduit..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
              />
            </div>

            {/* Category Dropdown */}
            <div className="sm:col-span-3">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A] bg-white font-medium text-slate-700"
              >
                <option value="all">All Trade Categories</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div className="sm:col-span-2">
              <select
                value={selectedAvailability}
                onChange={e => setSelectedAvailability(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A] bg-white font-medium text-slate-700"
              >
                <option value="all">Any Availability</option>
                <option value="Available Today">Available Today</option>
                <option value="Within 2 Days">Within 2 Days</option>
                <option value="Busy Next Week">Busy Next Week</option>
              </select>
            </div>

            {/* Verified toggle button */}
            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`w-full py-2 px-2 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  verifiedOnly
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{verifiedOnly ? 'Verified Only' : 'All Providers'}</span>
              </button>
            </div>
          </div>

          {/* Quick Rate & PIN Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <span>Max Daily Rate: <strong className="text-[#142B4A]">₹{maxDailyRate}</strong></span>
              <input
                type="range"
                min={700}
                max={1500}
                step={50}
                value={maxDailyRate}
                onChange={e => setMaxDailyRate(parseInt(e.target.value))}
                className="w-32 accent-[#142B4A]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Serving Local Area:</span>
              <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                PIN {pincode} ({selectedCity})
              </span>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>{filteredWorkers.length}</strong> available construction professionals</span>
          <span className="text-[11px] text-slate-400">*Platform fee (4%) disclosed upfront before booking</span>
        </div>

        {/* Worker Cards Grid */}
        {filteredWorkers.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Workers Matching Your Search Filter</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find workers matching these exact criteria in {selectedCity}. Try clearing the rate filter, switching category, or requesting provider coverage for your PIN code.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchSkill('');
                  setSelectedCategory('all');
                  setSelectedAvailability('all');
                  setVerifiedOnly(false);
                  setMaxDailyRate(1500);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#142B4A] rounded-lg cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map(w => (
              <div
                key={w.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Category & Verification */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
                      {w.category}
                    </span>
                    {w.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Credentials
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Registered Provider
                      </span>
                    )}
                  </div>

                  {/* Name & Location */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{w.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{w.city} · PIN {w.pincode}</span>
                    </div>
                  </div>

                  {/* Rating & Experience */}
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-slate-900">{w.rating}</span>
                      <span className="text-slate-400">({w.reviewCount} jobs)</span>
                    </div>
                    <span>·</span>
                    <span>{w.experienceYears} Years Exp</span>
                    <span>·</span>
                    <span className="text-emerald-700 font-medium">{w.availability}</span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {w.bio}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {w.skills.map(skill => (
                      <span
                        key={skill}
                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Rates & Booking */}
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Transparent Rate</span>
                    <p className="text-sm font-bold text-[#142B4A]">
                      ₹{w.dailyRate} <span className="text-[10px] font-normal text-slate-500">/day</span>
                    </p>
                    <span className="text-[10px] text-slate-400">(or ₹{w.hourlyRate}/hr)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openBookingModal(w, 'Worker')}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      Book Worker
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
