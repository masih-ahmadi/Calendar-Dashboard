import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import BookingDetails from '@/components/BookingDetail.vue'
import { useBookingStore } from '@/stores/BookingStore'

// Mock vue-router's useRoute
vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRoute: () => ({
      params: {
        stationId: 'station-1',
        bookingId: 'booking-1',
      },
    }),
  }
})

describe('BookingDetail.vue', () => {
  let store: ReturnType<typeof useBookingStore>

  beforeEach(() => {
    // Setup Pinia and store
    setActivePinia(createPinia())
    store = useBookingStore()
    store.bookingDetails = null
    store.fetchBookingDetails = vi.fn()
  })

  const mountComponent = async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [],
    })

    const wrapper = mount(BookingDetails, {
      global: {
        plugins: [router],
        stubs: ['RouterLink', 'SkeletonLoader', 'ErrorCard'],
      },
    })

    await flushPromises()
    return wrapper
  }

  it('calls fetchBookingDetails on mount', async () => {
    await mountComponent()
    expect(store.fetchBookingDetails).toHaveBeenCalledWith('station-1', 'booking-1')
  })

 

  it('displays error card if there is an error', async () => {
    store.fetchBookingDetails = vi.fn().mockImplementation(() => {
      throw new Error('Fetch failed')
    })
    const wrapper = await mountComponent()
    await flushPromises()
    expect(wrapper.findComponent({ name: 'ErrorCard' }).exists()).toBe(true)
  })

  it('renders booking details when available', async () => {
    store.bookingDetails = {
      startDate: '2024-07-01',
      endDate: '2024-07-05',
      customerName: 'Alice Smith',
      stationName: 'Main Station',
    }

    const wrapper = await mountComponent()
    await flushPromises()

    expect(wrapper.text()).toContain('Alice Smith')
    expect(wrapper.text()).toContain('Main Station')
    expect(wrapper.text()).toContain('4 days')
    expect(wrapper.text()).toContain('Booking Details')
  })
})
