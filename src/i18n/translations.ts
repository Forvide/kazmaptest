export const translations = {
    ru: {
        nav: {
            map: "Карта",
            charts: "Графики",
            title: "KazMap Civic"
        },
        controlPanel: {
            title: "Интерактивная карта",
            metric: "ПОКАЗАТЕЛЬ",
            year: "ГОД"
        },
        sidebar: {
            region: "Регион",
            nationalShare: "Доля по стране",
            allMetrics: "Все показатели",
            noData: "Нет данных для выбранного года"
        },
        dashboard: {
            tag: "Данные опроса",
            title: "Графики гражданской активности",
            subtitle: "Исследуйте ответы касательно гражданского общества, волонтерства и политической вовлеченности по регионам Казахстана.",
            chooseRegion: "Выбор региона",
            chooseQuestion: "Выберите вопрос опроса",
            breakdown: "Распределение ответов",
            breakdownSub: "Процентное распределение для",
            comparison: "Сравнение регионов",
            respondents: "Ответившие",
            loadingError: "Не удалось загрузить данные опроса локально.",
            loading: "Загрузка..."
        },
        metrics: {
            registered_ngos: "Количество зарегистрированных НПО",
            active_ngos: "Количество действующих НПО",
            employees: "Количество сотрудников НПО",
            state_projects: "Проекты госзаказа",
            state_funding: "Объем госзаказа (млн)",
            grant_projects: "Грантовые проекты",
            grant_funding: "Объем грантов (млн)",
            volunteer_orgs: "Волонтерские организации",
            active_volunteers: "Активные волонтеры",
            charities: "Благотворительные организации",
            public_councils: "Общественные советы",
            council_meetings: "Заседания советов",
            public_hearings: "Общественные слушания"
        }
    },
    kk: {
        nav: {
            map: "Карта",
            charts: "Графиктер",
            title: "KazMap Civic"
        },
        controlPanel: {
            title: "Интерактивті карта",
            metric: "КӨРСЕТКІШ",
            year: "ЖЫЛ"
        },
        sidebar: {
            region: "Өңір",
            nationalShare: "Ел бойынша үлесі",
            allMetrics: "Барлық көрсеткіштер",
            noData: "Таңдалған жыл үшін деректер жоқ"
        },
        dashboard: {
            tag: "Сауалнама деректері",
            title: "Азаматтық белсенділік графиктер",
            subtitle: "Қазақстан өңірлері бойынша азаматтық қоғам, волонтерлік және саяси қатысуға қатысты жауаптарды зерттеңіз.",
            chooseRegion: "Өңірді таңдау",
            chooseQuestion: "Сауалнама сұрағын таңдаңыз",
            breakdown: "Жауаптардың бөлінуі",
            breakdownSub: "Пайыздық бөліну келесі үшін:",
            comparison: "Өңірлерді салыстыру",
            respondents: "Жауап бергендер:",
            loadingError: "Сауалнама деректерін жергілікті түрде жүктеу мүмкін болмады.",
            loading: "Жүктелуде..."
        },
        metrics: {
            registered_ngos: "Тіркелген ҮЕҰ саны",
            active_ngos: "Жұмыс істейтін ҮЕҰ саны",
            employees: "ҮЕҰ қызметкерлерінің саны",
            state_projects: "Мемлекеттік тапсырыс жобалары",
            state_funding: "Мемлекеттік тапсырыс көлемі (млн)",
            grant_projects: "Гранттық жобалар",
            grant_funding: "Гранттар көлемі (млн)",
            volunteer_orgs: "Волонтерлік ұйымдар",
            active_volunteers: "Белсенді волонтерлер",
            charities: "Қайырымдылық ұйымдары",
            public_councils: "Қоғамдық кеңестер",
            council_meetings: "Кеңес отырыстары",
            public_hearings: "Қоғамдық тыңдаулар"
        }
    }
};

export type Language = 'ru' | 'kk';
