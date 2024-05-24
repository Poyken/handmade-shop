interface BackDropProps {
  onClick: () => void;
  z: number;
}
const BackDrop: React.FC<BackDropProps> = ({ onClick, z }) => {
  return (
    <div
      onClick={onClick}
      className={`z-${
        20 + z
      } bg-slate-200 opacity-50 w-screen h-screen fixed top-0 left-0`}
    ></div>
  );
};

export default BackDrop;
