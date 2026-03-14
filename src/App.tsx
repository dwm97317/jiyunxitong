import { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import HomePage from './components/HomePage';
import OrderDetail from './components/OrderDetail';
import PackageList from './components/PackageList';
import Scanner from './components/Scanner';
import CheckExpress from './components/CheckExpress';
import LogisticsTracking from './components/LogisticsTracking';
import WarehouseManagement from './components/WarehouseManagement';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-gray-900">
        {/* Status Bar Mock */}
        <div className={`h-11 w-full flex justify-between items-center px-6 absolute top-0 left-0 z-50 ${currentScreen === 'scanner' ? 'text-white' : 'text-black'}`}>
          <span className="text-[14px] font-medium">9:41</span>
          <div className="flex items-center gap-1.5">
            {/* Signal */}
            <div className="flex items-end gap-[2px] h-3">
              <div className={`w-[3px] h-1.5 rounded-sm ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'}`}></div>
              <div className={`w-[3px] h-2 rounded-sm ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'}`}></div>
              <div className={`w-[3px] h-2.5 rounded-sm ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'}`}></div>
              <div className={`w-[3px] h-3 rounded-sm ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'}`}></div>
            </div>
            {/* Wifi */}
            <svg className={`w-4 h-4 ${currentScreen === 'scanner' ? 'text-white' : 'text-black'}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" />
              <path d="M12 13C14.7614 13 17.2614 14.1193 19.0711 15.9289L20.4853 14.5147C18.3137 12.3431 15.3137 11 12 11C8.68629 11 5.68629 12.3431 3.51472 14.5147L4.92893 15.9289C6.73858 14.1193 9.23858 13 12 13Z" />
              <path d="M12 5C16.9706 5 21.4706 7.01472 24.7279 10.2721L26.1421 8.85786C22.5228 5.23858 17.5228 3 12 3C6.47715 3 1.47715 5.23858 -2.14214 8.85786L-0.727922 10.2721C2.52944 7.01472 7.02944 5 12 5Z" />
            </svg>
            {/* Battery */}
            <div className={`w-6 h-3 rounded-[4px] border border-opacity-30 ${currentScreen === 'scanner' ? 'border-white' : 'border-black'} relative flex items-center p-[1px]`}>
              <div className={`h-full w-[80%] rounded-[2px] ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'}`}></div>
              <div className={`absolute right-[-3px] top-1/2 -translate-y-1/2 w-[2px] h-1 ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'} rounded-r-sm opacity-30`}></div>
            </div>
          </div>
        </div>

        <div className={`h-full w-full ${['checkExpress', 'warehouse', 'logistics'].includes(currentScreen) ? '' : 'pt-11'} overflow-y-auto overflow-x-hidden relative hide-scrollbar`}>
          {currentScreen === 'home' && <HomePage onNavigate={setCurrentScreen} />}
          {currentScreen === 'orderDetail' && <OrderDetail onBack={() => setCurrentScreen('packageList')} />}
          {currentScreen === 'packageList' && <PackageList onNavigate={setCurrentScreen} />}
          {currentScreen === 'scanner' && <Scanner onBack={() => setCurrentScreen('packageList')} />}
          {currentScreen === 'checkExpress' && <CheckExpress onBack={() => setCurrentScreen('home')} onNavigate={setCurrentScreen} />}
          {currentScreen === 'warehouse' && <WarehouseManagement onBack={() => setCurrentScreen('home')} />}
          {currentScreen === 'logistics' && <LogisticsTracking onBack={() => setCurrentScreen('checkExpress')} />}
        </div>

        {/* Home Indicator Mock */}
        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-1.5 rounded-full z-50 ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'}`}></div>
      </div>
    </div>
    </LanguageProvider>
  );
}
