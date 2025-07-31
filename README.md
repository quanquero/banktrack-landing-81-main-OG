================================================================================

                        BANKTRACK INTEL PLATFORM
                        ДЕТАЛЬНАЯ ДОКУМЕНТАЦИЯ ПРОЕКТА
                        
================================================================================

📋 ОБЩАЯ ИНФОРМАЦИЯ
================================================================================

<img width="1234" height="661" alt="image" src="https://github.com/user-attachments/assets/9ff28300-4b69-40fa-b29d-30784b7b3e44" />


Название проекта: BankTrack Intel Platform
Версия: 1.0.0
Тип: B2B PSP Intelligence Platform
Технологический стек: React + TypeScript + Vite + Tailwind CSS + Mapbox GL JS
Дата создания документации: 2024

Описание: Комплексная платформа для анализа и сравнения PSP (Payment Service Provider) 
провайдеров с верификацией лицензий, предложениями услуг и данными о соответствии 
регулятивным требованиям для B2B клиентов.

🎯 ОСНОВНЫЕ ФУНКЦИИ
================================================================================

1. БАЗА ДАННЫХ PSP ПРОВАЙДЕРОВ
   - Хранение информации о 100+ PSP провайдерах
   - Детальная информация о лицензиях, услугах, регионах работы
   - Данные о комиссиях, API, технических возможностях
   - Информация о контактных лицах и рейтингах

2. ИНТЕРАКТИВНАЯ КАРТА МИРА
   - Визуализация PSP провайдеров по странам
   - Интерактивные маркеры с пульсацией
   - Заливка стран с PSP провайдерами
   - Фильтрация по клику на страны
   - Tooltips с информацией о количестве PSP

3. СИСТЕМА ПОИСКА И ФИЛЬТРАЦИИ
   - Поиск по названию компании
   - Фильтрация по юрисдикции (Cyprus, UK, Singapore, Hong Kong)
   - Фильтрация по типу лицензии (EMI, PI, etc.)
   - Фильтрация по услугам (card acquiring, payouts, FX, etc.)
   - Фильтрация по способам оплаты (Visa, Mastercard, SEPA, SWIFT, etc.)
   - Фильтрация по статусу лицензии

4. СРАВНИТЕЛЬНЫЙ АНАЛИЗ (COMPARABLES)
   - Сравнение с 3 ближайшими конкурентами
   - Сравнительные таблицы по регионам, услугам, лицензиям
   - AI-инсайты и рекомендации
   - Технические характеристики и API возможности

5. СИСТЕМА КОНТАКТОВ И ЛИД-ГЕНЕРАЦИИ
   - Формы связи с PSP провайдерами
   - Запросы на получение API доступа
   - Запросы на получение цен от похожих провайдеров

6. СПОНСИРОВАННЫЕ PSP
   - Выделение рекламных PSP провайдеров
   - Специальное оформление карточек и маркеров
   - Отдельная легенда на карте

🏗️ АРХИТЕКТУРА ПРОЕКТА
================================================================================

СТРУКТУРА ПАПОК:
```
banktrack-landing-81-main/
├── public/
│   ├── psp_database.json          # Основная база данных PSP
│   ├── world-countries.json       # Геоданные стран
│   └── favicon.ico, og-image.png  # Статические ресурсы
├── src/
│   ├── components/
│   │   ├── intel/                 # Компоненты страницы Intel
│   │   │   ├── PSPProviderCard.tsx
│   │   │   ├── PSPSearchForm.tsx
│   │   │   ├── PSPDetailsModal.tsx
│   │   │   ├── PSPComparables.tsx
│   │   │   ├── IntelStats.tsx
│   │   │   └── WorldMap.tsx
│   │   ├── ui/                    # UI компоненты (Shadcn)
│   │   ├── transfer/              # Компоненты для переводов
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Reviews.tsx
│   ├── pages/
│   │   ├── Intel.tsx              # Главная страница Intel
│   │   ├── Index.tsx              # Главная страница
│   │   └── NotFound.tsx
│   ├── types/
│   │   ├── psp.ts                 # TypeScript интерфейсы
│   │   └── transfer.ts
│   ├── hooks/                     # React хуки
│   ├── services/                  # API сервисы
│   ├── utils/                     # Утилиты
│   └── lib/                       # Библиотеки
└── package.json, vite.config.ts   # Конфигурация
```

ТЕХНОЛОГИЧЕСКИЙ СТЕК:
- React 18+ с TypeScript
- Vite для сборки
- Tailwind CSS для стилизации
- Mapbox GL JS для интерактивной карты
- Shadcn UI компоненты
- React Router для навигации

📊 СТРУКТУРА ДАННЫХ
================================================================================

