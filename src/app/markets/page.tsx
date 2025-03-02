"use client"
import useSWR from "swr"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

export default function Markets() {
    const fetcher = (...args: [string, RequestInit?]) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR("https://api.bitpin.ir/v1/mkt/markets/", fetcher)
    
    console.log({ data })
    
    return (
        <div dir="rtl" className="text-right">
            صفحه بازارها

            <Table dir="rtl" className="text-right">
              <TableCaption>لیست فاکتورهای اخیر شما.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">فاکتور</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">روش</TableHead>
                  <TableHead className="text-right">مبلغ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-right">INV001</TableCell>
                  <TableCell className="text-right">پرداخت شده</TableCell>
                  <TableCell className="text-right">کارت اعتباری</TableCell>
                  <TableCell className="text-right">{"۲۵۰۰۰۰"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </div>
    )
}