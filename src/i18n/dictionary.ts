import type { DriverStatus, Lang, ShipmentStatus, VehicleStatus } from "@/lib/types";

export const LANG_LABELS: Record<Lang, string> = {
  uk: "УКР",
  en: "ENG",
  ru: "РУС",
};

export const LOCALE_TAGS: Record<Lang, string> = {
  uk: "uk-UA",
  en: "en-US",
  ru: "ru-RU",
};

export const SHIPMENT_STATUS_LABELS: Record<ShipmentStatus, Record<Lang, string>> = {
  "on-time": { uk: "Вчасно", en: "On time", ru: "Вовремя" },
  delayed: { uk: "Затримка", en: "Delayed", ru: "Задержка" },
  critical: { uk: "Критично", en: "Critical", ru: "Критично" },
  delivered: { uk: "Доставлено", en: "Delivered", ru: "Доставлено" },
};

export const DRIVER_STATUS_LABELS: Record<DriverStatus, Record<Lang, string>> = {
  "on-route": { uk: "На маршруті", en: "On route", ru: "На маршруте" },
  available: { uk: "Доступний", en: "Available", ru: "Доступен" },
  "off-duty": { uk: "Не на зміні", en: "Off duty", ru: "Не на смене" },
};

export const VEHICLE_STATUS_LABELS: Record<VehicleStatus, Record<Lang, string>> = {
  "in-service": { uk: "На рейсі", en: "In service", ru: "На рейсе" },
  available: { uk: "Доступний", en: "Available", ru: "Доступен" },
  maintenance: { uk: "На обслуговуванні", en: "In maintenance", ru: "На обслуживании" },
};

export interface Dictionary {
  common: {
    readOnlyNotice: string;
    cancel: string;
    add: string;
    close: string;
    requiredField: string;
  };
  sidebar: {
    dispatch: string;
    overview: string;
    operations: string;
    finance: string;
    dashboard: string;
    drivers: string;
    fleet: string;
    scheduled: string;
    tracker: string;
    messenger: string;
    billing: string;
    reports: string;
    dispatcherName: string;
    dispatcherRole: string;
    online: string;
    dispatcherAvatarAlt: string;
    demoNotice: string;
    closeMenu: string;
    logout: string;
  };
  loginPage: {
    tagline: string;
    blurb: string;
    heading: string;
    subheading: string;
    loginLabel: string;
    passwordLabel: string;
    showPassword: string;
    hidePassword: string;
    submit: string;
    loggingIn: string;
    genericError: string;
    demoNote: string;
  };
  topbar: {
    searchPlaceholder: string;
    openMenuAria: string;
    notificationsAria: string;
    notificationsTitle: string;
    alertsEmpty: string;
    alertShipmentCritical: (code: string, route: string, minutes: number) => string;
    alertShipmentDelayed: (code: string, route: string, minutes: number) => string;
    alertVehicleFuel: (plate: string, percent: number) => string;
    alertVehicleService: (plate: string, km: number) => string;
    searchSectionShipments: string;
    searchSectionDrivers: string;
    searchSectionVehicles: string;
    searchSectionPages: string;
    searchNoResults: (query: string) => string;
    crumbDashboard: string;
    crumbRoute: string;
    crumbDrivers: string;
    crumbFleet: string;
    crumbReports: string;
    crumbScheduled: string;
    crumbTracker: string;
    crumbMessenger: string;
    crumbBilling: string;
  };
  dashboardPage: {
    title: string;
    subtitle: string;
    loadError: string;
    emptyFiltered: string;
    emptySearch: (query: string) => string;
    liveLabel: string;
    financeTitle: string;
    monthRevenue: string;
    revenueUp: (percent: number) => string;
    revenueDown: (percent: number) => string;
    avgShipmentValue: string;
    fleetUtilization: string;
    revenueChartTitle: string;
    revenueChartSubtitle: string;
    currencyUnit: string;
  };
  kpi: {
    active: string;
    onTime: string;
    delayed: string;
    critical: string;
    deliveredToday: string;
  };
  filters: {
    all: string;
    onTime: string;
    delayed: string;
    critical: string;
    delivered: string;
  };
  table: {
    code: string;
    route: string;
    driver: string;
    eta: string;
    progress: string;
    status: string;
    km: string;
    etaDelivered: string;
    etaOverdue: (min: number) => string;
    etaInMinutes: (min: number) => string;
    etaInHours: (h: number, m: number) => string;
  };
  routeDetail: {
    backToDashboard: string;
    scaleNote: string;
    cargoSection: string;
    description: string;
    distance: string;
    progress: string;
    delay: string;
    chronology: string;
    driverLabel: string;
    updateStatus: string;
    markDelivered: string;
    delivered: string;
    updating: string;
    etaDelivered: string;
    etaOverdue: (min: number) => string;
    etaIn: (h: number, m: number) => string;
    updateError: string;
    minutesShort: string;
  };
  driversPage: {
    title: string;
    subtitle: string;
    loadError: string;
    yearsAtCompany: string;
    deliveries: string;
    onRouteNow: string;
    lastRoute: string;
    backToDrivers: string;
    plateLabel: string;
    historyTitle: string;
    historyEmpty: string;
    vehicleSection: string;
    messageDriver: string;
    addDriver: string;
    addDriverTitle: string;
    formName: string;
    formPhone: string;
    formVehicle: string;
    formPlate: string;
    formYears: string;
    submitDriver: string;
  };
  timeline: {
    loading: string;
    inTransit: string;
    waypoint: string;
    arrival: string;
  };
  fleetPage: {
    title: string;
    subtitle: string;
    loadError: string;
    type: string;
    capacity: string;
    odometer: string;
    fuel: string;
    nextService: string;
    unassigned: string;
    assignedTo: string;
    setToMaintenance: string;
    setToAvailable: string;
    kmUnit: string;
    kgUnit: string;
    truckType: string;
    vanType: string;
    backToFleet: string;
    addVehicle: string;
    addVehicleTitle: string;
    formModel: string;
    formPlate: string;
    formType: string;
    formCapacity: string;
    submitVehicle: string;
  };
  scheduledPage: {
    title: string;
    subtitle: string;
    loadError: string;
    addTrip: string;
    addTripTitle: string;
    unassignedLabel: string;
    assignedLabel: string;
    assignAction: string;
    assignModalTitle: string;
    chooseDriver: string;
    chooseVehicle: string;
    confirmAssign: string;
    tableRoute: string;
    tableCargo: string;
    tableDate: string;
    tableStatus: string;
    tableDriver: string;
    formOrigin: string;
    formDestination: string;
    formCargo: string;
    formDistance: string;
    formDate: string;
    submitTrip: string;
    noAvailableDrivers: string;
  };
  trackerPage: {
    title: string;
    subtitle: string;
    loadError: string;
    activeCount: (n: number) => string;
    noActive: string;
    legendNote: string;
  };
  messengerPage: {
    title: string;
    subtitle: string;
    loadError: string;
    selectDriver: string;
    inputPlaceholder: string;
    send: string;
    emptyThread: string;
    conversationsTitle: string;
  };
  billingPage: {
    title: string;
    subtitle: string;
    loadError: string;
    totalRevenue: string;
    paidAmount: string;
    pendingAmount: string;
    overdueAmount: string;
    tableClient: string;
    tableShipment: string;
    tableAmount: string;
    tableStatus: string;
    tableDate: string;
    statusPaid: string;
    statusPending: string;
    statusOverdue: string;
    markPaid: string;
    markingPaid: string;
  };
  reportsPage: {
    title: string;
    subtitle: string;
    loadError: string;
    statusBreakdown: string;
    topDrivers: string;
    topDestinations: string;
    deliveriesUnit: string;
    fleetSummary: string;
    inService: string;
    available: string;
    maintenance: string;
    shipmentsUnit: string;
  };
  server: {
    invalidBody: string;
    statusRequired: string;
    unknownStatus: (status: string) => string;
    shipmentNotFound: string;
    vehicleNotFound: string;
    vehicleInService: string;
    invalidCredentials: string;
    readOnlyDemo: string;
    scheduledTripNotFound: string;
    driverNotFound: string;
  };
}

