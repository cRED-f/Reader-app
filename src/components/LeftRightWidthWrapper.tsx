import { clsname } from "../utils/utils";

const LeftRightWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsname(
        "mx-auto w-full max-w-screen-xl  px-2.5 md:px-20",

        className
      )}
    >
      {children}
    </div>
  );
};

export default LeftRightWidthWrapper;
