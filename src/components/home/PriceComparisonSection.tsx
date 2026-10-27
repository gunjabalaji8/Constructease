import React, { useState } from 'react';
import { Layers, ArrowRight, CheckCircle2, Info, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PriceComparisonSection: React.FC = () => {
  const { setActivePage, addToMaterialCart, materials } = useApp();
  const [activeTab, setActiveTab] = useState<'cement' | 'steel' | 'workers'>('cement');

  return (
    <section className="py-16 sm:py-20 bg-[#F4F6F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
            Transparent Market Comparison
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight [text-wrap:balance]">
            Better Choices. Smarter Budgets. Quality Construction.
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Constructease empowers you to compare specifications, compressive strengths, and freight costs side by side. We never claim the cheapest item is best—we help you match the right material grade to each architectural milestone.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-white border border-slate-200 rounded-lg shadow-xs text-xs font-semibold">
            <button
              onClick={() => setActiveTab('cement')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                activeTab === 'cement'
                  ? 'bg-[#142B4A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cement Comparison (PPC vs OPC)
            </button>
            <button
              onClick={() => setActiveTab('steel')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                activeTab === 'steel'
                  ? 'bg-[#142B4A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TMT Steel Rebar Grades
            </button>
            <button
              onClick={() => setActiveTab('workers')}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                activeTab === 'workers'
                  ? 'bg-[#142B4A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Labor Daily Wage Benchmark
            </button>
          </div>
        </div>

        {/* Content Box */}
        {activeTab === 'cement' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">General & Plastering</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    High Durability
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#142B4A]">UltraTech Super Cement (PPC)</h3>
                  <p className="text-xs text-slate-500">Portland Pozzolana Cement · 50 kg Bag</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#142B4A]">₹395</span>
                  <span className="text-xs text-slate-500">/ bag</span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Compressive Strength:</span>
                    <span className="font-semibold text-slate-800">33 N/mm² (28-day cure)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Best Application:</span>
                    <span className="font-semibold text-slate-800">Brick masonry, internal plaster, tiles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Depot Freight:</span>
                    <span className="font-semibold text-slate-800">₹450 per standard load</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Platform Charge:</span>
                    <span className="font-semibold text-emerald-700">Disclosed in quotation (2.5%)</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100">
                  <strong className="text-slate-700">Engineering note:</strong> PPC generates less heat of hydration, drastically reducing shrinkage cracks on expansive wall plasters.
                </p>
              </div>

              <button
                onClick={() => {
                  addToMaterialCart(materials[0]);
                  setActivePage('materials');
                }}
                className="mt-6 w-full py-2.5 text-xs font-bold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
              >
                Add UltraTech PPC to Quotation List
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Structural RCC & Roof</span>
                  <span className="text-xs font-bold text-[#F28C28] bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                    Rapid Strength
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#142B4A]">Ambuja Plus Roof Special</h3>
                  <p className="text-xs text-slate-500">OPC 53 Equivalent with Silane Barrier · 50 kg Bag</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#142B4A]">₹415</span>
                  <span className="text-xs text-slate-500">/ bag</span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Compressive Strength:</span>
                    <span className="font-semibold text-slate-800">53 N/mm² (High Initial Gain)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Best Application:</span>
                    <span className="font-semibold text-slate-800">Roof slab casting, RCC columns, beams</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Depot Freight:</span>
                    <span className="font-semibold text-slate-800">₹500 per standard load</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Platform Charge:</span>
                    <span className="font-semibold text-emerald-700">Disclosed in quotation (2.5%)</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100">
                  <strong className="text-slate-700">Engineering note:</strong> Specially treated with active silanes that form a hydrophobic molecular web inside concrete pores to repel rainwater leaks.
                </p>
              </div>

              <button
                onClick={() => {
                  addToMaterialCart(materials[1]);
                  setActivePage('materials');
                }}
                className="mt-6 w-full py-2.5 text-xs font-bold text-[#142B4A] bg-slate-100 hover:bg-[#142B4A] hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                Add Ambuja Roof Special to Quotation List
              </button>
            </div>
          </div>
        )}

        {activeTab === 'steel' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[11px]">
                    <th className="py-3 px-3">Brand & Grade</th>
                    <th className="py-3 px-3">Primary Raw Material</th>
                    <th className="py-3 px-3">Elongation / Ductility</th>
                    <th className="py-3 px-3">Price / Metric Ton</th>
                    <th className="py-3 px-3">Seismic Zone Fit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-[#142B4A]">Tata Tiscon 550D</span>
                      <p className="text-[11px] text-slate-500">IS 1786 Super Ductile</p>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700">100% Virgin Iron Ore (Blast Furnace)</td>
                    <td className="py-3.5 px-3 font-semibold text-emerald-700">14.5% High Elongation</td>
                    <td className="py-3.5 px-3 font-bold text-[#142B4A]">₹64,500 / MT</td>
                    <td className="py-3.5 px-3 text-slate-700">Zone III, IV & V (Recommended for High Earthquake Safety)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-[#142B4A]">JSW Neosteel 500D</span>
                      <p className="text-[11px] text-slate-500">Fe 500D Primary Steel</p>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700">Corex & Blast Furnace Clean Steel</td>
                    <td className="py-3.5 px-3 font-semibold text-slate-700">12.0% Standard Ductility</td>
                    <td className="py-3.5 px-3 font-bold text-[#142B4A]">₹61,800 / MT</td>
                    <td className="py-3.5 px-3 text-slate-700">Standard Residential G+2 Structures</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>*Prices exclude local GST and truck trailer unloading charges.</span>
              <button
                onClick={() => setActivePage('materials')}
                className="text-[#142B4A] font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View All 12 Materials in Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { role: 'Master Mason', rate: '₹1,000 – ₹1,200', basis: '8-Hour Daily Shift', duties: 'Precise brick course leveling, structural lintel alignment, column shuttering supervision.' },
              { role: 'Licensed Wireman / Electrician', rate: '₹900 – ₹1,000', basis: '8-Hour Daily Shift', duties: 'Conduit channeling, DB dressing, load calculation, safety MCB installation.' },
              { role: 'Plumbing Specialist', rate: '₹850 – ₹950', basis: '8-Hour Daily Shift', duties: 'Leak-proof pressure testing, CPVC solvent welding, slope calculation for drainage.' }
            ].map(item => (
              <div key={item.role} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                <h4 className="font-bold text-[#142B4A] text-sm">{item.role}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-[#F28C28]">{item.rate}</span>
                  <span className="text-[11px] text-slate-500">/ day</span>
                </div>
                <p className="text-[11px] text-slate-400 uppercase font-medium">{item.basis}</p>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {item.duties}
                </p>
                <button
                  onClick={() => setActivePage('workers')}
                  className="w-full mt-2 py-2 text-xs font-semibold text-[#142B4A] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Book Verified Worker
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
