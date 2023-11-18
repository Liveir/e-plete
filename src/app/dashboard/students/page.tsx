"use client"

import StudentTable from "@/components/Admin/StudentTable";
import {fetchAllStudents} from "@/utils/queries";
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import {Student} from "@/types/objects";

export default function Students() {
    const { isLoading, isError, data, error } = useQuery({
      queryKey: ['students'],
      queryFn: fetchAllStudents,
    })

    if (isLoading) {
      return (
        <div className='w-full min-h-screen text-center pt-96'>
          Loading...
        </div>
      )
    }
  
    if (isError) {
      return (
        <div className='w-full min-h-screen text-center pt-96'>
          Error: {error.message}
      </div>
      )
    }


    return (
      <div className='w-full'>
        <div aria-label='table-wrapper' className="m-24">
          <StudentTable students={data} />
        </div>
      </div>
    )
  }