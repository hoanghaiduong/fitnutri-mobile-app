# FitNutri Mobile App - Project Guide

## 1. Kiến trúc project

- **Framework**: Expo + React Native
- **Language**: TypeScript strict
- **Routing**: Expo Router
- **Styling**: NativeWind + semantic theme tokens
- **State global**: Zustand
- **Form**: React Hook Form + Zod
- **Persistence local**: AsyncStorage
- **Architecture style**: feature-first kết hợp shared UI system

### Nguyên tắc kiến trúc
- `app/` chỉ giữ route và screen entry.
- `src/features/` chứa business domain theo từng module.
- `src/ui/` chứa reusable primitive components.
- `src/theme/` chứa token, provider, theme mapping.
- `src/services/` xử lý data/persistence/API.
- `src/store/` cho global state tối thiểu và rõ trách nhiệm.
- `src/lib/` cho util nền tảng như storage, class merge.

### Hướng scale thực tế
- Tách route group: `(auth)`, `(tabs)`, `(modals)` khi app lớn hơn.
- Mỗi feature có thể có `components/`, `hooks/`, `services/`, `types/`, `constants.ts` riêng.
- Không đưa business logic xuống UI primitives.

---

## 2. Danh sách package cần cài

### Core
- `expo`
- `react`
- `react-native`
- `expo-router`
- `expo-status-bar`
- `react-native-safe-area-context`
- `react-native-screens`

### UI / Styling
- `nativewind`
- `tailwindcss`
- `clsx`
- `tailwind-merge`
- `class-variance-authority`
- `@expo/vector-icons`

### Form / Validation
- `react-hook-form`
- `zod`
- `@hookform/resolvers`

### State / Storage
- `zustand`
- `@react-native-async-storage/async-storage`

### Dev
- `typescript`
- `@types/react`
- `@babel/core`
- `eslint`

---

## 3. Cấu hình NativeWind + Tailwind + TS

### `babel.config.js`
- dùng `babel-preset-expo`
- thêm `nativewind/babel`
- thêm `expo-router/babel`

### `metro.config.js`
- wrap config bằng `withNativeWind`
- input CSS: `global.css`

### `tailwind.config.js`
- scan `app/**/*.{ts,tsx}` và `src/**/*.{ts,tsx}`
- define semantic color token qua CSS variables
- define typography scale, spacing scale, radius, shadow preset

### `tsconfig.json`
- bật `strict: true`
- alias `@/* -> src/*`
- include `nativewind/types`

---

## 4. Cấu hình theme light/dark

### Đã có sẵn
- `src/theme/tokens.ts`
- `src/theme/theme-provider.tsx`
- `src/store/theme-store.ts`
- `src/hooks/use-app-theme.ts`

### Cơ chế hoạt động
- nhận theme từ system qua `useColorScheme`
- cho phép override thủ công: `system | light | dark`
- persist mode bằng AsyncStorage
- inject semantic color vào NativeWind variables
- đồng bộ cả:
  - background
  - foreground
  - card
  - border
  - input
  - primary
  - status bar
  - tab bar

---

## 5. Bộ global design tokens

### Semantic colors
- `background`
- `foreground`
- `card`
- `cardForeground`
- `primary`
- `primaryForeground`
- `secondary`
- `secondaryForeground`
- `muted`
- `mutedForeground`
- `border`
- `input`
- `destructive`
- `success`
- `warning`

### Typography
- `heading-xl`
- `heading-lg`
- `heading-md`
- `body-lg`
- `body-md`
- `body-sm`
- `caption`

### Spacing
- `4, 8, 12, 16, 20, 24, 32, 40`

### Radius
- `sm, md, lg, xl, 2xl`

### Shadow
- `card`
- có preset light / dark trong `src/theme/tokens.ts`

---

## 6. Các component base quan trọng

Đã scaffold sẵn trong `src/ui/`:

- `button.tsx`
  - variants: `primary`, `secondary`, `outline`, `ghost`, `destructive`
  - sizes: `sm`, `md`, `lg`
  - loading state
  - disabled state
- `input.tsx`
  - label
  - hint
  - error state
  - typed props
  - forwardRef
- `text.tsx`
  - typography variants
  - semantic tone
- `screen.tsx`
  - safe area
  - keyboard aware
  - scrollable
- `card.tsx`
- `header.tsx`
- `badge.tsx`
- `avatar.tsx`
- `modal.tsx`
- `loader.tsx`
- `empty-state.tsx`

---

## 7. Ví dụ 1-2 screen hoàn chỉnh

### Home screen
File: `app/(tabs)/index.tsx`
- overview dashboard style
- header + avatar
- card intro
- theme toggle
- reusable action card list

### Settings screen
File: `app/(tabs)/settings.tsx`
- RHF + Zod form
- AsyncStorage persistence demo
- loading state rõ ràng
- keyboard aware + scrollable layout
- theme override section

---

## 8. Best practices

- Chỉ route ở `app/`, không nhét business logic vào route file quá nhiều.
- Mọi màu business UI đi qua semantic token, không hardcode palette trong component.
- Mỗi file 1 trách nhiệm chính.
- UI primitive không phụ thuộc feature business.
- Hook xử lý state/form side effect, component tập trung render.
- Khi app lớn hơn, thêm:
  - `src/services/api/`
  - `src/features/auth/`
  - `src/features/onboarding/`
  - `src/features/dashboard/`
  - `src/features/nutrition/`
- Dùng `Controller` cho input form phức tạp.
- Giữ touch target tối thiểu ~44px.
- Luôn chuẩn bị `loading / empty / error / success` state.
- Ưu tiên semantic naming hơn naming theo màu.
- Tránh file >150 dòng nếu có thể tách nhỏ.

---

## 9. Cây thư mục đề xuất

```txt
fitnutri-mobile-app/
  app/
    _layout.tsx
    (tabs)/
      _layout.tsx
      index.tsx
      settings.tsx
  src/
    components/
      theme-toggle.tsx
    common/
    constants/
      storage.ts
    features/
      home/
        components/
          action-card.tsx
        constants.ts
        types.ts
      settings/
        hooks/
          use-settings-form.ts
        schema.ts
    hooks/
      use-app-theme.ts
      use-mounted-effect.ts
    lib/
      cn.ts
      storage.ts
    services/
      profile-service.ts
    store/
      theme-store.ts
    theme/
      theme-provider.tsx
      tokens.ts
    types/
      theme.ts
    ui/
      avatar.tsx
      badge.tsx
      button.tsx
      card.tsx
      empty-state.tsx
      header.tsx
      input.tsx
      loader.tsx
      modal.tsx
      screen.tsx
      text.tsx
  app.json
  babel.config.js
  global.css
  metro.config.js
  nativewind-env.d.ts
  package.json
  PROJECT_GUIDE.md
  README.md
  tailwind.config.js
  tsconfig.json
```

---

## Thiết kế nguồn tham chiếu

Design reference folder:
`C:\Users\LH COMPUTER\Desktop\stitch_fitnutri_ai_s_c_s_ng_xanh_prd\stitch_fitnutri_ai_s_c_s_ng_xanh_prd\`

Các màn chính hiện có trong bộ tham chiếu gồm:
- splash
- onboarding
- auth / otp / quên mật khẩu
- profile setup
- dashboard
- monthly plan
- result screen

Bước tiếp theo nên làm:
1. map từng folder design -> route/feature tương ứng
2. build `(auth)` group
3. build onboarding flow
4. build dashboard + nutrition modules
5. chuẩn hóa icon/image assets từ bộ design
