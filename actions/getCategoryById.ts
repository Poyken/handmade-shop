import prisma from "@/libs/prismadb";

interface IParams {
  categoryId?: string;
}

export default async function getCategoryById(params: IParams) {
  try {
    const { categoryId } = params;
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return category;
  } catch (error: any) {
    throw new Error(error);
  }
}
