"use client";

import { Product, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/products/Heading";
import Status from "@/app/components/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import Image from "next/image";
import moment from "moment";
import { FaUser } from "react-icons/fa";
interface ManageUsersClientProps {
  users: User[];
}
const ManageUsersClient: React.FC<ManageUsersClientProps> = ({ users }) => {
  const storage = getStorage(firebaseApp);
  const router = useRouter();
  let rows: any = [];
  if (users) {
    rows = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role,
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
      field: "name",
      headerName: "Name",
      width: 120,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      //   renderCell: (params) => {
      //     return (
      //       <div className="font-bold text-slate-800">{params.row.email}</div>
      //     );
      //   },
    },

    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">
            {moment(params.row.createdAt).fromNow()}
          </div>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "UpdatedAt",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">
            {moment(params.row.updatedAt).fromNow()}
          </div>
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.role === "USER" ? (
              <Status
                text="USER"
                icon={FaUser}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="ADMIN"
                icon={RiAdminFill}
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
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.role);
              }}
            ></ActionBtn>
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.role);
              }}
            ></ActionBtn>
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/user/${params.row.id}`);
              }}
            ></ActionBtn>
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback((id: string, role: string) => {
    if (role === "ADMIN") {
      axios
        .put("/api/user", {
          id,
          role: "USER",
        })
        .then((res) => {
          toast.success("User status changed");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Oops! Something went wrong");
          console.log(err);
        });
    } else {
      axios
        .put("/api/user", {
          id,
          role: "ADMIN",
        })
        .then((res) => {
          toast.success("User status changed");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Oops! Something went wrong");
          console.log(err);
        });
    }
  }, []);

  const handleDelete = useCallback(async (id: String, role: string) => {
    if (role === "ADMIN") {
      toast.error("Admin cannot be deleted");
      return;
    }
    toast("Deleting User, please wait");
    axios
      .delete(`/api/user/${id}`)
      .then((res) => {
        toast.success("User deleted");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Failed to delete user");
        console.log(err);
      });
  }, []);
  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage User"></Heading>
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

export default ManageUsersClient;
