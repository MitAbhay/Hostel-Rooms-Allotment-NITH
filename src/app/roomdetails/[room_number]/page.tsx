// pages/room/[room_number].tsx
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import { Metadata } from "next";

// Sample JSON data
import roomData from "@/data.json";

// export const metadata: Metadata = {
//   title: "Room Details | TailAdmin - Next.js Dashboard Template",
//   description:
//     "Room details page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const RoomDetailsPage = () => {
  const room_number = useParams<{ room_number: string }>();
  console.log(room_number);
  const [room] = useState(
    roomData.rooms.find((r) => r.room_number === room_number.room_number),
  );

  if (!room) {
    // Room not found
    return <div>Room not found</div>;
  }

  return (
    <DefaultLayout>
      <h1 className="mb-4 text-2xl font-bold">Room Details</h1>
      <div>
        <p>Room Number: {room.room_number}</p>
        <p>Remaining Seats: {room.vacant_seats}</p>
        <p>Total Seats: {room.total_seats}</p>
        <h2 className="mb-2 mt-6 text-xl font-bold">Students:</h2>
        <ul>
          {room.students.map((student) => (
            <li key={student.student_id}>
              <p>Name: {student.name}</p>
              <p>Age: {student.age}</p>
              <p>Gender: {student.gender}</p>
            </li>
          ))}
        </ul>
      </div>
    </DefaultLayout>
  );
};

export default RoomDetailsPage;
