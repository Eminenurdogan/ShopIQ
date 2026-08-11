export const assistantMockResponseDelay = 300

export const assistantQuickPrompts = [
  'Bu ürünün fiyatı iyi mi?',
  'Şimdi almak mantıklı mı?',
  'En avantajlı mağaza hangisi?',
  'Fiyatı düşer mi?',
  'Bütçeme uygun alternatif bul.',
]

export const assistantQuickActions = [
  { id: 'history', label: 'Fiyat geçmişini göster' },
  { id: 'tracking', label: 'Bu ürünü takip et' },
  { id: 'alternatives', label: 'Alternatif ürün bul' },
  { id: 'comparison', label: 'Mağazaları karşılaştır' },
]

export const assistantShoppingContext = {
  currentPrice: '₺14.999',
  lastChange: '↓ %12',
  priceAlert: 'Aktif',
  productName: 'Dyson Airwrap',
}

export function getMockAssistantResponse(question) {
  const normalizedQuestion = question.toLocaleLowerCase('tr-TR')
  const isPriceQuestion = normalizedQuestion.includes('fiyat') || normalizedQuestion.includes('almak')

  if (isPriceQuestion) {
    return {
      decision: 'Şu an almak mantıklı görünüyor.',
      note: 'Fiyat takibini açık tutarak yeni bir düşüş olduğunda haberdar olabilirsin.',
      reason: 'Mevcut fiyat son dönem fiyatlarına göre avantajlı seviyede.',
    }
  }

  return {
    decision: 'Önce toplam maliyeti karşılaştırman faydalı olur.',
    note: 'Karar vermeden önce kargo ve mağaza güveni bilgisini de kontrol et.',
    reason: 'Ürün fiyatı tek başına en avantajlı seçeneği her zaman göstermeyebilir.',
  }
}
