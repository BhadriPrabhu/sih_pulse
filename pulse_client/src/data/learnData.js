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
    offset: "mt-0 z-10",
    outline: [
      "Introduction to glaciology and ancient climates.",
      "Hands-on: Simulating ice layers using colored sand.",
      "Analysis: How scientists read greenhouse gases trapped in bubbles."
    ],
    materials: ["Clear plastic tubes (or tall glasses)", "3 colors of sand or clay", "Rulers", "Printed kit worksheet"]
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
    offset: "mt-8 md:-ml-8 md:mt-12 z-20",
    outline: [
      "The Archimedes principle and floating ice.",
      "Lab experiment: Land ice melt vs. sea ice melt.",
      "Mapping the impact on the Indian coastline."
    ],
    materials: ["Two large clear bowls", "Ice cubes", "Rocks or clay (to simulate land)", "Warm water", "Marker pen"]
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
    offset: "mt-8 md:-ml-8 md:mt-4 z-30",
    outline: [
      "Understanding Emperor penguin colonies.",
      "Grid counting: Estimating populations from aerial photos.",
      "Simple multiplication and ecosystem balance."
    ],
    materials: ["Printed penguin grid sheets", "Pencils", "Erasers"]
  }
];

export const calendarEvents = [
  { date: "14", title: "Live from Bharati (10 AM)", topic: "Daily life in extreme cold", speaker: "Dr. A. Sharma" },
  { date: "22", title: "Q&A: Aurora physics", topic: "Solar winds and the magnetosphere", speaker: "Atmospheric Team" }
];

export const quizQuestions = [
  {
    id: "q1", // Temperature is injected dynamically via API
    question: "Fetching live weather from Bharati station...",
    options: ["Loading...", "Loading...", "Loading..."],
    correctAnswer: 1,
    explanation: ""
  },
  {
    id: "q2",
    question: "Which of these animals is native to Antarctica?",
    options: ["Polar bears", "Emperor penguins", "Arctic foxes"],
    correctAnswer: 1,
    explanation: "Penguins live in the Antarctic (South), while Polar bears live in the Arctic (North). They never meet!"
  },
  {
    id: "q3",
    question: "What exactly is an 'ice core'?",
    options: ["The frozen center of a penguin's nest", "A long cylinder of ice drilled from a glacier", "A specialized winter jacket"],
    correctAnswer: 1,
    explanation: "Scientists drill deep into glaciers to pull out long cylinders of ice. The layers act like tree rings, revealing ancient climates."
  },
  {
    id: "q4",
    question: "The colorful lights seen in the southern polar night sky are called:",
    options: ["Aurora Australis", "Aurora Borealis", "Polar mirages"],
    correctAnswer: 0,
    explanation: "Aurora Australis means 'Southern Lights'. Aurora Borealis are the Northern Lights."
  },
  {
    id: "q5",
    question: "Why do researchers wear dark sunglasses in Antarctica?",
    options: ["To look cool for the media cameras", "To block wind and snow from their eyes", "To prevent snow blindness from UV reflection"],
    correctAnswer: 2,
    explanation: "The pure white snow and ice reflect up to 90% of the sun's UV rays, which can actually sunburn your eyes!"
  }
];