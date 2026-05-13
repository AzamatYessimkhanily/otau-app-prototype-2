// OTAU App Mock Data

export interface ResidentialComplex {
  id: string
  name: string
  location: string
  district: string
  status: 'building' | 'completed' | 'presale'
  completionDate: string
  priceFrom: number
  priceTo?: number
  floors: number
  buildings: number
  apartments: number
  availableApartments: number
  description: string
  features: string[]
  images: string[]
  coordinates: { lat: number; lng: number }
  discount?: number
}

export interface Apartment {
  id: string
  complexId: string
  building: number
  floor: number
  number: string
  rooms: number
  area: number
  ceilingHeight: number
  price: number
  pricePerSqm: number
  status: 'available' | 'reserved' | 'sold'
  direction: 'north' | 'south' | 'east' | 'west' | 'north-east' | 'south-west'
  balcony: boolean
  layout: string
}

export interface Partner {
  id: string
  name: string
  category: string
  discount: string
  logo: string
  description: string
}

export interface Manager {
  id: string
  name: string
  position: string
  phone: string
  avatar: string
}

// Mock Images (using Unsplash)
const complexImages = {
  orda: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  ],
  aiya: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  ],
  samalPark: [
    'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  ],
}

export const residentialComplexes: ResidentialComplex[] = [
  {
    id: 'orda',
    name: 'ЖК Орда',
    location: 'ул. Тауке хана, мкр. Нурсат',
    district: 'Шымкент',
    status: 'building',
    completionDate: '4 кв. 2026',
    priceFrom: 18500000,
    priceTo: 45000000,
    floors: 12,
    buildings: 4,
    apartments: 480,
    availableApartments: 89,
    description: 'Флагманский жилой комплекс OTAU Group в самом сердце Нурсата. Современная архитектура, продуманные планировки и развитая инфраструктура для комфортной жизни вашей семьи.',
    features: ['Подземный паркинг', 'Детская площадка', 'Охраняемая территория', 'Видеонаблюдение', 'Фитнес-зал', 'Коммерческие помещения'],
    images: complexImages.orda,
    coordinates: { lat: 42.3167, lng: 69.5969 },
  },
  {
    id: 'aiya',
    name: 'ЖК Айя',
    location: 'пр. Республики, 45',
    district: 'Шымкент, центр',
    status: 'completed',
    completionDate: 'Сдан в 2024',
    priceFrom: 32000000,
    priceTo: 78000000,
    floors: 16,
    buildings: 2,
    apartments: 240,
    availableApartments: 8,
    description: 'Премиальный жилой комплекс в историческом центре Шымкента. Панорамные окна, высокие потолки и изысканная отделка входных групп создают атмосферу роскоши и комфорта.',
    features: ['Консьерж-сервис', 'Подземный паркинг', 'Спа-зона', 'Охрана 24/7', 'Панорамные лифты', 'Ландшафтный дизайн'],
    images: complexImages.aiya,
    coordinates: { lat: 42.3204, lng: 69.5962 },
  },
  {
    id: 'samal-park',
    name: 'ЖК Самал Парк',
    location: 'мкр. Самал, ул. Абая',
    district: 'Туркестан',
    status: 'presale',
    completionDate: '2 кв. 2027',
    priceFrom: 14200000,
    priceTo: 38000000,
    floors: 9,
    buildings: 6,
    apartments: 720,
    availableApartments: 720,
    description: 'Новый жилой комплекс комфорт-класса в городе Туркестан. Зелёная территория, современные планировки и доступные цены — идеальный выбор для молодых семей.',
    features: ['Парковая зона', 'Детский сад', 'Школа рядом', 'Велодорожки', 'Зоны отдыха', 'Умный дом'],
    images: complexImages.samalPark,
    coordinates: { lat: 43.2975, lng: 68.2514 },
    discount: 10,
  },
]

