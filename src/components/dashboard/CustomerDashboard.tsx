import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  User,
  Calendar,
  MapPin,
  Receipt,
  ArrowRight,
  Shield,
  Palette,
  Check,
  Building2,
  Phone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BookingStatus, BookingRequest, InteriorConsultationRequest } from '../../types';

export const CustomerDashboard: React.FC = () => {
  const {
    currentUser,
    bookings,
    interiorRequests,
    updateBookingStatus,
    confirmBookingWithData,
    confirmInteriorRequest,
    setAuthModalOpen,
    setActivePage
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'interiors'>('bookings');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Contractor / Worker confirmation modal state
  const [confirmingBooking, setConfirmingBooking] = useState<BookingRequest | null>(null);
  const [scheduledDateInput, setScheduledDateInput] = useState('');
  const [accessNotesInput, setAccessNotesInput] = useState('');

  // Interior confirmation modal state
  const [confirmingInterior, setConfirmingInterior] = useState<InteriorConsultationRequest | null>(null);
  const [interiorSlotDate, setInteriorSlotDate] = useState('');
  const [interiorSlotTime, setInteriorSlotTime] = useState('11:00 AM – 12:30 PM');
  const [interiorConsultType, setInteriorConsultType] = useState<'In-Person Site Visit' | 'Virtual 3D Session'>('In-Person Site Visit');

  if (!currentUser) {
    return (
      <div className="py-20 text-center bg-[#F4F6F8] min-h-[calc(100vh-140px)] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs max-w-md w-full space-y-4">
          <User className="w-12 h-12 text-[#142B4A] mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Sign in to View Dashboard</h2>
          <p className="text-xs text-slate-500">
            Access your bookings, track worker dispatches, and review incoming supplier quotations.
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="w-full py-2.5 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
          >
            Sign In with Demo or Email
          </button>
        </div>
      </div>
    );
  }

  // Filter bookings for current user
  const userBookings = bookings.filter(b => b.customerEmail === currentUser.email || b.customerId === currentUser.id);
  const userInteriors = interiorRequests.filter(r => r.customerEmail === currentUser.email || r.customerId === currentUser.id);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Requested':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <Clock className="w-3 h-3" />
            Requested
          </span>
        );
      case 'Awaiting Provider Response':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
            <Clock className="w-3 h-3" />
            Awaiting Provider
          </span>
        );
      case 'Quotation Received':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
            <FileText className="w-3 h-3" />
            Quotation Received
          </span>
        );
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Confirmed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
    }
  };

  const handleCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cancellingId) {
      updateBookingStatus(cancellingId, 'Cancelled', cancelReason || 'Customer requested schedule cancellation.');
      setCancellingId(null);
      setCancelReason('');
    }
  };

  const handleExecuteBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmingBooking) return;
    confirmBookingWithData(confirmingBooking.id, {
      scheduledDate: scheduledDateInput || confirmingBooking.scheduledDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      notes: accessNotesInput ? `Confirmed by client: ${accessNotesInput}` : undefined
    });
    setConfirmingBooking(null);
  };

  const handleExecuteInteriorConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmingInterior) return;
    confirmInteriorRequest(confirmingInterior.id, {
      scheduledDate: interiorSlotDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      slotTime: interiorSlotTime,
      assignedDesigner: confirmingInterior.assignedDesigner || 'Ar. Sameer Sen (Lead Architect)',
      consultationType: interiorConsultType,
      quotedProjectAmount: 850000
    });
    setConfirmingInterior(null);
  };

  return (
    <div className="py-10 bg-[#F4F6F8] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#142B4A] text-[#F28C28] flex items-center justify-center font-bold text-lg">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded capitalize">
                  {currentUser.role} Account
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentUser.email} · {currentUser.phone || '+91 98450 77123'} · {currentUser.city || 'Bengaluru'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('contractors')}
              className="px-4 py-2 text-xs font-semibold text-[#142B4A] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              + Hire Contractor
            </button>
            <button
              onClick={() => setActivePage('interiors')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
            >
              + Interior Design
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold pb-1">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'bookings'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Service Bookings & Contractor Projects ({userBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('interiors')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'interiors'
                ? 'border-[#F28C28] text-[#142B4A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Interior Design Consultations ({userInteriors.length})
          </button>
        </div>

        {/* Bookings View */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {userBookings.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
                <Receipt className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No Service Bookings Yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  When you request a mason, electrician, building materials, or site contractor, your requests and live status will appear here.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setActivePage('contractors')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#142B4A] rounded-lg cursor-pointer"
                  >
                    Explore Contractors
                  </button>
                </div>
              </div>
            ) : (
              userBookings.map(b => (
                <div
                  key={b.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-900 text-xs">
                        #{b.id}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-semibold text-slate-700">
                        {b.serviceType}: {b.targetName}
                      </span>
                      <span className="text-[11px] text-[#F28C28] font-medium">({b.targetCategory})</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusBadge(b.status)}
                      <span className="text-[11px] text-slate-400">
                        Requested: {new Date(b.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block mb-0.5">Location & PIN</span>
                      <p className="font-medium text-slate-800 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{b.location} (PIN {b.pincode})</span>
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-0.5">Scheduled Date</span>
                      <p className="font-medium text-slate-800 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{b.scheduledDate || 'Date to be confirmed'}</span>
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-0.5">Estimated Charges</span>
                      <p className="font-bold text-slate-900 text-sm">
                        ₹{b.totalEstimatedAmount.toLocaleString()}{' '}
                        <span className="text-[11px] font-normal text-slate-500">
                          (Platform fee: ₹{b.platformFee})
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 border border-slate-100">
                    <strong className="text-slate-800">Requirements / Notes: </strong>
                    {b.notes}
                  </div>

                  {b.cancellationReason && (
                    <div className="bg-red-50 text-red-700 text-xs p-2.5 rounded border border-red-200">
                      <strong>Cancellation Note:</strong> {b.cancellationReason}
                    </div>
                  )}

                  {/* Actions & Confirm Booking Button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      {b.status !== 'Confirmed' && b.status !== 'Completed' && b.status !== 'Cancelled' && (
                        <button
                          onClick={() => {
                            setConfirmingBooking(b);
                            setScheduledDateInput(b.scheduledDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
                            setAccessNotesInput('');
                          }}
                          className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Confirm {b.serviceType === 'Contractor' ? 'Contractor Booking' : 'Service Schedule'}</span>
                        </button>
                      )}

                      {b.status === 'Confirmed' && (
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Booking is Confirmed & Scheduled for {b.scheduledDate}</span>
                        </span>
                      )}
                    </div>

                    {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                      <button
                        onClick={() => setCancellingId(b.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer underline decoration-dotted"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Interior Inquiries View */}
        {activeTab === 'interiors' && (
          <div className="space-y-4">
            {userInteriors.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
                <Palette className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No Interior Inquiries</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Submit an interior design inquiry with your property dimensions to receive 2D moodboards and 3D visual concepts.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActivePage('interiors')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#142B4A] rounded-lg cursor-pointer"
                  >
                    Explore Interior Design
                  </button>
                </div>
              </div>
            ) : (
              userInteriors.map(req => (
                <div
                  key={req.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">#{req.id}</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-bold text-slate-800">{req.propertyType} Interior Concept</span>
                      <span className="text-[11px] text-[#F28C28]">({req.preferredStyle} Style)</span>
                    </div>
                    {getStatusBadge(req.status)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-slate-600">
                    <div>
                      <span className="text-slate-400 block">Rooms:</span>
                      <span className="font-medium text-slate-900">{req.rooms.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Approx Budget:</span>
                      <span className="font-medium text-slate-900">{req.approxBudget}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Consultation Slot:</span>
                      <span className="font-bold text-slate-900">
                        {req.scheduledDate ? `${req.scheduledDate} at ${req.slotTime || '11:00 AM'}` : 'Date Pending'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Consultation Fee:</span>
                      <span className="font-bold text-[#142B4A]">₹{req.consultationFee} (Adjustable on contract)</span>
                    </div>
                  </div>

                  {req.assignedDesigner && (
                    <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded text-emerald-800">
                      <strong>Assigned Lead Designer:</strong> {req.assignedDesigner} · Format: {req.consultationType || 'In-Person Site Visit'}
                    </div>
                  )}

                  {req.additionalNotes && (
                    <p className="bg-slate-50 p-2.5 rounded border border-slate-100 text-slate-700">
                      <strong>Requirements & Notes:</strong> {req.additionalNotes}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400">
                      Location: {req.location}
                    </span>

                    {req.status !== 'Confirmed' ? (
                      <button
                        onClick={() => {
                          setConfirmingInterior(req);
                          setInteriorSlotDate(req.scheduledDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
                          setInteriorSlotTime(req.slotTime || '11:00 AM – 12:30 PM');
                          setInteriorConsultType(req.consultationType || 'In-Person Site Visit');
                        }}
                        className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirm Consultation Date & Slot</span>
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Consultation Confirmed with Designer</span>
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Customer Confirm Booking Modal */}
        {confirmingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Confirm {confirmingBooking.serviceType === 'Contractor' ? 'Contractor Project' : 'Service Booking'} #{confirmingBooking.id}
                  </h3>
                </div>
                <button onClick={() => setConfirmingBooking(null)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleExecuteBookingConfirm} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Provider / Contractor</label>
                  <p className="font-bold text-slate-900 bg-slate-50 p-2 rounded border border-slate-200">
                    {confirmingBooking.targetName} ({confirmingBooking.targetCategory})
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Execution / Inspection Date</label>
                  <input
                    type="date"
                    required
                    value={scheduledDateInput}
                    onChange={e => setScheduledDateInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Site Access Instructions / Notes</label>
                  <textarea
                    rows={2}
                    value={accessNotesInput}
                    onChange={e => setAccessNotesInput(e.target.value)}
                    placeholder="e.g. Security gate access code, keys with supervisor on site..."
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                  />
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Estimated Total:</span>
                    <span>₹{confirmingBooking.totalEstimatedAmount.toLocaleString()}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Includes disclosed platform coordination fee (₹{confirmingBooking.platformFee}).
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setConfirmingBooking(null)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                  >
                    Lock & Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Customer Confirm Interior Consultation Modal */}
        {confirmingInterior && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#F28C28]" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Confirm Consultation Slot #{confirmingInterior.id}
                  </h3>
                </div>
                <button onClick={() => setConfirmingInterior(null)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleExecuteInteriorConfirm} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Property</label>
                  <p className="font-bold text-slate-900 bg-slate-50 p-2 rounded border border-slate-200">
                    {confirmingInterior.propertyType} ({confirmingInterior.preferredStyle} Style)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Appointment Date</label>
                    <input
                      type="date"
                      required
                      value={interiorSlotDate}
                      onChange={e => setInteriorSlotDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Slot Time</label>
                    <select
                      value={interiorSlotTime}
                      onChange={e => setInteriorSlotTime(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#142B4A] bg-white font-medium"
                    >
                      <option value="10:00 AM – 11:30 AM">10:00 AM – 11:30 AM</option>
                      <option value="11:30 AM – 01:00 PM">11:30 AM – 01:00 PM</option>
                      <option value="02:30 PM – 04:00 PM">02:30 PM – 04:00 PM</option>
                      <option value="04:30 PM – 06:00 PM">04:30 PM – 06:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Consultation Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setInteriorConsultType('In-Person Site Visit')}
                      className={`py-2 text-xs font-semibold rounded border cursor-pointer ${
                        interiorConsultType === 'In-Person Site Visit'
                          ? 'bg-[#142B4A] text-white border-[#142B4A]'
                          : 'border-slate-300 text-slate-700'
                      }`}
                    >
                      In-Person Site Visit
                    </button>
                    <button
                      type="button"
                      onClick={() => setInteriorConsultType('Virtual 3D Session')}
                      className={`py-2 text-xs font-semibold rounded border cursor-pointer ${
                        interiorConsultType === 'Virtual 3D Session'
                          ? 'bg-[#142B4A] text-white border-[#142B4A]'
                          : 'border-slate-300 text-slate-700'
                      }`}
                    >
                      Virtual 3D Studio
                    </button>
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                  Consultation fee of ₹{confirmingInterior.consultationFee} is credited back into your final project milestone when work begins.
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setConfirmingInterior(null)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                  >
                    Confirm Consultation Slot
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cancellation Modal */}
        {cancellingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Cancel Booking #{cancellingId}</h3>
              <p className="text-xs text-slate-500">
                In accordance with our transparent cancellation policy, cancellations prior to provider on-site dispatch are free of penalty.
              </p>
              <form onSubmit={handleCancelSubmit} className="space-y-3">
                <textarea
                  required
                  rows={3}
                  value={cancelReason}
                  onChange={e => setCancelReason(e.target.value)}
                  placeholder="Reason for cancellation (e.g., date changed, project postponed)..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setCancellingId(null)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Keep Booking
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    Confirm Cancellation
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
