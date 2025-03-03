"use client";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import AdvancedRtlTable from "@/components/table";

export default function Markets() {
  const fetcher = (...args: [string, RequestInit?]) =>
    fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://api.bitpin.ir/v1/mkt/markets/",
    fetcher
  );

  const [selectedMarketBase, setSelectedMarketBase] = useState("تومان");

  console.log({ data });

  const columns = [
    { header: "نام رمزارز", accessor: "id", render: (row) => row?.currency1?.title_fa },
    { header: "آخرین قیمت", accessor: "price" },
    { header: "تغییرات", accessor: "id",  render: (row) => row?.price_info?.change },
    { header: "ارزش معاملات 24h", accessor: "market_cap" },
    { header: "حجم معاملات 24h", accessor: "volume_24h", },
  ];
  
  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
  };

  return (
    <div dir="rtl" className="text-right">
      صفحه بازارها
      <div className="flex justify-end">
        <div className="border flex gap-4 py-3 px-5 rounded">
          <span
            className={`px-3 py-2 rounded cursor-pointer transition-colors ${
              selectedMarketBase === "تتر" ? "bg-[#DEF3DE]" : "bg-white"
            }`}
            onClick={() => setSelectedMarketBase("تتر")}
          >
            تتر
          </span>
          <span
            className={`px-3 py-2 rounded cursor-pointer transition-colors ${
              selectedMarketBase === "تومان" ? "bg-[#DEF3DE]" : "bg-white"
            }`}
            onClick={() => setSelectedMarketBase("تومان")}
          >
            تومان
          </span>
        </div>
      </div>


<AdvancedRtlTable 
            caption="لیست فاکتورهای اخیر شما (صفحه‌بندی سمت کلاینت)"
            columns={columns}
            data={data?.results || []}
            onRowClick={handleRowClick}
            pageSize={10}
            pageSizeOptions={[5, 10, 15, 20]}
          />
    </div>
  );
}
