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
    closeMenu: string;
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
  };
  dashboardPage: {
    title: string;
    subtitle: string;
    loadError: string;
    emptyFiltered: string;
    emptySearch: (query: string) => string;
    liveLabel: string;
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
    closeMenu: "Закрити меню",
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
  },
  dashboardPage: {
    title: "Дашборд відправлень",
    subtitle: "Активні доставки по всій мережі Atlas Ops, оновлюється в реальному часі.",
    loadError: "Не вдалося завантажити відправлення.",
    emptyFiltered: "Немає відправлень з обраним статусом.",
    emptySearch: (query) => `Нічого не знайдено за запитом «${query}».`,
    liveLabel: "Оновлюється автоматично",
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
    closeMenu: "Close menu",
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
  },
  dashboardPage: {
    title: "Shipments dashboard",
    subtitle: "Active deliveries across the Atlas Ops network, updated in real time.",
    loadError: "Failed to load shipments.",
    emptyFiltered: "No shipments with the selected status.",
    emptySearch: (query) => `No matches for "${query}".`,
    liveLabel: "Updating automatically",
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
    closeMenu: "Закрыть меню",
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
  },
  dashboardPage: {
    title: "Дашборд отправлений",
    subtitle: "Активные доставки по всей сети Atlas Ops, обновляется в реальном времени.",
    loadError: "Не удалось загрузить отправления.",
    emptyFiltered: "Нет отправлений с выбранным статусом.",
    emptySearch: (query) => `Ничего не найдено по запросу «${query}».`,
    liveLabel: "Обновляется автоматически",
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