ОСНОВНАЯ МОДЕЛЬ PSP (PSPProvider):
```typescript
interface PSPProvider {
  id: string;
  commercial_name: string;
  legal_name: string;
  country: string;
  jurisdiction: string;
  license_type: string;
  license_status: string;
  services: string[];
  payment_methods: string[];
  supported_regions: string[];
  target_clients: string[];
  description: string;
  website: string;
  is_sponsored?: boolean;
  last_updated: string;
  
  // Расширенные поля
  business_model?: "white-label" | "full-stack" | "orchestration" | "hybrid";
  supported_verticals?: string[];
  swift_support?: boolean;
  sepa_support?: boolean;
  visa_support?: boolean;
  mastercard_support?: boolean;
  local_apm_support?: boolean;
  crypto_support?: boolean;
  public_api?: boolean;
  api_documentation_url?: string;
  webhook_support?: boolean;
  sdk_available?: string[];
  
  // Контактная информация
  sales_contact?: {
    name: string;
    email: string;
    phone?: string;
    linkedin?: string;
  };
  
  // Рейтинги и отзывы
  rating?: {
    overall: number;
    reliability: number;
    support: number;
    pricing: number;
    reviews_count: number;
  };
  
  // Ценообразование
  pricing?: {
    setup_fee?: number;
    monthly_fee?: number;
    transaction_fee_percentage?: number;
    transaction_fee_fixed?: number;
    currency: string;
  };
  
  // Сравнительные данные
  competitors?: string[];
  market_position?: "leader" | "challenger" | "niche" | "emerging";
  founded_year?: number;
  employee_count?: number;
  funding_rounds?: FundingRound[];
}
```

МОДЕЛЬ СРАВНЕНИЯ (PSPComparison):
```typescript
interface PSPComparison {
  primary: PSPProvider;
  competitors: PSPProvider[];
  comparison_matrix: ComparisonMatrix;
  ai_insights: AIInsight[];
}

interface ComparisonMatrix {
  regions: ComparisonItem;
  services: ComparisonItem;
  licenses: ComparisonItem;
  pricing: ComparisonItem;
  api_features: ComparisonItem;
  support: ComparisonItem;
}

interface AIInsight {
  type: "recommendation" | "warning" | "opportunity" | "comparison";
  message: string;
  confidence: number;
  reasoning?: string;
}
```

🗺️ КАРТА И ВИЗУАЛИЗАЦИЯ
================================================================================

MAPBOX GL JS ИНТЕГРАЦИЯ:
- Стиль карты: mapbox://styles/mapbox/light-v11 (только страны и города)
- Центр карты: [10, 50] (Европа)
- Зум: 4
- Токен: pk.eyJ1IjoidzhpdHNhYXMiLCJhIjoiY21ka203cjJwMHQzajJ0cXlna3E5b3Y1MCJ9.BHy42jl-x-3miZGLaZsFEA

СЛОИ КАРТЫ:
1. psp-countries-fill - заливка стран с PSP
2. psp-countries-border - границы стран с PSP
3. psp-markers - маркеры PSP провайдеров

