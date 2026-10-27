import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Worker,
  MaterialProduct,
  Contractor,
  BookingRequest,
  BookingStatus,
  MaterialOrderItem,
  InteriorConsultationRequest,
  SupportTicket,
  SubscriptionPlan,
  ProviderSubscription
} from '../types';
import {
  WORKERS_DATA,
  MATERIALS_DATA,
  CONTRACTORS_DATA,
  CITIES,
  INITIAL_SUBSCRIPTION_PLANS,
  INITIAL_PROVIDER_SUBSCRIPTIONS
} from '../data/mockData';

interface PlatformFeeConfig {
  bookingFeePercent: number;
  materialCommissionPercent: number;
  interiorConsultationFee: number;
}


interface AppContextType {
  // Location & Global Search
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  pincode: string;
  setPincode: (pin: string) => void;
  globalSearch: string;
  setGlobalSearch: (q: string) => void;

  // Active User & Authentication
  currentUser: User | null;
  currentRole: UserRole;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  registerUser: (userData: Partial<User>) => void;
  switchRoleDemo: (role: UserRole) => void;

  // Providers & Products (editable/syncable)
  workers: Worker[];
  materials: MaterialProduct[];
  contractors: Contractor[];
  toggleProviderVerification: (id: string, type: 'worker' | 'contractor') => void;
  addNewWorker: (worker: Omit<Worker, 'id' | 'isVerified' | 'rating' | 'reviewCount' | 'completedJobs'>) => void;
  addNewMaterial: (material: Omit<MaterialProduct, 'id' | 'rating' | 'reviewCount'>) => void;

  // Bookings & Workflows
  bookings: BookingRequest[];
  createBooking: (booking: Omit<BookingRequest, 'id' | 'status' | 'createdAt'>) => string;
  updateBookingStatus: (id: string, status: BookingStatus, cancellationReason?: string) => void;
  confirmBookingWithData: (
    bookingId: string,
    data: {
      scheduledDate?: string;
      quotedAmount?: number;
      notes?: string;
      platformFee?: number;
    }
  ) => void;

  // Interior Inquiries
  interiorRequests: InteriorConsultationRequest[];
  createInteriorRequest: (req: Omit<InteriorConsultationRequest, 'id' | 'status' | 'createdAt'>) => string;
  updateInteriorStatus: (id: string, status: BookingStatus) => void;
  confirmInteriorRequest: (
    requestId: string,
    data: {
      scheduledDate: string;
      slotTime: string;
      assignedDesigner: string;
      consultationType: 'In-Person Site Visit' | 'Virtual 3D Session';
      quotedProjectAmount?: number;
    }
  ) => void;

  // Subscriptions (Admin & Providers)
  subscriptionPlans: SubscriptionPlan[];
  providerSubscriptions: ProviderSubscription[];
  updateSubscriptionPlan: (planId: string, updates: Partial<SubscriptionPlan>) => void;
  addNewSubscriptionPlan: (plan: Omit<SubscriptionPlan, 'id'>) => void;
  assignProviderSubscription: (providerId: string, planId: string, billingCycle?: 'monthly' | 'annual') => void;
  updateProviderSubscriptionStatus: (subId: string, status: 'Active' | 'Trial' | 'Expired' | 'Pending Renewal') => void;

  // Material Comparison & Cart

  comparedMaterials: MaterialProduct[];
  toggleMaterialComparison: (product: MaterialProduct) => void;
  clearMaterialComparison: () => void;
  materialCart: MaterialOrderItem[];
  addToMaterialCart: (product: MaterialProduct, qty?: number) => void;
  updateMaterialCartQty: (productId: string, qty: number) => void;
  removeFromMaterialCart: (productId: string) => void;
  clearMaterialCart: () => void;

  // Contractor Comparison
  comparedContractors: Contractor[];
  toggleContractorComparison: (contractor: Contractor) => void;
  clearContractorComparison: () => void;

