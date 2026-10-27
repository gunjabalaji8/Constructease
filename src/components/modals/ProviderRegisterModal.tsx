import React, { useState } from 'react';
import { X, HardHat, FileText, CheckCircle, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CITIES } from '../../data/mockData';
import { WorkerCategory } from '../../types';

export const ProviderRegisterModal: React.FC = () => {
  const {
    providerRegisterModalOpen,
    setProviderRegisterModalOpen,
    selectedCity,
    addNewWorker,
    registerUser,
    setActivePage
  } = useApp();

  const [providerType, setProviderType] = useState<'worker' | 'contractor' | 'supplier' | 'interior'>('worker');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(selectedCity);
  const [pincode, setPincode] = useState('560034');
  const [workerCategory, setWorkerCategory] = useState<WorkerCategory>('Mason');
  const [experienceYears, setExperienceYears] = useState(5);
  const [dailyRate, setDailyRate] = useState(1000);
  const [hourlyRate, setHourlyRate] = useState(150);
  const [skillsText, setSkillsText] = useState('');
  const [bio, setBio] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!providerRegisterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = skillsText
      ? skillsText.split(',').map(s => s.trim()).filter(Boolean)
      : ['General Construction Work', 'On-site Execution'];

    if (providerType === 'worker') {
      addNewWorker({
        name,
        category: workerCategory,
        city,
        pincode,
        experienceYears,
        dailyRate,
        hourlyRate,
        availability: 'Available Today',
        skills,
        bio: bio || `${workerCategory} with ${experienceYears} years of reliable construction field experience.`,
        phone: phone || '+91 98000 12345'
      });
    }

    // Also register user session as provider
    registerUser({
      name,
      email,
      phone,
      role: 'provider',
      city,
      companyName: businessName || name,
      providerType,
      isVerified: false // Explicitly unverified until admin reviews
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#142B4A] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#F28C28]">
              <HardHat className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">Provider Onboarding</h3>
              <p className="text-[11px] text-slate-300">
                Join Constructease verified local network
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setProviderRegisterModalOpen(false);
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Application Submitted for Verification</h4>
              <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>! Your application is now marked as{' '}
                <span className="font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  Registered (Pending Admin Audit)
                </span>
                . In accordance with Constructease compliance standards, the &quot;Verified&quot; credential badge is issued only after human review of your credentials.
              </p>
            </div>

            <div className="pt-4 flex gap-3 justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setProviderRegisterModalOpen(false);
                  setActivePage('provider-dashboard');
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
              >
                Access Provider Dashboard
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setProviderRegisterModalOpen(false);
                }}
                className="px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
            {/* Notice regarding verification */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs flex items-start gap-2 text-slate-700">
              <ShieldAlert className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-slate-900">Verification Policy: </strong>
                Constructease does not grant instant or fake verified badges. After onboarding, our operations desk reviews trade licenses and ID documents before awarding the Verified badge.
              </div>
            </div>

            {/* Provider Type Tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                I want to register as:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'worker', label: 'Skilled Worker' },
                  { id: 'contractor', label: 'Civil Contractor' },
                  { id: 'supplier', label: 'Material Supplier' },
                  { id: 'interior', label: 'Interior Designer' }
                ].map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setProviderType(type.id as any)}
                    className={`py-2 px-1 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      providerType === type.id
                        ? 'bg-[#142B4A] text-white border-[#142B4A]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name / Contact Person
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Rameshwar Kumar"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business / Agency Name (Optional)
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  placeholder="e.g. Kumar Masonry Works"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="provider@example.com"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number (for booking calls)
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Base City
                </label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A] bg-white"
                >
                  {CITIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary PIN Code Served
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                />
              </div>
            </div>

            {providerType === 'worker' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Trade Category
                    </label>
                    <select
                      value={workerCategory}
                      onChange={e => setWorkerCategory(e.target.value as WorkerCategory)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A] bg-white"
                    >
                      <option value="Mason">Mason</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Plumber">Plumber</option>
                      <option value="Carpenter">Carpenter</option>
                      <option value="Painter">Painter</option>
                      <option value="Tile Worker">Tile Worker</option>
                      <option value="Welder">Welder</option>
                      <option value="General Construction Worker">General Construction Worker</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={45}
                      value={experienceYears}
                      onChange={e => setExperienceYears(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Daily Wage Rate (₹)
                    </label>
                    <input
                      type="number"
                      min={400}
                      step={50}
                      value={dailyRate}
                      onChange={e => setDailyRate(parseInt(e.target.value) || 500)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Specific Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    value={skillsText}
                    onChange={e => setSkillsText(e.target.value)}
                    placeholder="e.g. Brickwork, Concrete Pouring, Plastering"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Aadhaar / Trade License / GSTIN (for verification)
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={documentNumber}
                  onChange={e => setDocumentNumber(e.target.value)}
                  placeholder="e.g. PWD/CL-1/2024 or GSTIN / Govt ID"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Profile Bio & Experience Summary
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Describe your residential project experience, team size, and craftsmanship standards."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Submit Application for Verification
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
