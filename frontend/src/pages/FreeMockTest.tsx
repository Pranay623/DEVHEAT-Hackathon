import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, ChevronRight, ArrowRight, ArrowLeft, Check, X, Award, BookOpen, ArrowLeftCircle } from 'react-feather';
import DashboardLayout from '../components/DashboardLayout';

interface TestCategory {
  id: string;
  name: string;
  tests: MockTest[];
}

interface MockTest {
  id: string;
  title: string;
  duration: number;
  questions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  completions: number;
  averageScore: number;
}

interface Question {
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

const categories: TestCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    tests: [
      {
        id: 'react-basics',
        title: 'React Fundamentals',
        duration: 60,
        questions: 20,
        difficulty: 'Medium',
        topics: ['React', 'JS', 'Hooks'],
        completions: 2453,
        averageScore: 72,
      },
      {
        id: 'js-advanced',
        title: 'JavaScript Advanced',
        duration: 45,
        questions: 15,
        difficulty: 'Hard',
        topics: ['Closures', 'Promises', 'ES6+'],
        completions: 1876,
        averageScore: 68,
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    tests: [
      {
        id: 'node-express',
        title: 'Node.js & Express',
        duration: 60,
        questions: 20,
        difficulty: 'Medium',
        topics: ['Node', 'Express', 'RESTful API'],
        completions: 1254,
        averageScore: 70,
      },
      {
        id: 'database-design',
        title: 'Database Design & SQL',
        duration: 45,
        questions: 15,
        difficulty: 'Medium',
        topics: ['SQL', 'NoSQL', 'Indexing'],
        completions: 987,
        averageScore: 65,
      },
    ],
  },
  {
    id: 'algorithms',
    name: 'Data Structures & Algorithms',
    tests: [
      {
        id: 'dsa-basics',
        title: 'DSA Fundamentals',
        duration: 90,
        questions: 25,
        difficulty: 'Medium',
        topics: ['Arrays', 'Linked Lists', 'Trees'],
        completions: 3654,
        averageScore: 61,
      },
      {
        id: 'leetcode-medium',
        title: 'LeetCode Medium Problems',
        duration: 120,
        questions: 10,
        difficulty: 'Hard',
        topics: ['DP', 'Graphs', 'Greedy'],
        completions: 2140,
        averageScore: 59,
      },
    ],
  },
  {
    id: 'system-design',
    name: 'System Design',
    tests: [
      {
        id: 'system-basics',
        title: 'System Design Basics',
        duration: 75,
        questions: 15,
        difficulty: 'Medium',
        topics: ['Scaling', 'API Design', 'Caching'],
        completions: 1856,
        averageScore: 74,
      },
      {
        id: 'distributed-systems',
        title: 'Distributed Systems',
        duration: 90,
        questions: 20,
        difficulty: 'Hard',
        topics: ['Consensus', 'Sharding', 'Load Balancing'],
        completions: 1123,
        averageScore: 67,
      },
    ],
  },
];

const FreeMockTest: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<MockTest | null>(null);
  const [step, setStep] = useState<'browse' | 'instructions' | 'test' | 'results'>('browse');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeSpent, setTimeSpent] = useState<number>(0); // in seconds
  const [testStartTime, setTestStartTime] = useState<number | null>(null);

  const handleStartTest = (test: MockTest) => {
    setSelectedTest(test);
    setStep('instructions');
  };

  const handleBeginTest = () => {
    setStep('test');
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTestStartTime(Date.now());
  };

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (selectedTest && currentQuestion < getMockQuestions().length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If we're on the last question, finish the test
      if (testStartTime) {
        const timeElapsed = Math.floor((Date.now() - testStartTime) / 1000);
        setTimeSpent(timeElapsed);
      }
      setStep('results');
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = () => {
    if (testStartTime) {
      const timeElapsed = Math.floor((Date.now() - testStartTime) / 1000);
      setTimeSpent(timeElapsed);
    }
    setStep('results');
  };

  const handleReturnToBrowse = () => {
    setStep('browse');
    setSelectedTest(null);
    setSelectedAnswers({});
  };

  const handleTryAgain = () => {
    setStep('instructions');
  };

  // Mock questions for the test
  const getMockQuestions = (): Question[] => {
    if (!selectedTest) return [];
  
    switch (selectedTest.id) {
      case 'react-basics':
        return [
          {
            text: "What hook would you use to run side effects in a React component?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            correctIndex: 1,
            explanation: "useEffect is used for side effects like fetching data or updating the DOM.",
          },
          {
            text: "Which prop is used to give a unique identity to elements in a list?",
            options: ["id", "key", "ref", "index"],
            correctIndex: 1,
            explanation: "The 'key' prop helps React identify which items changed.",
          },
          {
            text: "What does the useState hook return?",
            options: ["An object", "An array", "A function", "A string"],
            correctIndex: 1,
            explanation: "useState returns an array with the state and a function to update it.",
          },
          {
            text: "What is JSX?",
            options: [
              "A templating language",
              "A syntax extension for JavaScript",
              "A CSS preprocessor",
              "A backend language",
            ],
            correctIndex: 1,
            explanation: "JSX is a syntax extension that allows writing HTML in React.",
          },
          {
            text: "Which hook is used for managing global state in React?",
            options: ["useEffect", "useMemo", "useContext", "useCallback"],
            correctIndex: 2,
            explanation: "useContext is used for accessing global state via Context API.",
          },
        ];
  
      case 'js-advanced':
        return [
          {
            text: "What is a closure in JavaScript?",
            options: [
              "A function that returns another function",
              "A function with access to its outer function’s scope",
              "A function that executes immediately",
              "None of the above",
            ],
            correctIndex: 1,
            explanation: "Closures allow functions to access variables from an enclosing scope.",
          },
          {
            text: "What will be the output of 'typeof NaN'?",
            options: ["NaN", "number", "undefined", "object"],
            correctIndex: 1,
            explanation: "Even though it's 'Not-a-Number', typeof NaN is 'number'.",
          },
          {
            text: "Which method converts a JSON string into a JavaScript object?",
            options: ["JSON.stringify", "JSON.parse", "JSON.objectify", "JSON.decode"],
            correctIndex: 1,
            explanation: "JSON.parse converts a JSON string into a JavaScript object.",
          },
          {
            text: "What does 'this' keyword refer to in a regular function?",
            options: [
              "The current function",
              "The global object",
              "The object that owns the function",
              "undefined",
            ],
            correctIndex: 2,
            explanation: "'this' refers to the calling object unless in strict mode.",
          },
          {
            text: "Which of these creates a deep copy of an object?",
            options: ["Object.assign", "Spread operator", "JSON methods", "= assignment"],
            correctIndex: 2,
            explanation: "JSON.parse(JSON.stringify(obj)) can be used for deep copying (with limitations).",
          },
        ];
  
      case 'node-express':
        return [
          {
            text: "Which method is used to create a new Express application?",
            options: ["express.create()", "express()", "new Express()", "express.init()"],
            correctIndex: 1,
            explanation: "`express()` initializes an Express app instance.",
          },
          {
            text: "Which HTTP verb is used to update a resource?",
            options: ["GET", "POST", "PUT", "DELETE"],
            correctIndex: 2,
            explanation: "`PUT` is typically used for updating existing resources.",
          },
          {
            text: "Which middleware is used to parse JSON bodies in Express?",
            options: ["bodyParser.json()", "express.json()", "jsonParser()", "urlencoded()"],
            correctIndex: 1,
            explanation: "express.json() is used to parse incoming JSON requests.",
          },
          {
            text: "How do you define a route in Express?",
            options: [
              "app.use(path, callback)",
              "app.route(path)",
              "app.get(path, callback)",
              "express.get(path, callback)",
            ],
            correctIndex: 2,
            explanation: "app.get() defines a GET route in Express.",
          },
          {
            text: "Which status code means 'Not Found'?",
            options: ["200", "201", "404", "500"],
            correctIndex: 2,
            explanation: "404 means the requested resource was not found.",
          },
        ];
  
      case 'database-design':
        return [
          {
            text: "What is a primary key in a database?",
            options: [
              "A unique identifier for each record",
              "A field used to link tables",
              "A field that stores large files",
              "A backup of the database",
            ],
            correctIndex: 0,
            explanation: "The primary key uniquely identifies each row in a table.",
          },
          {
            text: "Which of these is a NoSQL database?",
            options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
            correctIndex: 2,
            explanation: "MongoDB is a popular NoSQL database.",
          },
          {
            text: "What does normalization do?",
            options: [
              "Adds redundancy",
              "Organizes data efficiently",
              "Encrypts data",
              "Backs up data",
            ],
            correctIndex: 1,
            explanation: "Normalization reduces redundancy and improves data integrity.",
          },
          {
            text: "What is a foreign key?",
            options: [
              "A duplicate of a primary key",
              "A key used to encrypt data",
              "A key used to link two tables",
              "A reserved keyword",
            ],
            correctIndex: 2,
            explanation: "Foreign keys establish relationships between tables.",
          },
          {
            text: "Which command retrieves data from a table?",
            options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
            correctIndex: 2,
            explanation: "SELECT is used to fetch data from a table.",
          },
        ];
  
      case 'dsa-basics':
        return [
          {
            text: "What is the time complexity of binary search?",
            options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
            correctIndex: 1,
            explanation: "Binary search cuts the search space in half each time.",
          },
          {
            text: "Which data structure uses LIFO?",
            options: ["Queue", "Stack", "Linked List", "Tree"],
            correctIndex: 1,
            explanation: "Stack stands for Last In, First Out.",
          },
          {
            text: "Which data structure is used in BFS?",
            options: ["Stack", "Queue", "Set", "Array"],
            correctIndex: 1,
            explanation: "Breadth-First Search uses a Queue.",
          },
          {
            text: "What’s the time complexity of bubble sort?",
            options: ["O(n log n)", "O(n)", "O(n^2)", "O(1)"],
            correctIndex: 2,
            explanation: "Bubble sort compares and swaps repeatedly, hence O(n²).",
          },
          {
            text: "Which data structure is used for recursion?",
            options: ["Queue", "Stack", "Array", "Tree"],
            correctIndex: 1,
            explanation: "Recursion uses the call stack.",
          },
        ];
  
      case 'leetcode-medium':
        return [
          {
            text: "Which algorithm is best suited for solving the shortest path in a weighted graph?",
            options: ["DFS", "BFS", "Dijkstra’s Algorithm", "Greedy Algorithm"],
            correctIndex: 2,
            explanation: "Dijkstra’s Algorithm is efficient for shortest paths in weighted graphs.",
          },
          {
            text: "Which problem category is dynamic programming often used for?",
            options: ["Searching", "Sorting", "Optimization", "Traversal"],
            correctIndex: 2,
            explanation: "DP solves problems by breaking them into overlapping subproblems.",
          },
          {
            text: "What’s the optimal time complexity to find the median of two sorted arrays?",
            options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
            correctIndex: 1,
            explanation: "It can be done in O(log n) using binary search techniques.",
          },
          {
            text: "Which algorithm is used in topological sorting?",
            options: ["DFS", "BFS", "Union-Find", "Bellman-Ford"],
            correctIndex: 0,
            explanation: "DFS is typically used for topological sort of a DAG.",
          },
          {
            text: "Which data structure supports O(1) average time for insertion and lookup?",
            options: ["Array", "Linked List", "Stack", "HashMap"],
            correctIndex: 3,
            explanation: "HashMaps provide average constant time complexity for insertion/lookup.",
          },
        ];
  
      case 'system-basics':
        return [
          {
            text: "What does horizontal scaling mean?",
            options: [
              "Adding more power to a single machine",
              "Distributing load across multiple machines",
              "Caching frequently used data",
              "Optimizing the database schema",
            ],
            correctIndex: 1,
            explanation: "Horizontal scaling means adding more servers to share the load.",
          },
          {
            text: "What is the purpose of caching?",
            options: ["To store backups", "To optimize disk usage", "To reduce response time", "To prevent scaling"],
            correctIndex: 2,
            explanation: "Caching helps reduce the need to repeatedly compute or fetch data.",
          },
          {
            text: "What is a load balancer?",
            options: [
              "A database optimizer",
              "A firewall",
              "A device that distributes traffic",
              "A cloud function",
            ],
            correctIndex: 2,
            explanation: "Load balancers distribute incoming network traffic.",
          },
          {
            text: "What does a CDN do?",
            options: [
              "Creates backups",
              "Delivers content fast via edge servers",
              "Manages databases",
              "Encrypts API data",
            ],
            correctIndex: 1,
            explanation: "CDNs deliver content from servers nearest to the user.",
          },
          {
            text: "What is vertical scaling?",
            options: [
              "Adding more machines",
              "Adding more CPU/RAM to a server",
              "Reducing latency",
              "Decreasing disk usage",
            ],
            correctIndex: 1,
            explanation: "Vertical scaling means enhancing a machine's capacity.",
          },
        ];
  
      case 'distributed-systems':
        return [
          {
            text: "What is CAP theorem in distributed systems?",
            options: [
              "Consistency, Accuracy, Performance",
              "Consistency, Availability, Partition tolerance",
              "Cache, Availability, Performance",
              "Concurrency, Accuracy, Partitioning",
            ],
            correctIndex: 1,
            explanation: "CAP theorem states a distributed system can only guarantee two of the three: Consistency, Availability, and Partition tolerance.",
          },
          {
            text: "What is sharding in databases?",
            options: [
              "Creating a backup",
              "Splitting database into smaller parts",
              "Encrypting data",
              "Indexing data",
            ],
            correctIndex: 1,
            explanation: "Sharding is a method for distributing data across multiple machines.",
          },
          {
            text: "Which system design principle helps handle high loads?",
            options: ["Sharding", "Batching", "Load Balancing", "All of the above"],
            correctIndex: 3,
            explanation: "All these techniques help in improving scalability and performance.",
          },
          {
            text: "What is eventual consistency?",
            options: [
              "Data is always consistent",
              "Data becomes consistent over time",
              "Data never changes",
              "Data consistency depends on schema",
            ],
            correctIndex: 1,
            explanation: "Eventually consistent systems may not immediately reflect all updates but will eventually do so.",
          },
          {
            text: "What does a consensus algorithm do?",
            options: [
              "Resolves network issues",
              "Encrypts data",
              "Helps nodes agree on values",
              "Creates backups",
            ],
            correctIndex: 2,
            explanation: "Consensus algorithms help multiple systems agree on a single data value/state.",
          },
        ];
  
      default:
        return [];
    }
  };
  
  

  // Calculate score
  const calculateScore = () => {
    const questions = getMockQuestions();
    let correctCount = 0;
    
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctIndex) {
        correctCount++;
      }
    });
    
    return {
      correct: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100),
    };
  };

  // Get feedback based on score
  const getScoreFeedback = (percentage: number) => {
    if (percentage >= 90) {
      return "Excellent! You're well-prepared for your interview.";
    } else if (percentage >= 70) {
      return "Good job! With a bit more practice, you'll be fully prepared.";
    } else if (percentage >= 50) {
      return "Not bad! Focus on the questions you missed to improve your score.";
    } else {
      return "Keep practicing! Review the fundamentals and try again.";
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <DashboardLayout>
      <AnimatePresence mode="wait">
        {step === 'browse' && (
          <motion.div
            key="browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-[calc(100vh-120px)]"
          >
            {/* Header */}
            <div className="bg-[#121212] shadow-md p-4 mb-6 rounded-lg">
              <h1 className="text-xl font-bold text-white flex items-center">
                <FileText size={20} className="text-blue-400 mr-2" />
                Free Mock Tests
              </h1>
            </div>

            {/* Categories and Tests */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-[#121212] rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-900/40 to-blue-700/40 p-3 border-b border-blue-900/50">
                    <h2 className="text-white font-semibold">{category.name}</h2>
                  </div>

                  <div className="p-4">
                    {category.tests.map((test) => (
                      <div
                        key={test.id}
                        className="mb-4 pb-4 last:mb-0 last:pb-0 border-b last:border-b-0 border-gray-800"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-white font-medium mb-1">{test.title}</h3>
                            <div className="flex items-center text-sm text-gray-400 mb-2">
                              <Clock size={12} className="mr-1" />
                              <span>{test.duration} min</span>
                              <span className="mx-2">•</span>
                              <span>{test.questions} questions</span>
                              <span className="mx-2">•</span>
                              <span
                                className={
                                  test.difficulty === 'Easy'
                                    ? 'text-green-400'
                                    : test.difficulty === 'Medium'
                                    ? 'text-yellow-400'
                                    : 'text-red-400'
                                }
                              >
                                {test.difficulty}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleStartTest(test)}
                            className="bg-blue-700 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded flex items-center transition-colors"
                          >
                            Start <ChevronRight size={14} className="ml-1" />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {test.topics.map((topic) => (
                            <span
                              key={topic}
                              className="text-xs bg-blue-900/40 text-blue-300 px-1.5 py-0.5 rounded-full"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        <div className="flex text-xs text-gray-400 justify-between">
                          <span>{test.completions.toLocaleString()} completions</span>
                          <span>Avg. score: {test.averageScore}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'instructions' && selectedTest && (
          <motion.div
            key="instructions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-[calc(100vh-120px)]"
          >
            {/* Header */}
            <div className="bg-[#121212] shadow-md p-4 mb-6 rounded-lg">
              <h1 className="text-xl font-bold text-white flex items-center">
                <FileText size={20} className="text-blue-400 mr-2" />
                {selectedTest.title} - Instructions
              </h1>
            </div>

            {/* Instructions */}
            <div className="bg-[#121212] rounded-lg p-6 max-w-3xl mx-auto w-full">
              <div className="bg-gradient-to-r from-blue-900/20 to-blue-700/20 p-4 rounded-lg mb-6 border border-blue-900/30">
                <h2 className="text-xl font-bold text-white mb-3">{selectedTest.title}</h2>
                <p className="text-gray-300 mb-4">
                  This mock test will help you prepare for real-world technical interviews.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-black/20 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-white font-semibold flex items-center">
                      <Clock size={16} className="mr-2 text-blue-400" />
                      {selectedTest.duration} minutes
                    </p>
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Questions</p>
                    <p className="text-white font-semibold">{selectedTest.questions}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {selectedTest.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-white font-semibold mb-2">Instructions:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <div className="text-blue-400 mr-2">•</div>
                    <p>Read each question carefully before answering.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-blue-400 mr-2">•</div>
                    <p>Select the best answer from the given options.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-blue-400 mr-2">•</div>
                    <p>You can review and change answers before submitting the test.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-blue-400 mr-2">•</div>
                    <p>Your score and detailed feedback will be provided after completion.</p>
                  </li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('browse')}
                  className="px-4 py-2 border border-gray-700 hover:border-gray-600 rounded-lg text-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleBeginTest}
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex-1"
                >
                  Begin Test
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'test' && selectedTest && (
          <motion.div
            key="test"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-[calc(100vh-120px)]"
          >
            {/* Header */}
            <div className="bg-[#121212] shadow-md p-4 mb-6 rounded-lg flex justify-between items-center">
              <h1 className="text-lg font-bold text-white flex items-center">
                <FileText size={18} className="text-blue-400 mr-2" />
                {selectedTest.title}
              </h1>
              <div className="text-gray-300 flex items-center">
                <Clock size={14} className="mr-1" />
                <span className="text-sm font-medium">60:00</span>
              </div>
            </div>

            {/* Test content */}
            <div className="bg-[#121212] rounded-lg p-6 flex-grow flex flex-col">
              <div className="mb-4 flex justify-between items-center">
                <span className="text-blue-400 text-sm font-medium">
                  Question {currentQuestion + 1} of {getMockQuestions().length}
                </span>
                <span className="text-gray-400 text-sm">
                  Topic: {selectedTest.topics[currentQuestion % selectedTest.topics.length]}
                </span>
              </div>

              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white text-lg font-medium mb-6">
                      {getMockQuestions()[currentQuestion].text}
                    </h3>

                    <div className="space-y-3 mb-8">
                      {getMockQuestions()[currentQuestion].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(currentQuestion, idx)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            selectedAnswers[currentQuestion] === idx
                              ? 'bg-blue-900/30 border-blue-500 text-white'
                              : 'bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                                selectedAnswers[currentQuestion] === idx
                                  ? 'border-blue-500 bg-blue-900/50'
                                  : 'border-gray-600'
                              }`}
                            >
                              {selectedAnswers[currentQuestion] === idx && (
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                              )}
                            </div>
                            {option}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-auto border-t border-gray-800 pt-4 flex justify-between">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    currentQuestion === 0
                      ? 'text-gray-600 cursor-not-allowed'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <ArrowLeft size={16} className="mr-2" /> Previous
                </button>

                {currentQuestion < getMockQuestions().length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg flex items-center"
                  >
                    Next <ArrowRight size={16} className="ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg flex items-center"
                  >
                    Submit Test <Check size={16} className="ml-2" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'results' && selectedTest && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-[calc(100vh-120px)]"
          >
            {/* Header */}
            <div className="bg-[#121212] shadow-md p-4 mb-6 rounded-lg flex justify-between items-center">
              <h1 className="text-xl font-bold text-white flex items-center">
                <Award size={20} className="text-blue-400 mr-2" />
                Test Results: {selectedTest.title}
              </h1>
            </div>

            {/* Results content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Score card */}
              <div className="lg:col-span-1">
                <div className="bg-[#121212] rounded-lg overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-blue-900/40 to-blue-700/40 p-3 border-b border-blue-900/50">
                    <h2 className="text-white font-semibold">Your Score</h2>
                  </div>
                  
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative mb-6">
                      <svg className="w-48 h-48">
                        <circle 
                          className="text-gray-800" 
                          strokeWidth="10" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="70" 
                          cx="96" 
                          cy="96"
                        />
                        <circle 
                          className="text-blue-500" 
                          strokeWidth="10" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="70" 
                          cx="96" 
                          cy="96"
                          strokeDasharray="439.6"
                          strokeDashoffset={439.6 - (439.6 * calculateScore().percentage / 100)}
                          strokeLinecap="round"
                          transform="rotate(-90 96 96)"
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <p className="text-4xl font-bold text-white">{calculateScore().percentage}%</p>
                        <p className="text-gray-400 text-sm">Score</p>
                      </div>
                    </div>
                    
                    <div className="text-center mb-6">
                      <p className="text-gray-300 mb-1">
                        {calculateScore().correct} of {calculateScore().total} questions correct
                      </p>
                      <p className="text-gray-400 text-sm">
                        Time spent: {formatTime(timeSpent)}
                      </p>
                    </div>
                    
                    <div className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-4 text-gray-300 text-sm">
                      <p>{getScoreFeedback(calculateScore().percentage)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Question review */}
              <div className="lg:col-span-2">
                <div className="bg-[#121212] rounded-lg overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-blue-900/40 to-blue-700/40 p-3 border-b border-blue-900/50 flex justify-between items-center">
                    <h2 className="text-white font-semibold">Question Review</h2>
                    <span className="text-xs text-gray-300">{calculateScore().correct} of {calculateScore().total} correct</span>
                  </div>
                  
                  <div className="p-4 overflow-y-auto max-h-[calc(100vh-350px)]">
                    <div className="space-y-6">
                      {getMockQuestions().map((question, qIndex) => {
                        const isCorrect = selectedAnswers[qIndex] === question.correctIndex;
                        return (
                          <div key={qIndex} className="border border-gray-800 rounded-lg overflow-hidden">
                            <div className={`p-3 flex justify-between items-start ${
                              isCorrect ? 'bg-green-900/20' : 'bg-red-900/20'
                            }`}>
                              <div className="flex-grow">
                                <span className="text-gray-400 text-xs">Question {qIndex + 1}</span>
                                <p className="text-white font-medium">{question.text}</p>
                              </div>
                              <div className={`ml-3 p-1.5 rounded-full ${
                                isCorrect ? 'bg-green-900/40' : 'bg-red-900/40'
                              }`}>
                                {isCorrect ? (
                                  <Check size={16} className="text-green-400" />
                                ) : (
                                  <X size={16} className="text-red-400" />
                                )}
                              </div>
                            </div>
                            
                            <div className="bg-gray-900/30 p-3">
                              <div className="mb-3">
                                <p className="text-xs text-gray-400 mb-1">Your answer:</p>
                                <p className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                  {selectedAnswers[qIndex] !== undefined ? question.options[selectedAnswers[qIndex]] : "No answer provided"}
                                </p>
                              </div>
                              
                              {!isCorrect && (
                                <div className="mb-3">
                                  <p className="text-xs text-gray-400 mb-1">Correct answer:</p>
                                  <p className="text-sm text-green-400">{question.options[question.correctIndex]}</p>
                                </div>
                              )}
                              
                              {question.explanation && (
                                <div>
                                  <p className="text-xs text-gray-400 mb-1">Explanation:</p>
                                  <p className="text-sm text-gray-300">{question.explanation}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="bg-[#121212] rounded-lg p-4 flex flex-wrap gap-4 justify-center md:justify-between">
              <div className="flex space-x-3">
                <button
                  onClick={handleReturnToBrowse}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center"
                >
                  <ArrowLeftCircle size={16} className="mr-2" /> Back to Tests
                </button>
                <button
                  onClick={handleTryAgain}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg flex items-center"
                >
                  Try Again
                </button>
              </div>
              
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center">
                  <BookOpen size={16} className="mr-2" /> Study Resources
                </button>
                <button className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg flex items-center">
                  Share Results
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default FreeMockTest;