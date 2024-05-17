import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const category = await prisma?.category.delete({ where: { id: params.id } });
  return NextResponse.json(category);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, label, icon, status } = body;

  // Kiểm tra xem danh mục có tồn tại không
  const existingCategory = await prisma.category.findUnique({
    where: { id: params.id },
  });
  if (!existingCategory) {
    return NextResponse.error();
  }

  // Cập nhật danh mục với các giá trị mới
  const updatedCategory = await prisma.category.update({
    where: { id: params.id },
    data: {
      label: label || existingCategory.label,
      icon: icon || existingCategory.icon,
      status: status || existingCategory.status,
    },
  });

  return NextResponse.json(updatedCategory);
}
