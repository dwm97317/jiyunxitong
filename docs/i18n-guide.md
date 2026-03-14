# Hướng dẫn sử dụng hệ thống đa ngôn ngữ (i18n)

## Tổng quan

Ứng dụng hỗ trợ 3 ngôn ngữ:
- 🇻🇳 Tiếng Việt (vi)
- 🇨🇳 中文 (zh) - Mặc định
- 🇺🇸 English (en)

## Cách sử dụng trong component

### 1. Import hook useLanguage

```typescript
import { useLanguage } from '../i18n/LanguageContext';
```

### 2. Sử dụng trong component

```typescript
export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t.appTitle}</h1>
      <p>{t.appSubtitle}</p>
      <button onClick={() => setLanguage('en')}>
        Switch to English
      </button>
    </div>
  );
}
```

## Thêm bản dịch mới

### Bước 1: Cập nhật interface Translations

Mở file `src/i18n/translations.ts` và thêm key mới:

```typescript
export interface Translations {
  // ... existing keys
  newFeature: string;
  newFeatureDesc: string;
}
```

### Bước 2: Thêm bản dịch cho 3 ngôn ngữ

```typescript
export const translations: Record<Language, Translations> = {
  vi: {
    // ... existing translations
    newFeature: 'Tính năng mới',
    newFeatureDesc: 'Mô tả tính năng mới',
  },
  zh: {
    // ... existing translations
    newFeature: '新功能',
    newFeatureDesc: '新功能描述',
  },
  en: {
    // ... existing translations
    newFeature: 'New Feature',
    newFeatureDesc: 'New feature description',
  }
};
```

### Bước 3: Sử dụng trong component

```typescript
const { t } = useLanguage();

<h2>{t.newFeature}</h2>
<p>{t.newFeatureDesc}</p>
```

## Component LanguageSwitcher

Component này đã được tích hợp sẵn trong HomePage. Để thêm vào component khác:

```typescript
import LanguageSwitcher from './LanguageSwitcher';

export default function MyComponent() {
  return (
    <div>
      <LanguageSwitcher />
      {/* Your content */}
    </div>
  );
}
```

## Lưu trữ ngôn ngữ

Ngôn ngữ được chọn sẽ tự động lưu vào `localStorage` với key `language`.
Khi người dùng quay lại, ngôn ngữ đã chọn sẽ được khôi phục.

## Thêm ngôn ngữ mới

### Bước 1: Cập nhật type Language

```typescript
export type Language = 'vi' | 'zh' | 'en' | 'ja'; // Thêm 'ja' cho tiếng Nhật
```

### Bước 2: Thêm bản dịch

```typescript
export const translations: Record<Language, Translations> = {
  // ... existing languages
  ja: {
    appTitle: 'オーロラエクスプレス',
    appSubtitle: 'スマート物流マネージャー',
    // ... all other translations
  }
};
```

### Bước 3: Cập nhật LanguageSwitcher

```typescript
const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }, // Thêm dòng này
];
```

## Best Practices

### 1. Đặt tên key rõ ràng

```typescript
// ❌ Không tốt
title1: string;
text2: string;

// ✅ Tốt
packageListTitle: string;
orderDetailDescription: string;
```

### 2. Nhóm các key liên quan

```typescript
// Nhóm theo feature
export interface Translations {
  // HomePage
  homeTitle: string;
  homeSubtitle: string;
  
  // PackageList
  packageListTitle: string;
  packageListFilter: string;
  
  // OrderDetail
  orderDetailTitle: string;
  orderDetailInfo: string;
}
```

### 3. Sử dụng namespace cho các giá trị chung

```typescript
// Common actions
common: {
  save: string;
  cancel: string;
  delete: string;
  edit: string;
}
```

## Ví dụ hoàn chỉnh

```typescript
import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function MyFeature() {
  const { t, language } = useLanguage();
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t.myFeatureTitle}</h1>
        <LanguageSwitcher />
      </div>
      
      <p className="text-gray-600">{t.myFeatureDescription}</p>
      
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        {t.myFeatureAction}
      </button>
      
      <p className="mt-2 text-sm text-gray-500">
        Current language: {language}
      </p>
    </div>
  );
}
```

## Kiểm tra

Để kiểm tra hệ thống đa ngôn ngữ:

1. Chạy ứng dụng: `npm run dev`
2. Nhấp vào biểu tượng ngôn ngữ (🌐) ở góc trên bên phải
3. Chọn ngôn ngữ khác nhau và kiểm tra nội dung thay đổi
4. Refresh trang và kiểm tra ngôn ngữ được giữ nguyên

## Troubleshooting

### Lỗi: "useLanguage must be used within LanguageProvider"

Đảm bảo component của bạn được bọc trong `<LanguageProvider>`:

```typescript
// App.tsx
import { LanguageProvider } from './i18n/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <YourComponents />
    </LanguageProvider>
  );
}
```

### Bản dịch không hiển thị

1. Kiểm tra key có tồn tại trong interface `Translations`
2. Kiểm tra đã thêm bản dịch cho cả 3 ngôn ngữ
3. Kiểm tra không có lỗi TypeScript
