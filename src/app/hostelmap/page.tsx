"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { getUser } from "../../localStorage";
import { useRouter } from "next/navigation";

const Profile = () => {
  const user = getUser();
  const router = useRouter();
  console.log(user);
  if (!user || user?.role !== "student") {
    router.push("/");
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Hostel Map" />
      <div className="mx-auto flex max-w-242.5 flex-col space-y-8">
        <Image
          src={"/images/main.jpg"}
          alt="profile cover"
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          width={970}
          height={260}
          style={{
            width: "auto",
            height: "auto",
          }}
        />
        <Image
          src={"/images/A.jpg"}
          alt="profile cover"
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          width={970}
          height={260}
          style={{
            width: "auto",
            height: "auto",
          }}
        />
        <Image
          src={"/images/B.jpg"}
          alt="profile cover"
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          width={970}
          height={260}
          style={{
            width: "auto",
            height: "auto",
          }}
        />
        <Image
          src={"/images/C.jpg"}
          alt="profile cover"
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          width={970}
          height={260}
          style={{
            width: "auto",
            height: "auto",
          }}
        />
        <Image
          src={"/images/D.jpg"}
          alt="profile cover"
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          width={970}
          height={260}
          style={{
            width: "auto",
            height: "auto",
          }}
        />
        <Image
          src={"/images/E.jpg"}
          alt="profile cover"
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          width={970}
          height={260}
          style={{
            width: "auto",
            height: "auto",
          }}
        />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
