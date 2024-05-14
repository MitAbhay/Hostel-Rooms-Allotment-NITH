import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title: "Hostel Rooms Allotment for NITH",
  description: "Hostel Rooms Allotment for NITH",
};

export default function Home() {
  return (
    <>
      <SignIn />
      {/* <DefaultLayout>
        <ECommerce />
      </DefaultLayout> */}
    </>
  );
}
