import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import hashPassword from "@/utils/hashPassword";
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const user = await prisma?.user.delete({ where: { id: params.id } });
  return NextResponse.json(user);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const body = await request.json();
  const { id, name, email, hashedPassword, phone, image } = body;

  // Check if the user exists
  const existingUser = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!existingUser) {
    return NextResponse.error();
  }

  // Update the user with the new values
  const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data: {
      name: name || existingUser.name,
      email: email || existingUser.email,
      hashedPassword: hashedPassword
        ? await hashPassword(hashedPassword)
        : hashedPassword || existingUser.hashedPassword,
      phone: phone || existingUser.phone,
      image: image || existingUser.image,
    },
  });

  return NextResponse.json(updatedUser);
}
