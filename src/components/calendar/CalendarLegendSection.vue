<template>
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
</template>

