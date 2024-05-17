import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const review = await prisma.review.delete({
    where: { id: params.id },
  });

  return NextResponse.json(review);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { id, rating, comment } = body;

  // Check if the product exists
  const existingReview = await prisma.review.findUnique({
    where: { id: params.id },
  });
  if (!existingReview) {
    return NextResponse.error();
  }

  // Update the product with the new values
  const updatedProduct = await prisma.review.update({
    where: { id: params.id },
    data: {
      rating: rating || existingReview.rating,
      comment: comment || existingReview.comment,
    },
  });

  return NextResponse.json(updatedProduct);
}
