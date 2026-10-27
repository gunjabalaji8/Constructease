import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { ServicesGrid } from './components/home/ServicesGrid';
import { HowItWorks } from './components/home/HowItWorks';
import { PriceComparisonSection } from './components/home/PriceComparisonSection';
import { FeaturedProviders } from './components/home/FeaturedProviders';
import { InteriorGallery } from './components/home/InteriorGallery';
import { TrustSection } from './components/home/TrustSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { FinalCTA } from './components/home/FinalCTA';
import { WorkersPage } from './components/workers/WorkersPage';
import { MaterialsPage } from './components/materials/MaterialsPage';
import { ContractorsPage } from './components/contractors/ContractorsPage';
import { InteriorsPage } from './components/interiors/InteriorsPage';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { ProviderDashboard } from './components/dashboard/ProviderDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { ContactPage } from './components/support/ContactPage';
import { AuthModal } from './components/modals/AuthModal';
import { BookingModal } from './components/modals/BookingModal';
import { ProviderRegisterModal } from './components/modals/ProviderRegisterModal';
import { MaterialCompareDrawer } from './components/materials/MaterialCompareDrawer';
import { MaterialCartDrawer } from './components/materials/MaterialCartDrawer';
import { ContractorCompareModal } from './components/contractors/ContractorCompareModal';
import { Toast } from './components/modals/Toast';

const MainApp: React.FC = () => {
  const { activePage } = useApp();
  const [cartOpen, setCartOpen] = useState(false);
  const [materialCompareOpen, setMaterialCompareOpen] = useState(false);
  const [contractorCompareOpen, setContractorCompareOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F8] text-[#252B33]">
      {/* Navbar with 3-Zone top bar, location selector, and role switcher */}
      <Navbar
        onOpenCart={() => setCartOpen(true)}
        onOpenCompare={() => setMaterialCompareOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroSection />
            <ServicesGrid />
            <HowItWorks />
            <PriceComparisonSection />
            <FeaturedProviders />
            <InteriorGallery />
            <TrustSection />
            <TestimonialsSection />
            <FinalCTA />
          </>
        )}

        {activePage === 'workers' && <WorkersPage />}

        {activePage === 'materials' && (
          <MaterialsPage
            onOpenCart={() => setCartOpen(true)}
            onOpenCompare={() => setMaterialCompareOpen(true)}
          />
        )}

        {activePage === 'contractors' && (
          <ContractorsPage
            onOpenCompare={() => setContractorCompareOpen(true)}
          />
        )}

        {activePage === 'interiors' && <InteriorsPage />}

        {activePage === 'customer-dashboard' && <CustomerDashboard />}

        {activePage === 'provider-dashboard' && <ProviderDashboard />}

        {activePage === 'admin-dashboard' && <AdminDashboard />}

        {activePage === 'how-it-works' && (
          <div className="py-6">
            <HowItWorks />
            <PriceComparisonSection />
            <TrustSection />
          </div>
        )}

        {activePage === 'support' && <ContactPage />}
      </main>

      {/* Modals & Slide-out Drawers */}
      <AuthModal />
      <BookingModal />
      <ProviderRegisterModal />
      <MaterialCompareDrawer
        isOpen={materialCompareOpen}
        onClose={() => setMaterialCompareOpen(false)}
      />
      <MaterialCartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
      <ContractorCompareModal
        isOpen={contractorCompareOpen}
        onClose={() => setContractorCompareOpen(false)}
      />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
