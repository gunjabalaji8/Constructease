import React, { useState } from 'react';
import { X, Calendar, MapPin, AlertCircle, CheckCircle2, Shield, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Worker, Contractor } from '../../types';

export const BookingModal: React.FC = () => {
  const {
    activeBookingModal,
    closeBookingModal,
    createBooking,
    currentUser,
    selectedCity,
    pincode,
    feeConfig,
    setAuthModalOpen,
    setActivePage
  } = useApp();

  const { isOpen, target, serviceType } = activeBookingModal;

  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [daysCount, setDaysCount] = useState(1);
  const [address, setAddress] = useState(`Sector 2, HSR Layout, ${selectedCity}`);
  const [targetPin, setTargetPin] = useState(pincode);
  const [notes, setNotes] = useState('');
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  if (!isOpen || !target) return null;

  const isWorker = serviceType === 'Worker';
  const worker = isWorker ? (target as Worker) : null;
  const contractor = !isWorker ? (target as Contractor) : null;

  // Transparent Fee Calculations
  const baseRate = isWorker ? (worker?.dailyRate || 900) * daysCount : 0;
  // Calculate platform fee based on admin configured fee percentage (e.g. 4%)
  const platformFee = isWorker
    ? Math.round(baseRate * (feeConfig.bookingFeePercent / 100))
    : 500; // Nominal site inspection and coordination charge for contractor visit
  const totalAmount = baseRate + platformFee;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    const bookingId = createBooking({
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone || '+91 98000 00000',
      serviceType: serviceType || 'Worker',
      targetId: target.id,
      targetName: isWorker ? worker!.name : contractor!.companyName,
      targetCategory: isWorker ? worker!.category : contractor!.specialization[0],
      location: address,
      pincode: targetPin,
      dateRequested: new Date().toISOString().split('T')[0],
      scheduledDate: date,
      notes: notes || (isWorker ? `Standard on-site work for ${daysCount} day(s).` : 'Site inspection and preliminary quotation.'),
      quotedAmount: isWorker ? baseRate : undefined,
      platformFee,
      totalEstimatedAmount: totalAmount
    });

    setSubmittedBookingId(bookingId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#142B4A] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-bold text-sm tracking-tight">
              {submittedBookingId
                ? 'Booking Request Submitted'
                : isWorker
                ? `Book Service: ${worker?.name}`
                : `Schedule Site Inspection: ${contractor?.companyName}`}
            </h3>
            <p className="text-[11px] text-slate-300">
              {isWorker ? `${worker?.category} · ₹${worker?.dailyRate}/day` : 'Turnkey Contractor Services'}
            </p>
          </div>
          <button
            onClick={() => {
              setSubmittedBookingId(null);
              closeBookingModal();
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedBookingId ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Request Confirmed #{submittedBookingId}</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Your request has been routed directly to{' '}
                <strong className="text-slate-900">{isWorker ? worker?.name : contractor?.companyName}</strong>.
                You can track updates and quotation responses inside your customer dashboard.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-medium text-slate-900">{isWorker ? worker?.category : 'Contractor Inspection'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Date:</span>
                <span className="font-medium text-slate-900">{date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Disclosed Platform Fee:</span>
                <span className="font-medium text-slate-900">₹{platformFee}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-semibold">
                <span className="text-slate-900">Estimated Total:</span>
                <span className="text-[#142B4A]">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3 justify-center">
              <button
                onClick={() => {
                  setSubmittedBookingId(null);
                  closeBookingModal();
                  setActivePage('customer-dashboard');
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
              >
                Go to My Dashboard
              </button>
              <button
                onClick={() => {
                  setSubmittedBookingId(null);
                  closeBookingModal();
                }}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-6 space-y-4 overflow-y-auto">
            {/* Provider Summary Strip */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{isWorker ? worker?.name : contractor?.companyName}</p>
                <p className="text-[11px] text-slate-500">
                  {target.city} · {target.experienceYears} Years Experience ·{' '}
                  {target.isVerified ? (
                    <span className="text-emerald-700 font-medium">Verified Credentials</span>
                  ) : (
                    <span className="text-slate-500">Registered Provider</span>
                  )}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#142B4A]">
                  {isWorker ? `₹${worker?.dailyRate}/day` : contractor?.estimatedBudgetRange}
                </span>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                  />
                </div>
              </div>

              {isWorker && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={daysCount}
                    onChange={e => setDaysCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Site Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Plot/Flat, Street, Locality"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                PIN Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={targetPin}
                onChange={e => setTargetPin(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Work Scope & Specific Requirements
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Need external wall plastering repair, approximately 200 sq.ft, material already on-site."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
              />
            </div>

            {/* Transparent Cost Breakdown */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-[#142B4A] font-semibold">
                <Info className="w-4 h-4 text-[#F28C28]" />
                <span>Upfront Pricing Disclosure</span>
              </div>

              {isWorker ? (
                <>
                  <div className="flex justify-between text-slate-600">
                    <span>Base Labor Rate ({daysCount} day(s) × ₹{worker?.dailyRate}):</span>
                    <span>₹{baseRate.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Constructease Platform Fee ({feeConfig.bookingFeePercent}%):</span>
                    <span>₹{platformFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-amber-200/60 pt-1.5 flex justify-between font-bold text-slate-900 text-sm">
                    <span>Estimated Total:</span>
                    <span className="text-[#142B4A]">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-slate-600">
                    <span>Contractor Project Scope:</span>
                    <span>Direct Quotation Based</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Site Inspection & Coordination Fee:</span>
                    <span>₹{platformFee}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">
                    *The nominal coordination fee covers licensed engineer dispatch and is credited back into your project upon milestone agreement.
                  </p>
                </>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Confirm and Send Booking Request
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero-risk booking · Free cancellation before provider dispatch</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
