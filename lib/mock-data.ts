// OTAU App — данные по реальным объектам Otau Group в Шымкенте (адреса из открытых источников: Крыша, Korter, СМИ).
// Координаты на карте — временные точки в пределах города; замените на точные lat/lng по каждому адресу.

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

// Фото с карточек Korter / Krisha (ссылки из HTML страниц по твоим URL; Korter: …/buildings-v2/1280x960/{id}.jpg).
const korter1280 = (...ids: number[]) =>
  ids.map((id) => `https://storage.googleapis.com/bd-kz-01/buildings-v2/1280x960/${id}.jpg`)
const korter2560 = (...ids: number[]) =>
  ids.map((id) => `https://storage.googleapis.com/bd-kz-01/buildings-v2/2560x1920/${id}.jpg`)

// Горизонтальные кадры с https://muqagali.otaugroup.kz/ — превью: фасад/рендер ЖК (без кадров с ТЦ/супермаркетом).
const MUQAGALI_IMAGES = [
  'https://static.tildacdn.pro/tild3439-3566-4164-a234-323437333736/10-06-2025_________.jpg',
  'https://static.tildacdn.pro/tild6362-3030-4039-b632-653462316531/1443.jpg',
  'https://static.tildacdn.pro/tild3864-3430-4562-b161-343038663866/07-10-2024_________.jpg',
  'https://static.tildacdn.pro/tild3337-6462-4465-b063-343665666164/1444.jpg',
  'https://static.tildacdn.pro/tild6436-3038-4331-a331-363038383139/04.jpg',
  'https://static.tildacdn.pro/tild3363-3266-4436-b564-623532313232/kakim-budet-park-v-s.jpeg',

]

/** На Korter в галерее только 2 снимка — дублируем в 2560 для карусели. */
const SUNKAR_IMAGES = [...korter1280(4957, 4958), ...korter2560(4957, 4958)]
const RASHIDOVA_IMAGES = [...korter1280(3394, 3395), ...korter2560(3394, 3395)]

