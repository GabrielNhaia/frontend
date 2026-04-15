import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const usuario = ref(JSON.parse(localStorage.getItem('usuario') || 'null'))

  const isAuthenticated = computed(() => !!token.value)

  function setSession(data) {
    token.value = data.token
    usuario.value = data.usuario
    localStorage.setItem('token', data.token)
    localStorage.setItem('usuario', JSON.stringify(data.usuario))
  }

  function clearSession() {
    token.value = null
    usuario.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  async function login(credentials) {
    const { data } = await api.post('/login', credentials)
    setSession(data)
    return data
  }

  async function register(payload) {
    const { data } = await api.post('/register', payload)
    setSession(data)
    return data
  }

  async function fetchMe() {
    const { data } = await api.get('/me')
    usuario.value = data
    localStorage.setItem('usuario', JSON.stringify(data))
    return data
  }

  async function logout() {
    try {
      await api.post('/logout')
    } finally {
      clearSession()
    }
  }

  return {
    token,
    usuario,
    isAuthenticated,
    login,
    register,
    fetchMe,
    logout,
  }
})
