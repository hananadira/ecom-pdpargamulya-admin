
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import './style/table'

export function Pembelian() {
  return (
    <div className="overflow-x-auto p-6 mt-10">
      <Table>
        <TableHead>
          <TableHeadCell>No</TableHeadCell>
          <TableHeadCell>Username</TableHeadCell>
          <TableHeadCell>Product</TableHeadCell>
          <TableHeadCell>Total</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'1'}
            </TableCell>
            <TableCell>Username_Customer</TableCell>
            <TableCell>Domba</TableCell>
            <TableCell>Rp. 3.500.000</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}


export default Pembelian