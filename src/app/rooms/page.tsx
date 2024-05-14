"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DefaultLayoutAdmin from "@/components/Layouts/DefaultLayoutAdmin";
import Link from "next/link";
import axios from "axios";
import {BASE_URL} from "../../baseUrl.js";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import {getUser} from "../../localStorage.js"



const TablesPage = () => {
  const [allRoomsData, setAllRoomsData] = useState([]);
  const [block, setBlock] = useState("A");
  const router = useRouter();
  const user = getUser();
  const whom = user?.gender === "male" ? "boys" : "girls";
  if(user?.role !== "admin") {
    router.push("/");
  }
  const fetchRoomData = ()=> {
    axios
      .get(`${BASE_URL}/rooms/get_all_rooms/${block}/none`
      )
      .then((res: any) => {
        console.log(res?.data);
        setAllRoomsData(res?.data?.rooms);
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  }
  useEffect(()=> {
    fetchRoomData();
  }, [block])

  return (
    <DefaultLayoutAdmin>
      <Breadcrumb pageName="rooms" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        <select onChange={(e)=> setBlock(e.target.value)} className="select select-bordered w-full max-w-xs">
          <option value={"A"}>Block A</option>
          <option value={"B"}>Block B</option>
          <option value={"C"}>Block C</option>
        </select>
        </h4>
        <div className="m-6 grid grid-cols-4 gap-8">
          {allRoomsData.map((room:any) => (
            <Link
              key={room?.roomNumber}
              href={`/roomDetailsAdmin/${room?.roomNumber}`}
            >
              <div className="flex w-full cursor-pointer flex-col rounded-lg border border-primary bg-primary p-4 text-center text-white transition hover:bg-opacity-90">
                <span>Room Number: {room?.roomNumber}</span>
                <span>Total Seats: {room?.size}</span>
                <span>Remaining Seats: {room?.size - room?.currentSize}</span>
                <span>Block: {room?.block}</span>
                <span>Hostel for: {room?.roomType}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
};

export default TablesPage;
