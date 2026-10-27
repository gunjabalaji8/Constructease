import React from 'react';
import { Star, Quote, Info } from 'lucide-react';
import { SAMPLE_REVIEWS_NOTE } from '../../data/mockData';

export const TestimonialsSection: React.FC = () => {
  const sampleTestimonials = [
    {
      id: 1,
      name: 'Naveen Kumar',
      role: 'Homeowner, 30x40 Duplex Build',
      location: 'HSR Layout, Bengaluru',
      rating: 5,
      content: 'Being able to compare PPC and OPC cement quotes from two nearby depots saved our slab budget over ₹18,000. The delivery arrived right at 7:30 AM as promised.',
      serviceUsed: 'Construction Materials'
    },
    {
      id: 2,
      name: 'Sunita & Deepak Rao',
      role: 'Full Villa Remodel',
      location: 'Whitefield, Bengaluru',
      rating: 5,
      content: 'We hired a verified master mason and electrician directly through Constructease. The daily wage rate was stated clearly upfront with no post-work argument.',
      serviceUsed: 'Skilled Workers'
    },
    {
      id: 3,
      name: 'Karthik Subramanian',
      role: 'Apartment Interior Renovation',
      location: 'Indiranagar, Bengaluru',
      rating: 5,
      content: 'The 3D interior design consultation helped us fix our modular kitchen workflow before cutting single plywood sheet. Transparent fee and great attention to detail.',
      serviceUsed: 'Interior Design'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F4F6F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <p className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
            Customer Experience
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight">
            Trusted by Builders & Homeowners
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] rounded-full">
            <Info className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>{SAMPLE_REVIEWS_NOTE}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleTestimonials.map(t => (
            <div
              key={t.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-[#F28C28] bg-orange-50 px-2 py-0.5 rounded">
                    {t.serviceUsed}
                  </span>
                </div>
                <Quote className="w-6 h-6 text-slate-300" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  &quot;{t.content}&quot;
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                <p className="text-[11px] text-slate-500">{t.role} · {t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
