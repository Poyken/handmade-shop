"use client";
import { Category } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Heading from "@/app/components/products/Heading";
import Status from "@/app/components/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdEdit,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface ManageCategoriesClientProps {
  categories: Category[];
}

const ManageCategoriesClient: React.FC<ManageCategoriesClientProps> = ({
  categories,
}) => {
  const storage = getStorage(firebaseApp);
  const router = useRouter();

  let rows: any = [];
  if (categories) {
    rows = categories.map((category) => {
      return {
        id: category.id,
        icon: category.icon,
        label: category.label,
        status: category.status,
      };
    });
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "label",
      headerName: "Tên",
      width: 220,
    },
    {
      field: "icon",
      headerName: "Icon",
      width: 200,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status === "active" ? (
              <Status
                text="ACTIVE"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="INACTIVE"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-rose-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.status);
              }}
            ></ActionBtn>
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id);
              }}
            ></ActionBtn>
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/category/${params.row.id}`);
              }}
            ></ActionBtn>
            <ActionBtn
              icon={MdEdit}
              onClick={() => {
                router.push(`/edit-category/${params.row.id}`);
              }}
            ></ActionBtn>
          </div>
        );
      },
    },
  ];
  const handleToggleStock = useCallback((id: string, status: string) => {
    if (status === "inactive") {
      axios
        .put("/api/category", {
          id,
          status: "active",
        })
        .then((res) => {
          toast.success("Đã thay đổi trạng thái");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Đã có lỗi xảy ra");
          console.log(err);
        });
    }
    if (status === "active") {
      axios
        .put("/api/category", {
          id,
          status: "inactive",
        })
        .then((res) => {
          toast.success("Đã thay đổi trạng thái");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Đã có lỗi xảy ra");
          console.log(err);
        });
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    axios
      .delete(`/api/category/${id}`)
      .then((res) => {
        toast.success("Đã xóa danh mục");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Có lỗi khi xóa danh mục");
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Quản lý danh mục"></Heading>
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageCategoriesClient;
