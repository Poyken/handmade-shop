import prisma from "@/libs/prismadb";
export default async function getCategories() {
  try {
    const categories = prisma?.category?.findMany();
    return categories;
  } catch (error: any) {
    throw new Error(error);
  }
}
