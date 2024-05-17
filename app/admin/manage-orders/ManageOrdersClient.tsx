"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/products/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdCancel,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getStorage } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import moment from "moment";
interface ManageOrdersClientProps {
  orders: ExtendOrder[];
}
type ExtendOrder = Order & {
  user: User;
};
const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const storage = getStorage(firebaseApp);
  const router = useRouter();
  let rows: any = [];
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount),
        paymentStatus: order.status,
        date: moment(order.createdDate).format("DD/MM/YYYY HH:mm:ss a"),
        deliveryStatus: order.deliveryStatus,
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
      field: "customer",
      headerName: "Tên",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Giá(VND)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Trạng thái thanh toán",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="Đang chờ"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status
                text="Hoàn thành"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Trạng thái vận chuyển",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="Đang chờ"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="Đã gửi"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status
                text="Đã giao"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Thời gian đặt hàng",
      width: 180,
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            ></ActionBtn>
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDeliver(params.row.id);
              }}
            ></ActionBtn>
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            ></ActionBtn>
            {params.row.deliveryStatus === "pending" && (
              <ActionBtn
                icon={MdCancel}
                onClick={() => {
                  handleDelete(params.row.id);
                }}
              ></ActionBtn>
            )}
          </div>
        );
      },
    },
  ];
  const handleDelete = useCallback(async (id: string) => {
    axios
      .delete(`/api/order/${id}`)
      .then((res) => {
        toast.success("Đã xóa đơn hàng");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Đã có lỗi khi xóa đơn hàng");
        console.log(err);
      });
  }, []);
  const handleDispatch = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "dispatched",
      })
      .then((res) => {
        toast.success("Đơn hàng đã được gửi");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra");
        console.log(err);
      });
  }, []);
  const handleDeliver = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "delivered",
      })
      .then((res) => {
        toast.success("Đơn hàng đã được giao");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra");
        console.log(err);
      });
  }, []);
  return (
    <div className="max-w-[1300px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Quản lý đơn hàng"></Heading>
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

export default ManageOrdersClient;
