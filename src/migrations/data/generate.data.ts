import { IUser } from 'src/user/model/user.model';

const groups = [
  'IPA',
  'IPB',
  'ISA',
  'ISB',
  'ISC',
  'ZMA',
  'ZMB',
  'ZKA',
  'ZKB',
  'ZKC',
];
const specialties = ['Programowanie', 'Sieciowe', 'Marketing', 'Księgowość'];
const years = ['1', '2', '3', '4'];
const directions = ['Informatyka', 'Zarządzanie'];

const names = [
  'Jan',
  'Anna',
  'Piotr',
  'Maria',
  'Krzysztof',
  'Katarzyna',
  'Marek',
  'Magdalena',
  'Tomasz',
  'Agnieszka',
  'Adam',
  'Ewa',
  'Paweł',
  'Małgorzata',
  'Robert',
  'Zofia',
  'Grzegorz',
  'Joanna',
  'Wojciech',
  'Barbara',
  'Łukasz',
  'Elżbieta',
  'Michał',
  'Beata',
  'Andrzej',
];

const surnames = [
  'Nowak',
  'Kowalski',
  'Wiśniewski',
  'Wójcik',
  'Kowalczyk',
  'Kamiński',
  'Lewandowski',
  'Zieliński',
  'Szymański',
  'Woźniak',
  'Dąbrowski',
  'Kozłowski',
  'Jankowski',
  'Mazur',
  'Wojciechowski',
  'Kwiatkowski',
  'Krawczyk',
  'Kaczmarek',
  'Piotrowski',
  'Grabowski',
];

const cities = [
  'Warszawa',
  'Kraków',
  'Wrocław',
  'Poznań',
  'Gdańsk',
  'Łódź',
  'Szczecin',
];

const mapping = {
  directions: [
    {
      name: 'Informatyka',
      specialties: ['Programowanie', 'Sieciowe'],
      years: ['1', '2', '3', '4'],
    },
    {
      name: 'Zarządzanie',
      specialties: ['Księgowość', 'Marketing'],
      years: ['1', '2', '3', '4'],
    },
  ],
  specialties: [
    {
      name: 'Księgowość',
      direction: 'Zarządzanie',
      groups: ['ZKA', 'ZKB', 'ZKC'],
      years: ['1', '2', '3', '4'],
    },
    {
      name: 'Marketing',
      direction: 'Zarządzanie',
      groups: ['ZMA', 'ZMB'],
      years: ['1', '2', '3'],
    },
    {
      name: 'Programowanie',
      direction: 'Informatyka',
      groups: ['IPA', 'IPB'],
      years: ['1', '2', '3', '4'],
    },
    {
      name: 'Sieciowe',
      direction: 'Informatyka',
      groups: ['ISA', 'ISB', 'ISC'],
      years: ['1', '2', '3', '4'],
    },
  ],
  group: [
    { name: 'IPA', specialty: 'Programowanie', years: ['1', '3'] },
    { name: 'IPB', specialty: 'Programowanie', years: ['1', '2', '3', '4'] },
    { name: 'ISA', specialty: 'Sieciowe', years: ['1', '2', '3'] },
    { name: 'ISB', specialty: 'Sieciowe', years: ['3', '4'] },
    { name: 'ISC', specialty: 'Sieciowe', years: ['1', '2', '3'] },
    { name: 'ZKA', specialty: 'Księgowość', years: ['1', '2', '3', '4'] },
    { name: 'ZKB', specialty: 'Księgowość', years: ['1', '2', '3'] },
    { name: 'ZKC', specialty: 'Księgowość', years: ['1', '2', '3', '4'] },
    { name: 'ZMA', specialty: 'Marketing', years: ['1', '2', '3'] },
    { name: 'ZMB', specialty: 'Marketing', years: ['1', '2', '3'] },
  ],
};

