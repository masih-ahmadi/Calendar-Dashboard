<template>
  <div
    role="status"
    class="mt-[10%] mx-auto max-w-2xl p-6 space-y-6 bg-white border border-gray-100 rounded-2xl shadow-lg dark:bg-gray-900 dark:border-gray-800 overflow-hidden relative"
  >
    <!-- Shimmer overlay -->
    <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
    
    <!-- Header skeleton -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full dark:from-gray-700 dark:to-gray-600 animate-pulse-slow"></div>
        <div class="space-y-2">
          <div class="h-3 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full dark:from-gray-600 dark:to-gray-700 w-28 animate-pulse-slow"></div>
          <div class="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full dark:from-gray-700 dark:to-gray-600 w-36 animate-pulse-slow" style="animation-delay: 0.2s"></div>
        </div>
      </div>
      <div class="h-8 bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg dark:from-gray-600 dark:to-gray-700 w-16 animate-pulse-slow" style="animation-delay: 0.4s"></div>
    </div>
    
    <!-- Content skeleton -->
    <div class="space-y-4">
      <div class="space-y-2">
        <div class="h-2.5 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full dark:from-gray-600 dark:to-gray-700 w-full animate-pulse-slow"></div>
        <div class="h-2.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full dark:from-gray-700 dark:to-gray-600 w-5/6 animate-pulse-slow" style="animation-delay: 0.1s"></div>
        <div class="h-2.5 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full dark:from-gray-600 dark:to-gray-700 w-4/6 animate-pulse-slow" style="animation-delay: 0.2s"></div>
      </div>
    </div>
    
    <!-- Divider -->
    <div class="border-t border-gray-100 dark:border-gray-800"></div>
    
    <!-- Second item skeleton -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full dark:from-gray-700 dark:to-gray-600 animate-pulse-slow" style="animation-delay: 0.3s"></div>
        <div class="space-y-2">
          <div class="h-3 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full dark:from-gray-600 dark:to-gray-700 w-32 animate-pulse-slow" style="animation-delay: 0.4s"></div>
          <div class="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full dark:from-gray-700 dark:to-gray-600 w-28 animate-pulse-slow" style="animation-delay: 0.5s"></div>
        </div>
      </div>
      <div class="h-8 bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg dark:from-gray-600 dark:to-gray-700 w-20 animate-pulse-slow" style="animation-delay: 0.6s"></div>
    </div>
    
    <!-- Third item skeleton -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full dark:from-gray-700 dark:to-gray-600 animate-pulse-slow" style="animation-delay: 0.2s"></div>
        <div class="space-y-2">
          <div class="h-3 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full dark:from-gray-600 dark:to-gray-700 w-24 animate-pulse-slow" style="animation-delay: 0.3s"></div>
          <div class="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full dark:from-gray-700 dark:to-gray-600 w-40 animate-pulse-slow" style="animation-delay: 0.4s"></div>
        </div>
      </div>
      <div class="h-8 bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg dark:from-gray-600 dark:to-gray-700 w-14 animate-pulse-slow" style="animation-delay: 0.5s"></div>
    </div>
    
    <!-- Footer skeleton -->
    <div class="pt-4 border-t border-gray-100 dark:border-gray-800">
      <div class="flex items-center justify-center space-x-2">
        <div class="w-2 h-2 bg-gray-300 rounded-full dark:bg-gray-600 animate-bounce"></div>
        <div class="w-2 h-2 bg-gray-300 rounded-full dark:bg-gray-600 animate-bounce" style="animation-delay: 0.1s"></div>
        <div class="w-2 h-2 bg-gray-300 rounded-full dark:bg-gray-600 animate-bounce" style="animation-delay: 0.2s"></div>
      </div>
    </div>
    
    <span class="sr-only">Loading content...</span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 2s ease-in-out infinite;
}
</style>