export const residentialComplexes: ResidentialComplex[] = [
  {
    id: 'muqagali',
    name: 'MUQAGALI',
    location: 'Абайский р-н, 189-й квартал, уч. 188/1',
    district: 'Шымкент',
    status: 'building',
    completionDate: '2026',
    priceFrom: 28000000,
    priceTo: 95000000,
    floors: 18,
    buildings: 3,
    apartments: 420,
    availableApartments: 112,
    description: 'Бизнес‑класс, новая очередь. Адрес на портале Крыша: Шымкент, Абайский район, 189 квартал, участок 188/1.',
    features: ['Подземный паркинг', 'Охрана', 'Панорамные окна', 'Колясочные', 'Лобби'],
    images: MUQAGALI_IMAGES,
    coordinates: { lat: 42.297, lng: 69.612 },
    discount: 8,
  },
  {
    id: 'otau-city',
    name: 'Otau City',
    location: 'мкр. Нурсат 2, ул. Назарбекова 29/1–29/4',
    district: 'Шымкент',
    status: 'building',
    completionDate: '3 кв. 2026',
    priceFrom: 19500000,
    priceTo: 52000000,
    floors: 14,
    buildings: 4,
    apartments: 560,
    availableApartments: 156,
    description: 'Жилой комплекс в микрорайоне Нурсат 2, корпуса на ул. Назарбекова 29/1–29/4.',
    features: ['Двор без машин', 'Детские площадки', 'Паркинг', 'Магазины на 1 этаже'],
    images: korter1280(43919, 43920, 43921, 43922),
    coordinates: { lat: 42.3185, lng: 69.598 },
  },
  {
    id: 'park-residence',
    name: 'Park Residence',
    location: 'ул. Куаныша Толеметова 100/1 (между ул. Алматинская и Сырым Батыра)',
    district: 'Шымкент',
    status: 'building',
    completionDate: '2 кв. 2026',
    priceFrom: 45000000,
    priceTo: 120000000,
    floors: 3,
    buildings: 48,
    apartments: 48,
    availableApartments: 12,
    description: 'Коттеджный посёлок по ул. Куаныша Толеметова 100/1, между Алматинской и Сырым Батыра.',
    features: ['Участки', 'Озеленение', 'Подъездные пути', 'Охрана'],
    images: korter1280(8805, 8806, 8807, 8808),
    coordinates: { lat: 42.305, lng: 69.568 },
  },
  {
    id: 'qulager',
    name: 'Qulager',
    location: '189-й квартал, дом 25/1',
    district: 'Шымкент',
    status: 'building',
    completionDate: '4 кв. 2025',
    priceFrom: 16800000,
    priceTo: 38000000,
    floors: 12,
    buildings: 2,
    apartments: 288,
    availableApartments: 44,
    description: 'ЖК «Кулагер» — 189 квартал, дом 25/1.',
    features: ['Паркинг', 'Детская площадка', 'Видеонаблюдение'],
    images: korter1280(43892, 43893, 43894, 43895),
    coordinates: { lat: 42.295, lng: 69.608 },
  },
  {
    id: 'jas-otau-turan',
    name: 'Jas Otau Turan',
    location: 'мкр. Туран, дом 11/1',
    district: 'Шымкент',
    status: 'building',
    completionDate: '1 кв. 2026',
    priceFrom: 15200000,
    priceTo: 34000000,
    floors: 10,
    buildings: 3,
    apartments: 360,
    availableApartments: 78,
    description: 'Микрорайон Туран, дом 11/1 (в т.ч. новая очередь по тому же адресу).',
    features: ['Школа рядом', 'Паркинг', 'Охрана'],
    images: korter1280(43909, 43910, 43911, 43912),
    coordinates: { lat: 42.302, lng: 69.642 },
  },
  {
    id: 'jas-otau-tulip',
    name: 'Jas Otau Tulip',
    location: 'мкр. Кайтпас, ул. Мустафа Шоқай, уч. 229',
    district: 'Шымкент',
    status: 'building',
    completionDate: '2026',
    priceFrom: 17500000,
    priceTo: 41000000,
    floors: 11,
    buildings: 2,
    apartments: 220,
    availableApartments: 61,
    description: 'Комплекс в микрорайоне Кайтпас, ул. Мустафа Шоқай, участок 229.',
    features: ['Благоустройство', 'Паркинг', 'Детская зона'],
    images: korter1280(48195, 48196, 48197, 48198),
    coordinates: { lat: 42.328, lng: 69.535 },
  },
  {
    id: 'jas-otau-2',
    name: 'Jas Otau 2',
    location: 'ул. Тулпар, стр. 10/6–10/8; корпуса ул. Куаныша Толеметова 197/3, 197/4, 197/5',
    district: 'Шымкент',
    status: 'building',
    completionDate: '2025–2026',
    priceFrom: 16200000,
    priceTo: 36000000,
    floors: 12,
    buildings: 6,
    apartments: 540,
    availableApartments: 95,
    description: 'Корпуса на ул. Тулпар (10/6–10/8) и на ул. Куаныша Толеметова 197/3–197/5.',
    features: ['Несколько корпусов', 'Паркинг', 'Детские площадки'],
    images: korter1280(14860, 14861, 14862, 14863),
    coordinates: { lat: 42.308, lng: 69.555 },
  },
  {
    id: 'jas-otau-comfort',
    name: 'Jas Otau Comfort',
    location: 'ул. Аргынбекова 102 / ул. Шаяхметова, мкр. Нурсат 2',
    district: 'Шымкент',
    status: 'building',
    completionDate: '2026',
    priceFrom: 17800000,
    priceTo: 39000000,
    floors: 11,
    buildings: 2,
    apartments: 264,
    availableApartments: 52,
    description: 'На пересечении ул. Аргынбекова и Шаяхметова, микрорайон Нурсат 2.',
    features: ['Тихий двор', 'Паркинг', 'Охрана'],
    images: korter1280(17397, 17401, 17402, 17403),
    coordinates: { lat: 42.317, lng: 69.601 },
  },
  {
    id: 'jas-otau-1',
    name: 'Jas Otau 1',
    location: 'ул. Куаныша Толеметова / ул. Турсункул Утегенова; 69/26, 69/27, 69/30',
    district: 'Шымкент',
    status: 'completed',
    completionDate: 'Сдан',
    priceFrom: 15500000,
    priceTo: 32000000,
    floors: 10,
    buildings: 3,
    apartments: 300,
    availableApartments: 14,
    description: 'Первая очередь: перекрёсток ул. Куаныша Толеметова и Турсункул Утегенова, корпуса 69/26, 69/27, 69/30.',
    features: ['Заселение', 'Паркинг', 'Детская площадка'],
    images: korter1280(8915, 8916, 8917, 8918),
    coordinates: { lat: 42.306, lng: 69.558 },
  },
  {
    id: 'biik',
    name: 'Biik',
    location: 'просп. Кунаева 91',
    district: 'Шымкент',
    status: 'completed',
    completionDate: 'Сдан',
    priceFrom: 22000000,
    priceTo: 55000000,
    floors: 16,
    buildings: 1,
    apartments: 192,
    availableApartments: 6,
    description: 'ЖК Biik — проспект Кунаева 91.',
    features: ['Центр', 'Паркинг', 'Коммерция'],
    images: korter1280(12434, 12435, 12436, 12437),
    coordinates: { lat: 42.321, lng: 69.572 },
  },
  {
    id: 'sunkar',
    name: 'Sunkar',
    location: 'ул. Байтурсынова 58б',
    district: 'Шымкент',
    status: 'completed',
    completionDate: 'Сдан',
    priceFrom: 14800000,
    priceTo: 29000000,
    floors: 9,
    buildings: 1,
    apartments: 108,
    availableApartments: 4,
    description: 'ЖК «Сункар» — ул. Байтурсынова 58б.',
    features: ['Паркинг', 'Охрана'],
    images: SUNKAR_IMAGES,
    coordinates: { lat: 42.318, lng: 69.548 },
  },
  {
    id: 'bastau',
    name: 'Bastau',
    location: 'просп. Кунаева 42',
    district: 'Шымкент',
    status: 'completed',
    completionDate: 'Сдан',
    priceFrom: 16800000,
    priceTo: 35000000,
    floors: 12,
    buildings: 1,
    apartments: 168,
    availableApartments: 5,
    description: 'ЖК «Бастау» — проспект Кунаева 42.',
    features: ['Транспорт', 'Паркинг'],
    images: korter1280(3379, 3380, 3381, 3382),
    coordinates: { lat: 42.323, lng: 69.575 },
  },
  {
    id: 'keremet',
    name: 'Keremet',
    location: 'просп. Кунаева 65',
    district: 'Шымкент',
    status: 'completed',
    completionDate: 'Сдан',
    priceFrom: 19000000,
    priceTo: 42000000,
    floors: 14,
    buildings: 1,
    apartments: 196,
    availableApartments: 7,
    description: 'ЖК «Керемет» — проспект Кунаева 65.',
    features: ['Паркинг', 'Охрана', 'Лифты'],
    images: korter1280(4964, 4965, 4966, 4967),
    coordinates: { lat: 42.319, lng: 69.578 },
  },
  {
    id: 'dom-nazarbekova-208',
    name: 'Дом, ул. Назарбекова 208',
    location: 'ул. Назарбекова 208',
    district: 'Шымкент',
    status: 'completed',
    completionDate: 'Сдан',
    priceFrom: 12500000,
    priceTo: 24000000,
    floors: 9,
    buildings: 1,
    apartments: 72,
    availableApartments: 2,
    description: 'Дом по адресу ул. Назарбекова 208.',
    features: ['Паркинг', 'Лифт'],
    images: korter1280(3390, 3391, 3392, 3393),
    coordinates: { lat: 42.3165, lng: 69.5995 },
  },
  {
    id: 'dom-rashidova-26',
    name: 'Дом, ул. Рашидова 26',
    location: 'ул. Рашидова 26',
    district: 'Шымкент',
    status: 'completed',
    completionDate: 'Сдан',
    priceFrom: 11800000,
    priceTo: 22000000,
    floors: 8,
    buildings: 1,
    apartments: 64,
    availableApartments: 3,
    description: 'Жилой дом — ул. Рашидова 26.',
    features: ['Паркинг'],
    images: RASHIDOVA_IMAGES,
    coordinates: { lat: 42.314, lng: 69.55 },
  },
  {
    id: 'defile',
    name: 'Defile',
    location: 'просп. Кунаева 36',
    district: 'Шымкент',
    status: 'completed',
    completionDate: 'Сдан',
    priceFrom: 21000000,
    priceTo: 48000000,
    floors: 15,
    buildings: 1,
    apartments: 180,
    availableApartments: 4,
    description: 'ЖК «Дефиле» — проспект Кунаева 36.',
    features: ['Витражи', 'Паркинг', 'Охрана'],
    images: korter1280(3396, 3397, 3398, 3399),
    coordinates: { lat: 42.32, lng: 69.574 },
  },
  {
    id: 'royal-park',
    name: 'Royal Park',
    location: 'ул. Туркестанская 55 (рядом с ЦПКиО)',
    district: 'Шымкент',
    status: 'completed',
    completionDate: 'Сдан',
    priceFrom: 35000000,
    priceTo: 92000000,
    floors: 18,
    buildings: 2,
    apartments: 224,
    availableApartments: 9,
    description: 'Royal Park — ул. Туркестанская 55, недалеко от Центрального парка.',
    features: ['Вид на парк', 'Паркинг', 'Консьерж'],
    images: korter1280(11762, 11763, 11764, 11765),
    coordinates: { lat: 42.311, lng: 69.565 },
  },
  {
    id: 'nauryz-park',
    name: 'Nauryz Park',
    location: 'просп. Байдибек би 116',
    district: 'Шымкент',
    status: 'completed',
    completionDate: 'Сдан',
    priceFrom: 18500000,
    priceTo: 44000000,
    floors: 13,
    buildings: 2,
    apartments: 208,
    availableApartments: 11,
    description: 'ЖК Nauryz Park — проспект Байдибек би 116.',
    features: ['Паркинг', 'Детская площадка', 'Охрана'],
    images: korter1280(21837, 21838, 21839, 21840),
    coordinates: { lat: 42.325, lng: 69.59 },
  },
]

