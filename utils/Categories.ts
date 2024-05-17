import { AiFillPhone, AiOutlineDesktop, AiOutlineLaptop } from "react-icons/ai";
import { MdOutlineKeyboard, MdStorefront, MdTv, MdWatch } from "react-icons/md";
import { PiFlowerTulipBold } from "react-icons/pi";
import { GiEmeraldNecklace } from "react-icons/gi";
import { GiPendantKey } from "react-icons/gi";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
export const categories = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Vòng tay & Lắc tay",
    icon: GiEmeraldNecklace,
  },
  {
    label: "Màu họa và đồ thủ công",
    icon: IoIosColorPalette,
  },
  {
    label: "Móc khóa",
    icon: GiPendantKey,
  },
  {
    label: "Hoa và lọ",
    icon: PiFlowerTulipBold,
  },
  {
    label: "Túi đeo",
    icon: FaShoppingBag,
  },
  {
    label: "Khác",
    icon: MdOutlineKeyboard,
  },
];
