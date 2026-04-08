# Mobile App Starter

Production-ready Expo starter focused on scale, semantic theming, dark mode, and reusable UI primitives.

## Stack

- Expo
- React Native
- TypeScript strict
- Expo Router
- NativeWind
- Zustand
- React Hook Form + Zod
- AsyncStorage

## Run

```bash
npm install
npm run start
```

## Structure

```txt
app/
src/
  components/
  features/
  hooks/
  lib/
  services/
  store/
  theme/
  types/
  ui/
```

## Notes

- All business UI colors go through semantic tokens.
- Dark mode supports system mode + manual override.
- Reusable primitives live in `src/ui`.
- Screen-level business logic is pushed into feature hooks/services.
