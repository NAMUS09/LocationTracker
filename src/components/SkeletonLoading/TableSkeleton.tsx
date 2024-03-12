import Skeleton from "./Skeleton";

const TableSkeleton: React.FC<{
  column: number;
  row: number;
}> = ({ column, row }) => {
  return (
    <>
      {[...Array(row)].map((_, index) => (
        <tr key={index}>
          {[...Array(column)].map((_, index) => (
            <td key={index}>
              <Skeleton key={index} className=" rounded-lg h-8 w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
