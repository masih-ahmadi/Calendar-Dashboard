<template>
  <div
    class="mx-auto mt-[10%] flex w-full max-w-md overflow-hidden bg-white rounded-xl shadow-lg border border-red-100 dark:bg-gray-900 dark:border-red-900/20 transform transition-all duration-300 hover:scale-105"
  >
    <!-- Icon container with gradient background -->
    <div class="flex items-center justify-center w-16 bg-gradient-to-br from-red-500 to-red-600 relative">
      <div class="absolute inset-0 bg-red-500 opacity-10 animate-pulse"></div>
      <ErrorIcon class="relative z-10 w-6 h-6 text-white drop-shadow-sm" />
    </div>
    
    <!-- Content area -->
    <div class="flex-1 px-6 py-4">
      <div class="flex items-start space-x-3">
        <div class="flex-1">
          <div class="flex items-center space-x-2 mb-2">
            <span class="font-bold text-red-600 dark:text-red-400 text-lg">Error</span>
            <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            <slot>
              {{ errorMessage }}
            </slot>
          </p>
        </div>
      </div>
      
    
      <div class="mt-4 flex justify-end">
        <button 
          @click="$emit('dismiss')"
          class="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1"
        >
          Dismiss
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ErrorIcon from './icons/ErrorIcon.vue'

defineProps({
  errorMessage: String
})

defineEmits(['dismiss'])
</script>

<style scoped>
@keyframes subtle-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.animate-subtle-shake {
  animation: subtle-shake 0.5s ease-in-out;
}
</style>