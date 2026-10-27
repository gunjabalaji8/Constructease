import React from 'react';
import { X, CheckCircle, ShieldCheck, FileCheck, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContractorCompareModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { comparedContractors, toggleContractorComparison, clearContractorComparison, openBookingModal } = useApp();

  if (!isOpen || comparedContractors.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#142B4A] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#F28C28]" />
            <div>
              <h3 className="font-bold text-sm tracking-tight">Contractor Comparison</h3>
              <p className="text-[11px] text-slate-300">Comparing credentials, experience & specialization</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearContractorComparison}
              className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="p-6 overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-3 w-36 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  Criteria
                </th>
                {comparedContractors.map(c => (
                  <th key={c.id} className="py-3 px-4 min-w-[200px]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{c.companyName}</h4>
                        <p className="text-slate-500 text-[11px]">{c.name}</p>
                      </div>
                      <button
                        onClick={() => toggleContractorComparison(c)}
                        className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">Estimated Budget Range</td>
                {comparedContractors.map(c => (
                  <td key={c.id} className="py-3 px-4 font-bold text-[#142B4A]">
                    {c.estimatedBudgetRange}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">Verification Status</td>
                {comparedContractors.map(c => (
                  <td key={c.id} className="py-3 px-4">
                    {c.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        Verified Credentials
                      </span>
                    ) : (
                      <span className="text-slate-500">Registered (Verification in Progress)</span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">Experience & Portfolio</td>
                {comparedContractors.map(c => (
                  <td key={c.id} className="py-3 px-4 text-slate-700">
                    <p className="font-medium">{c.experienceYears} Years in Industry</p>
                    <p className="text-[11px] text-slate-500">{c.completedProjects} Completed Projects</p>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">License / Registration</td>
                {comparedContractors.map(c => (
                  <td key={c.id} className="py-3 px-4 font-mono text-slate-700">
                    {c.licenseNumber}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">Specialization</td>
                {comparedContractors.map(c => (
                  <td key={c.id} className="py-3 px-4 text-slate-700">
                    <div className="flex flex-wrap gap-1">
                      {c.specialization.map(s => (
                        <span key={s} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">Action</td>
                {comparedContractors.map(c => (
                  <td key={c.id} className="py-4 px-4">
                    <button
                      onClick={() => {
                        onClose();
                        openBookingModal(c, 'Contractor');
                      }}
                      className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
                    >
                      Request Site Inspection
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
