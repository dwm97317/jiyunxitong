import React, { useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import BottomSheet from '../../components/BottomSheet';
import { BaseModalProps } from '../../types';

interface InputModalProps extends BaseModalProps {
  onConfirm: (val: string) => void;
}

export const WeightModal: React.FC<InputModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [weight, setWeight] = useState<string>('0.5');
  const [error, setError] = useState<string>('');

  const validateWeight = (value: string): boolean => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0 && num <= 100;
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Only allow numbers and decimal point
    value = value.replace(/[^\d.]/g, '');
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    // Limit to 2 decimal places
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    setWeight(value);
    if (error) setError('');
  };

  const handleMinus = () => {
    const num = parseFloat(weight) - 0.5;
    if (num > 0) {
      setWeight(num.toFixed(1));
    }
  };

  const handlePlus = () => {
    const num = parseFloat(weight) + 0.5;
    if (num <= 100) {
      setWeight(num.toFixed(1));
    }
  };

  const handleConfirm = () => {
    if (!validateWeight(weight)) {
      setError('请输入0-100之间的数字');
      return;
    }
    onConfirm(weight);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="填写预估重量">
      <div className="space-y-4 px-1">
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-800 text-[15px]">预估重量 <span className="text-gray-400 text-[13px] ml-1">(包含外包装的总重量)</span></span>
          <div className="flex flex-col items-end">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-9">
              <button onClick={handleMinus} className="w-10 h-full flex items-center justify-center bg-[#F8F9FA] text-gray-500 text-lg hover:bg-gray-100 transition-colors"><Minus size={16}/></button>
              <div className="flex items-center justify-center w-16 border-x border-gray-200 h-full bg-white">
                <input 
                  type="text" 
                  value={weight} 
                  onChange={handleWeightChange}
                  inputMode="decimal"
                  className={`w-10 text-center text-[15px] font-bold outline-none bg-transparent ${error ? 'text-red-500' : ''}`}
                  maxLength={6}
                />
                <span className="text-[13px] text-gray-600 font-medium">KG</span>
              </div>
              <button onClick={handlePlus} className="w-10 h-full flex items-center justify-center bg-[#F8F9FA] text-gray-800 text-lg hover:bg-gray-100 transition-colors"><Plus size={16}/></button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        </div>
        
        {/* Box Xanh */}
        <div className="bg-[#EEF2FF] rounded-xl p-3.5 border border-indigo-50">
          <div className="text-blue-600 text-[13px] leading-relaxed">
            <div className="mb-1">请注意：</div>
            <div className="font-bold mb-1">1.实际计费重量以仓库核实为准</div>
            <div className="font-bold">2.体积重量和实际重量两者取最大者计费</div>
          </div>
        </div>

        {/* Text Rules */}
        <div className="text-[12px] text-gray-500 space-y-1.5 pt-2">
          <div>计费规则：</div>
          <div>体积重量（kg）=（长(cm) × 宽(cm) × 高(cm)）÷6000</div>
          <div>国际物流首续重以0.5kg为计费单位，不足时按0.5kg计费</div>
          <div>例如：21kg以下，体积重量为1.01kg，按1.5kg计费</div>
        </div>

        <button onClick={handleConfirm} className="w-full bg-blue-600 text-white rounded-full py-3.5 mt-6 font-medium text-[16px] shadow-md shadow-blue-200 active:scale-[0.98] transition-all">
          确定
        </button>
      </div>
    </BottomSheet>
  );
};

