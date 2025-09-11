<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="closeModal"
    ></div>

    <!-- Modal Container -->
    <div class="flex min-h-screen items-center justify-center p-4 text-center">
      <!-- Modal Content -->
      <div
        class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
        @click.stop
      >
        <!-- Close Button -->
        <button
          type="button"
          class="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          @click="closeModal"
        >
          <span class="sr-only">Fechar</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Modal Header -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ transactionId ? "Editar Transação" : "Nova Transação" }}
          </h3>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Transaction Type -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Tipo de transação</label
            >
            <div class="flex space-x-4">
              <label
                v-for="type in transactionTypes"
                :key="type.id"
                class="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  v-model="form.type"
                  :value="type.value"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span class="ml-2 text-sm text-gray-700">{{ type.label }}</span>
              </label>
            </div>
          </div>

          <!-- Amount -->
          <div class="mb-4">
            <label
              for="amount"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Valor
            </label>
            <div class="relative rounded-md shadow-sm">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-500 sm:text-sm">R$</span>
              </div>
              <input
                type="number"
                step="0.01"
                id="amount"
                v-model="form.amount"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md h-10"
                placeholder="0,00"
                required
              />
            </div>
          </div>

          <!-- Description -->
          <div class="mb-4">
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Descrição
            </label>
            <input
              type="text"
              id="description"
              v-model="form.description"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-10 px-3"
              placeholder="O que foi essa transação?"
              required
            />
          </div>

          <!-- Date -->
          <div class="mb-4">
            <label
              for="date"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Data
            </label>
            <input
              type="date"
              id="date"
              v-model="form.date"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-10 px-3"
              required
            />
          </div>

          <!-- Category -->
          <div class="mb-4">
            <label
              for="category"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Categoria
            </label>
            <select
              id="category"
              v-model="form.categoryId"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-10"
              required
            >
              <option value="">Selecione uma categoria</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Bank Account -->
          <div class="mb-6">
            <label
              for="bankAccount"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Conta
            </label>
            <select
              id="bankAccount"
              v-model="form.bankAccountId"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-10"
              required
            >
              <option value="">Selecione uma conta</option>
              <option
                v-for="account in bankAccounts"
                :key="account.id"
                :value="account.id"
              >
                {{ account.name }}
              </option>
            </select>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :disabled="isSubmitting"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :disabled="isSubmitting"
            >
              <svg
                v-if="isSubmitting"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ transactionId ? "Atualizar" : "Salvar" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  transaction: {
    type: Object,
    default: () => ({}),
  },
  categories: {
    type: Array,
    default: () => [],
  },
  bankAccounts: {
    type: Array,
    default: () => [],
  },
  transactionId: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close", "submit"]);

const isSubmitting = ref(false);

const form = ref({
  type: "EXPENSE",
  amount: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  categoryId: "",
  bankAccountId: "",
});

const transactionTypes = [
  { id: "expense", value: "EXPENSE", label: "Despesa" },
  { id: "income", value: "INCOME", label: "Receita" },
];

watch(
  () => props.transaction,
  (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
      form.value = {
        type: newVal.type,
        amount: (newVal.amount / 100).toFixed(2),
        description: newVal.description,
        date: newVal.date.split("T")[0],
        categoryId: newVal.categoryId,
        bankAccountId: newVal.bankAccountId,
      };
    } else {
      // Reset form when creating a new transaction
      form.value = {
        type: "EXPENSE",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        categoryId: "",
        bankAccountId: "",
      };
    }
  },
  { immediate: true, deep: true }
);

const closeModal = () => {
  emit("close");
};

const handleSubmit = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    const transactionData = {
      ...form.value,
      amount: Math.round(parseFloat(form.value.amount) * 100), // Convert to cents
      date: new Date(form.value.date).toISOString(),
    };

    emit("submit", transactionData);
  } catch (error) {
    console.error("Error submitting transaction:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
