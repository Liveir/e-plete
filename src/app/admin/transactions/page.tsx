"use client"

import TransactionTable from "@/components/TransactionTable";
import { fetchAllTransactions, fetchStudent } from "@/utils/fetch";
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { Transaction, TransactionJSON } from "@/types/objects";

export default function Transactions() {
  const { isLoading, isError, data: json, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchAllTransactions,
  });

  if (isLoading) {
    return (
      <div className='w-full min-h-screen text-center pt-96'>
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className='w-full min-h-screen text-center pt-96'>
        Error: {error.message}
      </div>
    );
  }

  // Assuming json is an array of TransactionJSON
  const transactions: Transaction[] = json.map((transaction: any, index: number) => ({
    TransactionId: transaction.TransactionId,
    TransactionDate: transaction.TransactionDate,
    TransactionTime: transaction.TransactionTime,
    TransactionAmount: transaction.TransactionAmount,
    StudentId: json[index]?.Student?.StudentId || 0,
    StudentName: json[index]?.Student?.StudentName || '',
    TransactionType: transaction.TransactionType,
  }));

  return (
    <div className='w-full'>
      <div aria-label='table-wrapper' className="m-24">
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
