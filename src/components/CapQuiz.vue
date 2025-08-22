<template>
  <div class="cap-quiz">
    <div v-if="!quizCompleted" class="quiz-container">
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <span class="text-sm font-medium text-gray-500">
            {{ t('quiz.question') }} {{ currentQuestion + 1 }} {{ t('quiz.of') }} {{ questions.length }}
          </span>
          <div class="w-32 bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }"
            ></div>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          {{ questions[currentQuestion].question }}
        </h3>
      </div>

      <div class="space-y-3 mb-6">
        <button
          v-for="(option, index) in questions[currentQuestion].options"
          :key="index"
          @click="selectAnswer(index)"
          class="w-full p-4 text-left border-2 rounded-lg transition-all duration-200"
          :class="getOptionClass(index)"
          :disabled="answerSelected"
        >
          <span class="font-medium">{{ String.fromCharCode(65 + index) }}.</span>
          {{ option.text }}
        </button>
      </div>

      <div v-if="answerSelected" class="mb-6 p-4 rounded-lg" :class="feedbackClass">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <svg v-if="isCorrect" class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <p class="font-medium mb-2">
              {{ isCorrect ? t('quiz.correct') : t('quiz.incorrect') }}
            </p>
            <p class="text-sm">{{ questions[currentQuestion].explanation }}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <button
          @click="previousQuestion"
          :disabled="currentQuestion === 0"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {{ t('quiz.previous') }}
        </button>
        
        <button
          v-if="currentQuestion < questions.length - 1"
          @click="nextQuestion"
          :disabled="!answerSelected"
          class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200"
        >
          {{ t('quiz.next') }}
        </button>
        
        <button
          v-else
          @click="completeQuiz"
          :disabled="!answerSelected"
          class="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200"
        >
          {{ t('quiz.complete') }}
        </button>
      </div>
    </div>

    <!-- Quiz Results -->
    <div v-else class="quiz-results text-center">
      <div class="mb-6">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" :class="scoreColorClass">
          <span class="text-2xl font-bold text-white">{{ score }}%</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ t('quiz.quizComplete') }}</h3>
        <p class="text-gray-600">{{ t('quiz.youScored') }} {{ correctAnswers }} {{ t('quiz.outOf') }} {{ questions.length }} {{ t('quiz.questionsCorrectly') }}.</p>
      </div>

      <div class="mb-6 p-4 rounded-lg bg-gray-50">
        <h4 class="font-semibold text-gray-800 mb-2">{{ getScoreMessage() }}</h4>
        <p class="text-sm text-gray-600">{{ getScoreDescription() }}</p>
      </div>

      <button
        @click="resetQuiz"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
      >
        {{ t('quiz.takeAgain') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

interface QuizOption {
  text: string
  isCorrect: boolean
}

interface QuizQuestion {
  question: string
  options: QuizOption[]
  explanation: string
}

const currentQuestion = ref(0)
const selectedAnswer = ref<number | null>(null)
const answerSelected = ref(false)
const userAnswers = ref<number[]>([])
const quizCompleted = ref(false)

// English questions
const englishQuestions: QuizQuestion[] = [
  {
    question: "According to the CAP theorem, what is the maximum number of properties a distributed system can guarantee simultaneously?",
    options: [
      { text: "One property", isCorrect: false },
      { text: "Two properties", isCorrect: true },
      { text: "Three properties", isCorrect: false },
      { text: "It depends on the system", isCorrect: false }
    ],
    explanation: "The CAP theorem states that a distributed system can guarantee at most two of the three properties (Consistency, Availability, Partition tolerance) simultaneously."
  },
  {
    question: "Which database type is typically classified as an AP (Availability + Partition tolerance) system?",
    options: [
      { text: "MySQL", isCorrect: false },
      { text: "PostgreSQL", isCorrect: false },
      { text: "Cassandra", isCorrect: true },
      { text: "Redis (single-node)", isCorrect: false }
    ],
    explanation: "Cassandra is designed as an AP system, prioritizing availability and partition tolerance while providing eventual consistency."
  },
  {
    question: "What does 'Consistency' mean in the context of the CAP theorem?",
    options: [
      { text: "The system is always available", isCorrect: false },
      { text: "Every read receives the most recent write or an error", isCorrect: true },
      { text: "The system can handle network failures", isCorrect: false },
      { text: "Data is stored reliably", isCorrect: false }
    ],
    explanation: "Consistency in CAP theorem means that every read operation receives the most recent write or an error, ensuring all nodes see the same data at the same time."
  },
  {
    question: "In a CP (Consistency + Partition tolerance) system during a network partition, what typically happens?",
    options: [
      { text: "All nodes remain available with stale data", isCorrect: false },
      { text: "Some nodes become unavailable to maintain consistency", isCorrect: true },
      { text: "The system crashes completely", isCorrect: false },
      { text: "Data is automatically replicated", isCorrect: false }
    ],
    explanation: "CP systems prioritize consistency, so during a partition, nodes that cannot guarantee up-to-date data become unavailable rather than serve potentially stale information."
  },
  {
    question: "Which scenario best describes when you would choose an AP system over a CP system?",
    options: [
      { text: "Banking transactions requiring exact balances", isCorrect: false },
      { text: "Social media feeds where some delay is acceptable", isCorrect: true },
      { text: "Inventory management for e-commerce", isCorrect: false },
      { text: "Financial audit logs", isCorrect: false }
    ],
    explanation: "AP systems are ideal for use cases like social media feeds where high availability is more important than immediate consistency, and users can tolerate seeing slightly outdated information."
  }
]

// Ukrainian questions
const ukrainianQuestions: QuizQuestion[] = [
  {
    question: "Згідно з теоремою CAP, яка максимальна кількість властивостей, які розподілена система може гарантувати одночасно?",
    options: [
      { text: "Одну властивість", isCorrect: false },
      { text: "Дві властивості", isCorrect: true },
      { text: "Три властивості", isCorrect: false },
      { text: "Залежить від системи", isCorrect: false }
    ],
    explanation: "Теорема CAP стверджує, що розподілена система може гарантувати максимум дві з трьох властивостей (Узгодженість, Доступність, Толерантність до розділення) одночасно."
  },
  {
    question: "Який тип бази даних зазвичай класифікується як AP (Доступність + Толерантність до розділення) система?",
    options: [
      { text: "MySQL", isCorrect: false },
      { text: "PostgreSQL", isCorrect: false },
      { text: "Cassandra", isCorrect: true },
      { text: "Redis (односерверний)", isCorrect: false }
    ],
    explanation: "Cassandra розроблена як AP система, яка надає пріоритет доступності та толерантності до розділення, забезпечуючи врешті-решт узгодженість."
  },
  {
    question: "Що означає \"Узгодженість\" у контексті теореми CAP?",
    options: [
      { text: "Система завжди доступна", isCorrect: false },
      { text: "Кожне читання отримує найновіший запис або помилку", isCorrect: true },
      { text: "Система може обробляти збої мережі", isCorrect: false },
      { text: "Дані зберігаються надійно", isCorrect: false }
    ],
    explanation: "Узгодженість у теоремі CAP означає, що кожна операція читання отримує найновіший запис або помилку, забезпечуючи, що всі вузли бачать однакові дані в один і той самий час."
  },
  {
    question: "У CP (Узгодженість + Толерантність до розділення) системі під час розділення мережі, що зазвичай відбувається?",
    options: [
      { text: "Всі вузли залишаються доступними із застарілими даними", isCorrect: false },
      { text: "Деякі вузли стають недоступними для збереження узгодженості", isCorrect: true },
      { text: "Система повністю припиняє роботу", isCorrect: false },
      { text: "Дані автоматично реплікуються", isCorrect: false }
    ],
    explanation: "CP системи надають пріоритет узгодженості, тому під час розділення вузли, які не можуть гарантувати актуальні дані, стають недоступними замість того, щоб обслуговувати потенційно застарілу інформацію."
  },
  {
    question: "Який сценарій найкраще описує, коли ви вибрали б AP систему замість CP системи?",
    options: [
      { text: "Банківські транзакції, які потребують точних балансів", isCorrect: false },
      { text: "Стрічки соціальних мереж, де певна затримка прийнятна", isCorrect: true },
      { text: "Управління інвентарем для електронної комерції", isCorrect: false },
      { text: "Фінансові журнали аудиту", isCorrect: false }
    ],
    explanation: "AP системи ідеальні для випадків використання, як стрічки соціальних мереж, де висока доступність важливіша за миттєву узгодженість, і користувачі можуть терпіти перегляд слабо застарілої інформації."
  }
]

// Dynamic questions based on current locale
const questions = computed(() => {
  return locale.value === 'uk' ? ukrainianQuestions : englishQuestions
})

const correctAnswers = computed(() => {
  return userAnswers.value.reduce((count, answer, index) => {
    return questions.value[index].options[answer]?.isCorrect ? count + 1 : count
  }, 0)
})

const score = computed(() => {
  return Math.round((correctAnswers.value / questions.value.length) * 100)
})

const isCorrect = computed(() => {
  if (selectedAnswer.value === null) return false
  return questions.value[currentQuestion.value].options[selectedAnswer.value].isCorrect
})

const feedbackClass = computed(() => {
  return isCorrect.value 
    ? 'bg-green-50 border border-green-200' 
    : 'bg-red-50 border border-red-200'
})

const scoreColorClass = computed(() => {
  if (score.value >= 80) return 'bg-green-500'
  if (score.value >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
})

const selectAnswer = (index: number) => {
  if (answerSelected.value) return
  
  selectedAnswer.value = index
  answerSelected.value = true
  userAnswers.value[currentQuestion.value] = index
}

const getOptionClass = (index: number) => {
  if (!answerSelected.value) {
    return 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
  }
  
  const isSelectedOption = selectedAnswer.value === index
  const isCorrectOption = questions.value[currentQuestion.value].options[index].isCorrect
  
  if (isCorrectOption) {
    return 'border-green-500 bg-green-50 text-green-800'
  } else if (isSelectedOption && !isCorrectOption) {
    return 'border-red-500 bg-red-50 text-red-800'
  } else {
    return 'border-gray-200 bg-gray-50 text-gray-500'
  }
}

const nextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
    selectedAnswer.value = userAnswers.value[currentQuestion.value] ?? null
    answerSelected.value = selectedAnswer.value !== null
  }
}

const previousQuestion = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
    selectedAnswer.value = userAnswers.value[currentQuestion.value] ?? null
    answerSelected.value = selectedAnswer.value !== null
  }
}

const completeQuiz = () => {
  quizCompleted.value = true
}

const resetQuiz = () => {
  currentQuestion.value = 0
  selectedAnswer.value = null
  answerSelected.value = false
  userAnswers.value = []
  quizCompleted.value = false
}

const getScoreMessage = () => {
  if (score.value >= 80) return t('quiz.scoreMessages.excellent')
  if (score.value >= 60) return t('quiz.scoreMessages.good')
  if (score.value >= 40) return t('quiz.scoreMessages.notBad')
  return t('quiz.scoreMessages.keepLearning')
}

const getScoreDescription = () => {
  if (score.value >= 80) return t('quiz.scoreDescriptions.excellent')
  if (score.value >= 60) return t('quiz.scoreDescriptions.good')
  if (score.value >= 40) return t('quiz.scoreDescriptions.notBad')
  return t('quiz.scoreDescriptions.keepLearning')
}
</script>

<style scoped>
.quiz-container {
  max-width: 600px;
  margin: 0 auto;
}

.quiz-results {
  max-width: 400px;
  margin: 0 auto;
}
</style>