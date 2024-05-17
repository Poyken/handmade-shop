"use client";
interface CategoryDetailsProps {
  category: any;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ category }) => {
  return (
    <div>
      <h2 className="text-3xl font-medium text-slate-700">{category.label}</h2>
      <div className="text-justify">{category.description}</div>
      <div className="mt-4">
        <p>
          <strong>ID:</strong> {category.id}
        </p>
        <p>
          <strong>Label:</strong> {category.label}
        </p>
        <p>
          <strong>Icon:</strong> {category.icon}
        </p>
        <p>
          <strong>Status:</strong> {category.status}
        </p>
      </div>
    </div>
  );
};

export default CategoryDetails;