  // Fee configuration (Admin)
  feeConfig: PlatformFeeConfig;
  updateFeeConfig: (newConfig: Partial<PlatformFeeConfig>) => void;

  // Support Tickets
  supportTickets: SupportTicket[];
  createSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'status' | 'createdAt'>) => void;

  // Navigation page state
  activePage: string;
  setActivePage: (page: string) => void;

  // Modals & UI notifications
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  activeBookingModal: { isOpen: boolean; target?: any; serviceType?: 'Worker' | 'Contractor' };
  openBookingModal: (target: any, serviceType: 'Worker' | 'Contractor') => void;
  closeBookingModal: () => void;
  providerRegisterModalOpen: boolean;
  setProviderRegisterModalOpen: (open: boolean) => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USERS: Record<UserRole, User> = {
  customer: {
    id: 'usr-customer-1',
    name: 'Ananya Sharma',
    email: 'ananya.s@constructease.example.com',
    phone: '+91 98450 77123',
    role: 'customer',
    city: 'Bengaluru'
  },
  provider: {
    id: 'usr-provider-1',
    name: 'Rameshwar Kumar',
    email: 'rameshwar.mason@constructease.example.com',
    phone: '+91 98450 12384',
    role: 'provider',
    city: 'Bengaluru',
    companyName: 'Rameshwar Masonry Craft',
    providerType: 'worker',
    isVerified: true
  },
  admin: {
    id: 'usr-admin-1',
    name: 'Balaji G. (Admin)',
    email: 'admin@constructease.com',
    role: 'admin',
    city: 'Bengaluru'
  }
};

const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 'BK-1082',
    customerId: 'usr-customer-1',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.s@constructease.example.com',
    customerPhone: '+91 98450 77123',
    serviceType: 'Worker',
    targetId: 'w-1',
    targetName: 'Rameshwar Kumar',
    targetCategory: 'Mason',
    location: 'HSR Layout Sector 2, Bengaluru',
    pincode: '560102',
    dateRequested: '2026-10-29',
    scheduledDate: '2026-10-30',
    status: 'Confirmed',
    notes: 'Boundary wall brick masonry and lintel plaster repair work (approx 3 days estimated).',
    quotedAmount: 3300,
    platformFee: 132,
    totalEstimatedAmount: 3432,
    createdAt: '2026-10-25T14:30:00Z'
  },
  {
    id: 'BK-1049',
    customerId: 'usr-customer-1',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.s@constructease.example.com',
    customerPhone: '+91 98450 77123',
    serviceType: 'Contractor',
    targetId: 'c-1',
    targetName: 'Vardhan Infra & Living Spaces Pvt Ltd',
    targetCategory: 'Turnkey Luxury Villas',
    location: 'Sarjapur Main Road, Bengaluru',
    pincode: '560035',
    dateRequested: '2026-11-05',
    status: 'Quotation Received',
    notes: 'Site inspection and structural foundation quotation for G+2 residential house on a 30x40 site.',
    quotedAmount: 4850000,
    platformFee: 15000,
    totalEstimatedAmount: 4865000,
    createdAt: '2026-10-22T09:15:00Z'
  }
];

