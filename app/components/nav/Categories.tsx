"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Container from "../Container";
// import { categories } from "@/utils/Categories";
import Category from "./Category";
interface ICategory {
  categories: any;
}
const Categories: React.FC<ICategory> = ({ categories }) => {
  const params = useSearchParams();

  const category = params?.get("category");

  const pathname = usePathname();
  const isMainPage = pathname === "/";
  if (!isMainPage) return null;
  return (
    <div className="bg-white">
      <Container>
        <div className="pt-4 flex flow-row items-center justify-between overflow-x-auto">
          {categories.map(
            (item: any) =>
              item.status === "active" && (
                <Category
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  selected={
                    category === item.label ||
                    (category === null && item.label === "All")
                  }
                ></Category>
              )
          )}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
