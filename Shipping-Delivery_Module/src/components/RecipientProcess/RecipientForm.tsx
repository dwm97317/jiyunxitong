import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Settings, Info, Trash2, Image as ImageIcon, Mic, ChevronRight, CheckCircle2, X, Package } from 'lucide-react';

interface RecipientFormProps {
  selectedGoods: string;
  goodsQuantity: number;
  onOpenGoodsModal: () => void;
  onSubmit: () => void;
}

const RecipientForm: React.FC<RecipientFormProps> = ({ selectedGoods, goodsQuantity, onOpenGoodsModal, onSubmit }) => {
  // Các state tương tác thực tế
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [saveToAddressBook, setSaveToAddressBook] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Validation functions
  const validatePhone = (phoneNum: string): boolean => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phoneNum);
  };

  const validateName = (nameStr: string): boolean => {
    return nameStr.trim().length > 0 && nameStr.trim().length <= 50;
  };

  const validateAddress = (addressStr: string): boolean => {
    return addressStr.trim().length > 0 && addressStr.trim().length <= 200;
  };

  // Handle phone input - only numbers, max 11 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhone(value);
    if (errors.phone) {
      setErrors({ ...errors, phone: '' });
    }
  };

  // Handle name input - max 50 characters
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 50);
    setName(value);
    if (errors.name) {
      setErrors({ ...errors, name: '' });
    }
  };

  // Handle address input - max 200 characters
  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 200);
    setAddress(value);
    if (errors.address) {
      setErrors({ ...errors, address: '' });
    }
  };

  // Validate form before submit
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!validateName(name)) {
      newErrors.name = '请输入有效的姓名(1-50字符)';
    }

    if (!phone) {
      newErrors.phone = '请输入手机号码';
    } else if (!validatePhone(phone)) {
      newErrors.phone = '手机号码格式不正确(11位数字)';
    }

    if (!validateAddress(address)) {
      newErrors.address = '请输入有效的地址(1-200字符)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Logic kiểm tra form đã điền đủ chưa (hiện nút xanh)
  const isFormValid = name.trim() !== '' && phone.trim() !== '' && address.trim() !== '';

  const handleSubmitClick = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] relative">
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-10 shadow-sm">
        <button className="p-1"><ChevronLeft size={24} className="text-gray-800" /></button>
        <h1 className="text-lg font-medium text-gray-800">收件人信息</h1>
        <div className="flex items-center gap-2">
          <button className="p-1"><MoreHorizontal size={24} className="text-gray-800" /></button>
          <button className="p-1"><Settings size={20} className="text-gray-800" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="bg-[#EEF2FF] px-4 py-2.5 flex items-start text-xs text-blue-600">
          <Info size={14} className="mt-0.5 mr-1.5 flex-shrink-0" />
          <p>按照海关实名寄递与并根据防范要求，请填写真实身份信息。<br/>检查所寄物品有无违规禁品。</p>
          <button className="ml-auto text-blue-400 p-1"><X size={14} /></button>
        </div>

        {/* Khối Thông tin người nhận */}
        <div className="bg-white m-3 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-gray-800">收件人信息</h2>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-600 w-24">国家</span>
              <div className="flex items-center text-gray-800 font-medium flex-1 justify-end cursor-pointer">
                英国 <ChevronRight size={18} className="text-gray-400 ml-1" />
              </div>
            </div>

            <div className="flex border-b border-gray-100 pb-3">
              <div className="w-1/2">
                 <input 
                   type="text" 
                   value={name}
                   onChange={handleNameChange}
                   placeholder="真实姓名" 
                   className={`w-full outline-none text-gray-800 placeholder-gray-400 ${errors.name ? 'text-red-500' : ''}`}
                   maxLength={50}
                 />
                 {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="w-1/2 pl-3 border-l border-gray-100">
                 <input 
                   type="text" 
                   value={phone}
                   onChange={handlePhoneChange}
                   placeholder="电话/手机号" 
                   className={`w-full outline-none text-gray-800 placeholder-gray-400 ${errors.phone ? 'text-red-500' : ''}`}
                   maxLength={11}
                   inputMode="numeric"
                 />
                 {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="border-b border-gray-100 pb-3">
               <textarea 
                 value={address}
                 onChange={handleAddressChange}
                 placeholder="详细地址 (例如：xx街xx号xx)" 
                 className={`w-full h-12 outline-none text-gray-800 placeholder-gray-400 resize-none ${errors.address ? 'text-red-500' : ''}`}
                 maxLength={200}
               />
               {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          </div>

          <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-50">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSaveToAddressBook(!saveToAddressBook)}>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${saveToAddressBook ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                {saveToAddressBook && <CheckCircle2 size={12} className="text-white" />}
              </div>
              <span className="text-sm text-gray-700">保存到地址簿</span>
            </div>
            <button 
              onClick={() => { setName(''); setPhone(''); setAddress(''); }}
              className="flex items-center text-gray-500 text-sm gap-1 hover:text-gray-700"
            >
              <Trash2 size={14} /> 清空当前信息
            </button>
          </div>
        </div>

        {/* Khối Chọn Tên Hàng Hóa (Click để mở Popup) */}
        <div className="bg-white m-3 rounded-xl p-4 shadow-sm">
          <div 
            onClick={onOpenGoodsModal}
            className="flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center">
               <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                 <Package size={16} className="text-blue-600" />
               </div>
               <span className="text-gray-800 font-medium">货物名称</span>
               <span className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded ml-2">必填</span>
            </div>
            <div className="flex items-center text-[14px]">
              {selectedGoods ? (
                <span className="text-gray-800 font-medium">{selectedGoods} <span className="text-gray-500 font-normal ml-1">x{goodsQuantity}</span></span>
              ) : (
                <span className="text-gray-400">请完善货物名称</span>
              )}
              <ChevronRight size={18} className="text-gray-400 ml-1" />
            </div>
          </div>
        </div>

        {/* Khối Nhận diện thông minh */}
        <div className="bg-white m-3 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium text-gray-800">智能识别</h2>
          </div>
          <div className="bg-[#F8F9FA] rounded-lg p-3 mb-3 relative focus-within:ring-1 focus-within:ring-blue-500">
            <textarea 
              placeholder="请粘贴或输入一段包含姓名、电话、地址的信息自动识别..."
              className="w-full h-16 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 resize-none"
            />
          </div>
          <div className="flex gap-4">
            <button className="flex items-center text-sm text-gray-600 gap-1.5 hover:text-blue-600"><ImageIcon size={18} className="text-gray-400" /> 图片识别</button>
            <button className="flex items-center text-sm text-gray-600 gap-1.5 border-l border-gray-200 pl-4 hover:text-blue-600"><Mic size={18} className="text-gray-400" /> 语音识别</button>
          </div>
        </div>
      </div>

      <div className="bg-white px-4 py-3 absolute bottom-0 w-full z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] border-t border-gray-100">
        <button 
          onClick={handleSubmitClick}
          disabled={!isFormValid}
          className={`w-full py-3.5 rounded-full text-white font-medium text-[15px] transition-all ${isFormValid ? 'bg-blue-600 shadow-md shadow-blue-200 active:scale-[0.98]' : 'bg-blue-300 cursor-not-allowed'}`}
        >
          立即保存
        </button>
      </div>
    </div>
  );
};

export default RecipientForm;