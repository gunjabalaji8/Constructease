import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Star,
  ShieldCheck,
  Search,
  Layers,
  ArrowRight,
  Briefcase,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Contractor } from '../../types';

export const ContractorsPage: React.FC<{
  onOpenCompare: () => void;
}> = ({ onOpenCompare }) => {
  const {
    contractors,
    comparedContractors,
    toggleContractorComparison,
    openBookingModal,
    selectedCity,
    pincode
  } = useApp();

  const [searchSpecialization, setSearchSpecialization] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredContractors = contractors.filter(c => {
    if (c.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
    if (verifiedOnly && !c.isVerified) return false;
    if (searchSpecialization.trim()) {
      const q = searchSpecialization.toLowerCase();
      const matchComp = c.companyName.toLowerCase().includes(q);
      const matchSpec = c.specialization.some(s => s.toLowerCase().includes(q));
      if (!matchComp && !matchSpec) return false;
    }
    return true;
  });

  return (
    <div className="py-10 bg-[#F4F6F8] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#F28C28] uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Licensed Civil Contractors Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight mt-1">
              General Contractors & Residential Builders in {selectedCity}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Inspect credentials, verified municipal builder licenses, past residential portfolios, and schedule professional on-site audits.
            </p>
          </div>

          {comparedContractors.length > 0 && (
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#142B4A] bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#F28C28]" />
              <span>Compare Contractors ({comparedContractors.length}/2)</span>
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchSpecialization}
              onChange={e => setSearchSpecialization(e.target.value)}
              placeholder="Search by builder name or specialization (e.g. duplex, villa)..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full sm:w-auto ${
                verifiedOnly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{verifiedOnly ? 'Verified Licenses Only' : 'All Builders'}</span>
            </button>
          </div>
        </div>

        {/* Contractors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredContractors.map(c => {
            const isCompared = comparedContractors.some(comp => comp.id === c.id);

            return (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Top Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-[#F28C28] uppercase">
                        {c.city} General Contractor
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">{c.companyName}</h3>
                      <p className="text-xs text-slate-500">Lead Engineer: {c.name}</p>
                    </div>

                    {c.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Verified
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        Registered
                      </span>
                    )}
                  </div>

                  {/* Badges / Metrics */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-slate-900">{c.rating}</span>
                      <span className="text-slate-400">({c.reviewCount} reviews)</span>
                    </div>
                    <span>·</span>
                    <span>{c.experienceYears} Years Exp</span>
                    <span>·</span>
                    <span>{c.completedProjects} Completed Projects</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {c.bio}
                  </p>

                  {/* License Info */}
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>License: <strong className="font-mono text-slate-800">{c.licenseNumber}</strong></span>
                  </div>

                  {/* Specializations */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Core Specialization
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {c.specialization.map(s => (
                        <span key={s} className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Portfolio highlight */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Recent Projects
                    </span>
                    <div className="space-y-1 text-xs text-slate-600">
                      {c.portfolio.map(proj => (
                        <div key={proj.title} className="flex justify-between">
                          <span className="font-medium text-slate-800">{proj.title}</span>
                          <span className="text-slate-500 text-[11px]">{proj.location}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Typical Budget Range</span>
                    <p className="text-sm font-bold text-[#142B4A]">{c.estimatedBudgetRange}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleContractorComparison(c)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        isCompared
                          ? 'bg-amber-50 border-amber-300 text-amber-900'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {isCompared ? 'Comparing' : 'Compare'}
                    </button>

                    <button
                      type="button"
                      onClick={() => openBookingModal(c, 'Contractor')}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
                    >
                      Request Site Inspection
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
