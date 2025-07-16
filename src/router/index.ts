import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import BookingDetail from '@/components/BookingDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 { 
    path: '/',
    name: 'Dashboard', 
    component: Dashboard 
  },
  { 
    path: '/booking/:stationId/:bookingId',
    name: 'BookingDetail', 
    component: BookingDetail 
  },
  ],
})

export default router
