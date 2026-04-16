<template>
  <q-page class="flex flex-center" style="background: #f5f7fa">
    <q-card class="register-card" flat bordered>
      <q-card-section class="text-center q-pt-lg">
        <div class="text-h5 text-weight-bold">TriAL</div>
        <div class="text-caption text-grey">Crie sua conta</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleRegister" greedy>
          <InputField
            v-model="form.nome"
            label="Nome"
            icon="person"
            :rules="[(v) => !!v || 'Nome é obrigatório']"
          />

          <InputField
            v-model="form.email"
            label="E-mail"
            type="email"
            icon="mail"
            class="q-mt-sm"
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
            :rules="[
              (v) => !!v || 'Senha é obrigatória',
              (v) => (v && v.length >= 6) || 'Mínimo 6 caracteres',
            ]"
          />

          <InputField
            v-model="form.telefone"
            label="Telefone"
            icon="phone"
            mask="(##) #####-####"
            unmasked-value
            class="q-mt-sm"
            :rules="[(v) => !!v || 'Telefone é obrigatório']"
          />

          <InputField
            v-model="form.data_nascimento"
            label="Data de nascimento"
            icon="calendar_today"
            mask="####-##-##"
            placeholder="AAAA-MM-DD"
            class="q-mt-sm"
            :rules="[
              (v) => !!v || 'Data de nascimento é obrigatória',
              (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Formato: AAAA-MM-DD',
            ]"
          />

          <q-btn
            type="submit"
            label="Cadastrar"
            color="primary"
            class="full-width q-mt-md"
            :loading="loading"
            no-caps
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pt-none">
        <span class="text-caption text-grey">Já tem conta? </span>
        <router-link class="text-caption text-primary" :to="{ name: 'login' }">
          Fazer login
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
  nome: '',
  email: '',
  senha: '',
  telefone: '',
  data_nascimento: '',
})

async function handleRegister() {
  loading.value = true
  try {
    await authStore.register(form.value)
    router.push({ name: 'home' })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-card {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
}
</style>
