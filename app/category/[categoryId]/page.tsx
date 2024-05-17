import Container from "@/app/components/Container";
import CategoryDetails from "./CategoryDetails";
import NullData from "@/app/components/NullData";
import getCategoryById from "@/actions/getCategoryById";

interface IParams {
  categoryId?: string;
}

const Category = async ({ params }: { params: IParams }) => {
  const category = await getCategoryById(params);
  if (!category) {
    return <NullData title="Danh mục có id đã cho không tồn tại"></NullData>;
  }
  return (
    <div className="p-8">
      <Container>
        <CategoryDetails category={category}></CategoryDetails>
      </Container>
    </div>
  );
};

export default Category;