const INITIAL_INTERIOR_REQUESTS: InteriorConsultationRequest[] = [
  {
    id: 'INT-301',
    customerId: 'usr-customer-1',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.s@constructease.example.com',
    customerPhone: '+91 98450 77123',
    propertyType: '3 BHK',
    rooms: ['Living Room', 'Modular Kitchen', 'False Ceiling'],
    approxBudget: '₹8 Lakhs – ₹12 Lakhs',
    preferredStyle: 'Modern',
    projectTimeline: '1-2 Months',
    location: 'HSR Layout Sector 2, Bengaluru',
    additionalNotes: 'Need Blum hardware in kitchen and warm indirect cove lighting in living area.',
    consultationFee: 999,
    status: 'Awaiting Provider Response',
    createdAt: '2026-10-26T11:00:00Z'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<string>('home');

  // Location & Search
  const [selectedCity, setSelectedCity] = useState<string>('Bengaluru');
  const [pincode, setPincode] = useState<string>('560034');
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Authentication: default to demo customer so the user immediately experiences the dashboard
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USERS.customer);

  // Providers & Materials Data (persisted in local state)
  const [workers, setWorkers] = useState<Worker[]>(WORKERS_DATA);
  const [materials, setMaterials] = useState<MaterialProduct[]>(MATERIALS_DATA);
  const [contractors] = useState<Contractor[]>(CONTRACTORS_DATA);

  // Bookings
  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem('constructease_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Interior requests
  const [interiorRequests, setInteriorRequests] = useState<InteriorConsultationRequest[]>(() => {
    const saved = localStorage.getItem('constructease_interior_reqs');
    return saved ? JSON.parse(saved) : INITIAL_INTERIOR_REQUESTS;
  });

  // Subscription Plans & Provider Subscriptions
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>(() => {
    const saved = localStorage.getItem('constructease_sub_plans');
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTION_PLANS;
  });

  const [providerSubscriptions, setProviderSubscriptions] = useState<ProviderSubscription[]>(() => {
    const saved = localStorage.getItem('constructease_provider_subs');
    return saved ? JSON.parse(saved) : INITIAL_PROVIDER_SUBSCRIPTIONS;
  });

  // Fee Config
  const [feeConfig, setFeeConfig] = useState<PlatformFeeConfig>({
    bookingFeePercent: 4.0,
    materialCommissionPercent: 2.5,
    interiorConsultationFee: 999
  });

  // Support Tickets
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'TCK-201',
      name: 'Vikas Deshmukh',
      email: 'vikas.d@example.com',
      category: 'Material Quality / Delivery',
      message: 'Can I request delivery on Sunday morning for UltraTech cement batch to avoid traffic restrictions?',
      status: 'Open',
      createdAt: '2026-10-27T08:10:00Z'
    }
  ]);

  // Materials comparison and cart
  const [comparedMaterials, setComparedMaterials] = useState<MaterialProduct[]>([]);
  const [materialCart, setMaterialCart] = useState<MaterialOrderItem[]>([]);

  // Contractors comparison
  const [comparedContractors, setComparedContractors] = useState<Contractor[]>([]);

  // Modals & Toast
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [providerRegisterModalOpen, setProviderRegisterModalOpen] = useState(false);
  const [activeBookingModal, setActiveBookingModal] = useState<{
    isOpen: boolean;
    target?: any;
    serviceType?: 'Worker' | 'Contractor';
  }>({ isOpen: false });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('constructease_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('constructease_interior_reqs', JSON.stringify(interiorRequests));
  }, [interiorRequests]);

  useEffect(() => {
    localStorage.setItem('constructease_sub_plans', JSON.stringify(subscriptionPlans));
  }, [subscriptionPlans]);

  useEffect(() => {
    localStorage.setItem('constructease_provider_subs', JSON.stringify(providerSubscriptions));
  }, [providerSubscriptions]);


  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const login = (email: string, role: UserRole = 'customer') => {
    const matchedUser = Object.values(DEMO_USERS).find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matchedUser) {
      setCurrentUser(matchedUser);
      showToast(`Welcome back, ${matchedUser.name}! Logged in as ${matchedUser.role}.`, 'success');
    } else {
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        role,
        city: selectedCity
      };
      setCurrentUser(newUser);
      showToast(`Logged in successfully as ${newUser.name}.`, 'success');
    }
    setAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out securely.', 'info');
  };

  const registerUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name || 'Valued User',
      email: userData.email || 'user@example.com',
      phone: userData.phone || '',
      role: userData.role || 'customer',
      city: userData.city || selectedCity,
      companyName: userData.companyName,
      providerType: userData.providerType,
      isVerified: false
    };
    setCurrentUser(newUser);
    showToast(`Account created for ${newUser.name}. Welcome to Constructease!`, 'success');
    setAuthModalOpen(false);
  };

  const switchRoleDemo = (role: UserRole) => {
    setCurrentUser(DEMO_USERS[role]);
    showToast(`Switched active view to demo ${role.toUpperCase()}: ${DEMO_USERS[role].name}`, 'info');
  };

  const toggleProviderVerification = (id: string, type: 'worker' | 'contractor') => {
    if (type === 'worker') {
      setWorkers(prev =>
        prev.map(w => (w.id === id ? { ...w, isVerified: !w.isVerified } : w))
      );
      showToast(`Worker verification status updated by Admin.`, 'success');
    }
  };

  const addNewWorker = (workerData: Omit<Worker, 'id' | 'isVerified' | 'rating' | 'reviewCount' | 'completedJobs'>) => {
    const newWorker: Worker = {
      ...workerData,
      id: `w-${Date.now()}`,
      isVerified: false, // New workers are registered, verified only after admin audit
      rating: 5.0,
      reviewCount: 1,
      completedJobs: 0
    };
    setWorkers(prev => [newWorker, ...prev]);
    showToast(`Provider registration received for ${newWorker.name}. Awaiting Admin verification.`, 'success');
  };

  const addNewMaterial = (matData: Omit<MaterialProduct, 'id' | 'rating' | 'reviewCount'>) => {
    const newMat: MaterialProduct = {
      ...matData,
      id: `mat-${Date.now()}`,
      rating: 4.8,
      reviewCount: 1
    };
    setMaterials(prev => [newMat, ...prev]);
    showToast(`Product listing "${newMat.name}" added successfully.`, 'success');
  };

  const createBooking = (bookingData: Omit<BookingRequest, 'id' | 'status' | 'createdAt'>): string => {
    const id = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: BookingRequest = {
      ...bookingData,
      id,
      status: 'Requested',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Booking request ${id} submitted! Applicable platform charges: ₹${bookingData.platformFee}.`, 'success');
    return id;
  };

  const updateBookingStatus = (id: string, status: BookingStatus, cancellationReason?: string) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === id
          ? {
              ...b,
              status,
              cancellationReason: cancellationReason || b.cancellationReason
            }
          : b
      )
    );
    showToast(`Booking ${id} status updated to: ${status}`, 'info');
  };

  const createInteriorRequest = (reqData: Omit<InteriorConsultationRequest, 'id' | 'status' | 'createdAt'>): string => {
    const id = `INT-${Math.floor(100 + Math.random() * 900)}`;
    const newReq: InteriorConsultationRequest = {
      ...reqData,
      id,
      status: 'Requested',
      createdAt: new Date().toISOString()
    };
    setInteriorRequests(prev => [newReq, ...prev]);
    showToast(`Interior consultation request ${id} submitted successfully!`, 'success');
    return id;
  };

  const confirmBookingWithData = (
    bookingId: string,
    data: {
      scheduledDate?: string;
      quotedAmount?: number;
      notes?: string;
      platformFee?: number;
    }
  ) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        const quotedAmount = data.quotedAmount !== undefined ? data.quotedAmount : (b.quotedAmount || 0);
        const platformFee = data.platformFee !== undefined ? data.platformFee : b.platformFee;
        const totalEstimatedAmount = quotedAmount + (b.deliveryFee || 0) + platformFee;

        return {
          ...b,
          status: 'Confirmed' as BookingStatus,
          scheduledDate: data.scheduledDate || b.scheduledDate,
          notes: data.notes ? `${b.notes}\n[Confirmed]: ${data.notes}` : b.notes,
          quotedAmount,
          platformFee,
          totalEstimatedAmount: totalEstimatedAmount > 0 ? totalEstimatedAmount : b.totalEstimatedAmount
        };
      })
    );
    showToast(`Booking ${bookingId} has been confirmed with scheduled date & contract data!`, 'success');
  };

  const updateInteriorStatus = (id: string, status: BookingStatus) => {
    setInteriorRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
    showToast(`Interior consultation #${id} status updated to: ${status}`, 'info');
  };

  const confirmInteriorRequest = (
    requestId: string,
    data: {
      scheduledDate: string;
      slotTime: string;
      assignedDesigner: string;
      consultationType: 'In-Person Site Visit' | 'Virtual 3D Session';
      quotedProjectAmount?: number;
    }
  ) => {
    setInteriorRequests(prev =>
      prev.map(r => {
        if (r.id !== requestId) return r;
        return {
          ...r,
          status: 'Confirmed' as BookingStatus,
          scheduledDate: data.scheduledDate,
          slotTime: data.slotTime,
          assignedDesigner: data.assignedDesigner,
          consultationType: data.consultationType,
          quotedProjectAmount: data.quotedProjectAmount || r.quotedProjectAmount,
          confirmedAt: new Date().toISOString()
        };
      })
    );
    showToast(`Interior Consultation #${requestId} confirmed for ${data.scheduledDate} at ${data.slotTime} (${data.consultationType})!`, 'success');
  };

  const updateSubscriptionPlan = (planId: string, updates: Partial<SubscriptionPlan>) => {
    setSubscriptionPlans(prev =>
      prev.map(p => (p.id === planId ? { ...p, ...updates } : p))
    );
    showToast('Subscription plan configuration updated by Admin.', 'success');
  };

  const addNewSubscriptionPlan = (planData: Omit<SubscriptionPlan, 'id'>) => {
    const newPlan: SubscriptionPlan = {
      ...planData,
      id: `sub-${Date.now()}`
    };
    setSubscriptionPlans(prev => [...prev, newPlan]);
    showToast(`New tier "${newPlan.name}" added to subscription engine.`, 'success');
  };

  const assignProviderSubscription = (
    providerId: string,
    planId: string,
    billingCycle: 'monthly' | 'annual' = 'monthly'
  ) => {
    const plan = subscriptionPlans.find(p => p.id === planId);
    if (!plan) return;

    const existingIdx = providerSubscriptions.findIndex(s => s.providerId === providerId);
    const expires = new Date();
    if (billingCycle === 'annual') {
      expires.setFullYear(expires.getFullYear() + 1);
    } else {
      expires.setMonth(expires.getMonth() + 1);
    }

    if (existingIdx >= 0) {
      setProviderSubscriptions(prev =>
        prev.map((s, idx) =>
          idx === existingIdx
            ? {
                ...s,
                planId: plan.id,
                planName: plan.name,
                billingCycle,
                status: 'Active',
                expiresAt: expires.toISOString().split('T')[0],
                monthlyLeadsLimit: plan.monthlyLeadsQuota
              }
            : s
        )
      );
    } else {
      const targetWorker = workers.find(w => w.id === providerId);
      const targetContractor = contractors.find(c => c.id === providerId);
      const newSub: ProviderSubscription = {
        id: `sub-rec-${Date.now()}`,
        providerId,
        providerName: targetWorker?.name || targetContractor?.companyName || currentUser?.name || 'Partner Provider',
        companyName: targetContractor?.companyName || targetWorker?.name || currentUser?.companyName,
        providerType: targetContractor ? 'contractor' : 'worker',
        planId: plan.id,
        planName: plan.name,
        billingCycle,
        status: 'Active',
        startedAt: new Date().toISOString().split('T')[0],
        expiresAt: expires.toISOString().split('T')[0],
        leadsUsedThisMonth: 0,
        monthlyLeadsLimit: plan.monthlyLeadsQuota,
        autoRenew: true
      };
      setProviderSubscriptions(prev => [newSub, ...prev]);
    }
    showToast(`Provider assigned to "${plan.name}" (${billingCycle})!`, 'success');
  };

  const updateProviderSubscriptionStatus = (
    subId: string,
    status: 'Active' | 'Trial' | 'Expired' | 'Pending Renewal'
  ) => {
    setProviderSubscriptions(prev =>
      prev.map(s => (s.id === subId ? { ...s, status } : s))
    );
    showToast(`Subscription record status updated to ${status}.`, 'info');
  };


  const toggleMaterialComparison = (product: MaterialProduct) => {
    setComparedMaterials(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        showToast('You can compare up to 3 materials side by side.', 'info');
        return prev;
      }
      showToast(`Added ${product.brand} to comparison.`, 'info');
      return [...prev, product];
    });
  };

  const clearMaterialComparison = () => setComparedMaterials([]);

  const addToMaterialCart = (product: MaterialProduct, qty = 1) => {
    const effectiveQty = Math.max(qty, product.minOrderQuantity || 1);
    setMaterialCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + effectiveQty }
            : item
        );
      }
      return [...prev, { product, quantity: effectiveQty }];
    });
    showToast(`Added ${effectiveQty} ${product.unit} of ${product.brand} to Quotation List.`, 'success');
  };

  const updateMaterialCartQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromMaterialCart(productId);
      return;
    }
    setMaterialCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromMaterialCart = (productId: string) => {
    setMaterialCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from quotation list.', 'info');
  };

  const clearMaterialCart = () => setMaterialCart([]);

  const toggleContractorComparison = (contractor: Contractor) => {
    setComparedContractors(prev => {
      const exists = prev.some(c => c.id === contractor.id);
      if (exists) return prev.filter(c => c.id !== contractor.id);
      if (prev.length >= 2) {
        showToast('You can compare 2 contractors side by side.', 'info');
        return prev;
      }
      showToast(`Added ${contractor.companyName} to comparison.`, 'info');
      return [...prev, contractor];
    });
  };

  const clearContractorComparison = () => setComparedContractors([]);

  const updateFeeConfig = (newConfig: Partial<PlatformFeeConfig>) => {
    setFeeConfig(prev => ({ ...prev, ...newConfig }));
    showToast('Platform fee configuration updated by administrator.', 'success');
  };

  const createSupportTicket = (ticketData: Omit<SupportTicket, 'id' | 'status' | 'createdAt'>) => {
    const id = `TCK-${Math.floor(100 + Math.random() * 900)}`;
    const newTicket: SupportTicket = {
      ...ticketData,
      id,
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    showToast(`Support Ticket #${id} created. Our operations desk will respond shortly.`, 'success');
  };

  const openBookingModal = (target: any, serviceType: 'Worker' | 'Contractor') => {
    setActiveBookingModal({ isOpen: true, target, serviceType });
  };

  const closeBookingModal = () => {
    setActiveBookingModal({ isOpen: false });
  };

  return (
    <AppContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        pincode,
        setPincode,
        globalSearch,
        setGlobalSearch,
        currentUser,
        currentRole: currentUser?.role || 'customer',
        login,
        logout,
        registerUser,
        switchRoleDemo,
        workers,
        materials,
        contractors,
        toggleProviderVerification,
        addNewWorker,
        addNewMaterial,
        bookings,
        createBooking,
        updateBookingStatus,
        confirmBookingWithData,
        interiorRequests,
        createInteriorRequest,
        updateInteriorStatus,
        confirmInteriorRequest,
        subscriptionPlans,
        providerSubscriptions,
        updateSubscriptionPlan,
        addNewSubscriptionPlan,
        assignProviderSubscription,
        updateProviderSubscriptionStatus,
        comparedMaterials,

        toggleMaterialComparison,
        clearMaterialComparison,
        materialCart,
        addToMaterialCart,
        updateMaterialCartQty,
        removeFromMaterialCart,
        clearMaterialCart,
        comparedContractors,
        toggleContractorComparison,
        clearContractorComparison,
        feeConfig,
        updateFeeConfig,
        supportTickets,
        createSupportTicket,
        activePage,
        setActivePage,
        authModalOpen,
        setAuthModalOpen,
        activeBookingModal,
        openBookingModal,
        closeBookingModal,
        providerRegisterModalOpen,
        setProviderRegisterModalOpen,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
