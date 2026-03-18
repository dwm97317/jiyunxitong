/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Headphones } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

// Types & Constants
import { ViewType } from './types';
import { claims, plazaItems } from './constants';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import PackingModal from './components/PackingModal';

// Views
import Homepage from './views/Homepage';
import PlazaView from './views/PlazaView';
import PlazaDetailsView from './views/PlazaDetailsView';
import LogisticsDetailsView from './views/LogisticsDetailsView';
import ApplyPackingView from './views/ApplyPackingView';
import ClaimsView from './views/ClaimsView';
import ParcelClaimView from './views/ParcelClaimView';
import PredeclareView from './views/PredeclareView';
import VasView from './views/VasView';
import ClaimDetailsView from './views/ClaimDetailsView';
import ClaimTrackingView from './views/ClaimTrackingView';
import RulesView from './views/RulesView';
import ClaimTermsView from './views/ClaimTermsView';
import ParcelManagementView from './views/ParcelManagementView';
import InsuranceRulesView from './views/InsuranceRulesView';
import ClaimSuccessView from './views/ClaimSuccessView';
import PaymentSuccessView from './views/PaymentSuccessView';
import { navigationService } from './services/navigationService';

export default function App() {
  const { t } = useTranslation();
  const [view, setView] = useState<ViewType>('home');
  const [activeTab, setActiveTab] = useState('available');
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>('standard');
  const [selectedVas, setSelectedVas] = useState<string[]>([]);
  const [selectedPlazaId, setSelectedPlazaId] = useState<string | null>(null);
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [showPackingModal, setShowPackingModal] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'sea' | 'air'>('air');
  const [parcelTab, setParcelTab] = useState<'predeclare' | 'claim' | 'apply'>('predeclare');

  const goTo = (newView: ViewType) => {
    navigationService.navigate(newView);
    setView(newView);
  };

  const handleBack = () => {
    const prev = navigationService.back();
    setView(prev);
  }

  const selectedClaim = claims.find(c => c.id === selectedClaimId) || claims[0];
  const selectedPlazaItem = plazaItems.find(p => p.id === selectedPlazaId) || plazaItems[0];

  const getHeaderTitle = () => {
    switch (view) {
      case 'home': return t('homepage.title');
      case 'details': return t('logistics.title');
      case 'empty': return t('logistics.title');
      case 'predeclare': return t('predeclare.title');
      case 'claim': return t('parcelClaim.title');
      case 'claims': return t('claims.title');
      case 'vas': return t('vas.title');
      case 'claimDetails': return t('claimDetails.title');
      case 'claimTracking': return t('claimTracking.title');
      case 'claimRules': return t('rules.title');
      case 'claimTerms': return t('claimTerms.title');
      case 'applyPacking': return t('applyPacking.title');
      case 'plaza': return t('homepage.functions.plaza');
      case 'plazaDetails': return t('plazaDetails.title');
      case 'parcelManagement': return t('homepage.functions.parcelManagement', { defaultValue: 'Parcel Management' });
      case 'insuranceRules': return t('insuranceRules.title');
      case 'paymentSuccess': return t('claimSuccess.title');
      case 'claimSuccess': return t('claimSuccess.title');
      default: return t('header.defaultTitle');
    }
  };

  const handleToggleParcel = (id: string) => {
    setSelectedParcels(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSelectAllParcels = () => {
    if (selectedParcels.length === 3) {
      setSelectedParcels([]);
    } else {
      setSelectedParcels(['1', '2', '3']);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#333] pb-24">
      <Header view={view} onBack={handleBack} title={getHeaderTitle()} />

      <main className="px-4 py-4">
        {view === 'home' && <Homepage setView={goTo} setParcelTab={setParcelTab} />}
        {view === 'plazaDetails' && <PlazaDetailsView item={selectedPlazaItem} />}
        {view === 'plaza' && <PlazaView onSelectItem={setSelectedPlazaId} setView={goTo} />}
        {view === 'parcelManagement' && (
          <ParcelManagementView
            selectedParcels={selectedParcels}
            onToggleParcel={handleToggleParcel}
            initialTab={parcelTab}
            onTabChange={setParcelTab}
          />
        )}
        {view === 'applyPacking' && <ApplyPackingView selectedParcels={selectedParcels} onToggleParcel={handleToggleParcel} />}
        {(view === 'details' || view === 'empty') && (
          <LogisticsDetailsView
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            setView={goTo}
          />
        )}
        {view === 'claim' && <ParcelClaimView />}
        {view === 'claims' && (
          <ClaimsView
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setView={goTo}
            setSelectedClaimId={setSelectedClaimId}
          />
        )}
        {view === 'predeclare' && <PredeclareView />}
        {view === 'vas' && <VasView selectedVas={selectedVas} setSelectedVas={setSelectedVas} />}
        {view === 'claimDetails' && <ClaimDetailsView />}
        {view === 'claimTracking' && <ClaimTrackingView claim={selectedClaim} />}
        {view === 'insuranceRules' && <InsuranceRulesView />}
        {view === 'paymentSuccess' && <PaymentSuccessView setView={goTo} />}
        {view === 'claimSuccess' && <ClaimSuccessView setView={goTo} />}
        {(view === 'rules' || view === 'claimRules') && <RulesView />}
        {view === 'claimTerms' && <ClaimTermsView />}
      </main>

      <Footer
        view={view}
        setView={goTo}
        selectedParcelsCount={selectedParcels.length}
        onSelectAllParcels={handleSelectAllParcels}
        onShowPackingModal={() => setShowPackingModal(true)}
        parcelTab={parcelTab}
      />

      <PackingModal
        isOpen={showPackingModal}
        onClose={() => setShowPackingModal(false)}
        shippingMethod={shippingMethod}
        setShippingMethod={setShippingMethod}
        onSubmit={() => {
          setShowPackingModal(false);
          setView('details');
        }}
      />

      {/* Floating Robot Mascot (Customer Service) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setView('vas')}
        className="fixed right-4 bottom-32 w-14 h-14 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center z-[100] border-2 border-blue-50 overflow-hidden"
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-1">
          <img
            src="/src/assets/robot.png"
            alt="Robot"
            className="w-11 h-11"
          />
        </div>
        <div className="absolute -bottom-0.5 w-full bg-[#4A90E2]/90 backdrop-blur-sm py-0.5">
          <span className="text-[7px] text-white font-black uppercase tracking-tighter block text-center uppercase">Support</span>
        </div>
      </motion.button>
    </div>
  );
}
