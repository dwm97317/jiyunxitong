// Validation utilities

export const validateNumber = (value, min = 0, max = Infinity) => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  if (num < min || num > max) return false;
  return true;
};

export const validatePhone = (phone) => {
  // Chinese phone number: 11 digits starting with 1
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validatePositiveNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

export const handleNumberInput = (e, callback, options = {}) => {
  const { min = 0, max = Infinity, decimals = 2, allowNegative = false } = options;
  let value = e.target.value;
  
  // Remove non-numeric characters except decimal point and minus sign
  if (allowNegative) {
    value = value.replace(/[^\d.-]/g, '');
  } else {
    value = value.replace(/[^\d.]/g, '');
  }
  
  // Ensure only one decimal point
  const parts = value.split('.');
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Limit decimal places
  if (parts.length === 2 && parts[1].length > decimals) {
    value = parts[0] + '.' + parts[1].substring(0, decimals);
  }
  
  // Check min/max
  const num = parseFloat(value);
  if (!isNaN(num)) {
    if (num < min) value = min.toString();
    if (num > max) value = max.toString();
  }
  
  // Prevent negative numbers if not allowed
  if (!allowNegative && value.startsWith('-')) {
    value = value.substring(1);
  }
  
  callback(value);
};

export const handleIntegerInput = (e, callback, options = {}) => {
  const { min = 0, max = Infinity, allowNegative = false } = options;
  let value = e.target.value;
  
  // Remove non-numeric characters except minus sign
  if (allowNegative) {
    value = value.replace(/[^\d-]/g, '');
  } else {
    value = value.replace(/\D/g, '');
  }
  
  // Prevent negative numbers if not allowed
  if (!allowNegative && value.startsWith('-')) {
    value = value.substring(1);
  }
  
  // Check min/max
  const num = parseInt(value);
  if (!isNaN(num)) {
    if (num < min) value = min.toString();
    if (num > max) value = max.toString();
  }
  
  callback(value);
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  }).format(value);
};

export const getErrorMessage = (field, type) => {
  const messages = {
    required: `${field}不能为空`,
    number: `${field}必须是数字`,
    positive: `${field}必须大于0`,
    phone: '手机号码格式不正确',
    email: '邮箱格式不正确',
    min: `${field}不能小于最小值`,
    max: `${field}不能大于最大值`,
    negative: `${field}不能为负数`
  };
  return messages[type] || '输入有误';
};
