import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayoutAdmin from "@/components/Layouts/DefaultLayoutAdmin";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Chart | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Chart page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayoutAdmin>
      <Chart />
    </DefaultLayoutAdmin>
  );
};

export default BasicChartPage;