const uk: Dictionary = {
  common: {
    readOnlyNotice: "Це демо-акаунт лише для перегляду. У робочому кабінеті ця дія збереже зміни.",
    cancel: "Скасувати",
    add: "Додати",
    close: "Закрити",
    requiredField: "Заповніть це поле",
  },
  sidebar: {
    dispatch: "Atlas Ops",
    overview: "Огляд",
    operations: "Операції",
    finance: "Фінанси",
    dashboard: "Дашборд",
    drivers: "Водії",
    fleet: "Автопарк",
    scheduled: "Заплановані поїздки",
    tracker: "Трекер на карті",
    messenger: "Месенджер",
    billing: "Оплата",
    reports: "Звіти",
    dispatcherName: "Максим Бойко",
    dispatcherRole: "Диспетчерська",
    online: "Диспетчер · онлайн",
    dispatcherAvatarAlt: "Диспетчер",
    demoNotice: "Демо-режим · лише перегляд, дані відкриті для прикладу",
    closeMenu: "Закрити меню",
    logout: "Вийти",
  },
  loginPage: {
    tagline: "Диспетчерська панель",
    blurb: "Відправлення, водії, автопарк і фінанси логістичної компанії в одному місці.",
    heading: "Вхід у систему",
    subheading: "Це відкритий демо-акаунт, дані для входу вже підставлені",
    loginLabel: "Логін",
    passwordLabel: "Пароль",
    showPassword: "Показати пароль",
    hidePassword: "Приховати пароль",
    submit: "Увійти",
    loggingIn: "Заходимо…",
    genericError: "Не вдалося увійти. Спробуйте ще раз.",
    demoNote: "Демо-доступ для перегляду портфоліо NexuraDev. Додавати чи змінювати дані не можна, але весь функціонал відкритий.",
  },
  topbar: {
    searchPlaceholder: "Пошук за кодом, маршрутом або водієм…",
    openMenuAria: "Відкрити меню",
    notificationsAria: "Сповіщення",
    notificationsTitle: "Сповіщення",
    alertsEmpty: "Активних сповіщень немає.",
    alertShipmentCritical: (code, route, minutes) =>
      minutes > 0
        ? `${code}: критичний стан, ${route}, запізнення ${minutes} хв`
        : `${code}: критичний стан, ${route}`,
    alertShipmentDelayed: (code, route, minutes) => `${code}: затримка ${minutes} хв, ${route}`,
    alertVehicleFuel: (plate, percent) => `${plate}: мало пального, залишилось ${percent}%`,
    alertVehicleService: (plate, km) => `${plate}: плановий сервіс через ${km} км`,
    searchSectionShipments: "Відправлення",
    searchSectionDrivers: "Водії",
    searchSectionVehicles: "Автопарк",
    searchSectionPages: "Розділи",
    searchNoResults: (query) => `Нічого не знайдено за запитом «${query}»`,
    crumbDashboard: "Дашборд",
    crumbRoute: "Маршрут",
    crumbDrivers: "Водії",
    crumbFleet: "Автопарк",
    crumbReports: "Звіти",
    crumbScheduled: "Заплановані поїздки",
    crumbTracker: "Трекер на карті",
    crumbMessenger: "Месенджер",
    crumbBilling: "Оплата",
  },
  dashboardPage: {
    title: "Дашборд відправлень",
    subtitle: "Активні доставки по всій мережі Atlas Ops, оновлюється в реальному часі.",
    loadError: "Не вдалося завантажити відправлення.",
    emptyFiltered: "Немає відправлень з обраним статусом.",
    emptySearch: (query) => `Нічого не знайдено за запитом «${query}».`,
    liveLabel: "Оновлюється автоматично",
    financeTitle: "Фінанси та автопарк",
    monthRevenue: "Дохід за 30 днів",
    revenueUp: (percent) => `+${percent}% до попередніх 30 днів`,
    revenueDown: (percent) => `-${percent}% до попередніх 30 днів`,
    avgShipmentValue: "Середній чек",
    fleetUtilization: "Завантаженість автопарку",
    revenueChartTitle: "Дохід за останні 30 днів",
    revenueChartSubtitle: "Сума по даті виставлення рахунку",
    currencyUnit: "грн",
  },
  kpi: {
    active: "Активні відправлення",
    onTime: "Вчасно",
    delayed: "Затримки",
    critical: "Критичні",
    deliveredToday: "Доставлено сьогодні",
  },
  filters: {
    all: "Усі",
    onTime: "Вчасно",
    delayed: "Затримка",
    critical: "Критично",
    delivered: "Доставлено",
  },
  table: {
    code: "Код",
    route: "Маршрут",
    driver: "Водій",
    eta: "ETA",
    progress: "Прогрес",
    status: "Статус",
    km: "км",
    etaDelivered: "-",
    etaOverdue: (min) => `прострочено на ${min} хв`,
    etaInMinutes: (min) => `через ${min} хв`,
    etaInHours: (h, m) => `через ${h} год ${m} хв`,
  },
  routeDetail: {
    backToDashboard: "Дашборд відправлень",
    scaleNote: "Схема маршруту · не в масштабі",
    cargoSection: "Вантаж",
    description: "Опис",
    distance: "Відстань",
    progress: "Прогрес",
    delay: "Затримка",
    chronology: "Хронологія",
    driverLabel: "Водій",
    updateStatus: "Оновити статус",
    markDelivered: "Позначити доставленим",
    delivered: "Відправлення доставлено",
    updating: "Оновлюємо…",
    etaDelivered: "Доставлено",
    etaOverdue: (min) => `Прострочено на ${min} хв`,
    etaIn: (h, m) => `Через ${h} год ${m} хв`,
    updateError: "Не вдалося оновити статус.",
    minutesShort: "хв",
  },
  driversPage: {
    title: "Водії",
    subtitle: "Статус доступності та поточні рейси всіх водіїв мережі.",
    loadError: "Не вдалося завантажити список водіїв.",
    yearsAtCompany: "р. у компанії",
    deliveries: "доставок",
    onRouteNow: "Зараз у рейсі: ",
    lastRoute: "Останній рейс: ",
    backToDrivers: "Водії",
    plateLabel: "Держ. номер",
    historyTitle: "Історія рейсів",
    historyEmpty: "Рейсів за цим водієм поки немає.",
    vehicleSection: "Закріплений транспорт",
    messageDriver: "Написати",
    addDriver: "Додати водія",
    addDriverTitle: "Новий водій",
    formName: "Ім'я та прізвище",
    formPhone: "Телефон",
    formVehicle: "Модель авто",
    formPlate: "Держ. номер",
    formYears: "Стаж, років",
    submitDriver: "Додати водія",
  },
  timeline: {
    loading: "Завантаження",
    inTransit: "В дорозі",
    waypoint: "Проміжний пункт",
    arrival: "Прибуття",
  },
  fleetPage: {
    title: "Автопарк",
    subtitle: "Стан, пробіг і обслуговування всіх транспортних засобів мережі.",
    loadError: "Не вдалося завантажити автопарк.",
    type: "Тип",
    capacity: "Вантажопідйомність",
    odometer: "Пробіг",
    fuel: "Паливо",
    nextService: "До ТО",
    unassigned: "Без водія",
    assignedTo: "Водій",
    setToMaintenance: "На обслуговування",
    setToAvailable: "Повернути в стрій",
    kmUnit: "км",
    kgUnit: "кг",
    truckType: "Вантажівка",
    vanType: "Фургон",
    backToFleet: "Автопарк",
    addVehicle: "Додати авто",
    addVehicleTitle: "Новий транспортний засіб",
    formModel: "Модель",
    formPlate: "Держ. номер",
    formType: "Тип",
    formCapacity: "Вантажопідйомність, кг",
    submitVehicle: "Додати авто",
  },
  scheduledPage: {
    title: "Заплановані поїздки",
    subtitle: "Майбутні рейси, які ще потребують водія та транспорту.",
    loadError: "Не вдалося завантажити заплановані поїздки.",
    addTrip: "Запланувати поїздку",
    addTripTitle: "Нова запланована поїздка",
    unassignedLabel: "Без водія",
    assignedLabel: "Призначено",
    assignAction: "Призначити водія",
    assignModalTitle: "Призначення на рейс",
    chooseDriver: "Водій",
    chooseVehicle: "Транспорт",
    confirmAssign: "Призначити",
    tableRoute: "Маршрут",
    tableCargo: "Вантаж",
    tableDate: "Дата",
    tableStatus: "Статус",
    tableDriver: "Водій",
    formOrigin: "Звідки",
    formDestination: "Куди",
    formCargo: "Вантаж",
    formDistance: "Відстань, км",
    formDate: "Дата й час відправлення",
    submitTrip: "Запланувати",
    noAvailableDrivers: "Немає вільних водіїв або транспорту",
  },
  trackerPage: {
    title: "Трекер на карті",
    subtitle: "Поточне положення всіх вантажівок у дорозі на одній схемі.",
    loadError: "Не вдалося завантажити трекер.",
    activeCount: (n) => `${n} у дорозі`,
    noActive: "Зараз жодне відправлення не в дорозі.",
    legendNote: "Схема мережі · не в масштабі, натисніть на мітку для деталей",
  },
  messengerPage: {
    title: "Месенджер з водіями",
    subtitle: "Переписка диспетчера з водіями по поточних рейсах.",
    loadError: "Не вдалося завантажити повідомлення.",
    selectDriver: "Оберіть водія зі списку зліва",
    inputPlaceholder: "Напишіть повідомлення…",
    send: "Надіслати",
    emptyThread: "Повідомлень поки немає.",
    conversationsTitle: "Водії",
  },
  billingPage: {
    title: "Оплата",
    subtitle: "Рахунки клієнтів за відправлення та статус оплати.",
    loadError: "Не вдалося завантажити рахунки.",
    totalRevenue: "Загальний дохід",
    paidAmount: "Оплачено",
    pendingAmount: "Очікує оплати",
    overdueAmount: "Прострочено",
    tableClient: "Клієнт",
    tableShipment: "Відправлення",
    tableAmount: "Сума",
    tableStatus: "Статус",
    tableDate: "Дата",
    statusPaid: "Оплачено",
    statusPending: "Очікує",
    statusOverdue: "Прострочено",
    markPaid: "Позначити оплаченим",
    markingPaid: "Зберігаємо…",
  },
  reportsPage: {
    title: "Звіти",
    subtitle: "Зведена статистика по відправленнях, водіях і автопарку.",
    loadError: "Не вдалося завантажити звіти.",
    statusBreakdown: "Відправлення за статусом",
    topDrivers: "Топ водіїв за доставками",
    topDestinations: "Топ напрямків",
    deliveriesUnit: "доставок",
    fleetSummary: "Стан автопарку",
    inService: "На рейсі",
    available: "Доступні",
    maintenance: "На обслуговуванні",
    shipmentsUnit: "відправлень",
  },
  server: {
    invalidBody: "Некоректне тіло запиту.",
    statusRequired: "Поле status є обов'язковим.",
    unknownStatus: (status) => `Невідомий статус: "${status}".`,
    shipmentNotFound: "Відправлення не знайдено.",
    vehicleNotFound: "Транспортний засіб не знайдено.",
    vehicleInService: "Транспортний засіб зараз на рейсі.",
    invalidCredentials: "Невірний логін або пароль.",
    readOnlyDemo: "Це демо-акаунт лише для перегляду. Зміни не зберігаються.",
    scheduledTripNotFound: "Заплановану поїздку не знайдено.",
    driverNotFound: "Водія не знайдено.",
  },
};

