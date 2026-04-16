<template>
  <q-page class="flex flex-center" style="background: #f5f7fa">
    <q-card class="login-card" flat bordered>
      <q-card-section class="text-center q-pt-lg">
        <div class="text-h5 text-weight-bold">TriAL</div>
        <div class="text-caption text-grey">Acesse sua conta</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleLogin" greedy>
          <InputField
            v-model="form.email"
            label="E-mail"
            type="email"
            icon="mail"
            :rules="[
              (v) => !!v || 'E-mail é obrigatório',
              (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
            ]"
          />

          <InputField
            v-model="form.senha"
            label="Senha"
            type="password"
            icon="lock"
            class="q-mt-sm"
            :rules="[(v) => !!v || 'Senha é obrigatória']"
          />

          <q-btn
            type="submit"
            label="Entrar"
            color="primary"
            class="full-width q-mt-md"
            :loading="loading"
            no-caps
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pt-none">
        <span class="text-caption text-grey">Não tem conta? </span>
        <router-link class="text-caption text-primary" :to="{ name: 'cadastro' }">
          Cadastre-se
        </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import InputField from 'src/components/InputField.vue'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const form = ref({
  email: '',
  senha: '',
})

async function handleLogin() {
  loading.value = true
  try {
    await authStore.login(form.value)
    router.push({ name: 'home' })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
}
</style>
