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
import Image from "next/image";
import {
  addSeparator,
  formatPersianNumber,
  toPersianNumber,
} from "@/lib/numberUtils";

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
    {
      header: "نام رمزارز",
      accessor: "id",
      render: (row) => {
        return (
          <div className="flex gap-2 items-center">
            <img src={row?.currency1?.image} width={30} height={30} alt="" />
            <div className="flex flex-col">
            <span className=" text-[14px] font-[500]">
                {row?.currency1?.title_fa}
              </span>
              <span className="text-[#676767] text-[12px]">{`${row?.currency1?.code} / ${row?.currency2?.code}`}</span>
      
            </div>
          </div>
        );
      },
    },
    {
      header: "آخرین قیمت",
      accessor: "price",
      render: (row) => <div className="flex flex-col">
        <span>{formatPersianNumber(row?.price, 4)}</span>
        <span className="text-[#676767]"> {row?.currency2?.title_fa}</span>
      </div> ,
    },
    {
      header: "تغییرات",
      accessor: "id",
      render: (row) => (
        <span
          className={`${
            row?.price_info?.change > 0
              ? "text-[#1FB87F]"
              : row?.price_info?.change < 0
              ? "text-[#EA373F]"
              : "text-[#000]"
          } font-[700] `}
        >{`% ${formatPersianNumber(row?.price_info?.change, 2)} `}</span>
      ),
    },
    {
      header: "ارزش معاملات 24h",
      accessor: "market_cap",
      render: (row) => <div className="flex flex-col">
      <span>{formatPersianNumber(row?.market_cap)}</span>
      <span className="text-[#676767]"> {row?.currency2?.title_fa}</span>
    </div> ,
    },
    {
      header: "حجم معاملات 24h",
      accessor: "volume_24h",
      render: (row) => <div className="flex flex-col">
      <span>{formatPersianNumber(row?.volume_24h)}</span>
      <span className="text-[#676767]"> {row?.currency2?.title_fa}</span>
    </div> ,
    },
  ];

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
  };

  return (
    <div dir="rtl" className="text-right border rounded-lg pb-2">
      <div className="flex justify-between items-center p-2 border-b">
        <span className="pr-5">رمزارزهای برتر</span>
        <div className="flex justify-end">
          <div className="border grid grid-cols-2  gap-1 py-1 px-1 rounded-[10px]">
            <span
              className={`px-3 py-[6px]  rounded-[10px] cursor-pointer text-center transition-colors ${
                selectedMarketBase === "تتر" ? "bg-[#DEF3DE]" : "bg-white"
              } ${
                selectedMarketBase === "تتر"
                  ? "text-[#1FB87F]"
                  : "text-[#939696]"
              }`}
              onClick={() => setSelectedMarketBase("تتر")}
            >
              تتر
            </span>
            <span
              className={`px-3 py-[6px] rounded-[10px] cursor-pointer transition-colors ${
                selectedMarketBase === "تومان" ? "bg-[#DEF3DE]" : "bg-white"
              } ${
                selectedMarketBase === "تومان"
                  ? "text-[#1FB87F]"
                  : "text-[#939696]"
              }`}
              onClick={() => setSelectedMarketBase("تومان")}
            >
              تومان
            </span>
          </div>
        </div>
      </div>

      <AdvancedRtlTable
        columns={columns}
        data={data?.results || []}
        onRowClick={handleRowClick}
        pageSize={10}
        pageSizeOptions={[5, 10, 15, 20]}
        rowHeight={80}
      />
    </div>
  );
}
