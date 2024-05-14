"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import {getUser} from "../../localStorage"
import { useRouter } from 'next/navigation'



const Profile = () => {
  const user = getUser();
  const router = useRouter()
  console.log(user);
  if(!user || user?.role!=="student")
    {
      router.push("/");
    }
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Hostel Map" />

        <Image
          src={"/images/image 8.png"}
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
