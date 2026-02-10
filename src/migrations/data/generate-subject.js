const mapping = {
  "directions": [
    { "name": "Informatyka", "specialties": ["Programowanie", "Sieciowe"], "years": ["1", "2", "3", "4"] },
    { "name": "Zarządzanie", "specialties": ["Księgowość", "Marketing"], "years": ["1", "2", "3", "4"] }
  ],
  "specialties": [
    { "name": "Księgowość", "direction": "Zarządzanie", "groups": ["ZKA", "ZKB", "ZKC"], "years": ["1", "2", "3", "4"] },
    { "name": "Marketing", "direction": "Zarządzanie", "groups": ["ZMA", "ZMB"], "years": ["1", "2", "3"] },
    { "name": "Programowanie", "direction": "Informatyka", "groups": ["IPA", "IPB"], "years": ["1", "2", "3", "4"] },
    { "name": "Sieciowe", "direction": "Informatyka", "groups": ["ISA", "ISB", "ISC"], "years": ["1", "2", "3", "4"] }
  ],
  "group": [
    { "name": "IPA", "specialty": "Programowanie", "years": ["1", "3"] },
    { "name": "IPB", "specialty": "Programowanie", "years": ["1", "2", "3", "4"] },
    { "name": "ISA", "specialty": "Sieciowe", "years": ["1", "2", "3"] },
    { "name": "ISB", "specialty": "Sieciowe", "years": ["3", "4"] },
    { "name": "ISC", "specialty": "Sieciowe", "years": ["1", "2", "3"] },
    { "name": "ZKA", "specialty": "Księgowość", "years": ["1", "2", "3", "4"] },
    { "name": "ZKB", "specialty": "Księgowość", "years": ["1", "2", "3"] },
    { "name": "ZKC", "specialty": "Księgowość", "years": ["1", "2", "3", "4"] },
    { "name": "ZMA", "specialty": "Marketing", "years": ["1", "2", "3"] },
    { "name": "ZMB", "specialty": "Marketing", "years": ["1", "2", "3"] }
  ]
};

const teachers = [
  'irena@gmailcom', 'krzysztof.lewandowski3@example.com', 'anna.wiśniewski4@example.com', 'krzysztof.lewandowski6@example.com',
  'marek.lewandowski7@example.com', 'agnieszka.kowalczyk8@example.com', 'piotr.kamiński9@example.com', 'magdalena.zieliński11@example.com',
  'maria.wiśniewski12@example.com', 'katarzyna.kowalczyk16@example.com', 'anna.zieliński19@example.com', 'katarzyna.kamiński20@example.com',
  'krzysztof.kowalczyk21@example.com', 'katarzyna.kowalski22@example.com', 'magdalena.nowak23@example.com', 'anna.lewandowski24@example.com',
  'piotr.zieliński25@example.com', 'agnieszka.kowalski26@example.com', 'jan.kowalski27@example.com', 'tomasz.kowalski29@example.com',
  'tomasz.lewandowski31@example.com', 'anna.wójcik34@example.com', 'maria.kowalski35@example.com', 'krzysztof.wójcik36@example.com',
  'marek.lewandowski38@example.com', 'jan.kowalczyk42@example.com', 'piotr.lewandowski43@example.com', 'marek.kamiński45@example.com',
  'maria.zieliński46@example.com', 'katarzyna.zieliński48@example.com', 'magdalena.kowalczyk49@example.com', 'anna.kowalski51@example.com',
  'maria.wiśniewski53@example.com', 'marek.wójcik54@example.com', 'katarzyna.zieliński55@example.com', 'jan.lewandowski56@example.com',
  'piotr.nowak57@example.com', 'magdalena.kowalczyk58@example.com', 'jan.kowalczyk59@example.com', 'agnieszka.lewandowski60@example.com',
  'katarzyna.wójcik61@example.com', 'krzysztof.nowak62@example.com', 'jan.wiśniewski63@example.com', 'marek.lewandowski64@example.com',
  'piotr.kowalczyk67@example.com', 'agnieszka.wójcik68@example.com', 'tomasz.kowalski70@example.com', 'agnieszka.wójcik72@example.com',
  'krzysztof.lewandowski75@example.com', 'agnieszka.lewandowski77@example.com', 'magdalena.kowalczyk78@example.com', 'tomasz.kamiński79@example.com',
  'magdalena.zieliński81@example.com', 'maria.wiśniewski82@example.com', 'marek.kowalski83@example.com', 'maria.lewandowski84@example.com',
  'piotr.wójcik85@example.com', 'tomasz.kowalski86@example.com', 'tomasz.kamiński87@example.com', 'maria.kamiński88@example.com',
  'krzysztof.kamiński89@example.com', 'tomasz.lewandowski90@example.com', 'maria.kamiński91@example.com', 'krzysztof.zieliński93@example.com',
  'marek.kowalczyk94@example.com', 'agnieszka.zieliński95@example.com', 'jan.lewandowski96@example.com', 'krzysztof.zieliński97@example.com',
  'krzysztof.kowalczyk98@example.com', 'magdalena.kamiński100@example.com'
];

const subjectBases = [
  "Algorytmy", "Bazy danych", "Marketing", "Księgowość", "Programowanie", "Sieci",
  "Analiza danych", "Systemy operacyjne", "Zarządzanie projektami", "Cyberbezpieczeństwo",
  "E-commerce", "Rachunkowość", "Statystyka", "Logistyka", "Sztuczna inteligencja",
  "Grafika", "UX Design", "Kryptografia", "Automatyzacja", "Mikroekonomia"
];

const prefixes = ["Wstęp do", "Zaawansowane", "Laboratorium z", "Projekt:", "Seminarium:", "Teoria", "Praktyka", "Metody", "Zasady", "Wdrożenie"];

function generate200Subjects() {
  const finalSubjects = [];

  // Generowanie 200 unikalnych nazw
  const names = [];
  for (let p of prefixes) {
    for (let b of subjectBases) {
      names.push(`${p} ${b}`);
    }
  }

  for (let i = 0; i < 200; i++) {
    const spec = mapping.specialties[Math.floor(Math.random() * mapping.specialties.length)];
    const groupName = spec.groups[Math.floor(Math.random() * spec.groups.length)];
    const groupData = mapping.group.find(g => g.name === groupName);
    const year = groupData.years[Math.floor(Math.random() * groupData.years.length)];

    finalSubjects.push({
      name: names[i] || `Przedmiot specjalistyczny nr ${i + 1}`,
      auditorium: (Math.floor(Math.random() * 400) + 100).toString(),
      teacher: teachers[Math.floor(Math.random() * teachers.length)],
      groups: [{ name: groupName }],
      years: [{ value: year }],
      specialty: [{ name: spec.name }]
    });
  }
  return finalSubjects;
}

const subjects = generate200Subjects();
const fs = require('fs');
const path = require('path');


fs.writeFileSync('subjects.json', JSON.stringify(subjects, null, 2));