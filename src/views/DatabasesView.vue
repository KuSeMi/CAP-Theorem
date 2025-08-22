<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ $t('databases.title') }}</h1>
        <p class="text-xl text-gray-600 mb-8">{{ $t('databases.subtitle') }}</p>
        <p class="text-lg text-gray-700">{{ $t('databases.selectDatabase') }}</p>
      </div>

      <!-- Database Categories -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- SQL Databases -->
        <div class="bg-white rounded-xl shadow-lg p-8 min-h-[600px]">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">{{ $t('databases.sql.title') }} ({{ sqlDatabases.length }})</h3>
              <p class="text-gray-600">{{ $t('databases.sql.description') }}</p>
            </div>
          </div>
          
          <div class="space-y-4 max-h-[500px] overflow-y-auto">
            <DatabaseCard
              v-for="db in sqlDatabases"
              :key="db.id"
              :database="db"
              :is-selected="selectedDatabase?.id === db.id"
              @select="selectDatabase"
            />
          </div>
        </div>

        <!-- NoSQL Databases -->
        <div class="bg-white rounded-xl shadow-lg p-8 min-h-[600px]">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">{{ $t('databases.nosql.title') }} ({{ nosqlDatabases.length }})</h3>
              <p class="text-gray-600">{{ $t('databases.nosql.description') }}</p>
            </div>
          </div>
          
          <div class="space-y-4 max-h-[500px] overflow-y-auto">
            <DatabaseCard
              v-for="db in nosqlDatabases"
              :key="db.id"
              :database="db"
              :is-selected="selectedDatabase?.id === db.id"
              @select="selectDatabase"
            />
          </div>
        </div>
      </div>

      <!-- Selected Database Details -->
      <div v-if="selectedDatabase" class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <DatabaseDetails :database="selectedDatabase" />
      </div>

      <!-- Interactive CAP Triangle for Selected Database -->
      <div v-if="selectedDatabase" class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
          {{ selectedDatabase.name }} - {{ $t('databases.capCharacteristics') }}
        </h3>
        
        <!-- CAP Properties Visual Display -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <!-- Consistency -->
          <div class="text-center p-6 rounded-lg border-2" :class="{
            'border-green-500 bg-green-50': selectedDatabase.consistency === 'strong',
            'border-yellow-500 bg-yellow-50': selectedDatabase.consistency === 'configurable',
            'border-red-500 bg-red-50': selectedDatabase.consistency === 'eventual'
          }">
            <div class="text-4xl mb-3">🎯</div>
            <h4 class="text-xl font-bold mb-2">{{ $t('cap.consistency.title') }}</h4>
            <div class="flex items-center justify-center space-x-2 mb-2">
              <div class="w-3 h-3 rounded-full" :class="{
                'bg-green-500': selectedDatabase.consistency === 'strong',
                'bg-yellow-500': selectedDatabase.consistency === 'configurable',
                'bg-red-500': selectedDatabase.consistency === 'eventual'
              }"></div>
              <span class="text-sm font-medium">{{ getConsistencyText(selectedDatabase.consistency) }}</span>
            </div>
            <p class="text-sm text-gray-600">{{ getConsistencyDescription(selectedDatabase.consistency) }}</p>
          </div>
          
          <!-- Availability -->
          <div class="text-center p-6 rounded-lg border-2" :class="{
            'border-green-500 bg-green-50': selectedDatabase.availability === 'high',
            'border-yellow-500 bg-yellow-50': selectedDatabase.availability === 'medium',
            'border-red-500 bg-red-50': selectedDatabase.availability === 'low'
          }">
            <div class="text-4xl mb-3">⚙️</div>
            <h4 class="text-xl font-bold mb-2">{{ $t('cap.availability.title') }}</h4>
            <div class="flex items-center justify-center space-x-2 mb-2">
              <div class="w-3 h-3 rounded-full" :class="{
                'bg-green-500': selectedDatabase.availability === 'high',
                'bg-yellow-500': selectedDatabase.availability === 'medium',
                'bg-red-500': selectedDatabase.availability === 'low'
              }"></div>
              <span class="text-sm font-medium">{{ getAvailabilityText(selectedDatabase.availability) }}</span>
            </div>
            <p class="text-sm text-gray-600">{{ getAvailabilityDescription(selectedDatabase.availability) }}</p>
          </div>
          
          <!-- Partition Tolerance -->
          <div class="text-center p-6 rounded-lg border-2" :class="{
            'border-green-500 bg-green-50': selectedDatabase.partitionTolerance === 'high',
            'border-yellow-500 bg-yellow-50': selectedDatabase.partitionTolerance === 'medium',
            'border-red-500 bg-red-50': selectedDatabase.partitionTolerance === 'low'
          }">
            <div class="text-4xl mb-3">🔗</div>
            <h4 class="text-xl font-bold mb-2">{{ $t('cap.partition.title') }}</h4>
            <div class="flex items-center justify-center space-x-2 mb-2">
              <div class="w-3 h-3 rounded-full" :class="{
                'bg-green-500': selectedDatabase.partitionTolerance === 'high',
                'bg-yellow-500': selectedDatabase.partitionTolerance === 'medium',
                'bg-red-500': selectedDatabase.partitionTolerance === 'low'
              }"></div>
              <span class="text-sm font-medium">{{ getPartitionToleranceText(selectedDatabase.partitionTolerance) }}</span>
            </div>
            <p class="text-sm text-gray-600">{{ getPartitionToleranceDescription(selectedDatabase.partitionTolerance) }}</p>
          </div>
        </div>
        
        <!-- CAP Type Badge -->
        <div class="text-center">
          <span class="inline-flex items-center px-6 py-3 rounded-full text-lg font-bold" :class="{
            'bg-blue-100 text-blue-800': selectedDatabase.capType === 'CA',
            'bg-green-100 text-green-800': selectedDatabase.capType === 'CP',
            'bg-yellow-100 text-yellow-800': selectedDatabase.capType === 'AP'
          }">
            {{ selectedDatabase.capType }} System
            <span class="ml-2 text-sm font-normal">
              ({{ getCapTypeDescription(selectedDatabase.capType) }})
            </span>
          </span>
        </div>
      </div>

      <!-- SQL vs NoSQL Comparison -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">{{ $t('databases.comparison.title') }}</h3>
        
        <!-- Visual Comparison Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- SQL Card -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                SQL
              </div>
              <div>
                <h4 class="text-xl font-bold text-blue-800">{{ $t('databases.comparison.sqlTitle') }}</h4>
                <p class="text-blue-600 text-sm">{{ $t('databases.comparison.sqlSubtitle') }}</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <h5 class="font-semibold text-green-700 mb-2">✔️ {{ $t('databases.comparison.strengths') }}</h5>
                <ul class="text-sm space-y-1 text-gray-700">
                  <li>• {{ $t('databases.comparison.sql.strength1') }}</li>
                  <li>• {{ $t('databases.comparison.sql.strength2') }}</li>
                  <li>• {{ $t('databases.comparison.sql.strength3') }}</li>
                  <li>• {{ $t('databases.comparison.sql.strength4') }}</li>
                </ul>
              </div>
              
              <div>
                <h5 class="font-semibold text-red-700 mb-2">⚠️ {{ $t('databases.comparison.limitations') }}</h5>
                <ul class="text-sm space-y-1 text-gray-700">
                  <li>• {{ $t('databases.comparison.sql.limitation1') }}</li>
                  <li>• {{ $t('databases.comparison.sql.limitation2') }}</li>
                  <li>• {{ $t('databases.comparison.sql.limitation3') }}</li>
                </ul>
              </div>
              
              <div class="bg-blue-200 rounded-lg p-3">
                <h5 class="font-semibold text-blue-800 text-sm mb-1">{{ $t('databases.comparison.bestFor') }}</h5>
                <p class="text-blue-700 text-xs">{{ $t('databases.comparison.sql.bestFor') }}</p>
              </div>
            </div>
          </div>
          
          <!-- NoSQL Card -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-16 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-bold px-1">
                NoSQL
              </div>
              <div class="flex-1">
                <h4 class="text-xl font-bold text-green-800">{{ $t('databases.comparison.nosqlTitle') }}</h4>
                <p class="text-green-600 text-sm">{{ $t('databases.comparison.nosqlSubtitle') }}</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <h5 class="font-semibold text-green-700 mb-2">✔️ {{ $t('databases.comparison.strengths') }}</h5>
                <ul class="text-sm space-y-1 text-gray-700">
                  <li>• {{ $t('databases.comparison.nosql.strength1') }}</li>
                  <li>• {{ $t('databases.comparison.nosql.strength2') }}</li>
                  <li>• {{ $t('databases.comparison.nosql.strength3') }}</li>
                  <li>• {{ $t('databases.comparison.nosql.strength4') }}</li>
                </ul>
              </div>
              
              <div>
                <h5 class="font-semibold text-red-700 mb-2">⚠️ {{ $t('databases.comparison.limitations') }}</h5>
                <ul class="text-sm space-y-1 text-gray-700">
                  <li>• {{ $t('databases.comparison.nosql.limitation1') }}</li>
                  <li>• {{ $t('databases.comparison.nosql.limitation2') }}</li>
                  <li>• {{ $t('databases.comparison.nosql.limitation3') }}</li>
                </ul>
              </div>
              
              <div class="bg-green-200 rounded-lg p-3">
                <h5 class="font-semibold text-green-800 text-sm mb-1">{{ $t('databases.comparison.bestFor') }}</h5>
                <p class="text-green-700 text-xs">{{ $t('databases.comparison.nosql.bestFor') }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Quick Decision Guide -->
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
          <h4 class="text-xl font-bold text-purple-800 mb-4 text-center">
            🤔 {{ $t('databases.comparison.decisionGuide') }}
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="text-center">
              <h5 class="font-semibold text-blue-700 mb-2">{{ $t('databases.comparison.chooseSql') }}</h5>
              <p class="text-sm text-gray-600">{{ $t('databases.comparison.chooseSqlWhen') }}</p>
            </div>
            <div class="text-center">
              <h5 class="font-semibold text-green-700 mb-2">{{ $t('databases.comparison.chooseNoSql') }}</h5>
              <p class="text-sm text-gray-600">{{ $t('databases.comparison.chooseNoSqlWhen') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import DatabaseCard from '../components/DatabaseCard.vue'
import DatabaseDetails from '../components/DatabaseDetails.vue'

const { t: $t } = useI18n()

interface Database {
  id: string
  name: string
  type: 'sql' | 'nosql'
  capType: 'CA' | 'CP' | 'AP'
  description: string
  logo: string
  useCase: string
  consistency: 'strong' | 'eventual' | 'configurable'
  availability: 'high' | 'medium' | 'low'
  partitionTolerance: 'high' | 'medium' | 'low'
  features: string[]
  examples: string[]
}

const selectedDatabase = ref<Database | null>(null)

const sqlDatabases: Database[] = [
  {
    id: 'mysql',
    name: 'MySQL',
    type: 'sql',
    capType: 'CP',
    description: 'Most popular open-source relational database with strong ACID compliance',
    logo: '🐬',
    useCase: 'Web applications, e-commerce, content management systems',
    consistency: 'strong',
    availability: 'medium',
    partitionTolerance: 'medium',
    features: ['ACID Compliance', 'SQL Queries', 'Transactions', 'Referential Integrity', 'Replication'],
    examples: ['WordPress', 'Facebook (historically)', 'YouTube', 'Twitter (parts)']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    type: 'sql',
    capType: 'CP',
    description: 'Advanced open-source database with extensive feature set and JSON support',
    logo: '🐘',
    useCase: 'Enterprise applications, data analytics, complex queries',
    consistency: 'strong',
    availability: 'medium',
    partitionTolerance: 'medium',
    features: ['Advanced SQL', 'JSON Support', 'Extensions', 'Full-text Search', 'Custom Functions'],
    examples: ['Instagram', 'Spotify', 'Reddit', 'Skype']
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    type: 'sql',
    capType: 'CA',
    description: 'Lightweight embedded database, perfect for mobile and desktop apps',
    logo: '📱',
    useCase: 'Mobile apps, desktop applications, embedded systems',
    consistency: 'strong',
    availability: 'high',
    partitionTolerance: 'low',
    features: ['Serverless', 'Zero Configuration', 'Self-contained', 'Cross-platform'],
    examples: ['Android Apps', 'iOS Apps', 'Firefox', 'Skype']
  },
  {
    id: 'oracle',
    name: 'Oracle Database',
    type: 'sql',
    capType: 'CP',
    description: 'Enterprise-grade database with advanced features and high performance',
    logo: '🔴',
    useCase: 'Large enterprises, mission-critical applications, data warehousing',
    consistency: 'strong',
    availability: 'medium',
    partitionTolerance: 'medium',
    features: ['Enterprise Features', 'High Availability', 'Advanced Security', 'Performance Tuning'],
    examples: ['Banks', 'Airlines', 'Telecommunications', 'Government']
  },
  {
    id: 'mssql',
    name: 'SQL Server',
    type: 'sql',
    capType: 'CP',
    description: 'Microsoft\'s enterprise database with excellent Windows integration',
    logo: '🪟',
    useCase: 'Microsoft ecosystem, enterprise applications, business intelligence',
    consistency: 'strong',
    availability: 'medium',
    partitionTolerance: 'medium',
    features: ['T-SQL', 'Integration Services', 'Reporting Services', 'Analysis Services'],
    examples: ['Stack Overflow', 'Dell', 'Xerox', 'Accenture']
  },
  {
    id: 'mariadb',
    name: 'MariaDB',
    type: 'sql',
    capType: 'CP',
    description: 'MySQL fork with enhanced features and better performance',
    logo: '🦭',
    useCase: 'Web applications, replacing MySQL, cloud deployments',
    consistency: 'strong',
    availability: 'medium',
    partitionTolerance: 'medium',
    features: ['MySQL Compatible', 'Enhanced Storage Engines', 'Better Performance', 'Advanced Features'],
    examples: ['Wikipedia', 'Google', 'Booking.com', 'ServiceNow']
  },
  {
    id: 'cockroachdb',
    name: 'CockroachDB',
    type: 'sql',
    capType: 'CP',
    description: 'Distributed SQL database designed for global consistency and resilience',
    logo: '🪳',
    useCase: 'Global applications, financial services, multi-region deployments',
    consistency: 'strong',
    availability: 'medium',
    partitionTolerance: 'high',
    features: ['Distributed SQL', 'Horizontal Scaling', 'Multi-region', 'ACID Transactions'],
    examples: ['Lush', 'Bose', 'Comcast', 'European Central Bank']
  }
]

const nosqlDatabases: Database[] = [
  {
    id: 'mongodb',
    name: 'MongoDB',
    type: 'nosql',
    capType: 'CP',
    description: 'Popular document database with flexible schema and powerful querying',
    logo: '🍃',
    useCase: 'Web applications, content management, real-time analytics',
    consistency: 'configurable',
    availability: 'high',
    partitionTolerance: 'high',
    features: ['Document Store', 'Flexible Schema', 'Horizontal Scaling', 'Aggregation Pipeline'],
    examples: ['MetLife', 'Bosch', 'Adobe', 'eBay']
  },
  {
    id: 'cassandra',
    name: 'Apache Cassandra',
    type: 'nosql',
    capType: 'AP',
    description: 'Distributed database designed for high availability and massive scalability',
    logo: '⚡',
    useCase: 'IoT data, time-series data, messaging systems, high-write workloads',
    consistency: 'eventual',
    availability: 'high',
    partitionTolerance: 'high',
    features: ['Linear Scalability', 'No Single Point of Failure', 'Multi-datacenter', 'Time-series Data'],
    examples: ['Netflix', 'Instagram', 'Uber', 'Spotify']
  },
  {
    id: 'redis',
    name: 'Redis',
    type: 'nosql',
    capType: 'CA',
    description: 'In-memory data structure store used as cache, message broker, and database',
    logo: '🔴',
    useCase: 'Caching, session storage, real-time analytics, message queues',
    consistency: 'strong',
    availability: 'high',
    partitionTolerance: 'low',
    features: ['In-memory Storage', 'Data Structures', 'Pub/Sub', 'Lua Scripting'],
    examples: ['GitHub', 'Weibo', 'Pinterest', 'Snapchat']
  },
  {
    id: 'dynamodb',
    name: 'Amazon DynamoDB',
    type: 'nosql',
    capType: 'AP',
    description: 'Fully managed NoSQL database service with seamless scalability',
    logo: '📊',
    useCase: 'Gaming, mobile apps, web applications, serverless architectures',
    consistency: 'eventual',
    availability: 'high',
    partitionTolerance: 'high',
    features: ['Serverless', 'Auto-scaling', 'Global Tables', 'DynamoDB Streams'],
    examples: ['Lyft', 'Airbnb', 'Samsung', 'Toyota']
  },
  {
    id: 'elasticsearch',
    name: 'Elasticsearch',
    type: 'nosql',
    capType: 'AP',
    description: 'Distributed search and analytics engine built on Apache Lucene',
    logo: '🔍',
    useCase: 'Full-text search, log analytics, application performance monitoring',
    consistency: 'eventual',
    availability: 'high',
    partitionTolerance: 'high',
    features: ['Full-text Search', 'Analytics', 'Real-time Data', 'Distributed Architecture'],
    examples: ['Wikipedia', 'Stack Overflow', 'GitHub', 'Netflix']
  },
  {
    id: 'couchdb',
    name: 'Apache CouchDB',
    type: 'nosql',
    capType: 'AP',
    description: 'Document-oriented database with multi-master replication',
    logo: '🛋️',
    useCase: 'Mobile applications, offline-first applications, content management',
    consistency: 'eventual',
    availability: 'high',
    partitionTolerance: 'high',
    features: ['Multi-master Replication', 'HTTP API', 'ACID Properties', 'Offline Support'],
    examples: ['NPM', 'BBC', 'Credit Suisse', 'Amadeus']
  },
  {
    id: 'neo4j',
    name: 'Neo4j',
    type: 'nosql',
    capType: 'CP',
    description: 'Graph database designed for connected data and complex relationships',
    logo: '🌐',
    useCase: 'Social networks, recommendation engines, fraud detection, network analysis',
    consistency: 'strong',
    availability: 'medium',
    partitionTolerance: 'medium',
    features: ['Graph Database', 'Cypher Query Language', 'ACID Transactions', 'Real-time Analytics'],
    examples: ['LinkedIn', 'Walmart', 'UBS', 'Airbnb']
  },
  {
    id: 'influxdb',
    name: 'InfluxDB',
    type: 'nosql',
    capType: 'AP',
    description: 'Time series database optimized for fast, high-availability storage',
    logo: '📈',
    useCase: 'IoT monitoring, system metrics, application analytics, real-time dashboards',
    consistency: 'eventual',
    availability: 'high',
    partitionTolerance: 'high',
    features: ['Time Series Optimized', 'SQL-like Query Language', 'High Write Performance', 'Data Retention'],
    examples: ['Tesla', 'Cisco', 'eBay', 'IBM']
  },
  {
    id: 'clickhouse',
    name: 'ClickHouse',
    type: 'nosql',
    capType: 'CP',
    description: 'Fast open-source column-oriented database for analytics and real-time queries',
    logo: '⚡',
    useCase: 'Real-time analytics, data warehousing, business intelligence, OLAP',
    consistency: 'strong',
    availability: 'medium',
    partitionTolerance: 'medium',
    features: ['Columnar Storage', 'Real-time Analytics', 'SQL Support', 'High Compression'],
    examples: ['Yandex', 'Cloudflare', 'Uber', 'eBay']
  },
  {
    id: 'scylladb',
    name: 'ScyllaDB',
    type: 'nosql',
    capType: 'AP',
    description: 'High-performance Cassandra-compatible database written in C++',
    logo: '🐙',
    useCase: 'High-throughput applications, gaming, IoT, real-time personalization',
    consistency: 'eventual',
    availability: 'high',
    partitionTolerance: 'high',
    features: ['Cassandra Compatible', 'C++ Performance', 'Low Latency', 'Auto-tuning'],
    examples: ['Discord', 'Samsung', 'Starbucks', 'Poki']
  },
  {
    id: 'faunadb',
    name: 'FaunaDB',
    type: 'nosql',
    capType: 'CP',
    description: 'Serverless, globally distributed database with ACID transactions',
    logo: '🦖',
    useCase: 'Serverless applications, JAMstack, global applications, real-time features',
    consistency: 'strong',
    availability: 'high',
    partitionTolerance: 'high',
    features: ['ACID Transactions', 'Serverless', 'Global Distribution', 'Multi-model'],
    examples: ['Shopify', 'Twitter', 'Gumroad', 'Netlify']
  }
]

const selectDatabase = (database: Database) => {
  selectedDatabase.value = database
  
  // Animate selection
  gsap.from('.database-details', {
    duration: 0.5,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  })
}

// Helper functions for CAP characteristics
const getConsistencyText = (level: string) => {
  const key = `databases.levels.${level === 'strong' ? 'high' : level === 'eventual' ? 'low' : 'medium'}`
  return $t(key)
}

const getConsistencyDescription = (level: string) => {
  const key = `databases.descriptions.consistency.${level}`
  return $t(key)
}

const getAvailabilityText = (level: string) => {
  const key = `databases.levels.${level}`
  return $t(key)
}

const getAvailabilityDescription = (level: string) => {
  const key = `databases.descriptions.availability.${level}`
  return $t(key)
}

const getPartitionToleranceText = (level: string) => {
  const key = `databases.levels.${level}`
  return $t(key)
}

const getPartitionToleranceDescription = (level: string) => {
  const key = `databases.descriptions.partitionTolerance.${level}`
  return $t(key)
}

const getCapTypeDescription = (capType: string) => {
  const keys = {
    'CA': 'databases.tradeoffs.ca.title',
    'CP': 'databases.tradeoffs.cp.title', 
    'AP': 'databases.tradeoffs.ap.title'
  }
  const key = keys[capType as keyof typeof keys]
  return key ? $t(key) : capType
}

onMounted(() => {
  // Initial animations
  gsap.from('.database-card', {
    duration: 0.6,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out'
  })
  
  // Select first database by default
  if (sqlDatabases.length > 0) {
    selectedDatabase.value = sqlDatabases[0]
  }
  
  // Debug: log the databases to console
  console.log('SQL Databases:', sqlDatabases.length)
  console.log('NoSQL Databases:', nosqlDatabases.length)
  console.log('All databases loaded successfully')
})
</script>