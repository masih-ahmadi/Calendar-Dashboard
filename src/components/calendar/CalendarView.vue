<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <SkeletonLoader />
    </div>

    <ErrorCard v-else-if="errorMessage" :error-message="errorMessage" />

    <div v-else class="p-6 space-y-8">
      <!-- Header Section -->
      <CalendarPageHeader 
        :selected-station="bookingStore.selectedStation"
        @station-selected="handleStationSelected"
      />

      <!-- Calendar Section -->
      <CalendarSection 
        :formatted-week-range="formattedWeekRange"
        :week-days="weekDays"
        :bookings-for-day="bookingsForDay"
        :format-display-date="formatDisplayDate"
        :handle-drag-start="handleDragStart"
        :handle-drop="handleDrop"
        @previous-week="previousWeek"
        @next-week="nextWeek"
        @booking-click="showBookingDetails"
      />

      <!-- Legend Section -->
      <CalendarLegendSection />

      <!-- Quick Stats Section -->
      <CalendarQuickStats 
        :total-bookings="getTotalBookings()"
        :pickups-this-week="getPickupsThisWeek()"
        :returns-this-week="getReturnsThisWeek()"
      />
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
import CalendarPageHeader from './CalendarPageHeader.vue'
import CalendarSection from './CalendarSection.vue'
import CalendarLegendSection from './CalendarLegendSection.vue'
import CalendarQuickStats from './CalendarQuickStats.vue'
import type { Booking } from '@/types'
import { startOfWeek, isWithinInterval } from 'date-fns'
import SkeletonLoader from '../SkeletonLoader.vue'
import ErrorCard from '../ErrorCard.vue'

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

//  stats functions
const getTotalBookings = () => {
  return bookingStore.bookings.length
}

const getPickupsThisWeek = () => {
  const weekStart = currentWeekStart.value
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)
  console.log(weekEnd)
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