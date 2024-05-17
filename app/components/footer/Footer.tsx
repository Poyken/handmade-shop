import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href="/">Vòng tay và lắc tay</Link>
            <Link href="/">Màu họa và đồ thủ công</Link>
            <Link href="/">Móc khóa</Link>
            <Link href="/">Hoa và lọ</Link>
            <Link href="/">Túi đeo</Link>
            <Link href="/">Khác</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Services</h3>
            <Link href="/">Liên hệ</Link>
            <Link href="/">Chính sách vận chuyển</Link>
            <Link href="/">Trả hàng & Đổi lại</Link>
            <Link href="/">Chính Sách Bảo Mật</Link>
            <Link href="/">Câu hỏi thường gặp</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">Về chúng tôi</h3>
            <p className="mb-2">
              Handmade-Shop - ứng dụng mua sắm trực tuyến thú vị, tin cậy, an
              toàn và miễn phí! Handmade-Shop là nền tảng giao dịch trực tuyến
              hàng đầu ở Đông Nam Á, có trụ sở chính ở Singapore, đã có mặt ở
              khắp các khu vực Singapore, Malaysia, Indonesia, Thái Lan,
              Philippines, Đài Loan, Brazil, México & Colombia. Với sự đảm bảo
              của Handmade-Shop, bạn sẽ mua hàng trực tuyến an tâm và nhanh
              chóng hơn bao giờ hết!
            </p>
            <p>
              &copy; {new Date().getFullYear()} Tất cả các quyền được bảo lưu.
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold">Theo dõi</h3>
            <div className="flex gap-2">
              <Link href="/">
                <MdFacebook size={24}></MdFacebook>
              </Link>
              <Link href="/">
                <AiFillTwitterCircle size={24}></AiFillTwitterCircle>
              </Link>
              <Link href="/">
                <AiFillInstagram size={24}></AiFillInstagram>
              </Link>
              <Link href="/">
                <AiFillYoutube size={24}></AiFillYoutube>
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
