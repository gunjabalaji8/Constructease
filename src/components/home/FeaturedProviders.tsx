import React from 'react';
import { Star, ShieldCheck, MapPin, ArrowRight, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FeaturedProviders: React.FC = () => {
  const { workers, selectedCity, openBookingModal, setActivePage } = useApp();

  // Filter or take local workers
  const displayWorkers = workers.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
              Local Craftsmanship
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight mt-1">
              Featured Verified Providers in {selectedCity}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Real craftsmen with verified identities and past site audits. Providers awaiting document verification are marked as &quot;Registered&quot;.
            </p>
          </div>
          <button
            onClick={() => setActivePage('workers')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#142B4A] hover:text-[#F28C28] transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>View All Providers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayWorkers.map(w => (
            <div
              key={w.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold text-[#F28C28] uppercase tracking-wider">
                    {w.category}
                  </span>
                  {w.isVerified ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Registered
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base">{w.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{w.city} (PIN {w.pincode})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-slate-800">{w.rating}</span>
                    <span className="text-slate-400">({w.reviewCount})</span>
                  </div>
                  <span>·</span>
                  <span>{w.experienceYears} Yrs Exp</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {w.bio}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {w.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400">Quoted Rate</span>
                  <p className="text-sm font-bold text-[#142B4A]">
                    ₹{w.dailyRate} <span className="text-[10px] font-normal text-slate-500">/day</span>
                  </p>
                </div>
                <button
                  onClick={() => openBookingModal(w, 'Worker')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[11px] text-slate-400">
            *Sample development profiles shown. In production, ratings and reviews are tied to verified completion tokens.
          </p>
        </div>
      </div>
    </section>
  );
};
