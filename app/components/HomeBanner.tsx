import Image from "next/image";
const HomeBanner = () => {
  return (
    <div className="relative ">
      <div className="mx-auto  flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="w-4/5 relative aspect-video">
          <Image
            src="/banner-image.jpg"
            fill
            alt="Banner Image"
            className="object-contain"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
