import { clsname } from "../utils/utils";
const BackgroundColor = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsname(
        "   bg-gradient-to-tr from-indigo-950 via-bg-[#0D3145] to-bg-[#0B1020] backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
};
export default BackgroundColor;
