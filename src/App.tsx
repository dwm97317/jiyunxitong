/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Headphones } from 'lucide-react';
import { motion } from 'motion/react';

// Types & Constants
import { ViewType } from './types';
import { claims, plazaItems } from './constants';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import PackingModal from './components/PackingModal';

// Views
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



export default function App() {
  const [selectedService, setSelectedService] = useState('standard');
  const [view, setView] = useState<ViewType>('details');
  const [activeTab, setActiveTab] = useState('available');
  const [selectedVas, setSelectedVas] = useState<string[]>([]);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [showPackingModal, setShowPackingModal] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'sea' | 'air'>('air');
  const [selectedPlazaId, setSelectedPlazaId] = useState<string | null>(null);

  const selectedClaim = claims.find(c => c.id === selectedClaimId) || claims[0];
  const selectedPlazaItem = plazaItems.find(p => p.id === selectedPlazaId) || plazaItems[0];

  const getHeaderTitle = () => {
    switch (view) {
      case 'rules': return '极光转运';
      case 'claim': return '包裹认领';
      case 'predeclare': return '包裹预报';
      case 'claims': return '在线理赔';
      case 'vas': return '增值服务';
      case 'claimDetails': return '理赔详情';
      case 'claimTracking': return '理赔轨迹';
      case 'claimRules': return '极光转运';
      case 'claimTerms': return '极光转运';
      case 'applyPacking': return '申请打包';
      case 'plaza': return '集运广场';
      case 'plazaDetails': return '集运详情';
      default: return '物流方案';
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
    <div classname="min-h-screen bg-[#F5F5F5] font-sans text-[#333] pb-24">
      <Header view={view} setView={setView} title={getHeaderTitle()} />

      <main className="px-4 py-4">
        {view === 'plazaDetails' && <PlazaDetailsView item={selectedPlazaItem} />}
        {view === 'plaza' && <PlazaView onSelectItem={setSelectedPlazaId} setView={setView} />}
        {view === 'applyPacking' && <ApplyPackingView selectedParcels={selectedParcels} onToggleParcel={handleToggleParcel} />}
        {(view === 'details' || view === 'empty') && (
          <LogisticsDetailsView 
            selectedService={selectedService} 
            setSelectedService={setSelectedService} 
            setView={setView} 
          />
        )}
        {view === 'claim' && <ParcelClaimView />}
        {view === 'claims' && (
          <ClaimsView 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            setView={setView} 
            setSelectedClaimId={setSelectedClaimId} 
          />
        )}
        {view === 'predeclare' && <PredeclareView />}
        {view === 'vas' && <VasView selectedVas={selectedVas} setSelectedVas={setSelectedVas} />}
        {view === 'claimDetails' && <ClaimDetailsView />}
        {view === 'claimTracking' && <ClaimTrackingView claim={selectedClaim} />}
        {(view === 'rules' || view === 'claimRules') && <RulesView />}
        {view === 'claimTerms' && <ClaimTermsView />}
      </main>

      <Footer 
        view={view} 
        setView={setView} 
        selectedParcelsCount={selectedParcels.length}
        onSelectAllParcels={handleSelectAllParcels}
        onShowPackingModal={() => setShowPackingModal(true)}
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

      {/* Floating Customer Service */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed right-4 bottom-32 w-12 h-12 bg-white rounded-full shadow-lg flex flex-col items-center justify-center z-30 border border-gray-100"
      >
        <Headphones className="w-5 h-5 text-[#4A90E2]" />
        <span className="text-[8px] text-gray-500 font-medium">客服</span>
      </motion.button>
    </div>
  );
}
