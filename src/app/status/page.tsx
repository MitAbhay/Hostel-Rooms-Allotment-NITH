import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Room Status" />
      <div className="rounded-sm border border-stroke bg-white p-28 shadow-default dark:border-strokedark dark:bg-boxdark ">
        <div className="text-2xl font-bold"> Room Status</div>
        <div className="text-2xl font-bold"> Room Alloted</div>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
