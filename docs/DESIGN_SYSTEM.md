---
# UI Specification

Bu bölüm, ShopIQ'da geliştirilecek tüm ortak UI bileşenlerinin davranış standartlarını tanımlar.

Her component bu kurallara uymalıdır.
---

# Button

## Variants

### Primary

- Background: Primary Gradient
- Text: White
- Border: None
- Radius: 18px
- Height: 48px
- Padding: 0 24px
- Font Weight: 600

States

Hover

- Scale: 1.02
- Shadow artırılır.

Active

- Scale: 0.98

Disabled

- Opacity: .5
- Cursor: not-allowed

Loading

- Spinner gösterilir.
- Boyut değişmez.

---

### Secondary

- White Background
- 1px Border
- Border Color
- Dark Text

Hover

- Light Pink Background

---

### Outline

- Transparent Background
- Primary Border
- Primary Text

Hover

- Light Pink Background

---

### Ghost

- Transparent
- Border Yok
- Dark Text

Hover

- Light Pink

---

# TextField

Height

52px

Radius

18px

Padding

16px

Border

Border Color

States

Default

Border Color

Hover

Primary Pink

Focus

Rose Gold Border

3px Soft Pink Focus Ring

Error

Danger Border

Danger Helper Text

Disabled

Gray Background

Placeholder

Secondary Text

---

# Page Container

Content Width

1200px

Max Width

1280px

Padding

Mobile

20px

Tablet

32px

Desktop

48px

---

# Status Message

## Success

Background

#EEF9F1

Border

#A6E3B5

Icon

Green

---

## Info

Background

#EEF6FF

Border

#B8D8FF

Icon

Blue

---

## Warning

Background

#FFF8EA

Border

#FFD27A

Icon

Orange

---

## Error

Background

#FFF1F2

Border

#F7B4BC

Icon

Red

---

# Skeleton

Animation

Shimmer

Duration

1.5s

Radius

Text

8px

Button

18px

Card

24px

---

# Typography Scale

Display

56px

H1

48px

H2

36px

H3

30px

H4

24px

Body Large

18px

Body

16px

Small

14px

Caption

12px

Line Height

Display

120%

Heading

125%

Body

160%

Caption

150%

---

# Breakpoints

Mobile

0 - 767

Tablet

768 - 1023

Laptop

1024 - 1279

Desktop

1280+

---

# Z-Index

Dropdown

100

Sticky Header

200

Drawer

300

Modal

500

Toast

800

Loading

1000

---

# Accessibility

- Tüm componentler keyboard ile kullanılabilir olmalıdır.
- focus-visible zorunludur.
- Renk tek başına anlam ifade etmemelidir.
- Icon kullanılan her buton aria-label almalıdır.
- Form alanlarının label'ı bulunmalıdır.

---

# Component Rules

Her component;

- Reusable olmalıdır.
- Responsive olmalıdır.
- Theme Token kullanmalıdır.
- Hardcoded renk kullanmamalıdır.
- Hardcoded spacing kullanmamalıdır.
- Inline style kullanılmamalıdır.
- Semantic HTML kullanılmalıdır.
- Magic number kullanılmamalıdır.
- CSS Variables kullanılmalıdır.
- Dark Mode desteğine uygun geliştirilmelidir.

# Card

## Default

- Background: White
- Border: 1px solid Border
- Radius: 24px
- Padding: 24px
- Shadow: Default Shadow

Hover

- TranslateY(-6px)
- Shadow artırılır.

Variants

- Default
- Elevated
- Flat
- Interactive

Interactive Card

- Cursor: Pointer
- Hover efekti aktif
- Focus-visible desteği zorunlu
