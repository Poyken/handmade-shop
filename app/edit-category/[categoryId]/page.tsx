import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getCategoryById from "@/actions/getCategoryById";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditCategoryForm from "./EditCategoryForm";

interface IParams {
  categoryId?: string;
}

const EditCategoryProduct = async ({ params }: { params: IParams }) => {
  const user = await getCurrentUser();
  const category = await getCategoryById(params);
  if (!category || user?.role !== "ADMIN") {
    return <NullData title="Oops! Category with the given id does not exist" />;
  }

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <EditCategoryForm category={category} />
        </FormWrap>
      </Container>
    </div>
  );
};

export default EditCategoryProduct;