const en: Dictionary = {
  common: {
    readOnlyNotice: "This demo account is view-only. In a live workspace this action would save.",
    cancel: "Cancel",
    add: "Add",
    close: "Close",
    requiredField: "Fill in this field",
  },
  sidebar: {
    dispatch: "Atlas Ops",
    overview: "Overview",
    operations: "Operations",
    finance: "Finance",
    dashboard: "Dashboard",
    drivers: "Drivers",
    fleet: "Fleet",
    scheduled: "Scheduled trips",
    tracker: "Map tracker",
    messenger: "Messenger",
    billing: "Billing",
    reports: "Reports",
    dispatcherName: "Maksym Boiko",
    dispatcherRole: "Dispatch",
    online: "Dispatcher · online",
    dispatcherAvatarAlt: "Dispatcher",
    demoNotice: "Demo mode · view only, sample data",
    closeMenu: "Close menu",
    logout: "Log out",
  },
  loginPage: {
    tagline: "Dispatch console",
    blurb: "Shipments, drivers, fleet, and finances for a logistics company in one place.",
    heading: "Sign in",
    subheading: "This is an open demo account, the credentials are already filled in",
    loginLabel: "Login",
    passwordLabel: "Password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    submit: "Sign in",
    loggingIn: "Signing in…",
    genericError: "Couldn't sign in. Please try again.",
    demoNote: "Demo access for browsing the NexuraDev portfolio. You can't add or change data, but every feature is unlocked.",
  },
  topbar: {
    searchPlaceholder: "Search by code, route, or driver…",
    openMenuAria: "Open menu",
    notificationsAria: "Notifications",
    notificationsTitle: "Notifications",
    alertsEmpty: "No active alerts.",
    alertShipmentCritical: (code, route, minutes) =>
      minutes > 0 ? `${code}: critical, ${route}, ${minutes} min overdue` : `${code}: critical, ${route}`,
    alertShipmentDelayed: (code, route, minutes) => `${code}: delayed ${minutes} min, ${route}`,
    alertVehicleFuel: (plate, percent) => `${plate}: low fuel, ${percent}% left`,
    alertVehicleService: (plate, km) => `${plate}: service due in ${km} km`,
    searchSectionShipments: "Shipments",
    searchSectionDrivers: "Drivers",
    searchSectionVehicles: "Fleet",
    searchSectionPages: "Pages",
    searchNoResults: (query) => `No matches for "${query}"`,
    crumbDashboard: "Dashboard",
    crumbRoute: "Route",
    crumbDrivers: "Drivers",
    crumbFleet: "Fleet",
    crumbReports: "Reports",
    crumbScheduled: "Scheduled trips",
    crumbTracker: "Map tracker",
    crumbMessenger: "Messenger",
    crumbBilling: "Billing",
  },
  dashboardPage: {
    title: "Shipments dashboard",
    subtitle: "Active deliveries across the Atlas Ops network, updated in real time.",
    loadError: "Failed to load shipments.",
    emptyFiltered: "No shipments with the selected status.",
    emptySearch: (query) => `No matches for "${query}".`,
    liveLabel: "Updating automatically",
    financeTitle: "Finance & fleet",
    monthRevenue: "Revenue, last 30 days",
    revenueUp: (percent) => `+${percent}% vs the previous 30 days`,
    revenueDown: (percent) => `-${percent}% vs the previous 30 days`,
    avgShipmentValue: "Average shipment value",
    fleetUtilization: "Fleet utilization",
    revenueChartTitle: "Revenue, last 30 days",
    revenueChartSubtitle: "Sum by invoice date",
    currencyUnit: "UAH",
  },
  kpi: {
    active: "Active shipments",
    onTime: "On time",
    delayed: "Delayed",
    critical: "Critical",
    deliveredToday: "Delivered today",
  },
  filters: {
    all: "All",
    onTime: "On time",
    delayed: "Delayed",
    critical: "Critical",
    delivered: "Delivered",
  },
  table: {
    code: "Code",
    route: "Route",
    driver: "Driver",
    eta: "ETA",
    progress: "Progress",
    status: "Status",
    km: "km",
    etaDelivered: "-",
    etaOverdue: (min) => `overdue by ${min} min`,
    etaInMinutes: (min) => `in ${min} min`,
    etaInHours: (h, m) => `in ${h}h ${m}m`,
  },
  routeDetail: {
    backToDashboard: "Shipments dashboard",
    scaleNote: "Route schematic · not to scale",
    cargoSection: "Cargo",
    description: "Description",
    distance: "Distance",
    progress: "Progress",
    delay: "Delay",
    chronology: "Timeline",
    driverLabel: "Driver",
    updateStatus: "Update status",
    markDelivered: "Mark as delivered",
    delivered: "Shipment delivered",
    updating: "Updating…",
    etaDelivered: "Delivered",
    etaOverdue: (min) => `Overdue by ${min} min`,
    etaIn: (h, m) => `In ${h}h ${m}m`,
    updateError: "Failed to update status.",
    minutesShort: "min",
  },
  driversPage: {
    title: "Drivers",
    subtitle: "Availability status and current routes for all drivers in the network.",
    loadError: "Failed to load the driver list.",
    yearsAtCompany: "yrs at company",
    deliveries: "deliveries",
    onRouteNow: "On route now: ",
    lastRoute: "Last route: ",
    backToDrivers: "Drivers",
    plateLabel: "Plate",
    historyTitle: "Route history",
    historyEmpty: "No routes recorded for this driver yet.",
    vehicleSection: "Assigned vehicle",
    messageDriver: "Message",
    addDriver: "Add driver",
    addDriverTitle: "New driver",
    formName: "Full name",
    formPhone: "Phone",
    formVehicle: "Vehicle model",
    formPlate: "Plate",
    formYears: "Years of experience",
    submitDriver: "Add driver",
  },
  timeline: {
    loading: "Loading",
    inTransit: "In transit",
    waypoint: "Waypoint",
    arrival: "Arrival",
  },
  fleetPage: {
    title: "Fleet",
    subtitle: "Status, mileage, and maintenance for every vehicle in the network.",
    loadError: "Failed to load the fleet.",
    type: "Type",
    capacity: "Capacity",
    odometer: "Odometer",
    fuel: "Fuel",
    nextService: "Next service",
    unassigned: "Unassigned",
    assignedTo: "Driver",
    setToMaintenance: "Send to maintenance",
    setToAvailable: "Return to service",
    kmUnit: "km",
    kgUnit: "kg",
    truckType: "Truck",
    vanType: "Van",
    backToFleet: "Fleet",
    addVehicle: "Add vehicle",
    addVehicleTitle: "New vehicle",
    formModel: "Model",
    formPlate: "Plate",
    formType: "Type",
    formCapacity: "Capacity, kg",
    submitVehicle: "Add vehicle",
  },
  scheduledPage: {
    title: "Scheduled trips",
    subtitle: "Upcoming trips that still need a driver and a vehicle assigned.",
    loadError: "Failed to load scheduled trips.",
    addTrip: "Schedule a trip",
    addTripTitle: "New scheduled trip",
    unassignedLabel: "Unassigned",
    assignedLabel: "Assigned",
    assignAction: "Assign a driver",
    assignModalTitle: "Assign this trip",
    chooseDriver: "Driver",
    chooseVehicle: "Vehicle",
    confirmAssign: "Assign",
    tableRoute: "Route",
    tableCargo: "Cargo",
    tableDate: "Date",
    tableStatus: "Status",
    tableDriver: "Driver",
    formOrigin: "From",
    formDestination: "To",
    formCargo: "Cargo",
    formDistance: "Distance, km",
    formDate: "Departure date & time",
    submitTrip: "Schedule",
    noAvailableDrivers: "No available drivers or vehicles",
  },
  trackerPage: {
    title: "Map tracker",
    subtitle: "Every truck currently en route, shown on one shared schematic.",
    loadError: "Failed to load the tracker.",
    activeCount: (n) => `${n} en route`,
    noActive: "No shipment is en route right now.",
    legendNote: "Network schematic · not to scale, click a marker for details",
  },
  messengerPage: {
    title: "Driver messenger",
    subtitle: "The dispatcher's conversations with drivers about their current routes.",
    loadError: "Failed to load messages.",
    selectDriver: "Pick a driver from the list on the left",
    inputPlaceholder: "Write a message…",
    send: "Send",
    emptyThread: "No messages yet.",
    conversationsTitle: "Drivers",
  },
  billingPage: {
    title: "Billing",
    subtitle: "Client invoices for shipments and their payment status.",
    loadError: "Failed to load invoices.",
    totalRevenue: "Total revenue",
    paidAmount: "Paid",
    pendingAmount: "Pending",
    overdueAmount: "Overdue",
    tableClient: "Client",
    tableShipment: "Shipment",
    tableAmount: "Amount",
    tableStatus: "Status",
    tableDate: "Date",
    statusPaid: "Paid",
    statusPending: "Pending",
    statusOverdue: "Overdue",
    markPaid: "Mark as paid",
    markingPaid: "Saving…",
  },
  reportsPage: {
    title: "Reports",
    subtitle: "Summary statistics across shipments, drivers, and the fleet.",
    loadError: "Failed to load reports.",
    statusBreakdown: "Shipments by status",
    topDrivers: "Top drivers by deliveries",
    topDestinations: "Top destinations",
    deliveriesUnit: "deliveries",
    fleetSummary: "Fleet status",
    inService: "In service",
    available: "Available",
    maintenance: "In maintenance",
    shipmentsUnit: "shipments",
  },
  server: {
    invalidBody: "Invalid request body.",
    statusRequired: "The status field is required.",
    unknownStatus: (status) => `Unknown status: "${status}".`,
    shipmentNotFound: "Shipment not found.",
    vehicleNotFound: "Vehicle not found.",
    vehicleInService: "This vehicle is currently in service.",
    invalidCredentials: "Incorrect login or password.",
    readOnlyDemo: "This demo account is view-only. Changes aren't saved.",
    scheduledTripNotFound: "Scheduled trip not found.",
    driverNotFound: "Driver not found.",
  },
};

