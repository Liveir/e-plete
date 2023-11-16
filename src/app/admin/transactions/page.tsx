"use client"

import TransactionTable from "@/components/TransactionTable";
import {fetchTransaction} from "@/utils/fetch";
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import {Transaction} from "@/types/objects";

export default function Transactions() {
    const { isLoading, isError, data, error } = useQuery({
      queryKey: ['transactions'],
      queryFn: fetchTransaction,
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
          <TransactionTable transactionss={data} />
        </div>
      </div>
    )
  }