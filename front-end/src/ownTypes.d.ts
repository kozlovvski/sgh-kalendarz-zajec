// {
//   signature:
//   name:
//   start_time:
//   end_time:
//   dates:
//   form?:
//   group?:
//   lecturer?:
//   type?:
// }

export interface LecturesEntry {
  signature: string;
  name: string;
  start_time: string;
  end_time: string;
  dates: string;
  form?: string;
  group?: string;
  lecturer?: string;
  type?: string;
}

// {
//   Przedmiot: '110450-0309 Integracja europejska',
//   'Prowadzący': 'Latoszek Ewa-0309',
//   Forma: 'Wykład',
//   'Dzień tygodnia': 'Sobota',
//   Poczatek: '09:50',
//   Koniec: '11:30',
//   'Numer grupy': 10,
//   'Budynek i sala': 'Aula III',
//   'Daty zajęć (dd-mm-rr)': '22-02-20;07-03-20;21-03-20;04-04-20;25-04-20;16-05-20;06-06-20;'
// }

export interface SheetLecture {
  Przedmiot: string;
  Prowadzący: string;
  Forma: string;
  "Dzień tygodnia": string;
  Poczatek: string;
  Koniec: string;
  "Numer grupy": string | number;
  "Budynek i sala": string;
  "Daty zajęć (dd-mm-rr)": string;
}

export interface InputLecture {
  signature: string;
  group: string;
}
