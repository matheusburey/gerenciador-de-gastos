import { acceptHMRUpdate, defineStore } from "pinia";

interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  color: string;
  icon: string;
}

interface RecentTransactions {
  id: string;
  amount: number;
  description: string | null;
  date: Date;
  type: string;
  category: {
    id: string;
    icon: string;
    name: string;
    color: string;
  };
}

interface Summary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  totalCredit: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  type: string;
}

interface TransactionByCategory {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
}

interface TransactionType {
  income: TransactionByCategory[];
  expense: TransactionByCategory[];
  credit: TransactionByCategory[];
}

interface DashboardData {
  accounts: Account[];
  recentTransactions: RecentTransactions[];
  summary: Summary;
  transactionsType: TransactionType;
}

interface DashboardState {
  accounts: Account[];
  recentTransactions: RecentTransactions[];
  summary: Summary;
  categories: Category[];
  transactionsType: TransactionType;
  loading: boolean;
  error: string | null;
}

export const useDashboardStore = defineStore("dashboard", {
  state: (): DashboardState => ({
    accounts: [],
    recentTransactions: [],
    summary: {} as Summary,
    categories: [],
    transactionsType: {} as TransactionType,
    loading: true,
    error: null,
  }),

  actions: {
    async fetchDashboardData(token: string) {
      try {
        this.loading = true;
        this.fetchDashboard(token);
        this.fetchCategories(token);
      } catch (error: any) {
        console.error("Error fetching dashboard data:", error);
        this.error = error.message || "Erro ao buscar dados do dashboard";
      }
      this.loading = false;
    },
    async fetchDashboard(token: string) {
      const response: DashboardData = await $fetch("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.accounts = response.accounts;
      this.recentTransactions = response.recentTransactions;
      this.summary = response.summary;
      this.transactionsType = response.transactionsType;
    },
    async fetchCategories(token: string) {
      const response: { categories: Category[] } = await $fetch(
        "/api/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.categories = response.categories;
    },
  },
});
