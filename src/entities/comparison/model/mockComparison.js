export const comparisonProduct = {
  brand: 'Dyson',
  category: 'Kişisel bakım',
  model: 'Airwrap Complete Long',
  name: 'Dyson Airwrap Complete Long',
  updatedAt: 'Bugün, 10:24',
  variant: 'Ceramic Pop',
}

export const comparisonFilters = [
  { id: 'all', label: 'Tüm Mağazalar' },
  { id: 'lowest-price', label: 'En Ucuz' },
  { id: 'free-delivery', label: 'Ücretsiz Kargo' },
  { id: 'in-stock', label: 'Stokta Olanlar' },
]

export const comparisonSortOptions = [
  { id: 'total', label: 'En Düşük Toplam Fiyat' },
  { id: 'trust', label: 'En Yüksek Mağaza Güveni' },
  { id: 'delivery', label: 'En Hızlı Teslimat' },
]

export const comparisonOffers = [
  {
    delivery: 'Ücretsiz kargo',
    deliveryRank: 2,
    isInStock: true,
    isFreeDelivery: true,
    label: 'En İyi Teklif',
    merchant: 'Nova Market',
    price: '₺20.499',
    priceValue: 20499,
    seller: 'Nova Market',
    total: '₺20.499',
    totalValue: 20499,
    trust: 'Yüksek güven',
    trustScore: 3,
    updatedAt: '2 dk önce',
  },
  {
    delivery: '₺149 kargo',
    deliveryRank: 3,
    isInStock: true,
    isFreeDelivery: false,
    label: 'En Ucuz Ürün Fiyatı',
    merchant: 'Pera Store',
    price: '₺20.350',
    priceValue: 20350,
    seller: 'Pera Store',
    total: '₺20.499',
    totalValue: 20499,
    trust: 'Doğrulanmış satıcı',
    trustScore: 2,
    updatedAt: '8 dk önce',
  },
  {
    delivery: 'Ücretsiz kargo',
    deliveryRank: 1,
    isInStock: true,
    isFreeDelivery: true,
    label: 'Hızlı teslimat',
    merchant: 'Mira Select',
    price: '₺20.899',
    priceValue: 20899,
    seller: 'Mira Select',
    total: '₺20.899',
    totalValue: 20899,
    trust: 'Yüksek güven',
    trustScore: 3,
    updatedAt: '15 dk önce',
  },
]

export const comparisonPriceHistory = {
  current: '₺20.499',
  lowest: '₺20.499',
  trend: 'Son 4 haftada ₺3.700 düştü',
}
