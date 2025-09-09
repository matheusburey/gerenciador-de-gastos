<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Gerenciador de Gastos
            </NuxtLink>
          </div>
          <div class="flex items-center">
            <span class="text-sm text-gray-600">Já tem uma conta?</span>
            <NuxtLink to="/auth/signin" class="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Entrar
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">
            Crie sua conta
          </h1>
          <p class="mt-2 text-sm text-gray-600">
            Ou 
            <NuxtLink to="/auth/signin" class="font-medium text-indigo-600 hover:text-indigo-500">
              acesse sua conta existente
            </NuxtLink>
          </p>
        </div>
        
        <CardUi class="p-8">
          <form class="space-y-6" @submit.prevent="handleSignUp">
            <div class="space-y-4">
              <InputUi
                v-model="name"
                label="Nome"
                type="text"
                placeholder="Seu nome"
                required
                autocomplete="given-name"
              />
              <InputUi
                v-model="email"
                label="Email"
                type="email"
                placeholder="seu@email.com"
                required
                autocomplete="email"
              />
              <InputUi
                v-model="password"
                label="Senha"
                type="password"
                placeholder="Crie uma senha"
                required
                autocomplete="new-password"
              />
              
              <InputUi
                v-model="confirmPassword"
                label="Confirme a senha"
                type="password"
                placeholder="Digite a senha novamente"
                required
                autocomplete="new-password"
                :error="passwordError"
              />
              
              <CheckboxUi
                v-model="acceptedTerms" 
                required
                class="mt-4"
              >
                Eu concordo com os <a href="#" class="text-indigo-600 hover:text-indigo-500">Termos de Serviço</a> e <a href="#" class="text-indigo-600 hover:text-indigo-500">Política de Privacidade</a>
              </CheckboxUi>
            </div>

            <ButtonUi
              type="submit" 
              :loading="isLoading"
              class="w-full"
            >
              Criar conta
            </ButtonUi>
          </form>
        </CardUi>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500">
          &copy; {{ new Date().getFullYear() }} Gerenciador de Gastos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptedTerms = ref(false)
const isLoading = ref(false)
const router = useRouter()

const passwordError = computed(() => {
  if (!password.value || !confirmPassword.value) return ''
  return password.value !== confirmPassword.value ? 'As senhas não conferem' : ''
})

const handleSignUp = async () => {
  try {
    isLoading.value = true
    
    if (password.value !== confirmPassword.value) {
      return // Error is shown by the passwordError computed property
    }
    
    // TODO: Implement signup logic
    console.log('Signing up with:', { 
      name: name.value,
      email: email.value,
      acceptedTerms: acceptedTerms.value
    })
    
    await router.push('/dashboard')
  } catch (error) {
    console.error('Error signing up:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
