import React, { useState } from 'react';
import {
  Search,
  Package,
  Layers,
  ShoppingBag,
  Truck,
  Check,
  Star,
  Info,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialCategory, MaterialProduct } from '../../types';

export const MaterialsPage: React.FC<{
  onOpenCompare: () => void;
  onOpenCart: () => void;
}> = ({ onOpenCompare, onOpenCart }) => {
  const {
    materials,
    comparedMaterials,
    toggleMaterialComparison,
    materialCart,
    addToMaterialCart,
    selectedCity,
    pincode
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const categories: MaterialCategory[] = [
    'Cement',
    'Steel & Rebar',
    'Bricks & Blocks',
    'Sand',
    'Aggregates',
    'Tiles',
    'Paints',
    'Electrical',
    'Plumbing',
    'Doors & Windows',
    'Roofing'
  ];

  const brands = Array.from(new Set(materials.map(m => m.brand)));

  const filteredMaterials = materials.filter(m => {
    if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;
    if (selectedBrand !== 'all' && m.brand !== selectedBrand) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = m.name.toLowerCase().includes(q);
      const matchBrand = m.brand.toLowerCase().includes(q);
      const matchSpec = m.gradeOrSpec.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchSpec) return false;
    }
    return true;
  });

  return (
    <div className="py-10 bg-[#F4F6F8] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#F28C28] uppercase tracking-wider">
              <Package className="w-4 h-4" />
              <span>Direct Depot Materials Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight mt-1">
              Construction Materials Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Source cement, TMT steel, bricks, sand, and plumbing directly from authorized regional distributors with transparent unit rates and guaranteed factory grades.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {comparedMaterials.length > 0 && (
              <button
                onClick={onOpenCompare}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#142B4A] bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#F28C28]" />
                <span>Compare Specs ({comparedMaterials.length}/3)</span>
              </button>
            )}

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Quotation List ({materialCart.length})</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search material by name, brand, or grade (e.g. Fe 550D, PPC, 20mm)..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A]"
              />
            </div>

            <div className="sm:col-span-4">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A] bg-white font-medium text-slate-700"
              >
                <option value="all">All Material Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#142B4A] bg-white font-medium text-slate-700"
              >
                <option value="all">All Brands / Manufacturers</option>
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Prices listed reflect authorized wholesale depot baseline quotations in {selectedCity}</span>
            </div>
            <span>Delivering to PIN: <strong className="text-slate-800">{pincode}</strong></span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map(mat => {
            const isCompared = comparedMaterials.some(p => p.id === mat.id);
            const inCart = materialCart.find(i => i.product.id === mat.id);

            return (
              <div
                key={mat.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#F28C28] uppercase">
                      {mat.brand} · {mat.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-600">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{mat.rating}</span>
                      <span className="text-slate-400">({mat.reviewCount})</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{mat.name}</h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      Grade: <span className="text-slate-800 font-semibold">{mat.gradeOrSpec}</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {mat.qualityHighlight}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Supplier:</span>
                      <span className="font-medium text-slate-800">{mat.supplierName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Min Order Qty:</span>
                      <span className="font-medium text-slate-800">{mat.minOrderQuantity} {mat.unit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Truck className="w-3 h-3 text-slate-400" />
                        <span>Delivery:</span>
                      </span>
                      <span className="text-emerald-700 font-medium">
                        ₹{mat.deliveryFee} · {mat.estimatedDeliveryDays} Day{mat.estimatedDeliveryDays > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Wholesale Price</span>
                      <p className="text-lg font-black text-[#142B4A]">
                        ₹{mat.pricePerUnit.toLocaleString()}
                        <span className="text-xs font-normal text-slate-500"> / {mat.unit}</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => toggleMaterialComparison(mat)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                        isCompared
                          ? 'bg-amber-50 border-amber-300 text-amber-900'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{isCompared ? 'Compared' : 'Compare'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => addToMaterialCart(mat)}
                      className="py-2 px-2 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{inCart ? `Added (${inCart.quantity})` : 'Request Quote'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
