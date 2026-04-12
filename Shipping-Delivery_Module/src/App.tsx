import React, { useState } from 'react';
import Phase1Test from './components/RecipientProcess';
import Phase2Test from './components/ShippingMethod';
import Phase3Test from './components/GoodsInformation';
import Phase4Test from './components/BatchDelivery';
import Phase5Test from './components/SpecialServices';
import Phase6Test from './components/PriceAndTime';
import Phase78Test from './components/BranchesAndPolicies';

// Định nghĩa Type cho các item trong Menu
interface PhaseItem {
  id: number;
  name: string;
  desc: string;
}

const App: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number>(1);

  // Danh sách các giai đoạn để tạo Menu
  const phases: PhaseItem[] = [
    { id: 1, name: 'Phase 1: Quy Trình Gửi Hàng', desc: 'Form người nhận, popup tên hàng' },
    { id: 2, name: 'Phase 2: Chọn Phương Thức', desc: 'Modal Logistics, Express' },
    { id: 3, name: 'Phase 3: Chi Tiết Hàng Hóa', desc: 'Chọn hàng, Hàng quá khổ' },
    { id: 4, name: 'Phase 4: Gửi Hàng Hàng Loạt', desc: 'Thêm nhiều người nhận, điểm giao dịch' },
    { id: 5, name: 'Phase 5: Dịch Vụ Đặc Biệt', desc: 'Đặc biệt, Bảo hiểm, Tự lấy, Vận đơn lớn' },
    { id: 6, name: 'Phase 6: Giá Cả & Thời Gian', desc: 'Bảng giá, Máy tính cước phí' },
    { id: 7, name: 'Phase 7 & 8: Quy Định & Điểm', desc: 'Hàng cấm, Tiêu chuẩn, Thỏa thuận' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans">
      
      {/* Menu Điều Hướng (Sidebar bên trái trên Desktop, nằm trên cùng trên Mobile) */}
      <div className="w-full md:w-80 bg-white shadow-xl z-50 flex flex-col h-auto md:h-screen sticky top-0">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-blue-600 tracking-tight">Logistics UI (TSX)</h1>
          <p className="text-sm text-gray-500 mt-1">Tổng hợp 36 màn hình React/TypeScript</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${
                activePhase === phase.id 
                  ? 'bg-blue-50 border-blue-500 shadow-sm' 
                  : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
              }`}
            >
              <div className={`font-semibold ${activePhase === phase.id ? 'text-blue-700' : 'text-gray-800'}`}>
                {phase.name}
              </div>
              <div className={`text-xs mt-1 ${activePhase === phase.id ? 'text-blue-500' : 'text-gray-400'}`}>
                {phase.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Khu vực hiển thị Màn hình Mobile (Bên phải) */}
      <div className="flex-1 relative overflow-y-auto bg-gray-200">
        {/* Render Component tương ứng với Phase đang được chọn */}
        {activePhase === 1 && <Phase1Test />}
        {activePhase === 2 && <Phase2Test />}
        {activePhase === 3 && <Phase3Test />}
        {activePhase === 4 && <Phase4Test />}
        {activePhase === 5 && <Phase5Test />}
        {activePhase === 6 && <Phase6Test />}
        {activePhase === 7 && <Phase78Test />}
      </div>

    </div>
  );
};

export default App;