const subjectBases = [
  'Algorytmy',
  'Bazy danych',
  'Marketing',
  'Księgowość',
  'Programowanie',
  'Sieci',
  'Analiza danych',
  'Systemy operacyjne',
  'Zarządzanie projektami',
  'Cyberbezpieczeństwo',
  'E-commerce',
  'Rachunkowość',
  'Statystyka',
  'Logistyka',
  'Sztuczna inteligencja',
  'Grafika',
  'UX Design',
  'Kryptografia',
  'Automatyzacja',
  'Mikroekonomia',
];

const prefixes = [
  'Wstęp do',
  'Zaawansowane',
  'Laboratorium z',
  'Projekt:',
  'Seminarium:',
  'Teoria',
  'Praktyka',
  'Metody',
  'Zasady',
  'Wdrożenie',
];

const days = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela',
];
const hours = [
  '7:00 - 8:00',
  '8:00 - 9:00',
  '9:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
  '18:00 - 19:00',
  '19:00 - 20:00',
];
interface Combination {
  name: string;
  surname: string;
}

interface User {
  email: string;
  password: string;
  role: string;
  person: {
    name: string;
    surname: string;
    phone: number;
    photo: string;
  };
  address: {
    street: string;
    city: string;
    country: string;
    number: string;
    zipCode: string;
  };
  student?: {
    direction: string;
    group: string;
    year: string;
    specialty: string;
  };
}
interface Subject {
  name: string;
  auditorium: string;
  teacher: string;
  groups: { name: string }[];
  years: { value: string | undefined }[];
  specialty: { name: string }[];
}

interface CalendarEntry {
  hours: string;
  days: string;
  group: string;
  year: string | undefined;
  specialty: string;
  subject: string;
  teacher: string;
  auditorium: string;
}

interface Grade {
  grade: string;
  subjectId: string;
  teacherId: string;
  studentId: string;
}

const combinations: Combination[] = [];
for (const name of names) {
  for (const surname of surnames) {
    combinations.push({ name, surname });
  }
}

