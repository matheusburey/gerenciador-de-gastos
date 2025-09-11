<template>
  <div class="h-full bg-gray-50 p-4 md:p-8">
    <!-- Transaction Form Modal -->
    <TransactionFormModal
      :is-open="isTransactionModalOpen"
      :categories="categories"
      :bank-accounts="bankAccounts"
      @close="closeTransactionModal"
      @submit="handleTransactionSubmit"
    />
    <div class="absolute bottom-6 right-6">
      <ButtonUi @click="openTransactionModal" variant="icon">
        <Plus class="h-6 w-6 text-blue-500" />
      </ButtonUi>
    </div>

    <!-- Balance Card -->
    <div class="grid grid-cols-4 gap-6 mb-6">
      <BalanceCard
        :value="data?.summary?.totalBalance || 0"
        :icon="Landmark"
        label="Saldo atual"
        color="text-blue-500"
      />
      <BalanceCard
        :value="data?.summary?.totalIncome || 0"
        :icon="TrendingUp"
        label="Receita"
        color="text-green-500"
      />
      <BalanceCard
        :value="data?.summary?.totalExpenses || 0"
        :icon="TrendingDown"
        label="Despesas"
        color="text-red-500"
      />
      <BalanceCard
        :value="data?.summary?.totalExpenses || 0"
        :icon="CreditCard"
        label="Cartões"
        color="text-yellow-500"
      />
    </div>

    <!-- Doughnut Chart -->
    <div class="flex gap-4">
      <div class="bg-white rounded-2xl shadow-md p-6 mb-6 w-1/2 h-[350px]">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-gray-500 text-sm font-medium">Despesas</h2>
        </div>
        <div class="w-full h-[270px]">
          <Doughnut :data="chartData" :options="options" />
        </div>
      </div>
      <div class="bg-white rounded-2xl shadow-md p-6 mb-6 w-1/2 h-[350px]">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-gray-500 text-sm font-medium">Receitas</h2>
        </div>
        <div class="w-full h-[270px]">
          <Doughnut :data="chartData" :options="options" />
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="bg-white rounded-2xl shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Transações Recentes</h2>
        <button class="text-blue-500 text-sm font-medium">Ver Todas</button>
      </div>

      <div class="space-y-4">
        <div v-if="data?.recentTransactions">
          <div
            v-for="transaction in data.recentTransactions"
            :key="transaction.id"
            class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div class="flex items-center">
              <div
                class="p-3 rounded-full"
                :class="
                  transaction.type === 'expense'
                    ? 'bg-red-100 text-red-500'
                    : 'bg-green-100 text-green-500'
                "
              >
                <component :is="icons[transaction?.category?.icon]" />
              </div>
              <div class="ml-4">
                <h3 class="font-medium text-gray-800">
                  {{ transaction?.description || "Sem descrição" }}
                </h3>
                <p class="text-xs text-gray-500">
                  {{ transaction?.category?.name || "Sem categoria" }} •
                  {{ transaction?.date }}
                </p>
              </div>
            </div>
            <div
              class="font-medium"
              :class="
                transaction.type === 'expense'
                  ? 'text-red-500'
                  : 'text-green-500'
              "
            >
              {{ transaction.type === "expense" ? "-" : "+" }}
              {{ transaction.amount }}
            </div>
          </div>
        </div>
      </div>

      <button
        class="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center"
      >
        <Plus class="h-5 w-5 mr-2" />
        Adicionar Transação
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Landmark,
} from "lucide-vue-next";
import * as icons from "lucide-vue-next";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardData {
  accounts: Array<{
    id: string;
    name: string;
    balance: number;
    currency: string;
    color: string;
    icon: string;
  }>;
  recentTransactions: Array<{
    id: string;
    amount: number;
    description: string | null;
    date: Date;
    type: string;
    category: {
      icon: string;
      name: string;
      color: string;
    };
  }>;
  summary: {
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
    netIncome: number;
  };
  categorySpending: Array<{
    name: string;
    amount: number;
    color: string;
    percentage: number;
  }>;
}

definePageMeta({
  title: "Dashboard",
  layout: "dashboard-default",
});

const authStore = useAuthStore();

const data = ref({} as DashboardData);

const isTransactionModalOpen = ref(false);
const categories = ref<Array<{ id: string; name: string }>>([]);
const bankAccounts = ref<Array<{ id: string; name: string }>>([]);

// Fetch categories and bank accounts
const { data: categoriesData } = await useFetch("/api/categories");
const { data: bankAccountsData } = await useFetch("/api/bank-accounts");
console.log(categoriesData.value);
console.log(bankAccountsData.value);

const openTransactionModal = () => {
  isTransactionModalOpen.value = true;
};

const closeTransactionModal = () => {
  isTransactionModalOpen.value = false;
};

async function getDashboardData() {
  const token = await authStore.getToken();
  const response = await $fetch("/api/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  data.value = response;
}

const handleTransactionSubmit = async (transactionData: any) => {
  try {
    const token = await authStore.getToken();
    await $fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(transactionData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Refresh dashboard data
    await getDashboardData();
    closeTransactionModal();
  } catch (error) {
    console.error("Error creating transaction:", error);
  }
};

onMounted(getDashboardData);

const chartData = ref({
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 10],
    },
  ],
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
