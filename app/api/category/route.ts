import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { label, icon, status } = body;

  try {
    const category = await prisma.category.create({
      data: {
        label,
        icon,
        status,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.error();
  }
}
export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { id, status } = body;
  const category = await prisma.category.update({
    where: { id: id },
    data: { status },
  });
  return NextResponse.json(category);
}
