"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayoutAdmin from "@/components/Layouts/DefaultLayoutAdmin";
import { useState } from "react";
import axios from "axios";
import {BASE_URL} from "../../baseUrl"
import { useRouter } from 'next/navigation'
import {getUser} from "../../localStorage.js"

const Settings = () => {
  const [student1, setStudent1] = useState("");
  const [student2, setStudent2] = useState("");
  const router = useRouter();
  const user = getUser();
  if(user?.role !== "admin") {
    router.push("/");
  }
  const swapRoom = ()=> {
    // e?.preventDefault();
    axios
      .put(`${BASE_URL}/users/swap/${student1}/${student2}`
      )
      .then((res: any) => {
        console.log(res?.data);
        router.prefetch("/changeroom");
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  }
  return (
    <DefaultLayoutAdmin>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Swap Room" />

        <div className="">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Swap Room
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Enter Student 1 Registration No
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="Username"
                      id="Username"
                      onChange={(e)=> setStudent1(e.target.value)}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Enter Student 2 Registration No
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="Username"
                      id="Username"
                      onChange={(e)=> setStudent2(e.target.value)}
                    />
                  </div>

                  {/* 
                  <div className="col-span-5 xl:col-span-2"> */}

                  {/* </div> */}

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      onClick={()=> swapRoom()}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
};

export default Settings;
