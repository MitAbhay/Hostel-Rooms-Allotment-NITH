// pages/room/[room_number].tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DefaultLayoutAdmin from "@/components/Layouts/DefaultLayoutAdmin";
import {BASE_URL} from "../../../baseUrl.js";
// import { Metadata } from "next";

// Sample JSON data
import roomData from "@/data.json";
import axios from "axios";

// export const metadata: Metadata = {
//   title: "Room Details | TailAdmin - Next.js Dashboard Template",
//   description:
//     "Room details page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const RoomDetailsPage = () => {
  const {room_number} = useParams<{ room_number: string }>();
  const [roomData, setRoomData] = useState<any>({});
  const [studentsData, setStudentsData] = useState([]);
  const fetchRoomData = ()=> {
    axios
      .get(`${BASE_URL}/rooms/get_by_num/${room_number}`
      )
      .then((res: any) => {
        console.log(res?.data?.data);
        setRoomData(res?.data?.data);
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  }
  const fetchRoomStudentData = ()=> {
    axios
      .get(`${BASE_URL}/users/get_by_num/${room_number}`
      )
      .then((res: any) => {
        console.log(res?.data);
        setStudentsData(res?.data?.data);
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  }
  useEffect(()=> {
    fetchRoomData();
    fetchRoomStudentData();
  }, [room_number])
  console.log(roomData);
  return (
    <DefaultLayoutAdmin>
      <h1 className="mb-4 text-2xl font-bold">Room Details</h1>
      <div>
        <p>Room Number: {roomData?.roomNumber}</p>
        <p>Remaining Seats: {roomData?.size - roomData?.currentSize}</p>
        <p>Total Seats: {roomData?.size}</p>
        <h2 className="mb-2 mt-6 text-xl font-bold">Students:</h2>
        <ul>
          {studentsData.map((student:any) => (
            <li key={student?._id}>
              <p>Name: {student?.userName}</p>
              <p>Registration Number: {student?.registrationNumber}</p>
              <p>Gender: {student?.gender}</p>
            </li>
          ))}
        </ul>
      </div>
    </DefaultLayoutAdmin>
  );
};

export default RoomDetailsPage;
