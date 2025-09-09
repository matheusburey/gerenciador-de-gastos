<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Olá, Bem-vindo!</h1>
      <p class="text-gray-600">Acompanhe seus gastos e economias</p>
    </header>

    <!-- Balance Card -->
    <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-gray-500 text-sm font-medium">Saldo Disponível</h2>
        <button class="text-blue-500 hover:text-blue-700">
          <MoreVertical class="h-5 w-5" />
        </button>
      </div>
      <div class="text-3xl font-bold text-gray-800 mb-2">R$ 5.280,90</div>
      <div class="flex space-x-4 text-sm">
        <div class="text-green-500">
          <span>Receitas: </span>
          <span class="font-medium">R$ 6.500,00</span>
        </div>
        <div class="text-red-500">
          <span>Despesas: </span>
          <span class="font-medium">R$ 1.219,10</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <button class="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
        <div class="bg-blue-100 p-3 rounded-full mb-2">
          <Plus class="h-6 w-6 text-blue-500" />
        </div>
        <span class="text-xs text-gray-600">Adicionar</span>
      </button>
      <button class="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
        <div class="bg-green-100 p-3 rounded-full mb-2">
          <Wallet class="h-6 w-6 text-green-500" />
        </div>
        <span class="text-xs text-gray-600">Orçamento</span>
      </button>
      <button class="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
        <div class="bg-purple-100 p-3 rounded-full mb-2">
          <BarChart3 class="h-6 w-6 text-purple-500" />
        </div>
        <span class="text-xs text-gray-600">Relatórios</span>
      </button>
      <button class="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
        <div class="bg-yellow-100 p-3 rounded-full mb-2">
          <Settings class="h-6 w-6 text-yellow-500" />
        </div>
        <span class="text-xs text-gray-600">Configurações</span>
      </button>
    </div>

    <!-- Recent Transactions -->
    <div class="bg-white rounded-2xl shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Transações Recentes</h2>
        <button class="text-blue-500 text-sm font-medium">Ver Todas</button>
      </div>
      
      <div class="space-y-4">
        <!-- Transaction Item -->
        <div v-for="transaction in recentTransactions" :key="transaction.id" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div class="flex items-center">
            <div class="p-3 rounded-full" :class="transaction.type === 'expense' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'">
              <component :is="transaction.icon" class="h-5 w-5" />
            </div>
            <div class="ml-4">
              <h3 class="font-medium text-gray-800">{{ transaction.title }}</h3>
              <p class="text-xs text-gray-500">{{ transaction.category }} • {{ transaction.date }}</p>
            </div>
          </div>
          <div class="font-medium" :class="transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'">
            {{ transaction.type === 'expense' ? '-' : '+' }} {{ transaction.amount }}
          </div>
        </div>
      </div>

      <button class="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center">
        <Plus class="h-5 w-5 mr-2" />
        Adicionar Transação
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { 
  ShoppingBag, 
  Home, 
  Truck, 
  Cake, 
  Gift,
  Plus,
  MoreVertical,
  Wallet,
  BarChart3,
  Settings
} from 'lucide-vue-next';

const recentTransactions = ref([
  {
    id: 1,
    title: 'Mercado',
    category: 'Alimentação',
    amount: 'R$ 189,90',
    date: 'Hoje',
    type: 'expense',
    icon: ShoppingBag
  },
  {
    id: 2,
    title: 'Aluguel',
    category: 'Moradia',
    amount: 'R$ 1.200,00',
    date: '05/09',
    type: 'expense',
icon: Home
  },
  {
    id: 3,
    title: 'Freelance',
    category: 'Trabalho',
    amount: 'R$ 2.500,00',
    date: '03/09',
    type: 'income',
icon: Truck
  },
  {
    id: 4,
    title: 'Presente',
    category: 'Outros',
    amount: 'R$ 120,00',
    date: '01/09',
    type: 'expense',
icon: Gift
  },
  {
    id: 5,
    title: 'Aniversário',
    category: 'Lazer',
    amount: 'R$ 85,00',
    date: '30/08',
    type: 'expense',
icon: Cake
  }
]);
</script>
