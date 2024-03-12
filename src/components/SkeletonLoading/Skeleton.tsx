import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div role="status" className="animate-pulse">
      <div className={clsx(` bg-gray-300 dark:bg-gray-700`, className)}></div>
    </div>
  );
};

export default Skeleton;
