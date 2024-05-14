"use client";
import { BRAND } from "@/types/brand";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../baseUrl.js";
import { useRouter } from "next/navigation";
import { getUser } from "../../localStorage.js";

const axios = require("axios");

const TableOne = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [remarks, setRemarks] = useState("");
  const router = useRouter();
  const user = getUser();
  if (user?.role !== "admin") {
    router.push("/");
  }
  const fetchStudentsData = () => {
    axios
      .get(`${BASE_URL}/users/get_all_students/${user?.gender}`)
      .then((res: any) => {
        setAllStudents(res?.data?.users);
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  };
  const verifyUser = (id: string, value: boolean) => {
    axios
      .put(`${BASE_URL}/users/verify/${id}`, {
        isVerified: value,
        status: value ? "verified" : "declined",
        remarks,
      })
      .then((res: any) => {
        fetchStudentsData();
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchStudentsData();
  }, []);
  console.log(allStudents);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Student Details
      </h4>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Registration Number</th>
              <th>Room Number</th>
              <th>Gender</th>
              <th>Fee Receipt</th>
              <th>Verified</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allStudents.map((st: any, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{st?.userName}</td>
                <td>{st?.registrationNumber}</td>
                <td>{st?.roomNumber}</td>
                <td>{st?.gender}</td>
                <td>
                  <a
                  style={{textDecoration: "underline"}}
                  id="download_image"
                    href={`http://localhost:8000${st?.feeReceipt}`}
                    download
                  >View Fee Script</a>
                </td>
                <td>{(st?.isVerified).toString()}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Remarks"
                    className="input input-bordered w-30"
                    onChange={(e) => setRemarks(e.target.value)}
                    disabled={index>0}
                  />
                </td>
                <td>
                  <>
                    <button
                      className="btn btn-outline btn-success"
                      onClick={() => verifyUser(st?.email, true)}
                      disabled={index>0}
                    >
                      Verify
                    </button>

                    <button
                      className="btn btn-outline btn-error ms-2"
                      onClick={() => verifyUser(st?.email, false)}
                      disabled={index>0}
                    >
                      Decline
                    </button>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOne;
