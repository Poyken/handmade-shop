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
  const { updatedAt, role } = body;
  const user = await prisma.user.create({
    data: {
      role,
      updatedAt,
    },
  });
  return NextResponse.json(user);
}
export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { id, role } = body;
  const user = await prisma.user.update({
    where: { id: id },
    data: { role, updatedAt: new Date() },
  });
  return NextResponse.json(user);
}
