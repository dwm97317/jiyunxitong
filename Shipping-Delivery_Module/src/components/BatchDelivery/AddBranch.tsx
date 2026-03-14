import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Globe, Map } from 'lucide-react';

interface BranchData {
  name: string;
  address: string;
}

interface AddBranchProps {
  onBack: () => void;
  onConfirm: (branch: BranchData) => void;
}

const AddBranch: React.FC<AddBranchProps> = ({ onBack, onConfirm }) => {
  const [selectedBranchId, setSelectedBranchId] = useState<number>(1);

  const branches = [
    { 
      id: 1, 
      headerTitle: '我绑定的网点', 
      headerColor: 'bg-[#407BFF]', // Màu xanh dương
      name: '江西南昌网点', 
      address: '江西省-南昌市-中节能国际中心3号楼，XXXX室，XXX柜台' 
    },
    { 
      id: 2, 
      headerTitle: '河北秦皇岛网点', 
      headerColor: 'bg-[#8957E5]', // Màu tím
      name: '河北秦皇岛网点', 
      address: '江西省-南昌市-中节能国际中心3号楼，XXXX室，XXX柜台'
    }
  ];

  const handleConfirm = () => {
    const branch = branches.find(b => b.id === selectedBranchId);
    if (branch) {
      onConfirm({ name: branch.name, address: branch.address });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-20">
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-1"><ChevronLeft size={24} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-medium text-gray-800">添加网点</h1>
        <button className="p-1"><MoreHorizontal size={24} className="text-gray-800" /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {branches.map((branch) => {
          const isSelected = selectedBranchId === branch.id;
          return (
            <div key={branch.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-transparent">
              {/* Header Colored */}
              <div 
                onClick={() => setSelectedBranchId(branch.id)}
                className={`${branch.headerColor} px-4 py-3 flex justify-between items-center cursor-pointer text-white`}
              >
                <div className="flex items-center text-[15px] font-medium">
                  <Globe size={18} className="mr-2 opacity-90" /> {branch.headerTitle}
                </div>
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white">
                  {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                 <div className="flex items-center">
                    <div className="w-5 flex justify-center mr-2"><div className="w-3 h-3 border-2 border-gray-300 rounded-sm"></div></div>
                    <span className="text-gray-600 text-[14px] w-20">网点名称</span>
                    <span className="text-gray-900 text-[14px] flex-1 text-right font-medium">{branch.name}</span>
                 </div>
                 
                 <div className="flex items-start">
                    <div className="w-5 flex justify-center mr-2 mt-0.5"><div className="w-3.5 h-3.5 border-2 border-gray-300 relative"><div className="absolute inset-0 m-auto w-1 h-1 bg-gray-300"></div></div></div>
                    <span className="text-gray-600 text-[14px] w-20">网点地址</span>
                    <span className="text-gray-900 text-[14px] flex-1 text-right leading-snug">{branch.address}</span>
                 </div>
                 
                 {/* Input form */}
                 <div className="mt-2">
                    <input 
                      type="text" 
                      placeholder="请输入电话号码" 
                      className="w-full bg-[#F4F5F7] px-4 py-3 rounded-xl text-[14px] outline-none placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                 </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white px-5 py-3 absolute bottom-0 w-full z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] border-t border-gray-100">
        <button 
          onClick={handleConfirm}
          className="w-full py-3.5 rounded-full text-white font-medium text-[16px] bg-blue-600 shadow-md shadow-blue-200 active:scale-[0.98] transition-all"
        >
          确定
        </button>
      </div>
    </div>
  );
};

export default AddBranch;