export const VolumeModal: React.FC<InputModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [l, setL] = useState(''); 
  const [w, setW] = useState(''); 
  const [h, setH] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const vol = (parseFloat(l||'0') * parseFloat(w||'0') * parseFloat(h||'0') / 5000).toFixed(2);

  const validateDimension = (value: string): boolean => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0 && num <= 500;
  };

  const handleDimensionChange = (field: string, value: string) => {
    // Only allow numbers and decimal point
    value = value.replace(/[^\d.]/g, '');
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    // Limit to 1 decimal place
    if (parts.length === 2 && parts[1].length > 1) {
      value = parts[0] + '.' + parts[1].substring(0, 1);
    }
    
    if (field === 'l') setL(value);
    else if (field === 'w') setW(value);
    else if (field === 'h') setH(value);
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleConfirm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!l || !validateDimension(l)) {
      newErrors.l = '请输入有效的长度(1-500cm)';
    }
    if (!w || !validateDimension(w)) {
      newErrors.w = '请输入有效的宽度(1-500cm)';
    }
    if (!h || !validateDimension(h)) {
      newErrors.h = '请输入有效的高度(1-500cm)';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onConfirm(`${l}x${w}x${h}`);
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="预估体积重">
      <div className="space-y-4 px-1">
        <div className="flex justify-between items-center bg-[#F4F5F7] rounded-xl p-1.5 border border-gray-100">
          <div className="flex-1 flex flex-col items-center bg-white rounded-lg px-2 py-2 shadow-sm">
             <span className="text-gray-500 text-[14px] w-6">长</span>
             <input 
               type="text" 
               value={l} 
               onChange={e => handleDimensionChange('l', e.target.value)}
               inputMode="decimal"
               className={`w-full text-center outline-none text-[15px] font-bold text-gray-800 ${errors.l ? 'text-red-500' : ''}`}
               maxLength={6}
             />
             <span className="text-gray-400 text-[13px]">cm</span>
             {errors.l && <p className="text-red-500 text-xs mt-1">{errors.l}</p>}
          </div>
          <X size={14} className="text-gray-400 mx-2" />
          <div className="flex-1 flex flex-col items-center bg-white rounded-lg px-2 py-2 shadow-sm">
             <span className="text-gray-500 text-[14px] w-6">宽</span>
             <input 
               type="text" 
               value={w} 
               onChange={e => handleDimensionChange('w', e.target.value)}
               inputMode="decimal"
               className={`w-full text-center outline-none text-[15px] font-bold text-gray-800 ${errors.w ? 'text-red-500' : ''}`}
               maxLength={6}
             />
             <span className="text-gray-400 text-[13px]">cm</span>
             {errors.w && <p className="text-red-500 text-xs mt-1">{errors.w}</p>}
          </div>
          <X size={14} className="text-gray-400 mx-2" />
          <div className="flex-1 flex flex-col items-center bg-white rounded-lg px-2 py-2 shadow-sm">
             <span className="text-gray-500 text-[14px] w-6">高</span>
             <input 
               type="text" 
               value={h} 
               onChange={e => handleDimensionChange('h', e.target.value)}
               inputMode="decimal"
               className={`w-full text-center outline-none text-[15px] font-bold text-gray-800 ${errors.h ? 'text-red-500' : ''}`}
               maxLength={6}
             />
             <span className="text-gray-400 text-[13px]">cm</span>
             {errors.h && <p className="text-red-500 text-xs mt-1">{errors.h}</p>}
          </div>
        </div>
        
        <div className="text-[14px] text-gray-800 mb-2">预计体积重= <span className="font-bold text-[16px]">{vol}</span> KG</div>

        <div className="bg-[#EEF2FF] rounded-xl p-3 border border-indigo-50">
          <div className="text-blue-600 text-[13px] leading-relaxed">
            温馨提示：当物品的体积太大且重量太轻时，在运输中就会把它的体积折算成重量来收取费用
          </div>
        </div>

        <div className="text-[12px] text-gray-500 space-y-1.5 pt-2">
          <div className="text-gray-800 font-bold text-[14px] mb-1">计算公式：</div>
          <div>空运：体积重量(kg)=(长(cm)x宽(cm)x高(cm))÷5000</div>
          <div>海运：体积重量(kg)=(长(cm)x宽(cm)x高(cm))÷6000</div>
          <div>注意：体积重量计算结果会自动进位到整数</div>
          <div>例如：计算结果为1.01kg，自动进位到2kg</div>
          
          <div className="text-gray-800 font-bold text-[14px] mt-4 mb-1">物品尺寸限制：</div>
          <div>空派服务：单边&lt;120cm，外围上≤265cm</div>
          <div>专递服务：单边&lt;120cm，第二边&lt;76cm</div>
          
          <div className="text-gray-800 font-bold text-[14px] mt-4 mb-1">重量限制：</div>
          <div>空派服务：重量&lt;40kg</div>
          <div>专递服务：重量&lt;68kg</div>
          <div className="text-red-500 mt-2">超大超长超重件详情见计费规则</div>
        </div>

        <button onClick={handleConfirm} className="w-full bg-blue-600 text-white rounded-full py-3.5 mt-4 font-medium text-[16px] shadow-md shadow-blue-200 active:scale-[0.98] transition-all">
          确定
        </button>
      </div>
    </BottomSheet>
  );
};

export const BillingRulesModal: React.FC<BaseModalProps> = ({ isOpen, onClose }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="关于计费规则">
      <div className="space-y-4 text-[14px] text-gray-600 leading-relaxed px-1">
        <p className="font-bold text-gray-900 text-[15px]">
          实际重量以仓库称重后确定为准，物品在包装后重量可能发生变化。<span className="text-red-500">重量小体积大时</span>会按体积重量收费。
        </p>
        <p>
          1、空运（标快专递、特快专递、空派）托寄物的计费重量取体积重量与实际重量两者之间的较大值，体积重量的计算方法为：体积重量=长(CM)x宽(CM)x高(CM)÷5000；
        </p>
        <p>
          2、海运（标船、快船）托寄物的计费重量取体积重量与实际重量两者之间的较大值，体积重量的计算方法为：体积重量=长(CM)x宽(CM)x高(CM)÷6000；
        </p>
        <p>
          3、超大件（空派超大件 卡派超大件）托寄物的计费重量取体积重量与实际重量两者之间的较大值，体积重量的计算方法为：体积重量= 长(CM)x宽(CM)x高(CM)÷6000；注：超大件不足150KGS按150KGS计费；
        </p>
        <p>
          4、专递产品&gt;21KG计费重量小数点进位处理方式：续重以1KG整数为计重单位，不足1kg，按1kg计费；21KG&lt;则按0.5KG为计重单位，不足0.5KG按0.5KG计费
        </p>
      </div>
      <button onClick={onClose} className="w-full bg-blue-600 text-white rounded-full py-3.5 mt-6 font-medium text-[16px] shadow-md shadow-blue-200 active:scale-[0.98] transition-all">
        我知道了
      </button>
    </BottomSheet>
  );
};
