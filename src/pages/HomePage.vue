<template>
  <q-page class="flex flex-center" style="background: #f5f7fa">
    <q-card class="home-card" flat bordered>
      <q-card-section class="text-center q-pt-lg">
        <q-avatar size="64px" color="primary" text-color="white" icon="person" />
        <div class="text-h6 q-mt-sm">{{ authStore.usuario?.nome }}</div>
        <div class="text-caption text-grey">{{ authStore.usuario?.email }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon name="verified_user" :color="isAtivo ? 'positive' : 'negative'" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Status</q-item-label>
              <q-item-label>
                <q-badge :color="isAtivo ? 'positive' : 'negative'" :label="authStore.usuario?.status" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="event" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Data de expiração</q-item-label>
              <q-item-label>{{ dataExpiracaoFormatada }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="phone" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Telefone</q-item-label>
              <q-item-label>{{ formatPhone(authStore.usuario?.telefone) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="cake" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Data de nascimento</q-item-label>
              <q-item-label>{{ dataNascimentoFormatada }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section>
        <q-btn
          label="Sair"
          color="negative"
          icon="logout"
          class="full-width"
          outline
          no-caps
          :loading="loading"
          @click="handleLogout"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const isAtivo = computed(() => authStore.usuario?.status === 'ativo')

const dataExpiracaoFormatada = computed(() =>
  formatDate(authStore.usuario?.data_expiracao),
)

const dataNascimentoFormatada = computed(() =>
  formatDate(authStore.usuario?.data_nascimento),
)

function formatPhone(value) {
  if (!value) return '—'
  const digits = String(value).replace(/\D/g, '')
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return value
}

function formatDate(value) {
  if (!value) return '—'
  const raw = String(value).substring(0, 10)
  const [year, month, day] = raw.split('-')
  return `${day}/${month}/${year}`
}

onMounted(() => {
  authStore.fetchMe()
})

async function handleLogout() {
  loading.value = true
  try {
    await authStore.logout()
    router.push({ name: 'login' })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.home-card {
  width: 100%;
  max-width: 420px;
  border-radius: 12px;
}
</style>
