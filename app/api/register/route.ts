import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, phone } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      phone,
    },
  });
  return NextResponse.json(user);
}
