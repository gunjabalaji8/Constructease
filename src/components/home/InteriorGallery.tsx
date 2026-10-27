import React, { useState } from 'react';
import { ArrowRight, Sparkles, Filter, Home, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INTERIOR_PROJECTS_DATA } from '../../data/mockData';
import { InteriorStyle } from '../../types';

export const InteriorGallery: React.FC = () => {
  const { setActivePage } = useApp();
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<string>('all');

  const filteredProjects = INTERIOR_PROJECTS_DATA.filter(p => {
    if (selectedStyle !== 'all' && p.style !== selectedStyle) return false;
    if (selectedRoom !== 'all' && p.roomType !== selectedRoom) return false;
    return true;
  });

  return (
    <section className="py-16 sm:py-20 bg-[#F4F6F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
              Interior Inspiration
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight mt-1">
              Curated Spaces for Modern Living
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              From bespoke modular kitchens to tranquil minimalist master bedrooms, browse turnkey interiors crafted by verified regional architects.
            </p>
          </div>
          <button
            onClick={() => setActivePage('interiors')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer self-start md:self-auto shadow-sm"
          >
            <span>Request Interior Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-3 rounded-xl border border-slate-200">
          {/* Room Filter */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-semibold px-2">Room:</span>
            {['all', 'Living Room', 'Modular Kitchen', 'Bedroom', 'Bathroom', 'False Ceiling', 'Full Home'].map(r => (
              <button
                key={r}
                onClick={() => setSelectedRoom(r)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedRoom === r
                    ? 'bg-[#142B4A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {r === 'all' ? 'All Spaces' : r}
              </button>
            ))}
          </div>

          {/* Style Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Style:</span>
            <select
              value={selectedStyle}
              onChange={e => setSelectedStyle(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 bg-white font-medium focus:outline-none"
            >
              <option value="all">All Aesthetics</option>
              <option value="Modern">Modern</option>
              <option value="Minimalist">Minimalist</option>
              <option value="Traditional">Traditional</option>
              <option value="Luxury">Luxury</option>
              <option value="Budget-Friendly">Budget-Friendly</option>
            </select>
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#F28C28] uppercase">{p.roomType}</span>
                  <span className="text-xs text-slate-500 font-medium">{p.style} Style</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>

                <div className="space-y-1.5 border-t border-slate-100 pt-3">
                  {p.features.map(feat => (
                    <div key={feat} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Budget</span>
                  <p className="text-xs font-bold text-[#142B4A]">{p.estimatedBudget}</p>
                </div>
                <button
                  onClick={() => setActivePage('interiors')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#142B4A] hover:bg-[#142B4A] hover:text-white border border-slate-300 rounded-lg transition-colors cursor-pointer"
                >
                  Book 3D Consult
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