// Демо‑квартиры привязаны к Otau City (шахматка и карточка квартиры)
export const apartments: Apartment[] = [
  { id: 'otau-city-1-2-101', complexId: 'otau-city', building: 1, floor: 2, number: '101', rooms: 1, area: 42.5, ceilingHeight: 2.8, price: 18500000, pricePerSqm: 435294, status: 'available', direction: 'south', balcony: true, layout: '/layouts/1room-a.svg' },
  { id: 'otau-city-1-2-102', complexId: 'otau-city', building: 1, floor: 2, number: '102', rooms: 2, area: 65.8, ceilingHeight: 2.8, price: 28500000, pricePerSqm: 433130, status: 'available', direction: 'east', balcony: true, layout: '/layouts/2room-a.svg' },
  { id: 'otau-city-1-3-103', complexId: 'otau-city', building: 1, floor: 3, number: '103', rooms: 2, area: 68.2, ceilingHeight: 2.8, price: 29800000, pricePerSqm: 437243, status: 'reserved', direction: 'south-west', balcony: true, layout: '/layouts/2room-b.svg' },
  { id: 'otau-city-1-4-104', complexId: 'otau-city', building: 1, floor: 4, number: '104', rooms: 3, area: 89.5, ceilingHeight: 2.8, price: 38900000, pricePerSqm: 434637, status: 'available', direction: 'north-east', balcony: true, layout: '/layouts/3room-a.svg' },
  { id: 'otau-city-1-5-105', complexId: 'otau-city', building: 1, floor: 5, number: '105', rooms: 1, area: 38.2, ceilingHeight: 2.8, price: 16800000, pricePerSqm: 439791, status: 'sold', direction: 'west', balcony: false, layout: '/layouts/1room-b.svg' },
  { id: 'otau-city-1-5-106', complexId: 'otau-city', building: 1, floor: 5, number: '106', rooms: 3, area: 92.1, ceilingHeight: 2.8, price: 40200000, pricePerSqm: 436591, status: 'available', direction: 'south', balcony: true, layout: '/layouts/3room-b.svg' },
  { id: 'otau-city-1-6-107', complexId: 'otau-city', building: 1, floor: 6, number: '107', rooms: 2, area: 63.4, ceilingHeight: 2.8, price: 27500000, pricePerSqm: 433754, status: 'available', direction: 'east', balcony: true, layout: '/layouts/2room-a.svg' },
  { id: 'otau-city-1-7-108', complexId: 'otau-city', building: 1, floor: 7, number: '108', rooms: 1, area: 44.8, ceilingHeight: 2.8, price: 19500000, pricePerSqm: 435268, status: 'reserved', direction: 'north', balcony: true, layout: '/layouts/1room-a.svg' },
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

export const currentUser = {
  name: 'Алихан',
  fullName: 'Алихан Нурланов',
  phone: '+7 701 999 8888',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
  myApartment: {
    complexId: 'otau-city',
    complexName: 'Otau City',
    apartmentId: 'otau-city-1-6-107',
    building: 1,
    floor: 6,
    number: '107',
    rooms: 2,
    area: 63.4,
    price: 27500000,
    paidAmount: 16500000,
    constructionProgress: 67,
    status: 'building',
    deliveryDate: '3 кв. 2026',
  },
}

export const quickFilters = [
  { id: 'all', label: 'Все' },
  { id: '1-room', label: '1-комн' },
  { id: '2-room', label: '2-комн' },
  { id: '3-room', label: '3-комн' },
  { id: 'installment', label: 'Рассрочка 0%' },
  { id: 'mortgage', label: 'Ипотека' },
  { id: 'completed', label: 'Сданные' },
]

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
    title: 'Новая очередь MUQAGALI: ход строительства',
    excerpt: 'Бизнес‑класс в Абайском районе, 189 квартал, уч. 188/1 — обновление по фасаду и внутренним работам.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    publishedAt: '2 часа назад',
    readTime: 4,
    isFeatured: true,
  },
  {
    id: 'news-2',
    category: 'Награды',
    title: 'OTAU Group — застройщик с сильным портфелем в Шымкенте',
    excerpt: 'Серия сданных и строящихся проектов: от Jas Otau до премиальных корпусов на пр. Кунаева.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    publishedAt: 'вчера',
    readTime: 3,
  },
  {
    id: 'news-3',
    category: 'События',
    title: 'День открытых дверей в Otau City',
    excerpt: 'мкр. Нурсат 2, ул. Назарбекова — экскурсия по шоу‑квартирам и консультации по ипотеке.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    publishedAt: '3 дня назад',
    readTime: 2,
  },
  {
    id: 'news-4',
    category: 'Лайфхаки',
    title: 'Как получить рассрочку 0% без переплат',
    excerpt: 'Разбираем условия программы для покупателей OTAU Group в Шымкенте.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    publishedAt: '5 дней назад',
    readTime: 5,
  },
  {
    id: 'news-5',
    category: 'Дизайн',
    title: 'Интерьер однушки в Jas Otau Comfort',
    excerpt: 'Нурсат 2, ул. Аргынбекова — идеи планировки и зонирования.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    publishedAt: 'неделю назад',
    readTime: 6,
  },
]