// Generate apartments for each complex
export const apartments: Apartment[] = [
  // ЖК Орда apartments
  { id: 'orda-1-2-101', complexId: 'orda', building: 1, floor: 2, number: '101', rooms: 1, area: 42.5, ceilingHeight: 2.8, price: 18500000, pricePerSqm: 435294, status: 'available', direction: 'south', balcony: true, layout: '/layouts/1room-a.svg' },
  { id: 'orda-1-2-102', complexId: 'orda', building: 1, floor: 2, number: '102', rooms: 2, area: 65.8, ceilingHeight: 2.8, price: 28500000, pricePerSqm: 433130, status: 'available', direction: 'east', balcony: true, layout: '/layouts/2room-a.svg' },
  { id: 'orda-1-3-103', complexId: 'orda', building: 1, floor: 3, number: '103', rooms: 2, area: 68.2, ceilingHeight: 2.8, price: 29800000, pricePerSqm: 437243, status: 'reserved', direction: 'south-west', balcony: true, layout: '/layouts/2room-b.svg' },
  { id: 'orda-1-4-104', complexId: 'orda', building: 1, floor: 4, number: '104', rooms: 3, area: 89.5, ceilingHeight: 2.8, price: 38900000, pricePerSqm: 434637, status: 'available', direction: 'north-east', balcony: true, layout: '/layouts/3room-a.svg' },
  { id: 'orda-1-5-105', complexId: 'orda', building: 1, floor: 5, number: '105', rooms: 1, area: 38.2, ceilingHeight: 2.8, price: 16800000, pricePerSqm: 439791, status: 'sold', direction: 'west', balcony: false, layout: '/layouts/1room-b.svg' },
  { id: 'orda-1-5-106', complexId: 'orda', building: 1, floor: 5, number: '106', rooms: 3, area: 92.1, ceilingHeight: 2.8, price: 40200000, pricePerSqm: 436591, status: 'available', direction: 'south', balcony: true, layout: '/layouts/3room-b.svg' },
  { id: 'orda-1-6-107', complexId: 'orda', building: 1, floor: 6, number: '107', rooms: 2, area: 63.4, ceilingHeight: 2.8, price: 27500000, pricePerSqm: 433754, status: 'available', direction: 'east', balcony: true, layout: '/layouts/2room-a.svg' },
  { id: 'orda-1-7-108', complexId: 'orda', building: 1, floor: 7, number: '108', rooms: 1, area: 44.8, ceilingHeight: 2.8, price: 19500000, pricePerSqm: 435268, status: 'reserved', direction: 'north', balcony: true, layout: '/layouts/1room-a.svg' },
  // More apartments...
]

export const partners: Partner[] = [
  {
    id: 'mebelland',
    name: 'Mebelland',
    category: 'Мебель',
    discount: '-15%',
    logo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&q=80',
    description: 'Скидка на всю мебель для дома',
  },
  {
    id: 'technodom',
    name: 'Технодом',
    category: 'Техника',
    discount: '-7%',
    logo: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=100&q=80',
    description: 'Бытовая техника со скидкой',
  },
  {
    id: 'halyk',
    name: 'Halyk Bank',
    category: 'Ипотека',
    discount: 'от 7.5%',
    logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&q=80',
    description: 'Специальные условия ипотеки',
  },
  {
    id: 'glovo',
    name: 'Glovo',
    category: 'Доставка',
    discount: '-20%',
    logo: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=100&q=80',
    description: 'Скидка на первые 5 заказов',
  },
  {
    id: 'magnum',
    name: 'Magnum',
    category: 'Супермаркеты',
    discount: '-5%',
    logo: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=100&q=80',
    description: 'Кэшбек за покупки',
  },
]

export const managers: Manager[] = [
  {
    id: 'manager-1',
    name: 'Алихан Жумабеков',
    position: 'Старший менеджер по продажам',
    phone: '+7 701 234 5678',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
  {
    id: 'manager-2',
    name: 'Динара Сейтжанова',
    position: 'Менеджер по ипотеке',
    phone: '+7 702 345 6789',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b83c?w=100&q=80',
  },
  {
    id: 'manager-3',
    name: 'Айбек Касымов',
    position: 'Менеджер по продажам',
    phone: '+7 700 456 7890',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
]

// User profile for demo
export const currentUser = {
  name: 'Алихан',
  fullName: 'Алихан Нурланов',
  phone: '+7 701 999 8888',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
  myApartment: {
    complexId: 'orda',
    complexName: 'ЖК Орда',
    apartmentId: 'orda-1-6-107',
    building: 1,
    floor: 6,
    number: '107',
    rooms: 2,
    area: 63.4,
    price: 27500000,
    paidAmount: 16500000,
    constructionProgress: 67,
    status: 'building',
    deliveryDate: '4 кв. 2026',
  },
}

// Quick filters
export const quickFilters = [
  { id: 'all', label: 'Все' },
  { id: '1-room', label: '1-комн' },
  { id: '2-room', label: '2-комн' },
  { id: '3-room', label: '3-room' },
  { id: 'installment', label: 'Рассрочка 0%' },
  { id: 'mortgage', label: 'Ипотека' },
  { id: 'completed', label: 'Сданные' },
]

// Editorial news / articles used on the home feed
export interface NewsItem {
  id: string
  category: 'Стройка' | 'Награды' | 'События' | 'Лайфхаки' | 'Дизайн'
  title: string
  excerpt: string
  image: string
  publishedAt: string
  readTime: number
  isFeatured?: boolean
}

export const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    category: 'Стройка',
    title: 'Начато строительство 4-й очереди ЖК Орда',
    excerpt: 'Запущен новый блок с улучшенными планировками и панорамными окнами. Сдача — 4 квартал 2026.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    publishedAt: '2 часа назад',
    readTime: 4,
    isFeatured: true,
  },
  {
    id: 'news-2',
    category: 'Награды',
    title: 'OTAU Group — лучший застройщик года',
    excerpt: 'По версии Kazakhstan Property Awards 2024.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    publishedAt: 'вчера',
    readTime: 3,
  },
  {
    id: 'news-3',
    category: 'События',
    title: 'День открытых дверей в ЖК Айя',
    excerpt: 'Экскурсия по готовым квартирам, кофе и спецпредложения для гостей.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    publishedAt: '3 дня назад',
    readTime: 2,
  },
  {
    id: 'news-4',
    category: 'Лайфхаки',
    title: 'Как получить рассрочку 0% без переплат',
    excerpt: 'Разбираем условия программы для покупателей OTAU.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    publishedAt: '5 дней назад',
    readTime: 5,
  },
  {
    id: 'news-5',
    category: 'Дизайн',
    title: '5 идей для интерьера однушки в ЖК Самал Парк',
    excerpt: 'Лёгкие сценарии, которые делают 42 м² ощущением «двушки».',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    publishedAt: 'неделю назад',
    readTime: 6,
  },
]

