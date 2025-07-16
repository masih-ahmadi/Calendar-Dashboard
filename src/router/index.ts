import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import BookingDetail from '@/components/BookingDetail.vue'

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/',
    name: 'Dashboard', 
    component: Dashboard 
  },
  { 
    path: '/booking/:stationId/:bookingId',
    name: 'BookingDetail', 
    component: BookingDetail 
  }
]

const base = import.meta.env.MODE === 'production' ? 'Calendar-Dashboard' : '/'
export default createRouter({
  history: createWebHistory(base),
  routes
})
