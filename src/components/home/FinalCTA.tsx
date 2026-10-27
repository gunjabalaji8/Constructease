import React from 'react';
import { ArrowRight, Wrench, Package, Palette } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FinalCTA: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <section className="py-16 sm:py-20 bg-[#142B4A] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
        <span className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
          Begin Your Build Today
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight [text-wrap:balance]">
          Ready to Build Your Dream Home?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Access verified masons, electricians, licensed general contractors, bulk wholesale materials, and modern interior architecture in one place.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setActivePage('workers')}
            className="flex items-center gap-2 px-5 py-3 text-xs font-bold text-[#142B4A] bg-[#F28C28] hover:bg-[#D9771B] hover:text-white rounded-lg transition-colors cursor-pointer shadow-md"
          >
            <Wrench className="w-4 h-4" />
            <span>Find a Professional</span>
          </button>

          <button
            onClick={() => setActivePage('materials')}
            className="flex items-center gap-2 px-5 py-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <Package className="w-4 h-4" />
            <span>Compare Materials</span>
          </button>

          <button
            onClick={() => setActivePage('interiors')}
            className="flex items-center gap-2 px-5 py-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <Palette className="w-4 h-4" />
            <span>Explore Interior Designs</span>
          </button>
        </div>
      </div>
    </section>
  );
};
