import type { Prisma, Category } from "@prisma/client";
import prisma from "~~/lib/prisma";

interface ICategory {
  id: string;
  name: string;
  description: string | null;
  color: string;
  icon: string;
  type: string;
}

export const getCategories = async (userId: string): Promise<ICategory[]> => {
  return await prisma.category.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      color: true,
      icon: true,
      type: true,
    },
  });
};

export const createCategory = async (
  categoryData: Prisma.CategoryCreateInput
): Promise<ICategory> => {
  return await prisma.category.create({
    data: categoryData,
    select: {
      id: true,
      name: true,
      description: true,
      color: true,
      icon: true,
      type: true,
    },
  });
};

export const createDefaultCategories = async (
  userId: string
): Promise<void> => {
  await prisma.category.createMany({
    data: [
      {
        name: "Saúde",
        color: "#FFCDD2",
        icon: "HealthAndSafety",
        userId,
        type: "expense",
      },
      {
        name: "Lazer",
        color: "#FFCDD2",
        icon: "Restaurant",
        userId,
        type: "expense",
      },
      {
        name: "Casa",
        color: "#C8E6C9",
        icon: "House",
        userId,
        type: "expense",
      },
      {
        name: "Transporte",
        color: "#B3E5FC",
        icon: "Bus",
        userId,
        type: "expense",
      },
      {
        name: "Entretenimento",
        color: "#FFCDD2",
        icon: "Movie",
        userId,
        type: "expense",
      },
      {
        name: "Educação",
        color: "#FFCDD2",
        icon: "GraduationCap",
        userId,
        type: "expense",
      },
      {
        name: "Presente",
        color: "#FFCDD2",
        icon: "Gift",
        userId,
        type: "expense",
      },
      {
        name: "Salário",
        color: "#FFCDD2",
        icon: "Banknote",
        userId,
        type: "income",
      },
      {
        name: "Freelance",
        color: "#65a30d",
        icon: "HandCoins",
        userId,
        type: "income",
      },
      {
        name: "Presente",
        color: "#FFCDD2",
        icon: "Gift",
        userId,
        type: "income",
      },
      {
        name: "Juros",
        color: "#FFCDD2",
        icon: "Coins",
        userId,
        type: "income",
      },
      {
        name: "Outros",
        color: "#FFCDD2",
        icon: "PiggyBank",
        userId,
        type: "income",
      },
    ],
  });
};
