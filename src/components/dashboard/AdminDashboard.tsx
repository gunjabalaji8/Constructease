import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  HardHat,
  Package,
  Layers,
  Settings,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Sliders,
  Check,
  CreditCard,
  Crown,
  Calendar,
  Sparkles,
  ArrowRight,
  Plus,
  RefreshCw,
  Building2,
  Palette
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BookingRequest, InteriorConsultationRequest, SubscriptionPlan } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    switchRoleDemo,
    workers,
    materials,
    contractors,
    bookings,
    confirmBookingWithData,
    updateBookingStatus,
    interiorRequests,
    confirmInteriorRequest,
    updateInteriorStatus,
    supportTickets,
    toggleProviderVerification,
    feeConfig,
    updateFeeConfig,
    subscriptionPlans,
    providerSubscriptions,
    updateSubscriptionPlan,
    addNewSubscriptionPlan,
    assignProviderSubscription,
    updateProviderSubscriptionStatus
  } = useApp();

  const [bookingFeeInput, setBookingFeeInput] = useState(feeConfig.bookingFeePercent);
  const [materialFeeInput, setMaterialFeeInput] = useState(feeConfig.materialCommissionPercent);
  const [interiorFeeInput, setInteriorFeeInput] = useState(feeConfig.interiorConsultationFee);
  const [activeTab, setActiveTab] = useState<'overview' | 'contractor-confirm' | 'interior-confirm' | 'subscriptions' | 'verifications' | 'fees' | 'tickets'>('overview');

  // Confirmation Modals State
  const [confirmingBooking, setConfirmingBooking] = useState<BookingRequest | null>(null);
  const [confirmDate, setConfirmDate] = useState('');
  const [confirmAmount, setConfirmAmount] = useState<number>(0);
  const [confirmNotes, setConfirmNotes] = useState('');

  const [confirmingInterior, setConfirmingInterior] = useState<InteriorConsultationRequest | null>(null);
  const [interiorDate, setInteriorDate] = useState('');
  const [interiorTime, setInteriorTime] = useState('11:00 AM – 12:30 PM');
  const [interiorDesigner, setInteriorDesigner] = useState('Ar. Sameer Sen (Senior Architect)');
  const [interiorType, setInteriorType] = useState<'In-Person Site Visit' | 'Virtual 3D Session'>('In-Person Site Visit');
  const [interiorEstimate, setInteriorEstimate] = useState<number>(850000);

  // New Subscription Plan State
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanMonthly, setNewPlanMonthly] = useState<number>(999);
  const [newPlanAnnual, setNewPlanAnnual] = useState<number>(9990);
  const [newPlanQuota, setNewPlanQuota] = useState<number>(20);
  const [newPlanCommission, setNewPlanCommission] = useState<number>(2.5);
  const [newPlanBadge, setNewPlanBadge] = useState('Gold Certified');
  const [newPlanFeatures, setNewPlanFeatures] = useState('Priority search rank, 20 leads/month, direct calls');

  // Assign Subscription State
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignProviderId, setAssignProviderId] = useState(workers[0]?.id || '');
  const [assignPlanId, setAssignPlanId] = useState(subscriptionPlans[0]?.id || '');
  const [assignCycle, setAssignCycle] = useState<'monthly' | 'annual'>('monthly');

  // RBAC Enforcement Check
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="py-20 text-center bg-[#F4F6F8] min-h-[calc(100vh-140px)] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs max-w-md w-full space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Restricted Admin Console</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Role-Based Access Control is enforced. This control room is restricted to authorized Constructease administrators for credential auditing, fee configuration, subscription management, and booking confirmations.
          </p>
          <button
            onClick={() => switchRoleDemo('admin')}
            className="w-full py-2.5 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
          >
            Switch to Demo Admin Session
          </button>
        </div>
      </div>
    );
  }

  const unverifiedWorkers = workers.filter(w => !w.isVerified);
  const verifiedWorkers = workers.filter(w => w.isVerified);
  const totalBookingsValue = bookings.reduce((sum, b) => sum + b.totalEstimatedAmount, 0);
  const totalPlatformFeesEarned = bookings.reduce((sum, b) => sum + b.platformFee, 0);

  // Subscription KPIs
  const activeSubsCount = providerSubscriptions.filter(s => s.status === 'Active').length;
  const mrrFromSubscriptions = providerSubscriptions.reduce((sum, s) => {
    const plan = subscriptionPlans.find(p => p.id === s.planId);
    if (!plan) return sum;
    return sum + (s.billingCycle === 'annual' ? Math.round(plan.priceAnnual / 12) : plan.priceMonthly);
  }, 0);

  const contractorBookings = bookings.filter(b => b.serviceType === 'Contractor');

  const handleSaveFees = (e: React.FormEvent) => {
    e.preventDefault();
    updateFeeConfig({
      bookingFeePercent: bookingFeeInput,
      materialCommissionPercent: materialFeeInput,
      interiorConsultationFee: interiorFeeInput
    });
  };

  const handleExecuteContractorConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmingBooking) return;
    confirmBookingWithData(confirmingBooking.id, {
      scheduledDate: confirmDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      quotedAmount: confirmAmount > 0 ? confirmAmount : confirmingBooking.quotedAmount,
      notes: confirmNotes || 'Contractor terms & site inspection schedule confirmed by operations.'
    });
    setConfirmingBooking(null);
  };

  const handleExecuteInteriorConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmingInterior) return;
    confirmInteriorRequest(confirmingInterior.id, {
      scheduledDate: interiorDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      slotTime: interiorTime,
      assignedDesigner: interiorDesigner,
      consultationType: interiorType,
      quotedProjectAmount: interiorEstimate
    });
    setConfirmingInterior(null);
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanName) return;
    addNewSubscriptionPlan({
      name: newPlanName,
      targetRole: 'all',
      priceMonthly: newPlanMonthly,
      priceAnnual: newPlanAnnual,
      monthlyLeadsQuota: newPlanQuota,
      commissionRate: newPlanCommission,
      badgeLabel: newPlanBadge,
      features: newPlanFeatures.split(',').map(f => f.trim()).filter(Boolean),
      isActive: true
    });
    setShowAddPlanModal(false);
    setNewPlanName('');
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    assignProviderSubscription(assignProviderId, assignPlanId, assignCycle);
    setShowAssignModal(false);
  };

  return (
    <div className="py-10 bg-[#F4F6F8] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Top Admin Header */}
        <div className="bg-[#142B4A] text-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#F28C28]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">Constructease Administrative Operations Desk</h1>
                <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                  Secure Root Session
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Logged in as {currentUser.name} ({currentUser.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('subscriptions')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#F28C28] hover:bg-[#D9771B] text-white rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Subscription Engine</span>
            </button>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Providers</span>
              <HardHat className="w-4 h-4 text-[#F28C28]" />
            </div>
            <p className="text-2xl font-black text-slate-900">{workers.length + contractors.length}</p>
            <p className="text-[11px] text-slate-500">
              {verifiedWorkers.length} Verified · {unverifiedWorkers.length} Pending Audit
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Bookings Volume</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{bookings.length}</p>
            <p className="text-[11px] text-slate-500">
              Contractors: {contractorBookings.length} · Interiors: {interiorRequests.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Subscription MRR</span>
              <Crown className="w-4 h-4 text-[#F28C28]" />
            </div>
            <p className="text-2xl font-black text-[#142B4A]">₹{mrrFromSubscriptions.toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span></p>
            <p className="text-[11px] text-slate-500">
              {activeSubsCount} Active Subscribed Providers
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Platform Fee Revenue</span>
              <DollarSign className="w-4 h-4 text-[#142B4A]" />
            </div>
            <p className="text-2xl font-black text-[#142B4A]">₹{totalPlatformFeesEarned.toLocaleString()}</p>
            <p className="text-[11px] text-slate-500">
              Disclosed transaction commissions
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold pb-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('contractor-confirm')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'contractor-confirm'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Confirm Contractors ({contractorBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('interior-confirm')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'interior-confirm'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Confirm Interior Design ({interiorRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'subscriptions'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Subscriptions Engine ({subscriptionPlans.length} Tiers)
          </button>
          <button
            onClick={() => setActiveTab('verifications')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'verifications'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Provider Verifications ({unverifiedWorkers.length} Pending)
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'fees'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Fee Configuration
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'tickets'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Support Tickets ({supportTickets.length})
          </button>
        </div>

        {/* Tab 1: Bookings Overview */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Platform Bookings & Quotation Requests</h3>
                <p className="text-xs text-slate-500">Live order audit log across Workers, Materials & Contractors</p>
              </div>
              <span className="text-xs text-slate-500">{bookings.length} Orders</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Target Provider</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Scheduled Date</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{b.id}</td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-800">{b.customerName}</p>
                        <p className="text-[11px] text-slate-400">{b.customerPhone}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-slate-800">{b.targetName}</p>
                        <p className="text-[11px] text-slate-500">{b.targetCategory}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{b.serviceType}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded font-medium text-[11px] ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : b.status === 'In Progress'
                            ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                            : 'bg-slate-100 text-slate-800'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{b.scheduledDate || 'Pending Schedule'}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        ₹{b.totalEstimatedAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {b.status !== 'Confirmed' && b.status !== 'Completed' && (
                          <button
                            onClick={() => {
                              setConfirmingBooking(b);
                              setConfirmDate(b.scheduledDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
                              setConfirmAmount(b.quotedAmount || 45000);
                              setConfirmNotes(b.notes || '');
                            }}
                            className="px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors cursor-pointer"
                          >
                            Confirm Booking
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Confirm Contractors */}
        {activeTab === 'contractor-confirm' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#F28C28]" />
                  <h3 className="font-bold text-slate-900 text-base">Contractor Booking & Site Inspection Confirmation</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  When customer and contractor finalize specifications, lock in the scheduled site inspection, structural quotation, and milestone dates.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                {contractorBookings.length} Contractor Projects
              </span>
            </div>

            <div className="space-y-4">
              {contractorBookings.map(cb => (
                <div key={cb.id} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-xs">#{cb.id}</span>
                      <span className="text-slate-300">·</span>
                      <h4 className="font-bold text-slate-900 text-sm">{cb.targetName}</h4>
                      <span className="text-xs text-[#F28C28]">({cb.targetCategory})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        cb.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {cb.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">Homeowner:</span>
                      <p className="font-bold text-slate-900">{cb.customerName}</p>
                      <p className="text-slate-500">{cb.customerPhone}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Site Location:</span>
                      <p className="font-medium text-slate-800">{cb.location}</p>
                      <p className="text-slate-500">PIN: {cb.pincode}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Scheduled Date:</span>
                      <p className="font-bold text-slate-900">{cb.scheduledDate || 'Not Fixed Yet'}</p>
                      <span className="text-[11px] text-slate-400">Created: {new Date(cb.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Quoted Project Value:</span>
                      <p className="font-black text-sm text-[#142B4A]">
                        ₹{cb.quotedAmount ? cb.quotedAmount.toLocaleString() : 'Pending final audit'}
                      </p>
                      <span className="text-[11px] text-slate-500">Coordination Fee: ₹{cb.platformFee}</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
                    <strong>Project Requirements & Scope:</strong> {cb.notes}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    {cb.status !== 'Confirmed' ? (
                      <button
                        onClick={() => {
                          setConfirmingBooking(cb);
                          setConfirmDate(cb.scheduledDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
                          setConfirmAmount(cb.quotedAmount || 1500000);
                          setConfirmNotes(cb.notes || '');
                        }}
                        className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Contractor Booking with Data</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Contractor Booking Locked & Confirmed</span>
                        </span>
                        <button
                          onClick={() => updateBookingStatus(cb.id, 'In Progress')}
                          className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg"
                        >
                          Mark Site Work in Progress
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Confirm Interior Design */}
        {activeTab === 'interior-confirm' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#F28C28]" />
                  <h3 className="font-bold text-slate-900 text-base">Interior Design Consultation & Project Confirmation</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Assign interior architects, finalize on-site measurement slot times, and confirm consultation bookings.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                {interiorRequests.length} Consultation Inquiries
              </span>
            </div>

            <div className="space-y-4">
              {interiorRequests.map(ir => (
                <div key={ir.id} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-xs">#{ir.id}</span>
                      <span className="text-slate-300">·</span>
                      <h4 className="font-bold text-slate-900 text-sm">{ir.propertyType} Interior Concept</h4>
                      <span className="text-xs text-[#F28C28]">({ir.preferredStyle} Aesthetic)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        ir.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ir.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">Homeowner / Client:</span>
                      <p className="font-bold text-slate-900">{ir.customerName}</p>
                      <p className="text-slate-500">{ir.customerEmail}</p>
                      <p className="text-slate-500">{ir.customerPhone}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Selected Rooms:</span>
                      <p className="font-medium text-slate-800">{ir.rooms.join(', ')}</p>
                      <p className="text-slate-500 mt-1">Timeline: {ir.projectTimeline}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Consultation Schedule:</span>
                      <p className="font-bold text-slate-900">
                        {ir.scheduledDate ? `${ir.scheduledDate} (${ir.slotTime || '11:00 AM'})` : 'Date To Be Confirmed'}
                      </p>
                      <p className="text-slate-500">Lead Architect: {ir.assignedDesigner || 'Unassigned'}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Approx Budget / Fee:</span>
                      <p className="font-bold text-slate-900">{ir.approxBudget}</p>
                      <span className="text-emerald-700 font-semibold">Fee: ₹{ir.consultationFee} (Adjustable)</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
                    <strong>Site Address & Notes:</strong> {ir.location} — {ir.additionalNotes || 'Standard preliminary 2D moodboard session.'}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    {ir.status !== 'Confirmed' ? (
                      <button
                        onClick={() => {
                          setConfirmingInterior(ir);
                          setInteriorDate(ir.scheduledDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);
                          setInteriorTime('11:00 AM – 12:30 PM');
                          setInteriorDesigner(ir.assignedDesigner || 'Ar. Sameer Sen (Senior Architect)');
                          setInteriorEstimate(850000);
                        }}
                        className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Interior Consultation Slot with Data</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Consultation Confirmed with {ir.assignedDesigner}</span>
                        </span>
                        <button
                          onClick={() => updateInteriorStatus(ir.id, 'Completed')}
                          className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg"
                        >
                          Mark Session Completed
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Subscriptions Engine */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-8">
            {/* Top Toolbar */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#F28C28]" />
                  <h3 className="font-bold text-slate-900 text-base">Constructease Provider Subscription Engine</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Manage tiered membership plans for artisans, contractors, and material depots. Configurable recurring pricing, lead quotas, and commission rates.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="px-3.5 py-2 text-xs font-semibold text-[#142B4A] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Assign Plan to Provider
                </button>
                <button
                  onClick={() => setShowAddPlanModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Tier</span>
                </button>
              </div>
            </div>

            {/* Subscription Plans Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-xs">
                  Configured Subscription Tiers ({subscriptionPlans.length})
                </h4>
                <span className="text-xs text-slate-500">Live pricing and quotas applied across marketplace</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionPlans.map(plan => (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-xl border p-6 shadow-xs flex flex-col justify-between space-y-4 relative ${
                      plan.isPopular ? 'border-[#F28C28] ring-1 ring-[#F28C28]/20' : 'border-slate-200'
                    }`}
                  >
                    {plan.isPopular && (
                      <span className="absolute -top-3 left-6 text-[10px] font-extrabold uppercase tracking-wider bg-[#F28C28] text-white px-2.5 py-0.5 rounded-full shadow-xs">
                        Most Popular for Contractors
                      </span>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F28C28] uppercase">{plan.targetRole} Tier</span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {plan.badgeLabel}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>

                      <div className="pt-2">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-[#142B4A]">
                            ₹{plan.priceMonthly.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-500">/ month</span>
                        </div>
                        {plan.priceAnnual > 0 && (
                          <p className="text-[11px] text-slate-400">
                            or ₹{plan.priceAnnual.toLocaleString()} billed annually
                          </p>
                        )}
                      </div>

                      {/* Quota & Commission */}
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Monthly Lead Quota:</span>
                          <span className="font-bold text-slate-800">
                            {plan.monthlyLeadsQuota === -1 ? 'Unlimited' : `${plan.monthlyLeadsQuota} Leads/mo`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Platform Commission:</span>
                          <span className="font-bold text-emerald-700">{plan.commissionRate}% per order</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                        {plan.features.map(f => (
                          <div key={f} className="flex items-start gap-2 text-slate-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Admin quick adjustments */}
                    <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">Status: {plan.isActive ? 'Active' : 'Draft'}</span>
                      <button
                        onClick={() => {
                          const newPrice = prompt(`Enter new monthly price for ${plan.name}:`, plan.priceMonthly.toString());
                          if (newPrice !== null) {
                            updateSubscriptionPlan(plan.id, { priceMonthly: parseInt(newPrice) || plan.priceMonthly });
                          }
                        }}
                        className="text-[#142B4A] font-semibold hover:underline cursor-pointer"
                      >
                        Adjust Pricing
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Provider Subscriptions Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Active Provider Subscriptions ({providerSubscriptions.length})</h4>
                  <p className="text-xs text-slate-500">Manage billing status, quota tracking, and validity periods</p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  Total MRR: ₹{mrrFromSubscriptions.toLocaleString()}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Provider / Business</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Subscription Plan</th>
                      <th className="py-3 px-4">Billing Cycle</th>
                      <th className="py-3 px-4">Renewal Date</th>
                      <th className="py-3 px-4">Leads Consumed</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {providerSubscriptions.map(sub => (
                      <tr key={sub.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{sub.providerName}</p>
                          <p className="text-[11px] text-slate-500">{sub.companyName}</p>
                        </td>
                        <td className="py-3 px-4 uppercase text-[11px] font-semibold text-slate-600">
                          {sub.providerType}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#142B4A]">
                          {sub.planName}
                        </td>
                        <td className="py-3 px-4 capitalize text-slate-700">
                          {sub.billingCycle}
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          {sub.expiresAt}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900">{sub.leadsUsedThisMonth}</span>
                          <span className="text-slate-400"> / {sub.monthlyLeadsLimit === -1 ? '∞' : sub.monthlyLeadsLimit}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            sub.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : sub.status === 'Trial'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : 'bg-red-50 text-red-800 border border-red-200'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <select
                              value={sub.status}
                              onChange={e => updateProviderSubscriptionStatus(sub.id, e.target.value as any)}
                              className="px-2 py-1 text-[11px] border border-slate-300 rounded bg-white"
                            >
                              <option value="Active">Active</option>
                              <option value="Trial">Trial</option>
                              <option value="Expired">Expired</option>
                              <option value="Pending Renewal">Pending Renewal</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Provider Verifications */}
        {activeTab === 'verifications' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Provider Credential Verification Queue</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review submitted trade licenses and identity records. Only administrators can issue or revoke the Verified badge.
              </p>
            </div>

            <div className="divide-y divide-slate-200">
              {workers.map(w => (
                <div key={w.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{w.name}</h4>
                      <span className="text-[11px] font-semibold text-[#F28C28]">({w.category})</span>
                      {w.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Pending Audit
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {w.city} (PIN {w.pincode}) · {w.experienceYears} Years Experience · Contact: {w.phone}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Skills: {w.skills.join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleProviderVerification(w.id, 'worker')}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        w.isVerified
                          ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {w.isVerified ? 'Revoke Verified Badge' : 'Approve & Issue Verified Badge'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Dynamic Fee Configuration */}
        {activeTab === 'fees' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-xl space-y-5">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Revenue Model & Platform Fee Engine</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Constructease charges no hidden markups. Set and update transparent marketplace coordination fees in real time.
              </p>
            </div>

            <form onSubmit={handleSaveFees} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Worker Service Booking Fee (%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="15"
                    value={bookingFeeInput}
                    onChange={e => setBookingFeeInput(parseFloat(e.target.value) || 0)}
                    className="w-32 px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-bold"
                  />
                  <span className="text-slate-500">% of labor daily rate (Current: {feeConfig.bookingFeePercent}%)</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Wholesale Material Commission (%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="10"
                    value={materialFeeInput}
                    onChange={e => setMaterialFeeInput(parseFloat(e.target.value) || 0)}
                    className="w-32 px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-bold"
                  />
                  <span className="text-slate-500">% paid by supply depot (Current: {feeConfig.materialCommissionPercent}%)</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Interior Design Consultation Fee (₹)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="100"
                    min="0"
                    value={interiorFeeInput}
                    onChange={e => setInteriorFeeInput(parseInt(e.target.value) || 0)}
                    className="w-32 px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-bold"
                  />
                  <span className="text-slate-500">₹ credited back on milestone signoff</span>
                </div>
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Save & Apply Fee Rules
              </button>
            </form>
          </div>
        )}

        {/* Tab 7: Support & Tickets */}
        {activeTab === 'tickets' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Customer Complaints & Inquiries</h3>
              <span className="text-xs text-slate-500">{supportTickets.length} Active Tickets</span>
            </div>
            <div className="divide-y divide-slate-100 p-4 space-y-3">
              {supportTickets.map(t => (
                <div key={t.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">#{t.id} · {t.category}</span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {t.status}
                    </span>
                  </div>
                  <p className="text-slate-700">{t.message}</p>
                  <p className="text-[11px] text-slate-400">
                    From: {t.name} ({t.email}) · Submitted: {new Date(t.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contractor Booking Confirmation Modal */}
        {confirmingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#F28C28]" />
                  <h3 className="font-bold text-slate-900 text-sm">Confirm Contractor Booking #{confirmingBooking.id}</h3>
                </div>
                <button onClick={() => setConfirmingBooking(null)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleExecuteContractorConfirm} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contractor / Firm</label>
                  <input
                    type="text"
                    disabled
                    value={confirmingBooking.targetName}
                    className="w-full px-3 py-2 border border-slate-200 rounded bg-slate-50 text-slate-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Scheduled Inspection Date</label>
                    <input
                      type="date"
                      required
                      value={confirmDate}
                      onChange={e => setConfirmDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Quoted Project Value (₹)</label>
                    <input
                      type="number"
                      required
                      min={1000}
                      value={confirmAmount}
                      onChange={e => setConfirmAmount(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Execution Agreement & Structural Notes</label>
                  <textarea
                    rows={3}
                    value={confirmNotes}
                    onChange={e => setConfirmNotes(e.target.value)}
                    placeholder="e.g. Foundation excavation approved, site inspection fixed for 10 AM, contractor mobilized."
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                  />
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-800 text-[11px] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Confirming will immediately lock schedule and alert homeowner & contractor.</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setConfirmingBooking(null)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Interior Design Confirmation Modal */}
        {confirmingInterior && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#F28C28]" />
                  <h3 className="font-bold text-slate-900 text-sm">Confirm Interior Design Consultation #{confirmingInterior.id}</h3>
                </div>
                <button onClick={() => setConfirmingInterior(null)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleExecuteInteriorConfirm} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Property & Client</label>
                  <input
                    type="text"
                    disabled
                    value={`${confirmingInterior.propertyType} — ${confirmingInterior.customerName} (${confirmingInterior.customerPhone})`}
                    className="w-full px-3 py-2 border border-slate-200 rounded bg-slate-50 text-slate-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Scheduled Date</label>
                    <input
                      type="date"
                      required
                      value={interiorDate}
                      onChange={e => setInteriorDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Slot Time</label>
                    <input
                      type="text"
                      required
                      value={interiorTime}
                      onChange={e => setInteriorTime(e.target.value)}
                      placeholder="e.g. 11:00 AM – 12:30 PM"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Assigned Architect / Firm</label>
                    <input
                      type="text"
                      required
                      value={interiorDesigner}
                      onChange={e => setInteriorDesigner(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Consultation Format</label>
                    <select
                      value={interiorType}
                      onChange={e => setInteriorType(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A] bg-white font-medium"
                    >
                      <option value="In-Person Site Visit">In-Person Site Visit</option>
                      <option value="Virtual 3D Session">Virtual 3D Session</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimated Project Value (₹)</label>
                  <input
                    type="number"
                    step={10000}
                    value={interiorEstimate}
                    onChange={e => setInteriorEstimate(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setConfirmingInterior(null)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                  >
                    Confirm Consultation Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Subscription Plan Modal */}
        {showAddPlanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#F28C28]" />
                  <h3 className="font-bold text-slate-900 text-sm">Add New Subscription Tier</h3>
                </div>
                <button onClick={() => setShowAddPlanModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleCreatePlan} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Plan Name</label>
                  <input
                    type="text"
                    required
                    value={newPlanName}
                    onChange={e => setNewPlanName(e.target.value)}
                    placeholder="e.g. Master Contractor Diamond"
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Monthly Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newPlanMonthly}
                      onChange={e => setNewPlanMonthly(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Annual Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newPlanAnnual}
                      onChange={e => setNewPlanAnnual(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Monthly Leads Quota</label>
                    <input
                      type="number"
                      value={newPlanQuota}
                      onChange={e => setNewPlanQuota(parseInt(e.target.value) || -1)}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                    <span className="text-[10px] text-slate-400">Set -1 for unlimited</span>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Commission Rate (%)</label>
                    <input
                      type="number"
                      step={0.5}
                      value={newPlanCommission}
                      onChange={e => setNewPlanCommission(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Features (comma separated)</label>
                  <textarea
                    rows={2}
                    value={newPlanFeatures}
                    onChange={e => setNewPlanFeatures(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPlanModal(false)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg shadow-xs"
                  >
                    Publish Plan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Assign Subscription Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#F28C28]" />
                  <h3 className="font-bold text-slate-900 text-sm">Assign Subscription to Provider</h3>
                </div>
                <button onClick={() => setShowAssignModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleAssignSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Select Provider / Business</label>
                  <select
                    value={assignProviderId}
                    onChange={e => setAssignProviderId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                  >
                    <optgroup label="Workers / Craftsmen">
                      {workers.map(w => (
                        <option key={w.id} value={w.id}>{w.name} ({w.category})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Contractors">
                      {contractors.map(c => (
                        <option key={c.id} value={c.id}>{c.companyName} ({c.name})</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Select Subscription Plan</label>
                  <select
                    value={assignPlanId}
                    onChange={e => setAssignPlanId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                  >
                    {subscriptionPlans.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ₹{p.priceMonthly}/mo ({p.monthlyLeadsQuota === -1 ? 'Unlimited' : `${p.monthlyLeadsQuota} leads`})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Billing Cycle</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAssignCycle('monthly')}
                      className={`py-2 text-xs font-semibold rounded border cursor-pointer ${
                        assignCycle === 'monthly' ? 'bg-[#142B4A] text-white border-[#142B4A]' : 'border-slate-300 text-slate-700'
                      }`}
                    >
                      Monthly Cycle
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssignCycle('annual')}
                      className={`py-2 text-xs font-semibold rounded border cursor-pointer ${
                        assignCycle === 'annual' ? 'bg-[#142B4A] text-white border-[#142B4A]' : 'border-slate-300 text-slate-700'
                      }`}
                    >
                      Annual Cycle (10x discount)
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                  >
                    Assign & Activate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
