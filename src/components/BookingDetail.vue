<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
    <div class="max-w-4xl mx-auto">
      <SkeletonLoader v-if="loading" />
      <ErrorCard v-else-if="error" :error-message="error" />
      
      <div v-else-if="bookingStore.bookingDetails" class="space-y-6">
        <!-- Header Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 mb-2">Booking Details</h1>
              <p class="text-gray-600">View and manage your booking information</p>
            </div>
            <RouterLink 
              to="/" 
              class="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors shadow-sm"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back to Calendar
            </RouterLink>
          </div>
        </div>

        <!-- Booking Status Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Booking Status</h2>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Active
            </span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-amber-800">Start Date</span>
              </div>
              <p class="text-lg font-semibold text-amber-900 mt-1">
                {{ formatDate(bookingStore.bookingDetails.startDate) }}
              </p>
            </div>
            
            <div class="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-indigo-800">End Date</span>
              </div>
              <p class="text-lg font-semibold text-indigo-900 mt-1">
                {{ formatDate(bookingStore.bookingDetails.endDate) }}
              </p>
            </div>
            
            <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-slate-500 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-slate-800">Duration</span>
              </div>
              <p class="text-lg font-semibold text-slate-900 mt-1">
                {{ bookingDuration }} days
              </p>
            </div>
          </div>
        </div>

        <!-- Customer Information -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Customer Name</p>
                  <p class="text-lg font-medium text-gray-900">{{ bookingStore.bookingDetails.customerName }}</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Pickup/Return Station</p>
                  <p class="text-lg font-medium text-gray-900">{{ bookingStore.bookingDetails.stationName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Booking Timeline</h2>
          
          <div class="relative">
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div class="relative space-y-8">
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Booking Start</p>
                  <p class="text-sm text-gray-600">{{ formatDate(bookingStore.bookingDetails.startDate) }}</p>
                  <p class="text-xs text-gray-500 mt-1">Vehicle pickup at {{ bookingStore.bookingDetails.stationName }}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Booking End</p>
                  <p class="text-sm text-gray-600">{{ formatDate(bookingStore.bookingDetails.endDate) }}</p>
                  <p class="text-xs text-gray-500 mt-1">Vehicle return to {{ bookingStore.bookingDetails.stationName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex flex-col sm:flex-row gap-3">
            <button class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Modify Booking
            </button>
            <button class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Download Receipt
            </button>
            <button class="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors">
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBookingStore } from '@/stores/BookingStore'
import SkeletonLoader from './SkeletonLoader.vue'
import ErrorCard from './ErrorCard.vue'

const route = useRoute()
const bookingStore = useBookingStore()
const error = ref<string | null>(null)
const loading = ref<boolean>(true)

const stationId = computed(() => route.params.stationId as string)
const bookingId = computed(() => route.params.bookingId as string)

const bookingDuration = computed(() => {
  if (bookingStore.bookingDetails) {
    const start = new Date(bookingStore.bookingDetails.startDate)
    const end = new Date(bookingStore.bookingDetails.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  return 0
})

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const fetchBookingDetails = async () => {
  try {
    await bookingStore.fetchBookingDetails(stationId.value, bookingId.value)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unknown error occurred'
  } finally {
    loading.value = false
  }
}

onMounted(fetchBookingDetails)
</script>