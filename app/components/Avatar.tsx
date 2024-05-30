import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
interface AvatarProps {
  src?: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        // height={30}
        // width={30}
        fill
      ></Image>
    );
  }
  return <FaUserCircle></FaUserCircle>;
};

export default Avatar;
