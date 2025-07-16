<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <SkeletonLoader />
    </div>

    <ErrorCard v-else-if="errorMessage" :error-message="errorMessage" />

    <div v-else class="p-6 space-y-8">
      <!-- Header Section -->
      <section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900">Booking Calendar</h1>
                <p class="text-sm text-gray-600">Manage your vehicle bookings</p>
              </div>
            </div>
            
            <div
              v-if="bookingStore.selectedStation"
              class="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span class="text-sm font-medium text-emerald-800">
                {{ bookingStore.selectedStation.name }}
              </span>
            </div>
          </div>

          <div class="flex-shrink-0">
            <Autocomplete @selected="handleStationSelected" />
          </div>
        </div>
      </section>

      <!-- Calendar Section -->
      <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6 border-b border-gray-200 bg-gray-50">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 class="text-lg font-semibold text-gray-900">{{ formattedWeekRange }}</h2>
            
            <div class="flex items-center gap-3">
              <button
                @click="previousWeek"
                class="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors shadow-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Previous
              </button>
              <button
                @click="nextWeek"
                class="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors shadow-sm"
              >
                Next
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            <div
              v-for="day in weekDays"
              :key="day.date"
              class="bg-gray-50 rounded-lg border border-gray-200 p-4 min-h-[200px] hover:shadow-md transition-shadow"
              @dragover.prevent
              @drop="handleDrop(day.date)"
            >
              <div class="mb-3">
                <h3 class="font-bold text-gray-900 text-sm">{{ day.name }}</h3>
                <p class="text-xs text-gray-600">{{ formatDisplayDate(day.date) }}</p>
              </div>
              
              <div class="space-y-2">
                <div
                  v-for="bookingEntry in bookingsForDay(day.date)"
                  :key="bookingEntry.booking.id"
                  draggable="true"
                  @dragstart="handleDragStart(bookingEntry)"
                  @click="showBookingDetails(bookingEntry.booking)"
                  class="p-3 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all transform hover:scale-105"
                  :class="{
                    'bg-red-400 text-white border-amber-600': bookingEntry.isStart,
                    'bg-indigo-500 text-white border-indigo-600': bookingEntry.isEnd
                  }"
                >
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-white rounded-full opacity-80"></div>
                      <span class="text-xs font-medium truncate">
                        {{ bookingEntry.booking.customerName }}
                      </span>
                    </div>
                    
                    <div class="flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span class="text-xs opacity-90">
                        {{ bookingEntry.isStart ? 'Pickup' : bookingEntry.isEnd ? 'Return' : '' }}
                      </span>
                    </div>
                    
                    <div class="text-xs opacity-80 mt-1">
                      {{ formatDisplayDate(bookingEntry.booking.startDate) }} - 
                      {{ formatDisplayDate(bookingEntry.booking.endDate) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Legend Section -->
      <section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
            <div class="flex flex-wrap gap-6">
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-2 px-3 py-1.5 bg-red-400 text-white rounded-lg text-sm font-medium">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Pickup
                </div>
                <span class="text-sm text-gray-600">Vehicle pickup date</span>
              </div>
              
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-2 px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-sm font-medium">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Return
                </div>
                <span class="text-sm text-gray-600">Vehicle return date</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 text-sm text-gray-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Click on bookings to view details • Drag to reschedule</span>
          </div>
        </div>
      </section>

      <!-- Quick Stats -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-600">Total Bookings</p>
              <p class="text-xl font-bold text-gray-900">{{ getTotalBookings() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-600">Pickups This Week</p>
              <p class="text-xl font-bold text-gray-900">{{ getPickupsThisWeek() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-600">Returns This Week</p>
              <p class="text-xl font-bold text-gray-900">{{ getReturnsThisWeek() }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/BookingStore'
import { useCalendar } from '@/composables/useCalendar'
import { useBookings } from '@/composables/useBookings'
import { useDragAndDrop } from '@/composables/useDragAndDrop'
import Autocomplete from './AutocompleteField.vue'
import type { Booking } from '@/types'
import { startOfWeek, isWithinInterval } from 'date-fns'
import SkeletonLoader from './SkeletonLoader.vue'
import ErrorCard from './ErrorCard.vue'

const router = useRouter()
const bookingStore = useBookingStore()

const {
  currentWeekStart,
  weekDays,
  formattedWeekRange,
  previousWeek,
  nextWeek,
  formatDisplayDate
} = useCalendar()

const {
  errorMessage,
  isLoading,
  fetchBookings,
  bookingsForDay,
  fetchInitialData,
  handleStationSelected
} = useBookings()

const updateLocalBooking = (updatedBooking: Booking) => {
  const index = bookingStore.bookings.findIndex((b) => b.id === updatedBooking.id)
  if (index !== -1) {
    bookingStore.bookings.splice(index, 1, updatedBooking)
  }
}

const { draggedBooking, handleDragStart, handleDrop } = useDragAndDrop(updateLocalBooking)

const showBookingDetails = (booking: Booking) => {
  router.push(`/booking/${bookingStore.selectedStation?.id}/${booking.id}`)
}

// Enhanced stats functions
const getTotalBookings = () => {
  return bookingStore.bookings.length
}

const getPickupsThisWeek = () => {
  const weekStart = currentWeekStart.value
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)
  
  return bookingStore.bookings.filter(booking => {
    const startDate = new Date(booking.startDate)
    return isWithinInterval(startDate, { start: weekStart, end: weekEnd })
  }).length
}

const getReturnsThisWeek = () => {
  const weekStart = currentWeekStart.value
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)
  
  return bookingStore.bookings.filter(booking => {
    const endDate = new Date(booking.endDate)
    return isWithinInterval(endDate, { start: weekStart, end: weekEnd })
  }).length
}

onMounted(async () => {
  const earliestDate = await fetchInitialData()
  if (earliestDate) {
    currentWeekStart.value = startOfWeek(earliestDate)
  }
})
</script>

<style>
/* Custom scrollbar for better UX */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>