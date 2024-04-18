import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Rooms from "@/data.json";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          BLOCK A
        </h4>
        <div className="m-6 grid grid-cols-4 gap-8">
          {Rooms.rooms.map((room) => (
            <Link
              key={room.room_number}
              href={`/roomdetails/${room.room_number}`}
            >
              <div className="flex w-full cursor-pointer flex-col rounded-lg border border-primary bg-primary p-4 text-center text-white transition hover:bg-opacity-90">
                <span>Room Number: {room.room_number}</span>
                <span>Remaining Seats: {room.vacant_seats}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
