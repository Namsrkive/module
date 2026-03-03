export const sampleTest = {
  id: 1,
  title: "TCS Mock Test 1",
  sections: [
    {
      name: "Aptitude",
      duration: 2, // minutes (demo)
      questions: [
        {
          id: 1,
          question: "What is 5 + 7?",
          options: ["10", "12", "14", "15"],
          correctAnswer: "12",
        },
        {
          id: 2,
          question: "Speed = ?",
          options: [
            "Distance × Time",
            "Distance / Time",
            "Time / Distance",
            "None",
          ],
          correctAnswer: "Distance / Time",
        },
      ],
    },
    {
      name: "DSA",
      duration: 2,
      questions: [
        {
          id: 3,
          question: "Which data structure uses FIFO?",
          options: ["Stack", "Queue", "Tree", "Graph"],
          correctAnswer: "Queue",
        },
      ],
    },
  ],
};