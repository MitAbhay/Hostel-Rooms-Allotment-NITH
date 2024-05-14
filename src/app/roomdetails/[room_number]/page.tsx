// pages/room/[room_number].tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {BASE_URL} from "../../../baseUrl.js";
// import { Metadata } from "next";

// Sample JSON data
import roomData from "@/data.json";
import axios from "axios";
import {getUser} from "../../../localStorage"
import { useRouter } from 'next/navigation'

// export const metadata: Metadata = {
//   title: "Room Details | TailAdmin - Next.js Dashboard Template",
//   description:
//     "Room details page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const RoomDetailsPage = () => {
  const {room_number} = useParams<{ room_number: string }>();
  const [roomData, setRoomData] = useState<any>({});
  const [studentsData, setStudentsData] = useState([]);
  const [overStudent, setOverStudent] = useState<any>(null);
  const user = getUser();
  const router = useRouter()
  if(!user || user?.role!=="student")
    {
      router.push("/");
    }
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
  const fetchStudentData = ()=> {
    axios
    .get(`${BASE_URL}/users/get_by_email/${user?.email}`
    )
    .then((res: any) => {
      console.log("this", res?.data?.data);
      setOverStudent(res?.data?.data);
    })
    .catch((error: any) => {
      console.error("Error fetching data:", error);
    });
  }
  const requestRoom = ()=> {
    axios
      .post(`${BASE_URL}/users/request`,
      {
        email: user?.email,
        roomNumber: room_number
      }
      )
      .then((res: any) => {
        console.log(res?.data);
        fetchStudentData();
        fetchRoomData();
        fetchRoomStudentData();
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  }
  useEffect(()=> {
    fetchRoomData();
    fetchRoomStudentData();
    fetchStudentData();
  }, [room_number])
  return (
    <DefaultLayout>
      <h1 className="mb-4 text-2xl font-bold">Room Details</h1>
      <div>
        <p>Room Number: {roomData?.roomNumber}</p>
        <p>Remaining Seats: {roomData?.size - roomData?.currentSize}</p>
        <p>Total Seats: {roomData?.size}</p>
        <h2 className="mb-2 mt-6 text-xl font-bold">Students:</h2>
        {studentsData.length === 0?
        <p>No student in this room</p> :
          <ul>
          {studentsData.map((student:any) => (
            <li key={student?._id}>
              <p>Name: {student?.userName}</p>
              <p>Registration Number: {student?.registrationNumber}</p>
              <p>Gender: {student?.gender}</p>
            </li>
          ))}
        </ul>
        }
        {
          (overStudent?.roomNumber === parseInt(room_number) && overStudent?.status !== "declined") ? 
          <button className="btn btn-outline btn-error mt-10">Already Requested</button> :
          <button className="btn btn-outline btn-success mt-10" onClick={requestRoom}>Request this room</button>
        }
      </div>
    </DefaultLayout>
  );
};

export default RoomDetailsPage;
