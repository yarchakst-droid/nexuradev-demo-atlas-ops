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
  sidebar: {
    dispatch: string;
    overview: string;
    dashboard: string;
    drivers: string;
    fleet: string;
    reports: string;
    dispatcherName: string;
    dispatcherRole: string;
    online: string;
    dispatcherAvatarAlt: string;
    demoNotice: string;
  };
  topbar: {
    searchPlaceholder: string;
    notificationsAria: string;
    notificationsTitle: string;
    notifications: string[];
    crumbDashboard: string;
    crumbRoute: string;
    crumbDrivers: string;
    crumbFleet: string;
    crumbReports: string;
  };
  dashboardPage: {
    title: string;
    subtitle: string;
    loadError: string;
    emptyFiltered: string;
    emptySearch: (query: string) => string;
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
  };
}

const uk: Dictionary = {
  sidebar: {
    dispatch: "Atlas Ops",
    overview: "Огляд",
    dashboard: "Дашборд",
    drivers: "Водії",
    fleet: "Автопарк",
    reports: "Звіти",
    dispatcherName: "Максим Бойко",
    dispatcherRole: "Диспетчерська",
    online: "Диспетчер · онлайн",
    dispatcherAvatarAlt: "Диспетчер",
    demoNotice: "Демо-проєкт для портфоліо NexuraDev",
  },
  topbar: {
    searchPlaceholder: "Пошук за кодом, маршрутом або водієм…",
    notificationsAria: "Сповіщення",
    notificationsTitle: "Сповіщення",
    notifications: [
      "Відправлення AO-10233 прострочено на 91 хв (Дніпро → Полтава)",
      "Водій Ірина Ковальчук повідомила про затримку на маршруті AO-10232",
      "Транспорт ІФ 2201 СХ потребує технічного обслуговування - пробіг до ТО 150 км",
    ],
    crumbDashboard: "Дашборд",
    crumbRoute: "Маршрут",
    crumbDrivers: "Водії",
    crumbFleet: "Автопарк",
    crumbReports: "Звіти",
  },
  dashboardPage: {
    title: "Дашборд відправлень",
    subtitle: "Активні доставки по всій мережі Atlas Ops, оновлюється в реальному часі.",
    loadError: "Не вдалося завантажити відправлення.",
    emptyFiltered: "Немає відправлень з обраним статусом.",
    emptySearch: (query) => `Нічого не знайдено за запитом «${query}».`,
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
  },
};

const en: Dictionary = {
  sidebar: {
    dispatch: "Atlas Ops",
    overview: "Overview",
    dashboard: "Dashboard",
    drivers: "Drivers",
    fleet: "Fleet",
    reports: "Reports",
    dispatcherName: "Maksym Boiko",
    dispatcherRole: "Dispatch",
    online: "Dispatcher · online",
    dispatcherAvatarAlt: "Dispatcher",
    demoNotice: "Portfolio demo project for NexuraDev",
  },
  topbar: {
    searchPlaceholder: "Search by code, route, or driver…",
    notificationsAria: "Notifications",
    notificationsTitle: "Notifications",
    notifications: [
      "Shipment AO-10233 is overdue by 91 min (Dnipro → Poltava)",
      "Driver Irina Kovalchuk reported a delay on route AO-10232",
      "Vehicle IF 2201 SH needs maintenance - 150 km left to service",
    ],
    crumbDashboard: "Dashboard",
    crumbRoute: "Route",
    crumbDrivers: "Drivers",
    crumbFleet: "Fleet",
    crumbReports: "Reports",
  },
  dashboardPage: {
    title: "Shipments dashboard",
    subtitle: "Active deliveries across the Atlas Ops network, updated in real time.",
    loadError: "Failed to load shipments.",
    emptyFiltered: "No shipments with the selected status.",
    emptySearch: (query) => `No matches for "${query}".`,
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
  },
};

const ru: Dictionary = {
  sidebar: {
    dispatch: "Atlas Ops",
    overview: "Обзор",
    dashboard: "Дашборд",
    drivers: "Водители",
    fleet: "Автопарк",
    reports: "Отчёты",
    dispatcherName: "Максим Бойко",
    dispatcherRole: "Диспетчерская",
    online: "Диспетчер · онлайн",
    dispatcherAvatarAlt: "Диспетчер",
    demoNotice: "Демо-проект для портфолио NexuraDev",
  },
  topbar: {
    searchPlaceholder: "Поиск по коду, маршруту или водителю…",
    notificationsAria: "Уведомления",
    notificationsTitle: "Уведомления",
    notifications: [
      "Отправление AO-10233 просрочено на 91 мин (Днепр → Полтава)",
      "Водитель Ирина Ковальчук сообщила о задержке на маршруте AO-10232",
      "Транспорт IF 2201 SH требует технического обслуживания - пробег до ТО 150 км",
    ],
    crumbDashboard: "Дашборд",
    crumbRoute: "Маршрут",
    crumbDrivers: "Водители",
    crumbFleet: "Автопарк",
    crumbReports: "Отчёты",
  },
  dashboardPage: {
    title: "Дашборд отправлений",
    subtitle: "Активные доставки по всей сети Atlas Ops, обновляется в реальном времени.",
    loadError: "Не удалось загрузить отправления.",
    emptyFiltered: "Нет отправлений с выбранным статусом.",
    emptySearch: (query) => `Ничего не найдено по запросу «${query}».`,
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
  },
};

export const DICTIONARIES: Record<Lang, Dictionary> = { uk, en, ru };