// 2. Funkcja mieszająca (Shuffle)
const shuffle = (array: Combination[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateUsers = () => {
  const users: User[] = [];
  const shuffledPairs = shuffle([...combinations]);
  const totalCount = 500;

  for (let i = 0; i < totalCount; i++) {
    // 3. Logika przypisywania ról:
    // 0-1 (2 osoby) -> admin
    // 2-81 (80 osób) -> teacher
    // reszta -> student
    let role: string;
    if (i < 2) {
      role = 'admin';
    } else if (i < 82) {
      role = 'teacher';
    } else {
      role = 'student';
    }

    const { name, surname } = shuffledPairs[i];

    const user: User = {
      email: `${name.toLowerCase()}.${surname.toLowerCase()}${i}@example.com`,
      password: `Pass$123`,
      role: role,
      person: {
        name: name,
        surname: surname,
        phone: 500000000 + i,
        photo: `photo.jpg`,
      },
      address: {
        street: 'Ulica ' + (Math.floor(Math.random() * 100) + 1),
        city: cities[Math.floor(Math.random() * cities.length)],
        country: 'Polska',
        number: `${Math.floor(Math.random() * 200)}`,
        zipCode: `${Math.floor(Math.random() * 89 + 10)}-${Math.floor(Math.random() * 899 + 100)}`,
      },
    };

    // Dodaj sekcję student tylko dla roli 'student'
    if (role === 'student') {
      user.student = {
        direction: directions[Math.floor(Math.random() * directions.length)],
        group: groups[Math.floor(Math.random() * groups.length)],
        year: years[Math.floor(Math.random() * years.length)],
        specialty: specialties[Math.floor(Math.random() * specialties.length)],
      };
    }

    users.push(user);
  }
  return users;
};

function generate200Subjects(teachers: string[]) {
  const finalSubjects: Subject[] = [];

  // Generowanie 200 unikalnych nazw
  const names: string[] = [];
  for (const p of prefixes) {
    for (const b of subjectBases) {
      names.push(`${p} ${b}`);
    }
  }

  for (let i = 0; i < 200; i++) {
    const spec =
      mapping.specialties[
      Math.floor(Math.random() * mapping.specialties.length)
      ];
    const groupName =
      spec.groups[Math.floor(Math.random() * spec.groups.length)];
    const groupData = mapping.group.find((g) => g.name === groupName);
    const year =
      groupData?.years[Math.floor(Math.random() * groupData.years.length)];

    finalSubjects.push({
      name: names[i] || `Przedmiot specjalistyczny nr ${i + 1}`,
      auditorium: (Math.floor(Math.random() * 400) + 100).toString(),
      teacher: teachers[Math.floor(Math.random() * teachers.length)],
      groups: [{ name: groupName }],
      years: [{ value: year }],
      specialty: [{ name: spec.name }],
    });
  }
  return finalSubjects;
}

function generateCalendar(data: Subject[]) {
  const calendar: CalendarEntry[] = [];

  // Zbiory do szybkiego sprawdzania zajętości (klucz: "Dzień-Godzina-Kto")
  const teacherBusy = new Set();
  const groupYearBusy = new Set();

  data.forEach((subjectObj) => {
    const hoursPerWeek = Math.floor(Math.random() * 6) + 2; // 1-4 godziny
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
          auditorium: subjectObj.auditorium,
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

const possibleGrades = ['1', '2', '3', '4', '5', '6', 'np', 'zal'];

const generateGrades = (users: User[], subjects: Subject[]) => {
  const grades: Grade[] = [];

  // Filtrujemy tylko studentów
  const students = users.filter((u) => u.role === 'student');

  subjects.forEach((subject) => {
    // 1. Znajdź studentów pasujących do tego przedmiotu
    // Kryteria: Grupa, Rok i Specjalizacja muszą się zgadzać
    const eligibleStudents = students.filter((student) => {
      const matchGroup = subject.groups.some(
        (g) => g.name === student.student?.group,
      );
      const matchYear = subject.years.some(
        (y) => y.value === student.student?.year,
      );
      const matchSpecialty = subject.specialty.some(
        (s) => s.name === student.student?.specialty,
      );

      return matchGroup && matchYear && matchSpecialty;
    });

    // 2. Dla każdego pasującego ucznia dodaj od 2 do 4 ocen
    eligibleStudents.forEach((student) => {
      const numberOfGrades = Math.floor(Math.random() * 3) + 2; // Losuje 2, 3 lub 4

      for (let i = 0; i < numberOfGrades; i++) {
        const gradeEntry = {
          grade:
            possibleGrades[Math.floor(Math.random() * possibleGrades.length)],
          subjectId: subject.name,
          teacherId: subject.teacher, // Nauczyciel przypisany do przedmiotu
          studentId: student.email, // Email studenta
        };
        grades.push(gradeEntry);
      }
    });
  });

  return grades;
};

const users = generateUsers();

const stats: { [key: string]: number } = users.reduce<Record<string, number>>(
  (acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  },
  {},
);

console.log('Statystyki ról:', stats);
console.log(`Łącznie wygenerowano: ${users.length} osób.`);

const teacherEmails = users
  .filter((a) => a.role === 'teacher')
  .reduce<string[]>((a, c) => {
    a.push(c.email);
    return a;
  }, []);

const subjects = generate200Subjects(teacherEmails);

const schedule = generateCalendar(subjects);
console.log(`Wygenerowano ${schedule.length} wpisów do kalendarza.`);

const grages = generateGrades(users, subjects);

console.log(`Wygenerowano łącznie ${grages.length} ocen.`);
if (grages.length > 0) {
  console.log('Przykładowa ocena:', grages[0]);
} else {
  console.log('Nie znaleziono studentów pasujących do kryteriów przedmiotów!');
}

export { users, subjects, schedule, grages };
