export type UserRole = 'customer' | 'provider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  city?: string;
  avatar?: string;
  companyName?: string;
  providerType?: 'worker' | 'contractor' | 'supplier' | 'interior';
  isVerified?: boolean;
}

export type WorkerCategory = 
  | 'Mason'
  | 'Electrician'
  | 'Plumber'
  | 'Carpenter'
  | 'Painter'
  | 'Tile Worker'
  | 'Welder'
  | 'General Construction Worker';

export interface Worker {
  id: string;
  name: string;
  category: WorkerCategory;
  city: string;
  pincode: string;
  experienceYears: number;
  dailyRate: number;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean; // Actual verified badge vs registered
  availability: 'Available Today' | 'Within 2 Days' | 'Busy Next Week';
  skills: string[];
  bio: string;
  completedJobs: number;
  phone: string;
}

export type MaterialCategory =
  | 'Cement'
  | 'Steel & Rebar'
  | 'Bricks & Blocks'
  | 'Sand'
  | 'Aggregates'
  | 'Tiles'
  | 'Paints'
  | 'Electrical'
  | 'Plumbing'
  | 'Doors & Windows'
  | 'Roofing';

export interface MaterialProduct {
  id: string;
  name: string;
  brand: string;
  category: MaterialCategory;
  gradeOrSpec: string;
  unit: string;
  pricePerUnit: number;
  supplierName: string;
  supplierLocation: string;
  availableStock: number;
  minOrderQuantity: number;
  deliveryAvailable: boolean;
  deliveryFee: number;
  estimatedDeliveryDays: number;
  rating: number;
  reviewCount: number;
  qualityHighlight: string;
}

export interface Contractor {
  id: string;
  name: string;
  companyName: string;
  city: string;
  pincodesServed: string[];
  experienceYears: number;
  specialization: string[];
  estimatedBudgetRange: string;
  licenseNumber: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  completedProjects: number;
  bio: string;
  portfolio: {
    title: string;
    type: string;
    location: string;
  }[];
}

export type InteriorStyle = 'Modern' | 'Minimalist' | 'Traditional' | 'Luxury' | 'Budget-Friendly';

export interface InteriorProject {
  id: string;
  title: string;
  roomType: 'Living Room' | 'Modular Kitchen' | 'Bedroom' | 'Bathroom' | 'False Ceiling' | 'Full Home';
  style: InteriorStyle;
  estimatedBudget: string;
  designerName: string;
  city: string;
  description: string;
  features: string[];
}

export type BookingStatus =
  | 'Requested'
  | 'Awaiting Provider Response'
  | 'Quotation Received'
  | 'Confirmed'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export interface BookingRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: 'Worker' | 'Material' | 'Contractor' | 'Interior';
  targetId: string; // Worker ID, Contractor ID, or Consultation
  targetName: string;
  targetCategory: string;
  location: string;
  pincode: string;
  dateRequested: string;
  scheduledDate?: string;
  status: BookingStatus;
  notes: string;
  quotedAmount?: number;
  platformFee: number;
  deliveryFee?: number;
  totalEstimatedAmount: number;
  cancellationReason?: string;
  createdAt: string;
}

export interface MaterialOrderItem {
  product: MaterialProduct;
  quantity: number;
}

export interface InteriorConsultationRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  propertyType: '1 BHK' | '2 BHK' | '3 BHK' | 'Independent Villa' | 'Duplex' | 'Commercial Office';
  rooms: string[];
  approxBudget: string;
  preferredStyle: InteriorStyle;
  projectTimeline: 'Immediate (within 15 days)' | '1-2 Months' | '3-6 Months';
  location: string;
  additionalNotes: string;
  consultationFee: number;
  status: BookingStatus;
  scheduledDate?: string;
  slotTime?: string;
  consultationType?: 'In-Person Site Visit' | 'Virtual 3D Session';
  assignedDesigner?: string;
  quotedProjectAmount?: number;
  confirmedAt?: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  category: 'General Inquiry' | 'Booking Help' | 'Material Quality / Delivery' | 'Billing & Fees' | 'Complaint' | 'Provider Registration';
  message: string;
  status: 'Open' | 'In Review' | 'Resolved';
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  targetRole: 'worker' | 'contractor' | 'supplier' | 'interior' | 'all';
  priceMonthly: number;
  priceAnnual: number;
  monthlyLeadsQuota: number; // -1 for unlimited
  commissionRate: number; // percentage
  badgeLabel: string;
  features: string[];
  isPopular?: boolean;
  isActive: boolean;
}

export interface ProviderSubscription {
  id: string;
  providerId: string;
  providerName: string;
  companyName?: string;
  providerType: 'worker' | 'contractor' | 'supplier' | 'interior';
  planId: string;
  planName: string;
  billingCycle: 'monthly' | 'annual';
  status: 'Active' | 'Trial' | 'Expired' | 'Pending Renewal';
  startedAt: string;
  expiresAt: string;
  leadsUsedThisMonth: number;
  monthlyLeadsLimit: number;
  autoRenew: boolean;
}

