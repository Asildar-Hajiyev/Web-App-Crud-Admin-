# React Admin Panel — Tam Xüsusiyyətli Tətbiq

Auth, qlobal state idarəetməsi, form validasiyası və mock API-yə qarşı CRUD əməliyyatları olan React tətbiqi.

## Layihənin qısa təsviri

Tətbiq iki əsas hissədən ibarətdir:
- **Açıq hissə** — Home, About, Contact səhifələri istənilən istifadəçi üçün açıqdır.
- **Admin panel** (`/admin/*`) — yalnız login etmiş istifadəçilər üçün əlçatandır, məhsul (Orders) və istifadəçi (Users) idarəetməsini özündə saxlayır.

Autentifikasiya mock şəkildə edilib (backend yoxdur), Redux Toolkit ilə qlobal state idarə olunur, CRUD əməliyyatları mockapi.io üzərindən yerinə yetirilir.

## İstifadə olunan texnologiyalar

- React
- React Router DOM
- Redux Toolkit + React Redux
- Formik + Yup (form validasiyası)
- Axios (API sorğuları)
- React Toastify (bildirişlər)
- Tailwind CSS


## Giriş məlumatları (Admin Panel)

```
Email: admin@admin
Parol: admin123
```

## Əsas funksionallıqlar

### 1. Routing və qorunan səhifələr
React Router ilə naviqasiya qurulub. `ProtectedRoute` komponenti `/admin/*` route-larını qoruyur — login olmayan istifadəçi avtomatik `/login`-ə yönləndirilir. `GuestRoute` isə əksinə, artıq login etmiş istifadəçini `/login` səhifəsindən uzaqlaşdırıb `/admin`-ə göndərir.

### 2. Autentifikasiya axını
Login forması (Formik + Yup) uğurlu girişdə `exp` (bitmə vaxtı) daşıyan sadə base64 token yaradır. Token və istifadəçi məlumatı həm Redux state-də, həm də `localStorage`-da saxlanılır ki, səhifə yenilənəndə sessiya itməsin. Logout həm state-i, həm `localStorage`-ı tam təmizləyir.

### 3. Qlobal state idarəetməsi
Redux Toolkit ilə 3 slice qurulub:
- `authSlice` — sessiya (login/logout)
- `userSlice` — istifadəçilər üzrə CRUD
- `counterSlice` — məhsul/sifarişlər üzrə CRUD

### 4. Validasiyalı formlar
Formik + Yup ilə 3 forma validasiya olunub: Login, İstifadəçi əlavə/redaktə, Məhsul əlavə/redaktə. Xətalar `touched`/`errors` ilə real-vaxtda göstərilir.

### 5. Mock API-yə qarşı CRUD (optimistic UI)
`mockapi.io` üzərindən GET/POST/PUT/DELETE əməliyyatları `createAsyncThunk` ilə edilir. `addData` və `deleteData` üçün optimistic UI tətbiq olunub — dəyişiklik serverdən cavab gəlmədən UI-də dərhal göstərilir, server xəta versə əvvəlki vəziyyətə qaytarılır.

### 6. Error boundary
Class-based `ErrorBoundary` komponenti bütün tətbiqi əhatə edir — bir komponentdə baş verən xəta bütün app-ı çökdürmür, istifadəçiyə "Yenidən cəhd et" seçimi göstərilir.

