import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  FileText,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FAQS_DATA } from '../../data/mockData';

export const ContactPage: React.FC = () => {
  const { createSupportTicket, currentUser } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [category, setCategory] = useState<any>('General Inquiry');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSupportTicket({
      name,
      email,
      category,
      message
    });
    setSubmitted(true);
    setMessage('');
  };

  return (
    <div className="py-10 bg-[#F4F6F8] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
            Help Desk & Operations
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight">
            Contact Constructease Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Have a question regarding worker scheduling, material freight, or contractor quotation audits? We respond within 4 business hours.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#F28C28] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Customer Helpline</h3>
              <p className="text-xs text-slate-500 mt-1">Direct assistance for active job sites:</p>
              <p className="text-sm font-bold text-[#142B4A] mt-2">+91 80 4920 1800</p>
              <span className="text-[11px] text-slate-400">Mon–Sat, 7:00 AM – 8:00 PM</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#F28C28] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Email Desk</h3>
              <p className="text-xs text-slate-500 mt-1">Quotations, billing & vendor support:</p>
              <p className="text-sm font-bold text-[#142B4A] mt-2">support@constructease.com</p>
              <span className="text-[11px] text-slate-400">Average response: 2 hours</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#F28C28] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Regional Operations Hub</h3>
              <p className="text-xs text-slate-500 mt-1">Constructease Technologies Pvt Ltd:</p>
              <p className="text-xs font-semibold text-slate-800 mt-2">
                Plot 48, Sector 3, HSR Layout, Bengaluru, KA 560102
              </p>
            </div>
          </div>
        </div>

        {/* Ticket Submission Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Submit a Support Request or Complaint</h2>
              <p className="text-xs text-slate-500 mt-1">
                Every ticket is logged in our central operations queue and tracked to resolution.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">Ticket Logged Successfully</h4>
                <p className="text-xs text-slate-600">
                  Thank you! An operations executive has been assigned. You can check the status of this ticket in the Admin console or via email updates.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-[#142B4A] font-semibold underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Balaji Gunja"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Inquiry Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A] bg-white font-medium text-slate-800"
                  >
                    <option value="General Inquiry">General Marketplace Inquiry</option>
                    <option value="Booking Help">Booking Status & Rescheduling Help</option>
                    <option value="Material Quality / Delivery">Material Quality, Specifications & Freight</option>
                    <option value="Billing & Fees">Platform Fees & Billing Transparency</option>
                    <option value="Complaint">Provider Service Complaint</option>
                    <option value="Provider Registration">Service Provider Onboarding & Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Describe Your Requirement or Issue</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Please include booking reference # if applicable..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 font-bold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Transmit Support Ticket
                </button>
              </form>
            )}
          </div>

          {/* Cancellation & Refund Policy Notice */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <FileText className="w-4 h-4 text-[#F28C28]" />
                <span>Cancellation and Refund Policy</span>
              </div>
              <p className="leading-relaxed">
                At Constructease, we believe in fair, transparent terms for both homeowners and service providers:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                <li>
                  <strong>Worker Bookings:</strong> You can cancel any booked worker without fee at any time before 6:00 PM on the day preceding scheduled dispatch.
                </li>
                <li>
                  <strong>Material Requisitions:</strong> Inquiries and quotation requests carry zero financial obligation. Confirmed orders can be revised before the wholesale depot initiates truck loading.
                </li>
                <li>
                  <strong>Interior Consultations:</strong> If you reschedule before the on-site visit, 100% of the consultation fee is retained as credit for your revised date.
                </li>
              </ul>
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <HelpCircle className="w-4 h-4 text-[#F28C28]" />
                <span>Frequently Asked Questions</span>
              </div>

              <div className="divide-y divide-slate-100">
                {FAQS_DATA.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={faq.q} className="py-3">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left font-semibold text-slate-800 text-xs flex items-center justify-between gap-2 cursor-pointer hover:text-[#142B4A]"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <p className="text-xs text-slate-600 leading-relaxed mt-2 pt-1 border-t border-slate-50">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
