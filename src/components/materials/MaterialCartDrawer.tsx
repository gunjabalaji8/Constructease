import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MaterialCartDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const {
    materialCart,
    updateMaterialCartQty,
    removeFromMaterialCart,
    clearMaterialCart,
    createBooking,
    currentUser,
    setAuthModalOpen,
    setActivePage,
    selectedCity,
    pincode,
    feeConfig
  } = useApp();

  const [address, setAddress] = useState(`Industrial Area, ${selectedCity}`);
  const [deliveryPin, setDeliveryPin] = useState(pincode);
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const itemsSubtotal = materialCart.reduce(
    (sum, item) => sum + item.product.pricePerUnit * item.quantity,
    0
  );
  const deliveryTotal = materialCart.reduce((sum, item) => sum + item.product.deliveryFee, 0);
  const platformFee = Math.round(itemsSubtotal * (feeConfig.materialCommissionPercent / 100));
  const estimatedGrandTotal = itemsSubtotal + deliveryTotal;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    const firstProduct = materialCart[0].product;
    const summaryList = materialCart
      .map(i => `${i.quantity} ${i.product.unit} of ${i.product.brand} (${i.product.name})`)
      .join(', ');

    const bookingId = createBooking({
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone || '+91 98000 00000',
      serviceType: 'Material',
      targetId: firstProduct.id,
      targetName: `${materialCart.length} Material Products (${firstProduct.brand} & others)`,
      targetCategory: firstProduct.category,
      location: address,
      pincode: deliveryPin,
      dateRequested: new Date().toISOString().split('T')[0],
      scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      notes: `Bulk order requisition: ${summaryList}`,
      quotedAmount: itemsSubtotal,
      deliveryFee: deliveryTotal,
      platformFee,
      totalEstimatedAmount: estimatedGrandTotal
    });

    clearMaterialCart();
    setSubmittedBookingId(bookingId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="bg-[#142B4A] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#F28C28]" />
            <div>
              <h3 className="font-bold text-sm tracking-tight">Material Quotation List</h3>
              <p className="text-[11px] text-slate-300">{materialCart.length} item(s) selected</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSubmittedBookingId(null);
              onClose();
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedBookingId ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Quotation Inquiry Submitted!</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your bulk material requisition <strong>#{submittedBookingId}</strong> has been transmitted to local authorized depot suppliers serving PIN {deliveryPin}.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setSubmittedBookingId(null);
                  onClose();
                  setActivePage('customer-dashboard');
                }}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer"
              >
                Track in Customer Dashboard
              </button>
              <button
                onClick={() => {
                  setSubmittedBookingId(null);
                  onClose();
                }}
                className="w-full py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Keep Browsing Materials
              </button>
            </div>
          </div>
        ) : materialCart.length === 0 ? (
          <div className="p-8 text-center space-y-3 my-auto">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="font-semibold text-slate-700 text-sm">Your quotation list is empty</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Add cement bags, structural steel, bricks, tiles, or electrical supplies to request competitive depot quotations.
            </p>
            <button
              onClick={() => {
                onClose();
                setActivePage('materials');
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#142B4A] rounded-lg cursor-pointer"
            >
              <span>Explore Materials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {materialCart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#F28C28] uppercase">{product.brand}</span>
                      <h4 className="font-semibold text-slate-900">{product.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{product.gradeOrSpec}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromMaterialCart(product.id)}
                      className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[11px]">Qty:</span>
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={e =>
                          updateMaterialCartQty(product.id, parseInt(e.target.value) || 1)
                        }
                        className="w-16 px-2 py-1 text-xs border border-slate-300 rounded bg-white font-medium text-center"
                      />
                      <span className="text-slate-500 text-[11px]">{product.unit}</span>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-[#142B4A]">
                        ₹{(product.pricePerUnit * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Delivery fields */}
              <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Delivery Destination</span>
                </div>
                <div>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Site / Unloading Address"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={deliveryPin}
                    onChange={e => setDeliveryPin(e.target.value)}
                    placeholder="PIN Code"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-[#142B4A]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom calculation & checkout */}
            <div className="border-t border-slate-200 bg-slate-50 p-5 space-y-3 shrink-0">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Materials Subtotal:</span>
                  <span className="font-semibold text-slate-900">₹{itemsSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Supplier Flat Freight / Unloading:</span>
                  <span>₹{deliveryTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Included Platform Service Fee ({feeConfig.materialCommissionPercent}%):</span>
                  <span>₹{platformFee.toLocaleString()} (Paid by Depot)</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
                  <span>Estimated Total:</span>
                  <span className="text-[#142B4A]">₹{estimatedGrandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#142B4A] hover:bg-[#0D1E35] rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <span>Request Supplier Bulk Quotations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero obligations · Compare with local wholesale depots</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
