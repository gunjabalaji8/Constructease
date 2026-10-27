import React, { useState } from 'react';
import {
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  DollarSign,
  Package,
  MapPin,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Crown,
  Check,
  Building2,
  Palette
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BookingStatus, BookingRequest } from '../../types';

export const ProviderDashboard: React.FC = () => {
  const {
    currentUser,
    bookings,
    updateBookingStatus,
    confirmBookingWithData,
    interiorRequests,
    confirmInteriorRequest,
    materials,
    addNewMaterial,
    selectedCity,
    feeConfig,
    switchRoleDemo,
    subscriptionPlans,
    providerSubscriptions,
    assignProviderSubscription
  } = useApp();

  const [activeTab, setActiveTab] = useState<'requests' | 'interior-leads' | 'subscription' | 'listings' | 'earnings'>('requests');
  
  // Confirmation state for provider quoting & confirming
  const [confirmingBooking, setConfirmingBooking] = useState<BookingRequest | null>(null);
  const [providerQuoteAmount, setProviderQuoteAmount] = useState<number>(0);
  const [providerScheduleDate, setProviderScheduleDate] = useState<string>('');
  const [providerNotes, setProviderNotes] = useState<string>('');

  // New Material Product form state
  const [newMatName, setNewMatName] = useState('');
  const [newMatBrand, setNewMatBrand] = useState('');
  const [newMatCategory, setNewMatCategory] = useState<any>('Cement');
  const [newMatSpec, setNewMatSpec] = useState('');
  const [newMatUnit, setNewMatUnit] = useState('Bag (50 kg)');
  const [newMatPrice, setNewMatPrice] = useState<number>(400);
  const [newMatStock, setNewMatStock] = useState<number>(500);
  const [newMatDeliveryFee, setNewMatDeliveryFee] = useState<number>(400);

  // If viewing as non-provider, show prompt with quick switch to demo provider
  if (!currentUser || currentUser.role !== 'provider') {
    return (
      <div className="py-20 text-center bg-[#F4F6F8] min-h-[calc(100vh-140px)] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs max-w-md w-full space-y-4">
          <Briefcase className="w-12 h-12 text-[#F28C28] mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Provider Control Room</h2>
          <p className="text-xs text-slate-500">
            You are currently viewing as {currentUser ? currentUser.role : 'Guest'}. Switch to the demo Provider account to inspect worker dispatch, quotation responses, and inventory listings.
          </p>
          <button
            onClick={() => switchRoleDemo('provider')}
            className="w-full py-2.5 text-xs font-semibold text-white bg-[#F28C28] hover:bg-[#D9771B] rounded-lg transition-colors cursor-pointer"
          >
            Switch to Demo Provider (Rameshwar Kumar - Mason)
          </button>
        </div>
      </div>
    );
  }

  // Active provider subscription record
  const currentSub = providerSubscriptions.find(s => s.providerId === currentUser.id) || providerSubscriptions[0];

  // Incoming bookings (for workers or contractors or materials)
  const incomingBookings = bookings;

  const handleExecuteProviderConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmingBooking) return;
    confirmBookingWithData(confirmingBooking.id, {
      scheduledDate: providerScheduleDate || confirmingBooking.scheduledDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      quotedAmount: providerQuoteAmount > 0 ? providerQuoteAmount : confirmingBooking.quotedAmount,
      notes: providerNotes ? `Provider Quotation & Schedule: ${providerNotes}` : 'Provider confirmed terms and mobilized team.'
    });
    setConfirmingBooking(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addNewMaterial({
      name: newMatName,
      brand: newMatBrand,
      category: newMatCategory,
      gradeOrSpec: newMatSpec || 'Standard High Quality',
      unit: newMatUnit,
      pricePerUnit: newMatPrice,
      supplierName: currentUser.companyName || currentUser.name,
      supplierLocation: `${selectedCity} Depot`,
      availableStock: newMatStock,
      minOrderQuantity: 10,
      deliveryAvailable: true,
      deliveryFee: newMatDeliveryFee,
      estimatedDeliveryDays: 1,
      qualityHighlight: 'Verified factory grade direct from local wholesale supplier.'
    });

    setNewMatName('');
    setNewMatBrand('');
    setNewMatSpec('');
  };

  return (
    <div className="py-10 bg-[#F4F6F8] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Provider Profile Strip */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#142B4A] text-[#F28C28] flex items-center justify-center font-bold text-lg">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
                {currentUser.isVerified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Provider
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Registered (Verification Audit in Progress)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentUser.companyName || 'Independent Craftsman'} · {currentUser.city || selectedCity} · {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Current Membership</span>
              <div className="flex items-center gap-1 text-slate-900 font-bold">
                <Crown className="w-3.5 h-3.5 text-[#F28C28]" />
                <span>{currentSub?.planName || 'Starter Artisan'}</span>
              </div>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Leads Quota</span>
              <span className="font-bold text-slate-800">
                {currentSub?.leadsUsedThisMonth || 0} / {currentSub?.monthlyLeadsLimit === -1 ? '∞' : (currentSub?.monthlyLeadsLimit || 5)} Used
              </span>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <button
                onClick={() => setActiveTab('subscription')}
                className="text-[11px] font-bold text-[#F28C28] hover:underline cursor-pointer"
              >
                Upgrade Plan →
              </button>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold pb-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'requests'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Client Bookings & Quotation Requests ({incomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('interior-leads')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'interior-leads'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Interior Consultation Leads ({interiorRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'subscription'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My Membership Subscription
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'listings'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Manage Catalog & Services
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'earnings'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Commission & Payout Policy
          </button>
        </div>

        {/* Requests Management Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {incomingBookings.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
                No active inquiries currently assigned.
              </div>
            ) : (
              incomingBookings.map(b => (
                <div
                  key={b.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-xs">#{b.id}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-bold text-slate-800">
                        Client: {b.customerName}
                      </span>
                      <span className="text-xs text-slate-500">({b.customerPhone})</span>
                      <span className="text-[11px] text-[#F28C28] font-semibold">[{b.serviceType}]</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                        b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        Status: {b.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block mb-0.5">Project / Site Location:</span>
                      <p className="font-medium text-slate-800">{b.location} (PIN {b.pincode})</p>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Scheduled Work Date:</span>
                      <p className="font-medium text-slate-800">{b.scheduledDate || 'Flexible / To be confirmed'}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Target Service:</span>
                      <p className="font-bold text-[#142B4A]">{b.targetName} ({b.targetCategory})</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-700">
                    <strong>Work Scope & Client Notes:</strong> {b.notes}
                  </div>

                  {/* Status Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Estimated Project Total:</span>
                      <span className="font-bold text-[#142B4A] text-sm">
                        ₹{b.totalEstimatedAmount.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        (Net to you: ₹{(b.totalEstimatedAmount - b.platformFee).toLocaleString()})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {b.status !== 'Confirmed' && b.status !== 'Completed' && b.status !== 'Cancelled' && (
                        <button
                          onClick={() => {
                            setConfirmingBooking(b);
                            setProviderQuoteAmount(b.quotedAmount || (b.serviceType === 'Contractor' ? 1200000 : 3300));
                            setProviderScheduleDate(b.scheduledDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
                            setProviderNotes(`Confirmed by ${currentUser.name}. Site crew ready for mobilization.`);
                          }}
                          className="px-3.5 py-1.5 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Provide Quote & Confirm Booking</span>
                        </button>
                      )}

                      {b.status === 'Confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'In Progress')}
                          className="px-3 py-1.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                        >
                          Mark On-Site / In Progress
                        </button>
                      )}

                      {b.status === 'In Progress' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'Completed')}
                          className="px-3 py-1.5 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                        >
                          Mark Job Completed
                        </button>
                      )}

                      {b.status === 'Completed' && (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Job Finished & Billed</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Interior Leads Tab */}
        {activeTab === 'interior-leads' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Interior Design Client Consultation Requests</h3>
              <span className="text-xs text-slate-500">{interiorRequests.length} Leads</span>
            </div>

            {interiorRequests.map(ir => (
              <div key={ir.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">#{ir.id}</span>
                    <span className="font-bold text-slate-900">{ir.propertyType} ({ir.preferredStyle} Style)</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    ir.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {ir.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 block">Client:</span>
                    <p className="font-semibold text-slate-900">{ir.customerName} ({ir.customerPhone})</p>
                    <p className="text-slate-500">{ir.location}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Rooms:</span>
                    <p className="font-medium text-slate-800">{ir.rooms.join(', ')}</p>
                    <p className="text-slate-500">Budget: {ir.approxBudget}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Schedule:</span>
                    <p className="font-bold text-slate-900">{ir.scheduledDate ? `${ir.scheduledDate} (${ir.slotTime})` : 'Pending Slot'}</p>
                    <p className="text-emerald-700 font-semibold">Designer: {ir.assignedDesigner || 'Not Assigned'}</p>
                  </div>
                </div>

                {ir.status !== 'Confirmed' && (
                  <div className="pt-2 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => {
                        confirmInteriorRequest(ir.id, {
                          scheduledDate: ir.scheduledDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
                          slotTime: '11:00 AM – 12:30 PM',
                          assignedDesigner: currentUser.name,
                          consultationType: 'In-Person Site Visit',
                          quotedProjectAmount: 850000
                        });
                      }}
                      className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                    >
                      Accept & Confirm Consultation Slot
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Subscription Tab for Provider */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#F28C28] uppercase">Current Active Membership</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {currentSub?.planName || 'Starter Artisan'} Tier
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Billing Cycle: <strong className="capitalize text-slate-800">{currentSub?.billingCycle || 'monthly'}</strong> · Valid until <strong className="text-slate-800">{currentSub?.expiresAt || '2026-11-30'}</strong>
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-xs space-y-1">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Monthly Leads Limit:</span>
                  <span className="font-bold text-slate-900">
                    {currentSub?.monthlyLeadsLimit === -1 ? 'Unlimited' : `${currentSub?.monthlyLeadsLimit} leads`}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Leads Used This Month:</span>
                  <span className="font-bold text-emerald-700">{currentSub?.leadsUsedThisMonth || 0} leads</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-4">Available Membership Upgrade Plans</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionPlans.map(plan => {
                  const isCurrent = currentSub?.planId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      className={`bg-white rounded-xl border p-6 shadow-xs flex flex-col justify-between space-y-4 ${
                        isCurrent ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#F28C28] uppercase">{plan.targetRole}</span>
                          {isCurrent && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Current Plan
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>

                        <div>
                          <span className="text-2xl font-black text-[#142B4A]">₹{plan.priceMonthly.toLocaleString()}</span>
                          <span className="text-xs text-slate-500"> / month</span>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                          {plan.features.map(f => (
                            <div key={f} className="flex items-start gap-2 text-slate-700">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => assignProviderSubscription(currentUser.id, plan.id, 'monthly')}
                        disabled={isCurrent}
                        className={`w-full py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-[#142B4A] hover:bg-[#0D1E35] text-white'
                        }`}
                      >
                        {isCurrent ? 'Active Subscription' : 'Upgrade to this Plan'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Listings Management */}
        {activeTab === 'listings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#F28C28]" />
                <h3 className="font-bold text-sm text-slate-900">Add Wholesale Product Listing</h3>
              </div>
              <p className="text-xs text-slate-500">
                Are you an authorized depot or manufacturer? Add materials to the live Constructease catalog.
              </p>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={newMatName}
                    onChange={e => setNewMatName(e.target.value)}
                    placeholder="e.g. Dalmia DSP Cement (50kg)"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={newMatBrand}
                    onChange={e => setNewMatBrand(e.target.value)}
                    placeholder="e.g. Dalmia"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newMatCategory}
                    onChange={e => setNewMatCategory(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                  >
                    <option value="Cement">Cement</option>
                    <option value="Steel & Rebar">Steel & Rebar</option>
                    <option value="Bricks & Blocks">Bricks & Blocks</option>
                    <option value="Tiles">Tiles</option>
                    <option value="Paints">Paints</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade or Spec</label>
                  <input
                    type="text"
                    value={newMatSpec}
                    onChange={e => setNewMatSpec(e.target.value)}
                    placeholder="e.g. IS 269 Compliant PPC"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Price / Unit (₹)</label>
                    <input
                      type="number"
                      required
                      value={newMatPrice}
                      onChange={e => setNewMatPrice(parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Stock (Units)</label>
                    <input
                      type="number"
                      required
                      value={newMatStock}
                      onChange={e => setNewMatStock(parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg cursor-pointer"
                >
                  Publish Material Listing
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">Current Materials Catalog in {selectedCity}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {materials.slice(0, 4).map(m => (
                  <div key={m.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2 text-xs">
                    <span className="text-[10px] font-bold text-[#F28C28] uppercase">{m.brand}</span>
                    <h4 className="font-bold text-slate-900">{m.name}</h4>
                    <p className="text-slate-500">{m.gradeOrSpec}</p>
                    <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-[#142B4A]">
                      <span>₹{m.pricePerUnit.toLocaleString()} / {m.unit}</span>
                      <span className="text-slate-500 font-normal">{m.availableStock} in stock</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Earnings Policy */}
        {activeTab === 'earnings' && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs max-w-2xl space-y-4 text-xs text-slate-700 leading-relaxed">
            <h3 className="text-base font-bold text-[#142B4A]">Transparent Platform Fee Structure</h3>
            <p>
              Constructease charges a clear, predetermined platform coordination fee on confirmed transactions:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Skilled Worker Bookings:</strong> {feeConfig.bookingFeePercent}% platform coordination fee, disclosed directly on the customer invoice. No deductions are made from your negotiated daily labor rate.
              </li>
              <li>
                <strong>Material Depot Orders:</strong> {feeConfig.materialCommissionPercent}% wholesale transaction fee. Suppliers receive direct digital settlement or wire transfer within 48 hours of confirmed delivery receipt.
              </li>
              <li>
                <strong>Contractor Site Inspections:</strong> Flat fee credited back to the customer upon milestone signoff.
              </li>
            </ul>
          </div>
        )}

        {/* Provider Quoting & Confirmation Modal */}
        {confirmingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Finalize Quotation & Confirm Booking #{confirmingBooking.id}
                  </h3>
                </div>
                <button onClick={() => setConfirmingBooking(null)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleExecuteProviderConfirm} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer & Location</label>
                  <p className="font-bold text-slate-900 bg-slate-50 p-2 rounded border border-slate-200">
                    {confirmingBooking.customerName} ({confirmingBooking.customerPhone}) — {confirmingBooking.location}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Scheduled Date</label>
                    <input
                      type="date"
                      required
                      value={providerScheduleDate}
                      onChange={e => setProviderScheduleDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Quoted Amount (₹)</label>
                    <input
                      type="number"
                      required
                      min={500}
                      value={providerQuoteAmount}
                      onChange={e => setProviderQuoteAmount(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contractor Execution Notes & Scope</label>
                  <textarea
                    rows={3}
                    value={providerNotes}
                    onChange={e => setProviderNotes(e.target.value)}
                    placeholder="e.g. Mobilizing team of 4 masons on site, tools supplied by contractor."
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                  />
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
                    Confirm & Lock Project
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