// Stories shown above the main content — short tappable highlights
export interface Story {
  id: string
  title: string
  image: string
  accent: string
}

export const stories: Story[] = [
  { id: 'st-1', title: 'Прогресс ЖК Орда', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80', accent: 'from-otau-primary-500 to-otau-primary-700' },
  { id: 'st-2', title: 'Видеотур Айя', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80', accent: 'from-emerald-500 to-teal-600' },
  { id: 'st-3', title: 'Чёрная пятница', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80', accent: 'from-otau-accent-500 to-red-700' },
  { id: 'st-4', title: 'Открытие офиса', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', accent: 'from-purple-500 to-violet-700' },
  { id: 'st-5', title: 'Дизайн-проекты', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&q=80', accent: 'from-amber-500 to-orange-600' },
  { id: 'st-6', title: 'OTAU Club', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', accent: 'from-pink-500 to-rose-600' },
]

// Construction progress snapshots for the home feed
export interface ConstructionUpdate {
  complexId: string
  complexName: string
  image: string
  progress: number
  stage: string
  updatedAt: string
}

export const constructionUpdates: ConstructionUpdate[] = [
  {
    complexId: 'orda',
    complexName: 'ЖК Орда · Дом 1',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80',
    progress: 67,
    stage: 'Фасадные работы',
    updatedAt: 'Обновлено 12 мая',
  },
  {
    complexId: 'aiya',
    complexName: 'ЖК Айя · Корпус B',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&q=80',
    progress: 100,
    stage: 'Сдан',
    updatedAt: 'Заселение открыто',
  },
  {
    complexId: 'samal-park',
    complexName: 'ЖК Самал Парк · 1 очередь',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80',
    progress: 18,
    stage: 'Котлован',
    updatedAt: 'Обновлено 8 мая',
  },
]

// Onboarding slides
export const onboardingSlides = [
  {
    id: 1,
    title: 'Найдите свою квартиру',
    description: 'Выбирайте из 1000+ квартир в лучших жилых комплексах OTAU Group. Удобные фильтры и шахматка помогут найти идеальный вариант.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  },
  {
    id: 2,
    title: 'Покупайте онлайн',
    description: 'Бронируйте квартиру, подписывайте договор через ЭЦП и оплачивайте первый взнос — всё в одном приложении, без визита в офис.',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80',
  },
  {
    id: 3,
    title: 'Всё в одном приложении',
    description: 'OTAU Click для покупки, OTAU Service для жителей, OTAU Club для привилегий — управляйте всем из единого аккаунта.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  },
]

// Helper functions
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₸'
}

export function formatPriceShort(price: number): string {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(1).replace('.0', '') + ' млн ₸'
  }
  return formatPrice(price)
}

export function getStatusLabel(status: ResidentialComplex['status']): string {
  switch (status) {
    case 'building': return 'Строится'
    case 'completed': return 'Сдан'
    case 'presale': return 'Старт продаж'
  }
}

export function getStatusColor(status: ResidentialComplex['status']): string {
  switch (status) {
    case 'building': return 'bg-otau-primary-500 text-white'
    case 'completed': return 'bg-otau-success-500 text-white'
    case 'presale': return 'bg-otau-accent-500 text-white'
  }
}

export function getApartmentStatusColor(status: Apartment['status']): string {
  switch (status) {
    case 'available': return 'bg-green-500'
    case 'reserved': return 'bg-yellow-500'
    case 'sold': return 'bg-neutral-400'
  }
}
