import { getCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import moment from "moment";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { comment, rating, product, userId } = body;
  const deliveredOrder = currentUser?.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );
  const userReview = product?.reviews.find((review: Review) => {
    return review.userId === currentUser.id;
  });
  if (userReview || !deliveredOrder) {
    return NextResponse.error();
  }
  const review = await prisma?.review.create({
    data: {
      comment,
      rating,
      productId: product.id,
      userId,
      createdDate: new Date(),
    },
  });
  return NextResponse.json(review);
}
export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { id, rating, comment } = body;
  const review = await prisma.review.update({
    where: { id: id },
    data: { rating, comment },
  });
  return NextResponse.json(review);
}
