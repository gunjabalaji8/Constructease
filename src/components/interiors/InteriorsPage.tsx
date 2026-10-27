import React, { useState } from 'react';
import {
  Palette,
  Check,
  Calendar,
  Sparkles,
  Home,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INTERIOR_PROJECTS_DATA } from '../../data/mockData';
import { InteriorStyle } from '../../types';

export const InteriorsPage: React.FC = () => {
  const {
    createInteriorRequest,
    currentUser,
    setAuthModalOpen,
    setActivePage,
    selectedCity,
    feeConfig
  } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [propertyType, setPropertyType] = useState<'1 BHK' | '2 BHK' | '3 BHK' | 'Independent Villa' | 'Duplex' | 'Commercial Office'>('3 BHK');
  const [selectedRooms, setSelectedRooms] = useState<string[]>(['Living Room', 'Modular Kitchen']);
  const [approxBudget, setApproxBudget] = useState('₹8 Lakhs – ₹14 Lakhs');
  const [preferredStyle, setPreferredStyle] = useState<InteriorStyle>('Modern');
  const [timeline, setTimeline] = useState<'Immediate (within 15 days)' | '1-2 Months' | '3-6 Months'>('1-2 Months');
  const [location, setLocation] = useState(`Sector 2, HSR Layout, ${selectedCity}`);
  const [notes, setNotes] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const availableRooms = [
    'Living Room',
    'Modular Kitchen',
    'Master Bedroom',
    'Guest Bedroom',
    'Kids Bedroom',
    'Bathrooms',
    'False Ceiling & Lighting',
    'Balcony / Sit-out'
  ];

  const toggleRoom = (room: string) => {
    setSelectedRooms(prev =>
      prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    const reqId = createInteriorRequest({
      customerId: currentUser.id,
      customerName: name || currentUser.name,
      customerEmail: email || currentUser.email,
      customerPhone: phone || currentUser.phone || '+91 98000 00000',
      propertyType,
      rooms: selectedRooms,
      approxBudget,
      preferredStyle,
      projectTimeline: timeline,
      location,
      additionalNotes: notes,
      consultationFee: feeConfig.interiorConsultationFee
    });

    setSubmittedId(reqId);
  };

  return (
    <div className="py-10 bg-[#F4F6F8] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-[#142B4A] text-white p-8 sm:p-12">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-white/10 px-3 py-1 rounded-full">
              <Palette className="w-4 h-4 text-[#F28C28]" />
              <span>Architectural Interior Studio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight [text-wrap:balance]">
              Transform Bare Bricks into Bespoke Living Spaces
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Explore bespoke modular kitchens, Japandi serenity master suites, and acoustic false ceiling layouts. Compare designer styles and book an on-site concept consultation.
            </p>
          </div>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
                Inspiration Gallery
              </p>
              <h2 className="text-2xl font-extrabold text-[#142B4A] tracking-tight">
                Featured Design Concepts
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Each concept includes detailed material specs & hardware grade breakdowns
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTERIOR_PROJECTS_DATA.map(p => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#F28C28] uppercase text-[11px]">{p.roomType}</span>
                    <span className="text-slate-500 font-medium">{p.style} Style</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>

                  <div className="space-y-1.5 border-t border-slate-100 pt-3">
                    {p.features.map(f => (
                      <div key={f} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
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
                    onClick={() => {
                      setPreferredStyle(p.style);
                      const el = document.getElementById('consultation-form');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-[#142B4A] hover:bg-[#142B4A] hover:text-white border border-slate-300 rounded-lg transition-colors cursor-pointer"
                  >
                    Select Style
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Form Box */}
        <div id="consultation-form" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          {submittedId ? (
            <div className="text-center py-8 space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Interior Consultation Request #{submittedId} Confirmed
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you! Our assigned lead interior architect in {selectedCity} has received your {propertyType} requirement. We will contact you at <strong>{email}</strong> to confirm your slot.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Property:</span>
                  <span className="font-semibold text-slate-900">{propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Rooms:</span>
                  <span className="font-semibold text-slate-900">{selectedRooms.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Aesthetic Style:</span>
                  <span className="font-semibold text-slate-900">{preferredStyle}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 font-bold">
                  <span className="text-slate-900">Consultation Fee:</span>
                  <span className="text-[#142B4A]">₹{feeConfig.interiorConsultationFee} (Credited back on signing)</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmittedId(null);
                    setActivePage('customer-dashboard');
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
                >
                  View In Customer Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
                  Book A Design Consultation
                </p>
                <h2 className="text-2xl font-extrabold text-[#142B4A] tracking-tight mt-1">
                  Start Your Interior Design Journey
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your property specs and our interior architects will prepare tailored 2D moodboards and 3D concept proposals.
                </p>
              </div>

              {/* Property & Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Property Configuration
                  </label>
                  <select
                    value={propertyType}
                    onChange={e => setPropertyType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A] bg-white font-medium text-slate-800"
                  >
                    <option value="1 BHK">1 BHK Apartment</option>
                    <option value="2 BHK">2 BHK Apartment</option>
                    <option value="3 BHK">3 BHK Apartment</option>
                    <option value="Independent Villa">Independent Villa</option>
                    <option value="Duplex">Duplex Rowhouse</option>
                    <option value="Commercial Office">Commercial Studio / Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Aesthetic Style
                  </label>
                  <select
                    value={preferredStyle}
                    onChange={e => setPreferredStyle(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A] bg-white font-medium text-slate-800"
                  >
                    <option value="Modern">Modern Minimalist</option>
                    <option value="Minimalist">Japandi Scandinavian</option>
                    <option value="Traditional">Traditional Heritage (Chettinad / Wood)</option>
                    <option value="Luxury">Luxury Contemporary (Marble & Brass)</option>
                    <option value="Budget-Friendly">Budget-Optimized Modular</option>
                  </select>
                </div>
              </div>

              {/* Rooms Multi-Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Rooms to Be Designed ({selectedRooms.length} chosen)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableRooms.map(room => {
                    const isSelected = selectedRooms.includes(room);
                    return (
                      <button
                        key={room}
                        type="button"
                        onClick={() => toggleRoom(room)}
                        className={`py-2 px-3 text-xs rounded-lg border text-left transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#142B4A] text-white border-[#142B4A] font-semibold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{room}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#F28C28]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Approximate Interior Budget
                  </label>
                  <select
                    value={approxBudget}
                    onChange={e => setApproxBudget(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A] bg-white font-medium text-slate-800"
                  >
                    <option value="₹4 Lakhs – ₹8 Lakhs">₹4 Lakhs – ₹8 Lakhs (Essential Modular)</option>
                    <option value="₹8 Lakhs – ₹14 Lakhs">₹8 Lakhs – ₹14 Lakhs (Full Home Premium)</option>
                    <option value="₹14 Lakhs – ₹25 Lakhs">₹14 Lakhs – ₹25 Lakhs (Luxury Turnkey)</option>
                    <option value="₹25 Lakhs+">₹25 Lakhs+ (Architectural Custom)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Project Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={e => setTimeline(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A] bg-white font-medium text-slate-800"
                  >
                    <option value="Immediate (within 15 days)">Immediate (within 15 days)</option>
                    <option value="1-2 Months">1–2 Months</option>
                    <option value="3-6 Months">3–6 Months</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Balaji Gunja"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98450 00000"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Site Location Address
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Apartment name, Flat number, Locality"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Requirements or Storage Needs
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Want quartz countertop, Blum tandem drawers, and concealed bar unit in living room."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                />
              </div>

              {/* Fee Transparency Box */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-700">
                <Info className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">
                    Transparent Consultation Policy: ₹{feeConfig.interiorConsultationFee}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    The nominal consultation fee covers an on-site architectural measurement session, spatial 2D layout planning, and an itemized Bill of Quantities (BOQ). The entire fee is credited back into your final contract when you approve execution.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Confirm Consultation Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
