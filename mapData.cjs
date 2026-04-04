const fs = require('fs');
let dataStr = fs.readFileSync('src/data/data.json', 'utf8');
const mapping = {
    '"область Абай"': '"Abai"',
    '"Акмолинская область"': '"Akmola"',
    '"Актюбинская область"': '"Aktobe"',
    '"Алматинская область"': '"Almaty"',
    '"Атырауская область"': '"Atyrau"',
    '"Жамбылская область"': '"Jambyl"',
    '"область Жетісу"': '"Jetisu"',
    '"Западно-Казахстанская область"': '"West Kazakhstan"',
    '"Карагандинская область"': '"Karaganda"',
    '"Костанайская область"': '"Kostanay"',
    '"Кызылординская область"': '"Kyzylorda"',
    '"Мангистауская область"': '"Mangystau"',
    '"Павлодарская область"': '"Pavlodar"',
    '"Северо-Казахстанская область"': '"North Kazakhstan"',
    '"Туркестанская область"': '"Turkestan"',
    '"область Ұлытау"': '"Ulytau"',
    '"Восточно-Казахстанская область"': '"East Kazakhstan"',
    '"г.Астана"': '"Astana"',
    '"г.Алматы"': '"Almaty (city)"',
    '"г.Шымкент"': '"Shymkent (city)"'
};

for (const [cyr, eng] of Object.entries(mapping)) {
    dataStr = dataStr.replace(cyr, eng);
}

fs.writeFileSync('src/data/data.json', dataStr);
