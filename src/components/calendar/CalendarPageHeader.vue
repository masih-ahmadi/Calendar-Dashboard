<template>
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
          v-if="selectedStation"
          class="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200"
        >
          <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span class="text-sm font-medium text-emerald-800">
            {{ selectedStation.name }}
          </span>
        </div>
      </div>

      <div class="flex-shrink-0">
        <Autocomplete @selected="$emit('station-selected', $event)" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Autocomplete from '../AutocompleteField.vue'

interface Station {
  id: string
  name: string
}

interface Props {
  selectedStation: Station | null
}

defineProps<Props>()

defineEmits<{
  'station-selected': [station: Station]
}>()
</script>