МАРКЕРЫ PSP:
- Анимированные пульсирующие точки
- Цвет: синий (#1e88e5) для обычных, золотой для спонсированных
- Popup с детальной информацией при клике
- Tooltip при наведении

ЗАЛИВКА СТРАН:
- Мягкий синий цвет для стран с PSP
- Более яркий синий для выбранных стран
- Интерактивность: клик для фильтрации

АНИМАЦИИ:
- Пульсация маркеров с эффектом "wave"
- Fade-in эффекты для карточек
- Hover трансформации
- Плавные переходы цветов

🔍 СИСТЕМА ПОИСКА И ФИЛЬТРАЦИИ
================================================================================

ФИЛЬТРЫ:
1. Юрисдикция:
   - Cyprus (cy)
   - United Kingdom (uk)
   - Singapore (sg)
   - Hong Kong (hk)

2. Тип лицензии:
   - EMI (Electronic Money Institution)
   - PI (Payment Institution)
   - Other

3. Услуги:
   - Card Acquiring
   - Payouts
   - FX (Foreign Exchange)
   - API Integration
   - E-Wallet
   - Crypto
   - Payment Gateway
   - High-Risk Processing
   - Merchant Services
   - Embedded Finance

4. Способы оплаты:
   - Visa
   - Mastercard
   - SEPA
   - SWIFT
   - Local APM
   - Crypto
   - Bank Transfer
   - E-Wallet

5. Статус лицензии:
   - Active
   - Pending
   - Suspended
   - Revoked

ЛОГИКА ФИЛЬТРАЦИИ:
- Клиентская фильтрация на основе psp_database.json
- Маппинг значений для корректного поиска
- Комбинирование фильтров
- Фильтрация по выбранным странам на карте

📱 КОМПОНЕНТЫ ИНТЕРФЕЙСА
================================================================================

PSPProviderCard:
- Современный дизайн с градиентами
- Флаги стран
- Бейджи для статусов и услуг
- Кнопка "Details" для открытия модального окна
- Специальное оформление для спонсированных PSP

PSPDetailsModal:
- Табы: Детали, Сравнение, Контакты
- Полная информация о PSP
- Интеграция с PSPComparables
- Форма контакта

PSPComparables:
- Сравнительные таблицы
- AI инсайты
- Кнопки связи с провайдерами
- Модальное окно контакта

PSPSearchForm:
- Все фильтры поиска
- Выбор стран на карте
- Индикатор загрузки

IntelStats:
- Статистика по PSP
- Количество провайдеров по странам
- Графики надежности

🎨 ДИЗАЙН И UX
================================================================================

ЦВЕТОВАЯ СХЕМА:
- Основной: синий (#1e88e5, #3b82f6)
- Дополнительный: фиолетовый (#8b5cf6)
- Фон: градиент серый-белый-синий
- Акценты: золотой для спонсированных PSP

ТИПОГРАФИКА:
- Заголовки: крупные, жирные, с градиентами
- Текст: читаемый, контрастный
- Бейджи: компактные, информативные

АНИМАЦИИ:
- Плавные переходы между состояниями
- Hover эффекты
- Пульсация маркеров
- Fade-in для контента

АДАПТИВНОСТЬ:
- Mobile-first подход
- Responsive дизайн
- Оптимизация для планшетов и десктопов

🔧 ТЕХНИЧЕСКИЕ ДЕТАЛИ
================================================================================

УПРАВЛЕНИЕ СОСТОЯНИЕМ:
- React useState для локального состояния
- useEffect для побочных эффектов
- useCallback для оптимизации производительности
- useRef для ссылок на DOM элементы

ОБРАБОТКА СОБЫТИЙ:
- Клики по карте и маркерам
- Hover эффекты
- Формы поиска и фильтрации
- Модальные окна

ПРОИЗВОДИТЕЛЬНОСТЬ:
- Ленивая загрузка компонентов
- Оптимизация re-renders
- Эффективная фильтрация данных
- Кэширование результатов поиска

ОБРАБОТКА ОШИБОК:
- Try-catch блоки для API вызовов
- Fallback UI для ошибок загрузки
- Валидация данных
- Логирование ошибок в консоль

📈 МОНИТОРИНГ И АНАЛИТИКА
================================================================================

ЛОГИРОВАНИЕ:
- Подробные console.log для отладки
- Отслеживание загрузки данных
- Мониторинг состояния карты
- Логирование пользовательских действий

МЕТРИКИ:
- Количество загруженных PSP
- Время загрузки карты
- Количество кликов по маркерам
- Использование фильтров

🔒 БЕЗОПАСНОСТЬ
================================================================================

- Валидация входных данных
- Санитизация пользовательского ввода
- Безопасная обработка API ключей
- Защита от XSS атак

🚀 РАЗВЕРТЫВАНИЕ
================================================================================

СБОРКА:
```bash
npm run build
```

РАЗРАБОТКА:
```bash
npm run dev
```

ТЕСТИРОВАНИЕ:
```bash
npm run test
```

ЛИНТИНГ:
```bash
npm run lint
```

📋 ЗАВИСИМОСТИ
================================================================================

ОСНОВНЫЕ:
- react: ^18.2.0
- react-dom: ^18.2.0
- typescript: ^5.0.2
- vite: ^4.4.5

UI И СТИЛИ:
- tailwindcss: ^3.3.0
- @radix-ui/react-*
- lucide-react: ^0.263.1
- class-variance-authority: ^0.7.0

КАРТЫ:
- mapbox-gl: ^2.15.0

УТИЛИТЫ:
- clsx: ^2.0.0
- tailwind-merge: ^1.14.0

🔮 ПЛАНЫ РАЗВИТИЯ
================================================================================

КРАТКОСРОЧНЫЕ:
- Исправление оставшихся TypeScript ошибок
- Оптимизация производительности карты
- Улучшение UX мобильной версии
- Добавление большего количества PSP данных

СРЕДНЕСРОЧНЫЕ:
- Реализация платных функций (CSV экспорт, API доступ)
- Интеграция с реальными API PSP провайдеров
- Система уведомлений
- Расширенная аналитика

ДОЛГОСРОЧНЫЕ:
- Мобильное приложение
- Интеграция с CRM системами
- AI-анализ рынка PSP
- Партнерская программа

🐛 ИЗВЕСТНЫЕ ПРОБЛЕМЫ
================================================================================

1. TypeScript ошибки:
   - Некоторые any типы в Mapbox интеграции
   - useEffect зависимости
   - Пустые интерфейсы

2. Производительность:
   - Множественные вызовы addPSPMarkers
   - Оптимизация re-renders

3. UX:
   - Задержки при загрузке карты
   - Мобильная адаптация

📞 КОНТАКТЫ И ПОДДЕРЖКА
================================================================================

Разработчик: tg: @as37saffat
Версия документации: 1.0
Дата последнего обновления: 2024

Для технической поддержки и вопросов по проекту обращайтесь к разработчику.

================================================================================
                                КОНЕЦ ДОКУМЕНТАЦИИ
================================================================================
