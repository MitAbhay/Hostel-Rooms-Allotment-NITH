"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import {BASE_URL} from "../../baseUrl"
import {getUser} from "../../localStorage"
import { useRouter } from 'next/navigation'


const TablesPage = () => {
  const [studentData, setStudentData] = useState<any>(null);
  const [roomData, setRoomData] = useState<any>({});
  const [studentsData, setStudentsData] = useState([]);
  const user = getUser();
  const router = useRouter()
  if(!user || user?.role!=="student")
    {
      router.push("/");
    }
  const fetchStudentData = ()=> {
    axios
    .get(`${BASE_URL}/users/get_by_email/${user?.email}`
    )
    .then((res: any) => {
      console.log("this", res?.data?.data);
      setStudentData(res?.data?.data);
    })
    .catch((error: any) => {
      console.error("Error fetching data:", error);
    });
  }
  const fetchRoomData = ()=> {
    axios
      .get(`${BASE_URL}/rooms/get_by_num/${studentData?.roomNumber}`
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
      .get(`${BASE_URL}/users/get_by_num/${studentData?.roomNumber}`
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
    if(studentData?.roomNumber) {
      fetchRoomData();
      fetchRoomStudentData();
    }
  }, [studentData])
  useEffect(()=> {
    fetchStudentData();
  }, [])
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Room Status" />
      {
        studentData?.status ? <div className="rounded-sm border border-stroke bg-white p-28 shadow-default dark:border-strokedark dark:bg-boxdark ">
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
      </div>
        <div className="text-2xl font-bold mt-5"> Room allocation status: {studentData?.status}</div>
        <div className="text-2xl font-bold mt-5"> Remarks: {studentData?.remarks || "N/A"}</div>
      </div>
      : <></>
      }
    </DefaultLayout>
  );
};

export default TablesPage;
