<template>
  <!-- Calendar Section -->
  <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div class="p-6 border-b border-gray-200 bg-gray-50">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 class="text-lg font-semibold text-gray-900">{{ formattedWeekRange }}</h2>
        
        <div class="flex items-center gap-3">
          <button
            @click="$emit('previous-week')"
            class="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Previous
          </button>
          <button
            @click="$emit('next-week')"
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
              @click="$emit('booking-click', bookingEntry.booking)"
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
</template>

<script lang="ts" setup>
import type { Booking } from '@/types'

interface BookingEntry {
  booking: Booking
  isStart: boolean
  isEnd: boolean
}

interface WeekDay {
  date: string
  name: string
}

interface Props {
  formattedWeekRange: string
  weekDays: WeekDay[]
  bookingsForDay: (date: string) => BookingEntry[]
  formatDisplayDate: (date: string) => string
  handleDragStart: (bookingEntry: BookingEntry) => void
  handleDrop: (date: string) => void
}

defineProps<Props>()

defineEmits<{
  'previous-week': []
  'next-week': []
  'booking-click': [booking: Booking]
}>()
</script>