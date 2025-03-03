"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AdvancedRtlTable({ 
  caption, 
  columns, 
  data, 
  className = "", 
  onRowClick = null 
}) {
  return (
    <Table dir="rtl" className={`text-right ${className}`}>
      {caption && <TableCaption>{caption}</TableCaption>}
      
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={`col-${index}`} className="text-right">
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow 
            key={`row-${rowIndex}`} 
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={onRowClick ? "cursor-pointer hover:bg-slate-50" : ""}
          >
            {columns.map((column, colIndex) => (
              <TableCell key={`cell-${rowIndex}-${colIndex}`} className="text-right">
                {column.render 
                  ? column.render(row, rowIndex) 
                  : column.accessor 
                    ? row[column.accessor] 
                    : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}