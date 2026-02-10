const subjectsData = [
  {
    name: 'Wstęp do Algorytmy',
    auditorium: '231',
    teacher: 'krzysztof.wójcik36@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Wstęp do Bazy danych',
    auditorium: '479',
    teacher: 'krzysztof.kowalczyk21@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Wstęp do Marketing',
    auditorium: '173',
    teacher: 'maria.wiśniewski82@example.com',
    groups: [
      {
        name: 'ISB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Wstęp do Księgowość',
    auditorium: '347',
    teacher: 'katarzyna.kowalczyk16@example.com',
    groups: [
      {
        name: 'ISC',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Wstęp do Programowanie',
    auditorium: '475',
    teacher: 'magdalena.kowalczyk58@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Wstęp do Sieci',
    auditorium: '351',
    teacher: 'agnieszka.kowalski26@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Wstęp do Analiza danych',
    auditorium: '372',
    teacher: 'jan.lewandowski96@example.com',
    groups: [
      {
        name: 'ISB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Wstęp do Systemy operacyjne',
    auditorium: '228',
    teacher: 'piotr.kowalczyk67@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Wstęp do Zarządzanie projektami',
    auditorium: '176',
    teacher: 'marek.kowalczyk94@example.com',
    groups: [
      {
        name: 'ISB',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Wstęp do Cyberbezpieczeństwo',
    auditorium: '180',
    teacher: 'magdalena.kowalczyk78@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Wstęp do E-commerce',
    auditorium: '246',
    teacher: 'krzysztof.kowalczyk21@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Wstęp do Rachunkowość',
    auditorium: '183',
    teacher: 'maria.zieliński46@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Wstęp do Statystyka',
    auditorium: '206',
    teacher: 'katarzyna.kowalczyk16@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Wstęp do Logistyka',
    auditorium: '315',
    teacher: 'irena@gmailcom',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Wstęp do Sztuczna inteligencja',
    auditorium: '380',
    teacher: 'agnieszka.wójcik72@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Wstęp do Grafika',
    auditorium: '283',
    teacher: 'krzysztof.lewandowski6@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Wstęp do UX Design',
    auditorium: '212',
    teacher: 'marek.wójcik54@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Wstęp do Kryptografia',
    auditorium: '369',
    teacher: 'krzysztof.lewandowski3@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Wstęp do Automatyzacja',
    auditorium: '490',
    teacher: 'jan.wiśniewski63@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Wstęp do Mikroekonomia',
    auditorium: '124',
    teacher: 'agnieszka.wójcik68@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Zaawansowane Algorytmy',
    auditorium: '429',
    teacher: 'jan.kowalczyk42@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Zaawansowane Bazy danych',
    auditorium: '243',
    teacher: 'jan.kowalski27@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zaawansowane Marketing',
    auditorium: '115',
    teacher: 'agnieszka.kowalski26@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Zaawansowane Księgowość',
    auditorium: '390',
    teacher: 'marek.lewandowski64@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zaawansowane Programowanie',
    auditorium: '241',
    teacher: 'krzysztof.lewandowski75@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Zaawansowane Sieci',
    auditorium: '229',
    teacher: 'anna.kowalski51@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Zaawansowane Analiza danych',
    auditorium: '135',
    teacher: 'tomasz.kamiński79@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Zaawansowane Systemy operacyjne',
    auditorium: '341',
    teacher: 'maria.wiśniewski82@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Zaawansowane Zarządzanie projektami',
    auditorium: '451',
    teacher: 'agnieszka.wójcik72@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zaawansowane Cyberbezpieczeństwo',
    auditorium: '143',
    teacher: 'agnieszka.kowalski26@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Zaawansowane E-commerce',
    auditorium: '130',
    teacher: 'tomasz.lewandowski90@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Zaawansowane Rachunkowość',
    auditorium: '470',
    teacher: 'piotr.zieliński25@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Zaawansowane Statystyka',
    auditorium: '282',
    teacher: 'agnieszka.lewandowski77@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Zaawansowane Logistyka',
    auditorium: '140',
    teacher: 'agnieszka.lewandowski60@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zaawansowane Sztuczna inteligencja',
    auditorium: '247',
    teacher: 'maria.kowalski35@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zaawansowane Grafika',
    auditorium: '164',
    teacher: 'agnieszka.lewandowski77@example.com',
    groups: [
      {
        name: 'ISB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Zaawansowane UX Design',
    auditorium: '197',
    teacher: 'katarzyna.wójcik61@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Zaawansowane Kryptografia',
    auditorium: '459',
    teacher: 'agnieszka.wójcik72@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zaawansowane Automatyzacja',
    auditorium: '136',
    teacher: 'piotr.kowalczyk67@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Zaawansowane Mikroekonomia',
    auditorium: '244',
    teacher: 'krzysztof.kowalczyk98@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Laboratorium z Algorytmy',
    auditorium: '472',
    teacher: 'piotr.nowak57@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Laboratorium z Bazy danych',
    auditorium: '415',
    teacher: 'anna.zieliński19@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Laboratorium z Marketing',
    auditorium: '123',
    teacher: 'katarzyna.wójcik61@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Laboratorium z Księgowość',
    auditorium: '105',
    teacher: 'krzysztof.zieliński93@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Laboratorium z Programowanie',
    auditorium: '368',
    teacher: 'agnieszka.zieliński95@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Laboratorium z Sieci',
    auditorium: '491',
    teacher: 'piotr.lewandowski43@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Laboratorium z Analiza danych',
    auditorium: '376',
    teacher: 'agnieszka.lewandowski60@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Laboratorium z Systemy operacyjne',
    auditorium: '474',
    teacher: 'jan.kowalczyk42@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Laboratorium z Zarządzanie projektami',
    auditorium: '125',
    teacher: 'katarzyna.zieliński48@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Laboratorium z Cyberbezpieczeństwo',
    auditorium: '245',
    teacher: 'anna.wójcik34@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Laboratorium z E-commerce',
    auditorium: '428',
    teacher: 'maria.lewandowski84@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Laboratorium z Rachunkowość',
    auditorium: '124',
    teacher: 'marek.wójcik54@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Laboratorium z Statystyka',
    auditorium: '151',
    teacher: 'maria.kamiński88@example.com',
    groups: [
      {
        name: 'ISB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Laboratorium z Logistyka',
    auditorium: '447',
    teacher: 'agnieszka.kowalczyk8@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Laboratorium z Sztuczna inteligencja',
    auditorium: '494',
    teacher: 'marek.lewandowski38@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Laboratorium z Grafika',
    auditorium: '239',
    teacher: 'tomasz.kamiński87@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Laboratorium z UX Design',
    auditorium: '415',
    teacher: 'maria.wiśniewski53@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Laboratorium z Kryptografia',
    auditorium: '178',
    teacher: 'krzysztof.wójcik36@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Laboratorium z Automatyzacja',
    auditorium: '499',
    teacher: 'krzysztof.lewandowski75@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Laboratorium z Mikroekonomia',
    auditorium: '471',
    teacher: 'krzysztof.lewandowski6@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Projekt: Algorytmy',
    auditorium: '412',
    teacher: 'katarzyna.zieliński55@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Projekt: Bazy danych',
    auditorium: '223',
    teacher: 'tomasz.kamiński87@example.com',
    groups: [
      {
        name: 'ISC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Projekt: Marketing',
    auditorium: '207',
    teacher: 'piotr.lewandowski43@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Projekt: Księgowość',
    auditorium: '359',
    teacher: 'piotr.nowak57@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Projekt: Programowanie',
    auditorium: '394',
    teacher: 'marek.lewandowski7@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Projekt: Sieci',
    auditorium: '222',
    teacher: 'katarzyna.zieliński55@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Projekt: Analiza danych',
    auditorium: '117',
    teacher: 'krzysztof.zieliński93@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Projekt: Systemy operacyjne',
    auditorium: '273',
    teacher: 'marek.kowalski83@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Projekt: Zarządzanie projektami',
    auditorium: '170',
    teacher: 'agnieszka.zieliński95@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Projekt: Cyberbezpieczeństwo',
    auditorium: '101',
    teacher: 'jan.kowalczyk59@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Projekt: E-commerce',
    auditorium: '411',
    teacher: 'jan.kowalczyk59@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Projekt: Rachunkowość',
    auditorium: '424',
    teacher: 'tomasz.kowalski29@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Projekt: Statystyka',
    auditorium: '139',
    teacher: 'krzysztof.kamiński89@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Projekt: Logistyka',
    auditorium: '199',
    teacher: 'magdalena.zieliński81@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Projekt: Sztuczna inteligencja',
    auditorium: '308',
    teacher: 'magdalena.nowak23@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Projekt: Grafika',
    auditorium: '124',
    teacher: 'marek.lewandowski38@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Projekt: UX Design',
    auditorium: '360',
    teacher: 'piotr.lewandowski43@example.com',
    groups: [
      {
        name: 'ISB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Projekt: Kryptografia',
    auditorium: '343',
    teacher: 'agnieszka.wójcik72@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Projekt: Automatyzacja',
    auditorium: '443',
    teacher: 'krzysztof.wójcik36@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Projekt: Mikroekonomia',
    auditorium: '493',
    teacher: 'piotr.lewandowski43@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Seminarium: Algorytmy',
    auditorium: '284',
    teacher: 'marek.lewandowski7@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Seminarium: Bazy danych',
    auditorium: '371',
    teacher: 'magdalena.zieliński11@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Seminarium: Marketing',
    auditorium: '400',
    teacher: 'agnieszka.zieliński95@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Seminarium: Księgowość',
    auditorium: '448',
    teacher: 'krzysztof.lewandowski75@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Seminarium: Programowanie',
    auditorium: '417',
    teacher: 'agnieszka.lewandowski60@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Seminarium: Sieci',
    auditorium: '411',
    teacher: 'piotr.zieliński25@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Seminarium: Analiza danych',
    auditorium: '468',
    teacher: 'maria.kowalski35@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Seminarium: Systemy operacyjne',
    auditorium: '194',
    teacher: 'piotr.zieliński25@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Seminarium: Zarządzanie projektami',
    auditorium: '270',
    teacher: 'jan.lewandowski96@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Seminarium: Cyberbezpieczeństwo',
    auditorium: '326',
    teacher: 'piotr.kamiński9@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Seminarium: E-commerce',
    auditorium: '403',
    teacher: 'maria.wiśniewski82@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Seminarium: Rachunkowość',
    auditorium: '112',
    teacher: 'krzysztof.kamiński89@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Seminarium: Statystyka',
    auditorium: '320',
    teacher: 'irena@gmailcom',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Seminarium: Logistyka',
    auditorium: '258',
    teacher: 'maria.wiśniewski12@example.com',
    groups: [
      {
        name: 'ISC',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Seminarium: Sztuczna inteligencja',
    auditorium: '330',
    teacher: 'agnieszka.kowalski26@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Seminarium: Grafika',
    auditorium: '381',
    teacher: 'krzysztof.lewandowski75@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Seminarium: UX Design',
    auditorium: '166',
    teacher: 'agnieszka.lewandowski60@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Seminarium: Kryptografia',
    auditorium: '413',
    teacher: 'tomasz.kamiński87@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Seminarium: Automatyzacja',
    auditorium: '330',
    teacher: 'tomasz.lewandowski90@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Seminarium: Mikroekonomia',
    auditorium: '122',
    teacher: 'anna.zieliński19@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Teoria Algorytmy',
    auditorium: '279',
    teacher: 'krzysztof.kowalczyk98@example.com',
    groups: [
      {
        name: 'ISC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Teoria Bazy danych',
    auditorium: '335',
    teacher: 'piotr.zieliński25@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Teoria Marketing',
    auditorium: '245',
    teacher: 'maria.kamiński88@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Teoria Księgowość',
    auditorium: '494',
    teacher: 'anna.kowalski51@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Teoria Programowanie',
    auditorium: '462',
    teacher: 'agnieszka.lewandowski77@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Teoria Sieci',
    auditorium: '453',
    teacher: 'marek.wójcik54@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Teoria Analiza danych',
    auditorium: '353',
    teacher: 'anna.wiśniewski4@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Teoria Systemy operacyjne',
    auditorium: '275',
    teacher: 'maria.zieliński46@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Teoria Zarządzanie projektami',
    auditorium: '481',
    teacher: 'krzysztof.lewandowski75@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Teoria Cyberbezpieczeństwo',
    auditorium: '153',
    teacher: 'krzysztof.lewandowski3@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Teoria E-commerce',
    auditorium: '487',
    teacher: 'maria.wiśniewski53@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Teoria Rachunkowość',
    auditorium: '137',
    teacher: 'jan.kowalski27@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Teoria Statystyka',
    auditorium: '100',
    teacher: 'magdalena.kowalczyk78@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Teoria Logistyka',
    auditorium: '219',
    teacher: 'marek.wójcik54@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Teoria Sztuczna inteligencja',
    auditorium: '488',
    teacher: 'jan.kowalczyk42@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Teoria Grafika',
    auditorium: '327',
    teacher: 'krzysztof.kowalczyk98@example.com',
    groups: [
      {
        name: 'ISB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Teoria UX Design',
    auditorium: '295',
    teacher: 'jan.kowalczyk42@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Teoria Kryptografia',
    auditorium: '307',
    teacher: 'jan.wiśniewski63@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Teoria Automatyzacja',
    auditorium: '128',
    teacher: 'katarzyna.kowalski22@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Teoria Mikroekonomia',
    auditorium: '419',
    teacher: 'anna.zieliński19@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Praktyka Algorytmy',
    auditorium: '486',
    teacher: 'katarzyna.zieliński48@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Praktyka Bazy danych',
    auditorium: '153',
    teacher: 'agnieszka.lewandowski60@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Praktyka Marketing',
    auditorium: '115',
    teacher: 'magdalena.kowalczyk58@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Praktyka Księgowość',
    auditorium: '436',
    teacher: 'jan.kowalczyk42@example.com',
    groups: [
      {
        name: 'ISC',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Praktyka Programowanie',
    auditorium: '446',
    teacher: 'jan.kowalczyk59@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Praktyka Sieci',
    auditorium: '381',
    teacher: 'jan.lewandowski96@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Praktyka Analiza danych',
    auditorium: '114',
    teacher: 'tomasz.lewandowski31@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Praktyka Systemy operacyjne',
    auditorium: '222',
    teacher: 'katarzyna.zieliński48@example.com',
    groups: [
      {
        name: 'ISC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Praktyka Zarządzanie projektami',
    auditorium: '433',
    teacher: 'marek.kowalczyk94@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Praktyka Cyberbezpieczeństwo',
    auditorium: '430',
    teacher: 'krzysztof.zieliński97@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Praktyka E-commerce',
    auditorium: '215',
    teacher: 'maria.lewandowski84@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Praktyka Rachunkowość',
    auditorium: '118',
    teacher: 'katarzyna.zieliński55@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Praktyka Statystyka',
    auditorium: '160',
    teacher: 'agnieszka.wójcik72@example.com',
    groups: [
      {
        name: 'ISC',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Praktyka Logistyka',
    auditorium: '447',
    teacher: 'agnieszka.zieliński95@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Praktyka Sztuczna inteligencja',
    auditorium: '164',
    teacher: 'jan.kowalski27@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Praktyka Grafika',
    auditorium: '385',
    teacher: 'krzysztof.lewandowski75@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Praktyka UX Design',
    auditorium: '430',
    teacher: 'piotr.kamiński9@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Praktyka Kryptografia',
    auditorium: '344',
    teacher: 'katarzyna.kamiński20@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Praktyka Automatyzacja',
    auditorium: '417',
    teacher: 'agnieszka.wójcik72@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Praktyka Mikroekonomia',
    auditorium: '267',
    teacher: 'piotr.wójcik85@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Metody Algorytmy',
    auditorium: '196',
    teacher: 'krzysztof.nowak62@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Metody Bazy danych',
    auditorium: '471',
    teacher: 'maria.wiśniewski53@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Metody Marketing',
    auditorium: '148',
    teacher: 'agnieszka.lewandowski77@example.com',
    groups: [
      {
        name: 'ISB',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Metody Księgowość',
    auditorium: '154',
    teacher: 'maria.wiśniewski12@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Metody Programowanie',
    auditorium: '422',
    teacher: 'marek.lewandowski38@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Metody Sieci',
    auditorium: '140',
    teacher: 'krzysztof.lewandowski75@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Metody Analiza danych',
    auditorium: '289',
    teacher: 'piotr.nowak57@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Metody Systemy operacyjne',
    auditorium: '288',
    teacher: 'marek.kowalski83@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Metody Zarządzanie projektami',
    auditorium: '138',
    teacher: 'magdalena.nowak23@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Metody Cyberbezpieczeństwo',
    auditorium: '138',
    teacher: 'piotr.wójcik85@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Metody E-commerce',
    auditorium: '115',
    teacher: 'anna.lewandowski24@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Metody Rachunkowość',
    auditorium: '395',
    teacher: 'jan.wiśniewski63@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Metody Statystyka',
    auditorium: '245',
    teacher: 'marek.kowalczyk94@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Metody Logistyka',
    auditorium: '388',
    teacher: 'katarzyna.kowalski22@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Metody Sztuczna inteligencja',
    auditorium: '153',
    teacher: 'magdalena.zieliński11@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Metody Grafika',
    auditorium: '319',
    teacher: 'maria.lewandowski84@example.com',
    groups: [
      {
        name: 'ISC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Metody UX Design',
    auditorium: '393',
    teacher: 'agnieszka.lewandowski77@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Metody Kryptografia',
    auditorium: '189',
    teacher: 'agnieszka.wójcik72@example.com',
    groups: [
      {
        name: 'ISC',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Metody Automatyzacja',
    auditorium: '446',
    teacher: 'katarzyna.wójcik61@example.com',
    groups: [
      {
        name: 'ISC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Metody Mikroekonomia',
    auditorium: '242',
    teacher: 'magdalena.zieliński81@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zasady Algorytmy',
    auditorium: '113',
    teacher: 'piotr.kowalczyk67@example.com',
    groups: [
      {
        name: 'ISC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Zasady Bazy danych',
    auditorium: '457',
    teacher: 'tomasz.lewandowski31@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Zasady Marketing',
    auditorium: '186',
    teacher: 'piotr.zieliński25@example.com',
    groups: [
      {
        name: 'ISB',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Zasady Księgowość',
    auditorium: '240',
    teacher: 'maria.wiśniewski12@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zasady Programowanie',
    auditorium: '272',
    teacher: 'magdalena.kowalczyk49@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zasady Sieci',
    auditorium: '477',
    teacher: 'agnieszka.zieliński95@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zasady Analiza danych',
    auditorium: '220',
    teacher: 'agnieszka.wójcik72@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zasady Systemy operacyjne',
    auditorium: '167',
    teacher: 'krzysztof.zieliński97@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Zasady Zarządzanie projektami',
    auditorium: '146',
    teacher: 'agnieszka.wójcik68@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Zasady Cyberbezpieczeństwo',
    auditorium: '361',
    teacher: 'jan.lewandowski96@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Zasady E-commerce',
    auditorium: '403',
    teacher: 'agnieszka.wójcik72@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Zasady Rachunkowość',
    auditorium: '223',
    teacher: 'krzysztof.kowalczyk21@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zasady Statystyka',
    auditorium: '372',
    teacher: 'krzysztof.nowak62@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Zasady Logistyka',
    auditorium: '439',
    teacher: 'agnieszka.kowalczyk8@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Zasady Sztuczna inteligencja',
    auditorium: '172',
    teacher: 'agnieszka.lewandowski60@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Zasady Grafika',
    auditorium: '490',
    teacher: 'krzysztof.lewandowski75@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Zasady UX Design',
    auditorium: '135',
    teacher: 'tomasz.lewandowski90@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Zasady Kryptografia',
    auditorium: '446',
    teacher: 'piotr.lewandowski43@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Zasady Automatyzacja',
    auditorium: '406',
    teacher: 'tomasz.lewandowski90@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Zasady Mikroekonomia',
    auditorium: '340',
    teacher: 'agnieszka.zieliński95@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Wdrożenie Algorytmy',
    auditorium: '416',
    teacher: 'maria.kamiński88@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Wdrożenie Bazy danych',
    auditorium: '288',
    teacher: 'maria.kamiński88@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Wdrożenie Marketing',
    auditorium: '291',
    teacher: 'jan.kowalczyk59@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Wdrożenie Księgowość',
    auditorium: '133',
    teacher: 'agnieszka.zieliński95@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Wdrożenie Programowanie',
    auditorium: '456',
    teacher: 'tomasz.kowalski86@example.com',
    groups: [
      {
        name: 'ZKA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Wdrożenie Sieci',
    auditorium: '353',
    teacher: 'tomasz.lewandowski90@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Wdrożenie Analiza danych',
    auditorium: '158',
    teacher: 'maria.lewandowski84@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Wdrożenie Systemy operacyjne',
    auditorium: '178',
    teacher: 'agnieszka.kowalski26@example.com',
    groups: [
      {
        name: 'IPB',
      },
    ],
    years: [
      {
        value: '4',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Wdrożenie Zarządzanie projektami',
    auditorium: '272',
    teacher: 'tomasz.kamiński79@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Wdrożenie Cyberbezpieczeństwo',
    auditorium: '447',
    teacher: 'tomasz.kowalski70@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Wdrożenie E-commerce',
    auditorium: '458',
    teacher: 'tomasz.kamiński87@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
  {
    name: 'Wdrożenie Rachunkowość',
    auditorium: '456',
    teacher: 'magdalena.nowak23@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Wdrożenie Statystyka',
    auditorium: '373',
    teacher: 'agnieszka.zieliński95@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Wdrożenie Logistyka',
    auditorium: '190',
    teacher: 'krzysztof.kowalczyk21@example.com',
    groups: [
      {
        name: 'ZMA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Wdrożenie Sztuczna inteligencja',
    auditorium: '209',
    teacher: 'maria.lewandowski84@example.com',
    groups: [
      {
        name: 'ZKC',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Wdrożenie Grafika',
    auditorium: '327',
    teacher: 'magdalena.nowak23@example.com',
    groups: [
      {
        name: 'ZKB',
      },
    ],
    years: [
      {
        value: '2',
      },
    ],
    specialty: [
      {
        name: 'Księgowość',
      },
    ],
  },
  {
    name: 'Wdrożenie UX Design',
    auditorium: '175',
    teacher: 'maria.lewandowski84@example.com',
    groups: [
      {
        name: 'ISB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Wdrożenie Kryptografia',
    auditorium: '273',
    teacher: 'marek.kamiński45@example.com',
    groups: [
      {
        name: 'ISA',
      },
    ],
    years: [
      {
        value: '1',
      },
    ],
    specialty: [
      {
        name: 'Sieciowe',
      },
    ],
  },
  {
    name: 'Wdrożenie Automatyzacja',
    auditorium: '470',
    teacher: 'jan.lewandowski96@example.com',
    groups: [
      {
        name: 'ZMB',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Marketing',
      },
    ],
  },
  {
    name: 'Wdrożenie Mikroekonomia',
    auditorium: '436',
    teacher: 'krzysztof.kowalczyk98@example.com',
    groups: [
      {
        name: 'IPA',
      },
    ],
    years: [
      {
        value: '3',
      },
    ],
    specialty: [
      {
        name: 'Programowanie',
      },
    ],
  },
];


const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
const hours = [
  '7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00',
  '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00',
  '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00'
];

function generateCalendar(data) {
  const calendar = [];

  // Zbiory do szybkiego sprawdzania zajętości (klucz: "Dzień-Godzina-Kto")
  const teacherBusy = new Set();
  const groupYearBusy = new Set();

  data.forEach(subjectObj => {
    const hoursPerWeek = Math.floor(Math.random() * 6) + 1; // 1-4 godziny
    const groupName = subjectObj.groups[0].name;
    const yearValue = subjectObj.years[0].value;
    const teacherEmail = subjectObj.teacher;

    let allocatedHours = 0;
    let attempts = 0;
    const maxAttempts = 500; // Zabezpieczenie przed nieskończoną pętlą przy braku miejsc

    while (allocatedHours < hoursPerWeek && attempts < maxAttempts) {
      const randomDay = days[Math.floor(Math.random() * days.length)];
      const randomHour = hours[Math.floor(Math.random() * hours.length)];

      const teacherKey = `${randomDay}-${randomHour}-${teacherEmail}`;
      const groupKey = `${randomDay}-${randomHour}-${groupName}-${yearValue}`;

      // Sprawdzenie warunków unikalności
      if (!teacherBusy.has(teacherKey) && !groupYearBusy.has(groupKey)) {

        // Dodaj wpis do kalendarza
        calendar.push({
          hours: randomHour,
          days: randomDay,
          group: groupName,
          year: yearValue,
          specialty: subjectObj.specialty[0].name,
          subject: subjectObj.name,
          teacher: teacherEmail,
          auditorium: subjectObj.auditorium
        });

        // Zablokuj termin
        teacherBusy.add(teacherKey);
        groupYearBusy.add(groupKey);
        allocatedHours++;
      }
      attempts++;
    }
  });

  return calendar;
}

const schedule = generateCalendar(subjectsData);
console.log(`Wygenerowano ${schedule.length} wpisów do kalendarza.`);

const fs = require('fs');
const path = require('path');


fs.writeFileSync('subjects.json', JSON.stringify(schedule, null, 2));