import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-[#F28C28] shrink-0" />,
    error: <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="bg-[#142B4A] text-white px-4 py-3 rounded-lg shadow-xl border border-white/10 flex items-center gap-3 text-xs max-w-md">
        {icons[toast.type]}
        <p className="leading-snug">{toast.message}</p>
      </div>
    </div>
  );
};
