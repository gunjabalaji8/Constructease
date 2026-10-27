import React, { useState } from 'react';
import {
  HardHat,
  MapPin,
  ChevronDown,
  User as UserIcon,
  ShoppingBag,
  Layers,
  Menu,
  X,
  ShieldCheck,
  Building2,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CITIES } from '../../data/mockData';
import { UserRole } from '../../types';

export const Navbar: React.FC<{
  onOpenCart: () => void;
  onOpenCompare: () => void;
}> = ({ onOpenCart, onOpenCompare }) => {
  const {
    activePage,
    setActivePage,
    selectedCity,
    setSelectedCity,
    pincode,
    setPincode,
    currentUser,
    currentRole,
    logout,
    switchRoleDemo,
    setAuthModalOpen,
    setProviderRegisterModalOpen,
    materialCart,
    comparedMaterials
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [editingPincode, setEditingPincode] = useState(false);
  const [tempPin, setTempPin] = useState(pincode);

  const navLinks = [
    { id: 'workers', label: 'Find Workers' },
    { id: 'materials', label: 'Materials' },
    { id: 'contractors', label: 'Contractors' },
    { id: 'interiors', label: 'Interior Design' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'support', label: 'Support & FAQs' }
  ];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCityDropdownOpen(false);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempPin.trim().length >= 4) {
      setPincode(tempPin.trim());
      setEditingPincode(false);
    }
  };

  return (
    <>
      {/* Top Location & Role Simulation Bar */}
      <div className="bg-[#0D1E35] text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Location Selector */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 text-white hover:text-[#F28C28] transition-colors font-medium cursor-pointer"
                aria-expanded={cityDropdownOpen}
              >
                <MapPin className="w-3.5 h-3.5 text-[#F28C28]" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1.5 w-44 z-50">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select City
                  </div>
                  {CITIES.map(c => (
                    <button
                      key={c}
                      onClick={() => handleCitySelect(c)}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        c === selectedCity ? 'text-[#142B4A] font-bold bg-slate-50' : 'text-slate-700'
                      }`}
                    >
                      {c}
                      {c === selectedCity && <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-white/20">|</span>

            {editingPincode ? (
              <form onSubmit={handlePinSubmit} className="flex items-center gap-1">
                <input
                  type="text"
                  value={tempPin}
                  onChange={e => setTempPin(e.target.value)}
                  maxLength={6}
                  placeholder="PIN code"
                  className="w-16 px-1.5 py-0.5 text-xs text-slate-900 bg-white rounded outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-1.5 py-0.5 text-[10px] bg-[#F28C28] text-white rounded font-medium"
                >
                  Save
                </button>
              </form>
            ) : (
              <button
                onClick={() => setEditingPincode(true)}
                className="hover:text-white transition-colors cursor-pointer text-slate-400"
                title="Click to set local postal code"
              >
                PIN: <span className="text-slate-200 underline decoration-dotted">{pincode}</span>
              </button>
            )}
          </div>

          {/* Role Mode Switcher & Quick Onboarding */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
              <span>View Mode:</span>
              {(['customer', 'provider', 'admin'] as UserRole[]).map(role => (
                <button
                  key={role}
                  onClick={() => {
                    switchRoleDemo(role);
                    if (role === 'customer') setActivePage('customer-dashboard');
                    if (role === 'provider') setActivePage('provider-dashboard');
                    if (role === 'admin') setActivePage('admin-dashboard');
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    currentRole === role
                      ? 'bg-[#F28C28] text-white'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>

            <button
              onClick={() => setProviderRegisterModalOpen(true)}
              className="text-[#F28C28] hover:text-white font-medium transition-colors cursor-pointer text-[11px]"
            >
              + Join as Provider
            </button>
          </div>
        </div>
      </div>

      {/* Main Strict 3-Zone Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2.5 text-left text-slate-900 group whitespace-nowrap shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#142B4A] flex items-center justify-center text-[#F28C28] shadow-sm group-hover:scale-105 transition-transform">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#142B4A]">
                Construct<span className="text-[#F28C28]">ease</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                Build Your Dream Home
              </span>
            </div>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map(link => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    isActive
                      ? 'text-[#142B4A] font-semibold border-b-2 border-[#F28C28]'
                      : 'hover:text-[#142B4A]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action cluster */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Compare Bar Trigger */}
            {comparedMaterials.length > 0 && (
              <button
                onClick={onOpenCompare}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#142B4A] bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer"
                title="Compare Selected Materials"
              >
                <Layers className="w-3.5 h-3.5 text-[#F28C28]" />
                <span>Compare ({comparedMaterials.length})</span>
              </button>
            )}

            {/* Material Quotation List Button */}
            {materialCart.length > 0 && (
              <button
                onClick={onOpenCart}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="View Quotation Request List"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#142B4A]" />
                <span className="hidden sm:inline">Quotation List</span>
                <span className="w-5 h-5 rounded-full bg-[#142B4A] text-white text-[11px] font-bold flex items-center justify-center">
                  {materialCart.length}
                </span>
              </button>
            )}

            {/* User Account / Dashboard Link */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 capitalize">{currentUser.role} Account</p>
                    </div>

                    <button
                      onClick={() => {
                        setActivePage('customer-dashboard');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Customer Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setActivePage('provider-dashboard');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Provider Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setActivePage('admin-dashboard');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>Admin Console</span>
                    </button>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-xs font-medium text-slate-700 hover:text-[#142B4A] px-2 py-1.5 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Primary CTA */}
            <button
              onClick={() => setActivePage('workers')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              Get Started
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  activePage === link.id
                    ? 'bg-slate-100 text-[#142B4A] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="border-t border-slate-200 pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setActivePage('customer-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Customer Dashboard
              </button>
              <button
                onClick={() => {
                  setActivePage('provider-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Provider Dashboard
              </button>
              <button
                onClick={() => {
                  setActivePage('admin-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Admin Control Room
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
