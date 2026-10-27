import React from 'react';
import { HardHat, Shield, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActivePage, setProviderRegisterModalOpen } = useApp();

  return (
    <footer className="bg-[#142B4A] text-slate-300 border-t border-slate-800">
      {/* Top Banner inside Footer */}
      <div className="border-b border-white/10 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Are you a skilled worker, contractor, or supplier?
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Join Constructease to connect with real home-builders across your locality with guaranteed fair quotes.
            </p>
          </div>
          <button
            onClick={() => setProviderRegisterModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#142B4A] bg-[#F28C28] hover:bg-[#D9771B] hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <span>Register as a Service Provider</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#F28C28]">
                <HardHat className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Construct<span className="text-[#F28C28]">ease</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Constructease is a transparent construction & home improvement marketplace connecting homeowners with verified local workers, top building material suppliers, licensed contractors, and interior designers.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-[#F28C28]" />
              <span>Transparent Pricing · No False Badges · Clear Fee Disclosures</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => setActivePage('workers')} className="hover:text-white transition-colors cursor-pointer">
                  Find Skilled Workers
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('materials')} className="hover:text-white transition-colors cursor-pointer">
                  Construction Materials
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contractors')} className="hover:text-white transition-colors cursor-pointer">
                  Licensed Contractors
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('interiors')} className="hover:text-white transition-colors cursor-pointer">
                  Interior Design Services
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  Quotation Workflow
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Roles */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Dashboards & Legal</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => setActivePage('customer-dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Customer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('provider-dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Provider Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('admin-dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Admin Verification Desk
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('support')} className="hover:text-white transition-colors cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('support')} className="hover:text-white transition-colors cursor-pointer">
                  Cancellation & Refund Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Support & Office</h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5" />
                <span>Sector 3, HSR Layout, Bengaluru, Karnataka 560102</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F28C28] shrink-0" />
                <span>+91 80 4920 1800</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F28C28] shrink-0" />
                <span>support@constructease.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Constructease Marketplace Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>GSTIN: 29AABCU9603R1ZN</span>
            <span>Made for Indian Residential Builders</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
