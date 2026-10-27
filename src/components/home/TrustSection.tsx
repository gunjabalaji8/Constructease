import React from 'react';
import { Scale, MapPin, Receipt, ShieldCheck, MessageSquare, Headphones } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const benefits = [
    {
      icon: <Scale className="w-5 h-5 text-[#F28C28]" />,
      title: 'Compare Multiple Local Providers',
      description: 'Review competitive quotations across different local craftsmen and contractors before committing any money.'
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#F28C28]" />,
      title: 'Servicing Your Specific PIN Code',
      description: 'Filter verified workers and suppliers operating directly within your neighborhood to ensure swift on-site mobilization.'
    },
    {
      icon: <Receipt className="w-5 h-5 text-[#F28C28]" />,
      title: '100% Transparent Quotations',
      description: 'Full itemized visibility on daily labor wages, depot loading fees, freight costs, and disclosed coordination fees.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#F28C28]" />,
      title: 'Quality-Conscious Materials',
      description: 'Detailed technical specification cards (IS codes, compressive strength, elongation) so you buy the right grade every time.'
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-[#F28C28]" />,
      title: 'Direct Client-Provider Communication',
      description: 'No middleman secrecy. Speak directly with the mason, electrician, or civil engineer handling your build.'
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#F28C28]" />,
      title: 'Responsive Marketplace Support',
      description: 'Dedicated support ticket desk and resolution assistance for timeline disputes, material discrepancies, or billing queries.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
            Why Constructease
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight [text-wrap:balance]">
            Built on Transparency, Trust & Fair Pricing
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our mission is to empower homeowners with complete clarity over labor costs and material specs—no fake reviews, no hidden commissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map(b => (
            <div
              key={b.title}
              className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                {b.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">{b.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
