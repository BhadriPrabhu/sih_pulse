export const lessonKits = [
  {
    id: "kit-1",
    title: "Ice Core Time Machines",
    grade: "Classes 6 to 8",
    duration: "45 mins",
    color: "bg-[#F7ECD9]",
    tabColor: "bg-[#D9A441]",
    textColor: "text-mustard",
    rotation: -2,
    offset: "mt-0 z-10"
  },
  {
    id: "kit-2",
    title: "The Physics of Sea Level Rise",
    grade: "Classes 9 to 10",
    duration: "60 mins",
    color: "bg-[#EBF1F2]",
    tabColor: "bg-[#9DB4B8]",
    textColor: "text-teal-ink",
    rotation: 1.5,
    offset: "mt-8 md:-ml-8 md:mt-12 z-20"
  },
  {
    id: "kit-3",
    title: "Penguin Population Math",
    grade: "Classes 4 to 5",
    duration: "30 mins",
    color: "bg-[#E8ECE4]",
    tabColor: "bg-[#7C8A6A]",
    textColor: "text-sage",
    rotation: -1,
    offset: "mt-8 md:-ml-8 md:mt-4 z-30"
  }
];

export const calendarEvents = [
  { date: "14", event: "Live from Bharati (10 AM)" },
  { date: "22", event: "Q&A: Aurora physics" }
];

export const quizData = {
  question: "How cold is Bharati station today?",
  options: [
    "-12°C (Like a standard freezer)",
    "-42°C (Exposed skin freezes in minutes)",
    "0°C (Unusually warm summer day)"
  ],
  correctAnswer: 1
};