export interface Story {
  id: string
  title: string
  image: string
  accent: string
}

export const stories: Story[] = [
  { id: 'st-1', title: 'MUQAGALI', image: MUQAGALI_IMAGES[0], accent: 'from-otau-primary-500 to-otau-primary-700' },
  { id: 'st-2', title: 'Otau City', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80', accent: 'from-emerald-500 to-teal-600' },
  { id: 'st-3', title: 'Чёрная пятница', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80', accent: 'from-otau-accent-500 to-red-700' },
  { id: 'st-4', title: 'Jas Otau Turan', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', accent: 'from-purple-500 to-violet-700' },
  { id: 'st-5', title: 'Royal Park', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&q=80', accent: 'from-amber-500 to-orange-600' },
  { id: 'st-6', title: 'OTAU Club', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', accent: 'from-pink-500 to-rose-600' },
]

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
    complexId: 'muqagali',
    complexName: 'MUQAGALI · новая очередь',
    image: MUQAGALI_IMAGES[4],
    progress: 58,
    stage: 'Монолит',
    updatedAt: 'Обновлено 12 мая',
  },
  {
    complexId: 'otau-city',
    complexName: 'Otau City · корпус 29/2',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&q=80',
    progress: 72,
    stage: 'Фасад',
    updatedAt: 'Обновлено 11 мая',
  },
  {
    complexId: 'jas-otau-2',
    complexName: 'Jas Otau 2 · ул. Тулпар',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80',
    progress: 41,
    stage: 'Каркас',
    updatedAt: 'Обновлено 8 мая',
  },
]

export const onboardingSlides = [
  {
    id: 1,
    title: 'Найдите свою квартиру',
    description: 'Жилые комплексы Otau Group в Шымкенте: MUQAGALI, Otau City, Jas Otau, Biik, Royal Park и другие — в одном приложении.',
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
