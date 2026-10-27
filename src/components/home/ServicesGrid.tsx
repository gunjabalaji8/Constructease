import React from 'react';
import { ArrowRight, Wrench, Package, Building, Palette } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import workersImg from '../../assets/images/category_workers_1793115492105.jpg';
import materialsImg from '../../assets/images/category_materials_1793115491600.jpg';
import contractorsImg from '../../assets/images/category_contractors_1793115493061.jpg';
import interiorsImg from '../../assets/images/category_interiors_1793115493041.jpg';

export const ServicesGrid: React.FC = () => {
  const { setActivePage } = useApp();

  const services = [
    {
      id: 'workers',
      title: 'Find Construction Workers',
      subtitle: 'Masons, Electricians, Plumbers, Carpenters & Laborers',
      description: 'Book verified skilled labor on clear daily or hourly terms. Compare past job track records, specialty skills, and immediate availability near your site.',
      image: workersImg,
      fallbackImage: '/images/category_workers.jpg',
      icon: <Wrench className="w-5 h-5 text-[#F28C28]" />,
      cta: 'Browse Skilled Workers',
      features: ['Daily / hourly transparent rates', 'Skill-tagged profiles', 'Direct booking & tracking']
    },
    {
      id: 'materials',
      title: 'Construction Materials Depot',
      subtitle: 'Cement, Steel Rebars, Bricks, Sand, Tiles & Paints',
      description: 'Source tested building supplies directly from certified local stockists. Compare grades (PPC vs OPC 53, Fe 550D TMT), check minimum loads, and request bulk discounts.',
      image: materialsImg,
      fallbackImage: '/images/category_materials.jpg',
      icon: <Package className="w-5 h-5 text-[#F28C28]" />,
      cta: 'Compare & Order Materials',
      features: ['Depot direct pricing', 'Multi-supplier spec compare', 'Disclosed freight charges']
    },
    {
      id: 'contractors',
      title: 'Contractors & Building Services',
      subtitle: 'Turnkey Residential, Renovation & Structural Builders',
      description: 'Partner with licensed general contractors for villa constructions and vertical expansions. Inspect past completed project portfolios and request preliminary site audits.',
      image: contractorsImg,
      fallbackImage: '/images/category_contractors.jpg',
      icon: <Building className="w-5 h-5 text-[#F28C28]" />,
      cta: 'View Licensed Contractors',
      features: ['A-Class licensed engineers', 'Transparent milestone estimates', 'Site inspection booking']
    },
    {
      id: 'interiors',
      title: 'Architectural Interior Design',
      subtitle: 'Modular Kitchens, Living Areas, False Ceilings & Lighting',
      description: 'Transform raw brick structures into magazine-worthy living spaces. Explore curated interior portfolios, calculate room-by-room estimates, and book design consultations.',
      image: interiorsImg,
      fallbackImage: '/images/category_interiors.jpg',
      icon: <Palette className="w-5 h-5 text-[#F28C28]" />,
      cta: 'Explore Interior Portfolios',
      features: ['Japandi, Modern & Traditional', 'Custom 3D layout options', 'Transparent consultation fees']
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F4F6F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
            Comprehensive Construction Ecosystem
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight [text-wrap:balance]">
            Everything You Need to Construct & Furnish
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Constructease eliminates opaque contractor markups and supplier kickbacks by giving homeowners transparent direct access to verified service providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(s => (
            <div
              key={s.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
            >
              <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
                <img
                  src={s.image}
                  alt={s.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = s.fallbackImage;
                  }}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs">
                  {s.icon}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold text-amber-300">{s.subtitle}</p>
                  <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">{s.title}</h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.description}
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-4">
                  {s.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActivePage(s.id)}
                  className="w-full py-2.5 px-4 text-xs font-bold text-[#142B4A] bg-slate-100 hover:bg-[#142B4A] hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 group-hover:bg-[#142B4A] group-hover:text-white"
                >
                  <span>{s.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
