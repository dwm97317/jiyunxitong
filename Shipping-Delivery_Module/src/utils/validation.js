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


// ============ ADDITIONAL VALIDATION FUNCTIONS ============

/**
 * Validate phone number (Chinese format: 11 digits, starts with 1[3-9])
 */
export function validatePhone(phone) {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate currency/money value
 */
export function validateCurrency(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0 && num <= 999999;
}

/**
 * Validate text length
 */
export function validateTextLength(text, minLength = 1, maxLength = 100) {
  const trimmed = text.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

/**
 * Validate quantity (positive integer)
 */
export function validateQuantity(qty) {
  const num = parseInt(qty);
  return !isNaN(num) && num > 0 && num <= 9999 && Number.isInteger(num);
}

/**
 * Validate email
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL
 */
export function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize text input (remove special characters)
 */
export function sanitizeText(text) {
  return text.replace(/[^\w\s\u4E00-\u9FFF]/g, '');
}

/**
 * Sanitize number input (only digits and decimal point)
 */
export function sanitizeNumber(value) {
  let sanitized = value.replace(/[^\d.]/g, '');
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    sanitized = parts[0] + '.' + parts.slice(1).join('');
  }
  return sanitized;
}

/**
 * Sanitize phone input (only digits)
 */
export function sanitizePhone(phone) {
  return phone.replace(/[^\d]/g, '');
}

/**
 * Get validation error message
 */
export function getValidationErrorMessage(fieldName, validationType) {
  const messages = {
    required: `${fieldName}不能为空`,
    phone: `${fieldName}格式不正确（11位数字，以1[3-9]开头）`,
    currency: `${fieldName}必须为正数，最多999999`,
    text: `${fieldName}长度不符合要求`,
    quantity: `${fieldName}必须为1-9999之间的整数`,
    email: `${fieldName}格式不正确`,
    url: `${fieldName}格式不正确`,
  };
  return messages[validationType] || '输入不符合要求';
}
