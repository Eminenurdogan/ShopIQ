# Frontend Architecture

ShopIQ modern React mimarisi kullanacaktır.

## Teknolojiler

- React
- Vite
- JavaScript
- React Router
- Axios
- CSS Variables
- Feature Sliced Design (Lite)

---

# Klasör Yapısı

src/

app/

pages/

widgets/

features/

entities/

shared/

assets/

---

# Katmanlar

App

↓

Pages

↓

Widgets

↓

Features

↓

Entities

↓

Shared

---

# State Yönetimi

Yerel state önceliklidir.

Global state yalnızca gerçekten gerekli olduğunda kullanılacaktır.

---

# Kod Prensipleri

- Component tekrar kullanılabilir olmalıdır.

- Kod okunabilir olmalıdır.

- Gereksiz prop zinciri kurulmayacaktır.

- Her component tek sorumluluğa sahip olacaktır.

---

# Responsive

Mobile First

Tablet

Desktop

desteklenecektir.
