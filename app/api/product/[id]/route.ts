import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const product = await prisma?.product.delete({ where: { id: params.id } });
  return NextResponse.json(product);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { id, name, description, price, brand, category, inStock, images } =
    body;

  // Check if the product exists
  const existingProduct = await prisma.product.findUnique({
    where: { id: params.id },
  });
  if (!existingProduct) {
    return NextResponse.error();
  }

  // Update the product with the new values
  const updatedProduct = await prisma.product.update({
    where: { id: params.id },
    data: {
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      price: price !== undefined ? parseFloat(price) : existingProduct.price,
      brand: brand || existingProduct.brand,
      category: category || existingProduct.category,
      inStock: inStock !== undefined ? inStock : existingProduct.inStock,
      images: images || existingProduct.images,
    },
  });

  return NextResponse.json(updatedProduct);
}
