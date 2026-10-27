import React from 'react';
import { X, Check, AlertCircle, ShoppingBag, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MaterialCompareDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { comparedMaterials, toggleMaterialComparison, clearMaterialComparison, addToMaterialCart } = useApp();

  if (!isOpen || comparedMaterials.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#142B4A] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#F28C28]" />
            <div>
              <h3 className="font-bold text-sm tracking-tight">
                Material Specification & Price Comparison
              </h3>
              <p className="text-[11px] text-slate-300">
                Comparing {comparedMaterials.length} of 3 selected products
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearMaterialComparison}
              className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-x-auto overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-3 w-40 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  Feature / Spec
                </th>
                {comparedMaterials.map(mat => (
                  <th key={mat.id} className="py-3 px-4 min-w-[220px]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold text-[#F28C28] uppercase">{mat.brand}</span>
                        <h4 className="font-bold text-slate-900 text-sm mt-0.5 leading-snug">{mat.name}</h4>
                      </div>
                      <button
                        onClick={() => toggleMaterialComparison(mat)}
                        className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                        title="Remove from compare"
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
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">Price Per Unit</td>
                {comparedMaterials.map(mat => (
                  <td key={mat.id} className="py-3 px-4">
                    <span className="text-base font-bold text-[#142B4A]">
                      ₹{mat.pricePerUnit.toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-[11px]"> / {mat.unit}</span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">Grade / Specification</td>
                {comparedMaterials.map(mat => (
                  <td key={mat.id} className="py-3 px-4 font-medium text-slate-800">
                    {mat.gradeOrSpec}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">Quality Highlight</td>
                {comparedMaterials.map(mat => (
                  <td key={mat.id} className="py-3 px-4 text-slate-600 leading-relaxed">
                    {mat.qualityHighlight}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">Supplier & Location</td>
                {comparedMaterials.map(mat => (
                  <td key={mat.id} className="py-3 px-4">
                    <p className="font-medium text-slate-800">{mat.supplierName}</p>
                    <p className="text-[11px] text-slate-500">{mat.supplierLocation}</p>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">Min Order Qty</td>
                {comparedMaterials.map(mat => (
                  <td key={mat.id} className="py-3 px-4 text-slate-700">
                    {mat.minOrderQuantity} {mat.unit}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">Delivery Charge</td>
                {comparedMaterials.map(mat => (
                  <td key={mat.id} className="py-3 px-4 text-slate-700">
                    ₹{mat.deliveryFee} (Est. {mat.estimatedDeliveryDays} day{mat.estimatedDeliveryDays > 1 ? 's' : ''})
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 font-semibold text-slate-600 bg-slate-50">Action</td>
                {comparedMaterials.map(mat => (
                  <td key={mat.id} className="py-4 px-4">
                    <button
                      onClick={() => {
                        addToMaterialCart(mat);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Quotation</span>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>*Constructease helps you compare specifications and supplier quotations without bias.</span>
          <button
            onClick={onClose}
            className="font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
