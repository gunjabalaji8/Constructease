import React from 'react';
import { Search, MapPin, Scale, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { setActivePage } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Choose Your Service',
      description: 'Select between skilled workers (masons, carpenters, electricians), construction materials, licensed contractors, or interior designers.',
      icon: <Search className="w-5 h-5 text-[#F28C28]" />
    },
    {
      num: '02',
      title: 'Enter Location & Scope',
      description: 'Specify your construction plot locality, pin code, and requirements so nearby authorized providers can service your request efficiently.',
      icon: <MapPin className="w-5 h-5 text-[#F28C28]" />
    },
    {
      num: '03',
      title: 'Compare Prices & Quality',
      description: 'Review side-by-side material technical specifications, worker daily rates, contractor licenses, and customer ratings without hidden broker fees.',
      icon: <Scale className="w-5 h-5 text-[#F28C28]" />
    },
    {
      num: '04',
      title: 'Book with Clear Charges',
      description: 'Confirm your booking with upfront coordination fees and track milestones in real time from your private customer dashboard.',
      icon: <CheckCircle2 className="w-5 h-5 text-[#F28C28]" />
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
            Simple 4-Step Process
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight [text-wrap:balance]">
            How Constructease Works
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Eliminating opacity at every milestone so you stay in total control of your budget and project timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="text-2xl font-black text-slate-200">{step.num}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-5 text-slate-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center max-w-2xl mx-auto">
          <p className="text-xs text-slate-700 font-medium mb-3">
            Ready to find trusted providers near your construction site?
          </p>
          <button
            onClick={() => setActivePage('workers')}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
          >
            Start Finding Professionals
          </button>
        </div>
      </div>
    </section>
  );
};