const ru: Dictionary = {
  common: {
    readOnlyNotice: "Это демо-аккаунт только для просмотра. В рабочем кабинете это действие сохранит изменения.",
    cancel: "Отменить",
    add: "Добавить",
    close: "Закрыть",
    requiredField: "Заполните это поле",
  },
  sidebar: {
    dispatch: "Atlas Ops",
    overview: "Обзор",
    operations: "Операции",
    finance: "Финансы",
    dashboard: "Дашборд",
    drivers: "Водители",
    fleet: "Автопарк",
    scheduled: "Запланированные поездки",
    tracker: "Трекер на карте",
    messenger: "Мессенджер",
    billing: "Оплата",
    reports: "Отчёты",
    dispatcherName: "Максим Бойко",
    dispatcherRole: "Диспетчерская",
    online: "Диспетчер · онлайн",
    dispatcherAvatarAlt: "Диспетчер",
    demoNotice: "Демо-режим · только просмотр, данные открыты для примера",
    closeMenu: "Закрыть меню",
    logout: "Выйти",
  },
  loginPage: {
    tagline: "Диспетчерская панель",
    blurb: "Отправления, водители, автопарк и финансы логистической компании в одном месте.",
    heading: "Вход в систему",
    subheading: "Это открытый демо-аккаунт, данные для входа уже подставлены",
    loginLabel: "Логин",
    passwordLabel: "Пароль",
    showPassword: "Показать пароль",
    hidePassword: "Скрыть пароль",
    submit: "Войти",
    loggingIn: "Заходим…",
    genericError: "Не удалось войти. Попробуйте ещё раз.",
    demoNote: "Демо-доступ для просмотра портфолио NexuraDev. Добавлять или менять данные нельзя, но весь функционал открыт.",
  },
  topbar: {
    searchPlaceholder: "Поиск по коду, маршруту или водителю…",
    openMenuAria: "Открыть меню",
    notificationsAria: "Уведомления",
    notificationsTitle: "Уведомления",
    alertsEmpty: "Активных уведомлений нет.",
    alertShipmentCritical: (code, route, minutes) =>
      minutes > 0
        ? `${code}: критичное состояние, ${route}, опоздание ${minutes} мин`
        : `${code}: критичное состояние, ${route}`,
    alertShipmentDelayed: (code, route, minutes) => `${code}: задержка ${minutes} мин, ${route}`,
    alertVehicleFuel: (plate, percent) => `${plate}: мало топлива, осталось ${percent}%`,
    alertVehicleService: (plate, km) => `${plate}: плановое ТО через ${km} км`,
    searchSectionShipments: "Отправления",
    searchSectionDrivers: "Водители",
    searchSectionVehicles: "Автопарк",
    searchSectionPages: "Разделы",
    searchNoResults: (query) => `Ничего не найдено по запросу «${query}»`,
    crumbDashboard: "Дашборд",
    crumbRoute: "Маршрут",
    crumbDrivers: "Водители",
    crumbFleet: "Автопарк",
    crumbReports: "Отчёты",
    crumbScheduled: "Запланированные поездки",
    crumbTracker: "Трекер на карте",
    crumbMessenger: "Мессенджер",
    crumbBilling: "Оплата",
  },
  dashboardPage: {
    title: "Дашборд отправлений",
    subtitle: "Активные доставки по всей сети Atlas Ops, обновляется в реальном времени.",
    loadError: "Не удалось загрузить отправления.",
    emptyFiltered: "Нет отправлений с выбранным статусом.",
    emptySearch: (query) => `Ничего не найдено по запросу «${query}».`,
    liveLabel: "Обновляется автоматически",
    financeTitle: "Финансы и автопарк",
    monthRevenue: "Доход за 30 дней",
    revenueUp: (percent) => `+${percent}% к предыдущим 30 дням`,
    revenueDown: (percent) => `-${percent}% к предыдущим 30 дням`,
    avgShipmentValue: "Средний чек",
    fleetUtilization: "Загрузка автопарка",
    revenueChartTitle: "Доход за последние 30 дней",
    revenueChartSubtitle: "Сумма по дате выставления счёта",
    currencyUnit: "грн",
  },
  kpi: {
    active: "Активные отправления",
    onTime: "Вовремя",
    delayed: "Задержки",
    critical: "Критичные",
    deliveredToday: "Доставлено сегодня",
  },
  filters: {
    all: "Все",
    onTime: "Вовремя",
    delayed: "Задержка",
    critical: "Критично",
    delivered: "Доставлено",
  },
  table: {
    code: "Код",
    route: "Маршрут",
    driver: "Водитель",
    eta: "ETA",
    progress: "Прогресс",
    status: "Статус",
    km: "км",
    etaDelivered: "-",
    etaOverdue: (min) => `просрочено на ${min} мин`,
    etaInMinutes: (min) => `через ${min} мин`,
    etaInHours: (h, m) => `через ${h} ч ${m} мин`,
  },
  routeDetail: {
    backToDashboard: "Дашборд отправлений",
    scaleNote: "Схема маршрута · не в масштабе",
    cargoSection: "Груз",
    description: "Описание",
    distance: "Расстояние",
    progress: "Прогресс",
    delay: "Задержка",
    chronology: "Хронология",
    driverLabel: "Водитель",
    updateStatus: "Обновить статус",
    markDelivered: "Отметить доставленным",
    delivered: "Отправление доставлено",
    updating: "Обновляем…",
    etaDelivered: "Доставлено",
    etaOverdue: (min) => `Просрочено на ${min} мин`,
    etaIn: (h, m) => `Через ${h} ч ${m} мин`,
    updateError: "Не удалось обновить статус.",
    minutesShort: "мин",
  },
  driversPage: {
    title: "Водители",
    subtitle: "Статус доступности и текущие рейсы всех водителей сети.",
    loadError: "Не удалось загрузить список водителей.",
    yearsAtCompany: "г. в компании",
    deliveries: "доставок",
    onRouteNow: "Сейчас в рейсе: ",
    lastRoute: "Последний рейс: ",
    backToDrivers: "Водители",
    plateLabel: "Гос. номер",
    historyTitle: "История рейсов",
    historyEmpty: "Рейсов за этим водителем пока нет.",
    vehicleSection: "Закреплённый транспорт",
    messageDriver: "Написать",
    addDriver: "Добавить водителя",
    addDriverTitle: "Новый водитель",
    formName: "Имя и фамилия",
    formPhone: "Телефон",
    formVehicle: "Модель авто",
    formPlate: "Гос. номер",
    formYears: "Стаж, лет",
    submitDriver: "Добавить водителя",
  },
  timeline: {
    loading: "Погрузка",
    inTransit: "В пути",
    waypoint: "Промежуточный пункт",
    arrival: "Прибытие",
  },
  fleetPage: {
    title: "Автопарк",
    subtitle: "Состояние, пробег и обслуживание всех транспортных средств сети.",
    loadError: "Не удалось загрузить автопарк.",
    type: "Тип",
    capacity: "Грузоподъёмность",
    odometer: "Пробег",
    fuel: "Топливо",
    nextService: "До ТО",
    unassigned: "Без водителя",
    assignedTo: "Водитель",
    setToMaintenance: "На обслуживание",
    setToAvailable: "Вернуть в строй",
    kmUnit: "км",
    kgUnit: "кг",
    truckType: "Грузовик",
    vanType: "Фургон",
    backToFleet: "Автопарк",
    addVehicle: "Добавить авто",
    addVehicleTitle: "Новое транспортное средство",
    formModel: "Модель",
    formPlate: "Гос. номер",
    formType: "Тип",
    formCapacity: "Грузоподъёмность, кг",
    submitVehicle: "Добавить авто",
  },
  scheduledPage: {
    title: "Запланированные поездки",
    subtitle: "Будущие рейсы, которым ещё нужен водитель и транспорт.",
    loadError: "Не удалось загрузить запланированные поездки.",
    addTrip: "Запланировать поездку",
    addTripTitle: "Новая запланированная поездка",
    unassignedLabel: "Без водителя",
    assignedLabel: "Назначено",
    assignAction: "Назначить водителя",
    assignModalTitle: "Назначение на рейс",
    chooseDriver: "Водитель",
    chooseVehicle: "Транспорт",
    confirmAssign: "Назначить",
    tableRoute: "Маршрут",
    tableCargo: "Груз",
    tableDate: "Дата",
    tableStatus: "Статус",
    tableDriver: "Водитель",
    formOrigin: "Откуда",
    formDestination: "Куда",
    formCargo: "Груз",
    formDistance: "Расстояние, км",
    formDate: "Дата и время отправления",
    submitTrip: "Запланировать",
    noAvailableDrivers: "Нет свободных водителей или транспорта",
  },
  trackerPage: {
    title: "Трекер на карте",
    subtitle: "Текущее положение всех грузовиков в пути на одной схеме.",
    loadError: "Не удалось загрузить трекер.",
    activeCount: (n) => `${n} в пути`,
    noActive: "Сейчас ни одно отправление не в пути.",
    legendNote: "Схема сети · не в масштабе, нажмите на метку для деталей",
  },
  messengerPage: {
    title: "Мессенджер с водителями",
    subtitle: "Переписка диспетчера с водителями по текущим рейсам.",
    loadError: "Не удалось загрузить сообщения.",
    selectDriver: "Выберите водителя из списка слева",
    inputPlaceholder: "Напишите сообщение…",
    send: "Отправить",
    emptyThread: "Сообщений пока нет.",
    conversationsTitle: "Водители",
  },
  billingPage: {
    title: "Оплата",
    subtitle: "Счета клиентов за отправления и статус оплаты.",
    loadError: "Не удалось загрузить счета.",
    totalRevenue: "Общий доход",
    paidAmount: "Оплачено",
    pendingAmount: "Ожидает оплаты",
    overdueAmount: "Просрочено",
    tableClient: "Клиент",
    tableShipment: "Отправление",
    tableAmount: "Сумма",
    tableStatus: "Статус",
    tableDate: "Дата",
    statusPaid: "Оплачено",
    statusPending: "Ожидает",
    statusOverdue: "Просрочено",
    markPaid: "Отметить оплаченным",
    markingPaid: "Сохраняем…",
  },
  reportsPage: {
    title: "Отчёты",
    subtitle: "Сводная статистика по отправлениям, водителям и автопарку.",
    loadError: "Не удалось загрузить отчёты.",
    statusBreakdown: "Отправления по статусу",
    topDrivers: "Топ водителей по доставкам",
    topDestinations: "Топ направлений",
    deliveriesUnit: "доставок",
    fleetSummary: "Состояние автопарка",
    inService: "На рейсе",
    available: "Доступны",
    maintenance: "На обслуживании",
    shipmentsUnit: "отправлений",
  },
  server: {
    invalidBody: "Некорректное тело запроса.",
    statusRequired: "Поле status обязательно.",
    unknownStatus: (status) => `Неизвестный статус: "${status}".`,
    shipmentNotFound: "Отправление не найдено.",
    vehicleNotFound: "Транспортное средство не найдено.",
    vehicleInService: "Транспортное средство сейчас на рейсе.",
    invalidCredentials: "Неверный логин или пароль.",
    readOnlyDemo: "Это демо-аккаунт только для просмотра. Изменения не сохраняются.",
    scheduledTripNotFound: "Запланированная поездка не найдена.",
    driverNotFound: "Водитель не найден.",
  },
};

export const DICTIONARIES: Record<Lang, Dictionary> = { uk, en, ru };
