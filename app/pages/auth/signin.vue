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
            <span class="text-sm text-gray-600">Não tem uma conta?</span>
            <NuxtLink to="/auth/signup" class="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Cadastre-se
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
            Acesse sua conta
          </h1>
          <p class="mt-2 text-sm text-gray-600">
            Ou 
            <NuxtLink to="/auth/signup" class="font-medium text-indigo-600 hover:text-indigo-500">
              crie uma conta gratuita
            </NuxtLink>
          </p>
        </div>
        
        <CardUi class="p-8">
          <form class="space-y-6" @submit.prevent="handleSignIn">
            <div class="space-y-4">
              <InputUi
                v-model="email"
                label="Email"
                type="email"
                placeholder="seu@email.com"
                required
                autocomplete="email"
              />
              
              <div>
                <InputUi
                  v-model="password"
                  label="Senha"
                  type="password"
                  placeholder="Sua senha"
                  required
                  autocomplete="current-password"
                />
                <NuxtLink to="/auth/forgot-password" class="text-xs text-indigo-600 hover:text-indigo-500">
                  Esqueceu sua senha?
                </NuxtLink>
              </div>
              
              <div class="flex items-center justify-between">
                <CheckboxUi v-model="rememberMe">
                  Lembrar de mim
                </CheckboxUi>
              </div>
            </div>

            <ButtonUi
              type="submit" 
              :loading="isLoading"
              class="w-full"
            >
              Entrar
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const router = useRouter()

const handleSignIn = async () => {
  try {
    isLoading.value = true
    // TODO: Implement authentication logic
    console.log('Signing in with:', { 
      email: email.value,
      rememberMe: rememberMe.value 
    })
    await router.push('/dashboard')
  } catch (error) {
    console.error('Error signing in:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
