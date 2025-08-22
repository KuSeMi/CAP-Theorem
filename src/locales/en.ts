export default {
  nav: {
    title: 'CAP Theorem Explanation',
    introduction: 'Introduction',
    capDiagram: 'CAP Diagram',
    simulation: 'Simulation',
    databases: 'Databases',
    conclusion: 'Conclusion'
  },
  intro: {
    title: 'Understanding the CAP Theorem',
    subtitle: 'A Visual Guide to Distributed Systems',
    description: 'The CAP theorem states that any distributed system can guarantee at most two of the following three properties simultaneously:',
    getStarted: 'Get Started'
  },
  home: {
    threeProperties: 'The Three Properties',
    understandingConcepts: 'Understanding the core concepts of the CAP Theorem',
    interactiveLearning: 'Interactive Learning Experience',
    exploreDescription: 'Explore the CAP theorem through visual simulations and real-world examples',
    consistencyTitle: 'Consistency',
    consistencyShort: 'Every read receives the most recent write or an error',
    consistencyDetails: 'Detailed explanation:',
    consistencyLong: 'All nodes see the same data at the same time. When data is written to one node, it must be synchronized across all nodes before the write is considered successful.',
    availabilityTitle: 'Availability',
    availabilityShort: 'Every request receives a non-error response',
    availabilityDetails: 'Detailed explanation:',
    availabilityLong: 'The system remains operational and responsive to requests. Every request to a non-failing node must return a reasonable response within a reasonable time.',
    partitionTitle: 'Partition Tolerance',
    partitionShort: 'System continues despite network failures',
    partitionDetails: 'Detailed explanation:',
    partitionLong: 'The system continues to operate despite arbitrary message loss or failure of part of the system due to network partitions.',
    learnMore: 'Learn More',
    features: {
      interactiveDiagrams: {
        title: 'Interactive Diagrams',
        description: 'Visual CAP triangle with clickable properties'
      },
      liveSimulations: {
        title: 'Live Simulations',
        description: 'Drag-and-drop distributed system modeling'
      },
      databaseExamples: {
        title: 'Database Examples',
        description: 'Real-world SQL and NoSQL comparisons'
      },
      quickReference: {
        title: 'Quick Reference',
        description: 'Key takeaways and guidance for system selection'
      }
    }
  },
  cap: {
    title: 'CAP Theorem Properties',
    subtitle: 'Click on any two properties to see the trade-offs',
    selectOne: 'Select one more property',
    selected: 'Selected: {properties}',
    canSelectTwo: 'You can only select two properties at once',
    resetSelection: 'Reset Selection',
    clickVertices: 'Click on vertices to select properties',
    consistency: {
      title: 'Consistency',
      description: 'Every read receives the most recent write or an error',
      detail: 'All nodes see the same data at the same time. When data is written to one node, it must be synchronized across all nodes before the write is considered successful.'
    },
    availability: {
      title: 'Availability',
      description: 'Every request receives a non-error response',
      detail: 'The system remains operational and responsive to requests. Every request to a non-failing node must return a reasonable response within a reasonable time.'
    },
    partition: {
      title: 'Partition Tolerance',
      description: 'System continues despite network failures',
      detail: 'The system continues to operate despite arbitrary message loss or failure of part of the system due to network partitions.'
    },
    selectTwo: 'Select exactly two properties to see the trade-offs',
    tradeOff: 'Trade-off: {missing} is compromised'
  },
  tradeoff: {
    title: 'Trade-off: {combination}',
    whatItMeans: 'What this means:',
    guaranteed: 'Guaranteed:',
    compromised: 'Compromised:',
    databaseExamples: 'Database Examples:',
    useCase: 'Use Case',
    systemBehavior: 'System Behavior',
    combinations: {
      'CA': 'Consistency + Availability (Without Partition Tolerance)',
      'CP': 'Consistency + Partition Tolerance (Without Availability)',
      'AP': 'Availability + Partition Tolerance (Without Consistency)'
    },
    guarantees: {
      'CA': 'Strong consistency and high availability in networks without partitions. All nodes see the same data and respond to requests.',
      'CP': 'Strong consistency even when network partitions occur. Data remains synchronized between available nodes.',
      'AP': 'High availability and partition tolerance. The system continues to serve requests even during network partitions.'
    },
    compromises: {
      'CA': 'When network partitions occur, the system must choose between consistency and availability, usually going offline.',
      'CP': 'Some nodes may become unavailable during partitions to preserve consistency, reducing overall system availability.',
      'AP': 'Data may become temporarily inconsistent between nodes, eventually achieving consistency over time.'
    },
    examples: {
      mysql: {
        description: 'Traditional RDBMS that prioritizes ACID properties and strong consistency, but may become unavailable during network issues.',
        useCase: 'Banking systems, financial transactions, e-commerce'
      },
      postgresql: {
        description: 'Advanced relational database with ACID compliance and strong consistency guarantees across all operations.',
        useCase: 'Enterprise applications, data analytics, complex queries'
      },
      mongodb: {
        description: 'Document database that maintains strong consistency by default, making some nodes read-only during partitions.',
        useCase: 'Content management, real-time analytics, modern web apps'
      },
      hbase: {
        description: 'Distributed database that ensures data consistency across regions but may sacrifice availability.',
        useCase: 'Big data processing, real-time read/write access, IoT'
      },
      cassandra: {
        description: 'Highly available distributed database that continues serving requests with eventual consistency.',
        useCase: 'IoT data, time-series data, messaging systems, social media'
      },
      dynamodb: {
        description: 'Managed NoSQL database that prioritizes availability and partition tolerance with tunable consistency.',
        useCase: 'Gaming leaderboards, shopping carts, session storage'
      }
    }
  },
  visualization: {
    networkPartition: 'Network Partition',
    clusterA: 'Cluster A',
    clusterB: 'Cluster B',
    partitionA: 'Partition A',
    partitionB: 'Partition B',
    availableConsistent: 'Available & Consistent',
    partiallyAvailable: 'Partially Available',
    availableStale: 'Available & Stale',
    unknown: 'Unknown',
    legend: 'Legend',
    activeConsistent: 'Active & Consistent',
    activeInconsistent: 'Active & Inconsistent',
    unavailable: 'Unavailable'
  },
  simulation: {
    title: 'Distributed System Simulation',
    subtitle: 'Explore how different systems handle network failures and CAP trade-offs',
    howToUse: 'How to Use This Simulation',
    step1Title: 'Choose System Type',
    step1Desc: 'Select CP, AP, or CA system to see different behaviors',
    step2Title: 'Create Network Partition',
    step2Desc: 'Click "Create Partition" to simulate network failure',
    step3Title: 'Observe Trade-offs',
    step3Desc: 'Watch how each system responds differently to failures',
    chooseSystem: 'Choose System Type',
    cpDescription: 'Prioritizes consistency over availability',
    apDescription: 'Prioritizes availability over consistency', 
    caDescription: 'Requires perfect network reliability',
    examples: 'Examples',
    simulateFailure: 'Simulate Network Failure',
    partitionExplanation: 'What is a Network Partition?',
    partitionDetail: 'A network partition occurs when nodes cannot communicate with each other, forcing the system to choose between consistency and availability.',
    instructions: 'Drag nodes apart to create partitions and observe how different systems handle the trade-offs',
    createPartition: 'Create Partition',
    healPartition: 'Heal Partition',
    reset: 'Reset Simulation',
    nodeStatus: 'Node {id} Status: {status}',
    partitioned: 'Partitioned',
    connected: 'Connected',
    currentSystem: 'Current System',
    behaviorDuringPartition: 'Behavior During Partition',
    tradeOffs: 'Trade-offs',
    whatYouLearn: 'What You Learn',
    learnPoint1: 'How different systems prioritize CAP properties',
    learnPoint2: 'Real-world implications of network failures',
    learnPoint3: 'Why no system can guarantee all three properties',
    quickTips: 'Quick Tips',
    tip1: 'Try all three system types to compare behaviors',
    tip2: 'Watch node colors change during partitions',
    tip3: 'Notice how data versions differ in AP systems',
    normalOperation: 'All nodes are connected and operating normally',
    dragInstruction: 'Try dragging nodes around! Click "Create Partition" to see system responses',
    dragTip1: 'Click and drag any numbered node to move it around',
    dragTip2: 'Moving nodes to different sides creates network partitions',
    dragTip3: 'Watch how different system types react to these changes',
    cpPartitionBehavior: 'CP System: Some nodes become unavailable to maintain consistency',
    apPartitionBehavior: 'AP System: All nodes stay available but data may become inconsistent',
    caPartitionBehavior: 'CA System: System cannot tolerate partitions - nodes go offline',
    cpSystemBehavior: 'Maintains strong consistency by making some nodes unavailable during partitions. Only nodes with majority can serve requests.',
    apSystemBehavior: 'Remains fully available but allows temporary inconsistency. All nodes continue serving requests with eventual consistency.',
    caSystemBehavior: 'Requires no network partitions to function. System may become unavailable if network splits occur.',
    cpTradeoff1: 'Reduced availability during network partitions',
    cpTradeoff2: 'Strong consistency guarantees',
    cpTradeoff3: 'May reject requests to maintain data integrity',
    apTradeoff1: 'Temporary data inconsistency across nodes',
    apTradeoff2: 'High availability even during failures',
    apTradeoff3: 'Eventual consistency over time',
    caTradeoff1: 'No tolerance for network partitions',
    caTradeoff2: 'Strong consistency and availability',
    caTradeoff3: 'Single point of failure potential',
    nodeUnavailable: 'Unavailable',
    nodeConsistent: 'Consistent',
    nodeStale: 'Stale',
    nodeCurrent: 'Current',
    nodeOffline: 'Offline',
    nodeAvailable: 'Available',
    nodeUnknown: 'Unknown'
  },
  databases: {
    title: 'Database Examples',
    subtitle: 'How different databases handle CAP trade-offs',
    selectDatabase: 'Select a database to see its CAP characteristics',
    capCharacteristics: 'CAP Characteristics',
    databaseLabel: 'Database',
    systemLabel: 'System',
    description: 'Description',
    capProperties: 'CAP Properties',
    primaryUseCase: 'Primary Use Case',
    useCase: 'Use Case',
    keyFeatures: 'Key Features',
    exampleApplications: 'Example Applications',
    capTradeoffSummary: 'CAP Trade-off Summary',
    levels: {
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    },
    descriptions: {
      consistency: {
        strong: 'All reads receive the most recent write',
        eventual: 'Consistency achieved over time',
        configurable: 'Consistency level can be adjusted'
      },
      availability: {
        high: 'System remains operational most of the time',
        medium: 'Some downtime acceptable during failures',
        low: 'May have extended downtime during issues'
      },
      partitionTolerance: {
        high: 'Continues operation despite network failures',
        medium: 'Limited operation during network issues',
        low: 'Requires reliable network connectivity'
      }
    },
    tradeoffs: {
      ca: {
        title: 'Consistency + Availability (No Partition Tolerance)',
        description: 'Prioritizes strong consistency and availability but may fail during network partitions.'
      },
      cp: {
        title: 'Consistency + Partition Tolerance (Limited Availability)',
        description: 'Maintains data consistency even during network partitions, but may sacrifice availability.'
      },
      ap: {
        title: 'Availability + Partition Tolerance (Eventual Consistency)',
        description: 'Remains available during network partitions but may have temporary data inconsistencies.'
      }
    },
    sql: {
      title: 'SQL Databases',
      description: 'Traditional relational databases prioritizing consistency',
      mysql: {
        name: 'MySQL',
        description: 'Strong consistency with ACID compliance, may sacrifice availability during partitions',
        cap: 'CP (Consistency + Partition Tolerance)',
        useCase: 'Banking systems, e-commerce transactions'
      },
      postgresql: {
        name: 'PostgreSQL',
        description: 'ACID-compliant with strong consistency guarantees',
        cap: 'CP (Consistency + Partition Tolerance)',
        useCase: 'Complex applications requiring data integrity'
      }
    },
    nosql: {
      title: 'NoSQL Databases',
      description: 'Flexible databases with different CAP trade-offs',
      mongodb: {
        name: 'MongoDB',
        description: 'Configurable consistency levels, defaults to strong consistency',
        cap: 'CP (Consistency + Partition Tolerance)',
        useCase: 'Content management, real-time analytics'
      },
      cassandra: {
        name: 'Cassandra',
        description: 'Eventually consistent, highly available distributed system',
        cap: 'AP (Availability + Partition Tolerance)',
        useCase: 'IoT data, time-series data, messaging'
      },
      redis: {
        name: 'Redis',
        description: 'In-memory store, can be CA in single-node setup',
        cap: 'CA (Consistency + Availability) or CP with clustering',
        useCase: 'Caching, session storage, real-time applications'
      }
    },
    comparison: {
      title: 'SQL vs NoSQL Comparison',
      sqlTitle: 'Relational Databases',
      sqlSubtitle: 'Structured, consistent, reliable',
      nosqlTitle: 'Non-Relational Databases',
      nosqlSubtitle: 'Flexible, scalable, diverse',
      strengths: 'Key Strengths',
      limitations: 'Limitations',
      bestFor: 'Best suited for',
      decisionGuide: 'How to Choose?',
      chooseSql: 'Choose SQL When',
      chooseSqlWhen: 'You need strong consistency, complex relationships, and ACID transactions',
      chooseNoSql: 'Choose NoSQL When',
      chooseNoSqlWhen: 'You need high scalability, flexibility, and can accept eventual consistency',
      sql: {
        strength1: 'ACID compliance ensures data integrity',
        strength2: 'Mature ecosystem with extensive tooling',
        strength3: 'Complex queries with JOINs and relationships',
        strength4: 'Strong consistency across all operations',
        limitation1: 'Limited horizontal scalability',
        limitation2: 'Rigid schema requires planning',
        limitation3: 'May sacrifice availability during network partitions',
        bestFor: 'Banking, finance, e-commerce, enterprise applications with complex relationships'
      },
      nosql: {
        strength1: 'Excellent horizontal scalability',
        strength2: 'Flexible schema adapts to changing needs',
        strength3: 'High performance for simple operations',
        strength4: 'Better availability during network failures',
        limitation1: 'Limited complex query capabilities',
        limitation2: 'Eventual consistency can cause temporary inconsistencies',
        limitation3: 'Less mature tooling and standards',
        bestFor: 'Big data, real-time applications, content management, IoT, social networks'
      }
    }
  },
  conclusion: {
    title: 'Key Takeaways',
    subtitle: 'Understanding the trade-offs in distributed systems',
    keyTakeaways: 'Key Takeaways',
    keyTakeawaysDescription: 'The most important principles and rules to remember about the CAP theorem',
    quickReference: 'CAP Quick Reference',
    choosingSystem: 'Choosing the Right System',
    testUnderstanding: 'Test Your Understanding',
    continuelearning: 'Continue Learning',
    readyToDive: 'Ready to dive deeper into distributed systems?',
    reviewCapDiagram: 'Review CAP Diagram',
    trySimulationAgain: 'Try Simulation Again',
    exploreDatabases: 'Explore Databases',
    useCase: 'Use Case',
    priority: 'Priority',
    recommendedType: 'Recommended Type',
    examples: 'Examples',
    useCases: {
      financialTransactions: 'Financial Transactions',
      socialMediaFeed: 'Social Media Feed',
      realtimeAnalytics: 'Real-time Analytics',
      iotDataCollection: 'IoT Data Collection',
      ecommerceCatalog: 'E-commerce Catalog'
    },
    priorities: {
      strongConsistency: 'Strong Consistency',
      highAvailability: 'High Availability',
      performance: 'Performance',
      scaleAvailability: 'Scale & Availability',
      consistencyQueries: 'Consistency & Queries'
    },
    systemTypes: {
      ca: {
        title: 'CA Systems',
        subtitle: 'Consistency + Availability',
        features: [
          'Traditional RDBMS',
          'Single-node databases',
          'ACID compliance',
          'No partition tolerance'
        ]
      },
      cp: {
        title: 'CP Systems',
        subtitle: 'Consistency + Partition Tolerance',
        features: [
          'MongoDB',
          'HBase',
          'Redis Cluster',
          'May sacrifice availability'
        ]
      },
      ap: {
        title: 'AP Systems',
        subtitle: 'Availability + Partition Tolerance',
        features: [
          'Cassandra',
          'DynamoDB',
          'CouchDB',
          'Eventual consistency'
        ]
      }
    },
    points: [
      'No distributed system can guarantee all three CAP properties simultaneously',
      'Choose two properties based on your application requirements',
      'SQL databases typically favor consistency over availability',
      'NoSQL databases often prioritize availability and partition tolerance',
      'The choice depends on your specific use case and requirements'
    ],
    learnMore: 'Learn More',
    resources: 'Additional Resources'
  },
  quiz: {
    question: 'Question',
    of: 'of',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    previous: '← Previous',
    next: 'Next →',
    complete: 'Complete Quiz',
    quizComplete: 'Quiz Complete!',
    youScored: 'You scored',
    outOf: 'out of',
    questionsCorrectly: 'questions correctly',
    takeAgain: 'Take Quiz Again',
    scoreMessages: {
      excellent: 'Excellent!',
      good: 'Good job!',
      notBad: 'Not bad!',
      keepLearning: 'Keep learning!'
    },
    scoreDescriptions: {
      excellent: 'You have a strong understanding of the CAP theorem and its implications.',
      good: 'You understand the basics well. Review the areas you missed to deepen your knowledge.',
      notBad: 'You have some understanding but might benefit from reviewing the concepts again.',
      keepLearning: 'Consider going through the material again to better understand the CAP theorem.'
    },
    questions: [
      {
        question: 'According to the CAP theorem, what is the maximum number of properties a distributed system can guarantee simultaneously?',
        options: ['One property', 'Two properties', 'Three properties', 'It depends on the system'],
        correctAnswer: 1,
        explanation: 'The CAP theorem states that a distributed system can guarantee at most two of the three properties (Consistency, Availability, Partition tolerance) simultaneously.'
      },
      {
        question: 'Which database type is typically classified as an AP (Availability + Partition tolerance) system?',
        options: ['MySQL', 'PostgreSQL', 'Cassandra', 'Redis (single-node)'],
        correctAnswer: 2,
        explanation: 'Cassandra is designed as an AP system, prioritizing availability and partition tolerance while providing eventual consistency.'
      },
      {
        question: 'What does "Consistency" mean in the context of the CAP theorem?',
        options: ['The system is always available', 'Every read receives the most recent write or an error', 'The system can handle network failures', 'Data is stored reliably'],
        correctAnswer: 1,
        explanation: 'Consistency in CAP theorem means that every read operation receives the most recent write or an error, ensuring all nodes see the same data at the same time.'
      },
      {
        question: 'In a CP (Consistency + Partition tolerance) system during a network partition, what typically happens?',
        options: ['All nodes remain available with stale data', 'Some nodes become unavailable to maintain consistency', 'The system crashes completely', 'Data is automatically replicated'],
        correctAnswer: 1,
        explanation: 'CP systems prioritize consistency, so during a partition, nodes that cannot guarantee up-to-date data become unavailable rather than serve potentially stale information.'
      },
      {
        question: 'Which scenario best describes when you would choose an AP system over a CP system?',
        options: ['Banking transactions requiring exact balances', 'Social media feeds where some delay is acceptable', 'Inventory management for e-commerce', 'Financial audit logs'],
        correctAnswer: 1,
        explanation: 'AP systems are ideal for use cases like social media feeds where high availability is more important than immediate consistency, and users can tolerate seeing slightly outdated information.'
      }
    ]
  },
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Try Again',
    close: 'Close',
    next: 'Next',
    previous: 'Previous',
    language: 'Language'
  }
}