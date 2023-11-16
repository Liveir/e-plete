import React from "react";

const studentColumns = [
  {name: "NAME", uid: "StudentName", sortable: true},
  {name: "ID", uid: "StudentId", sortable: true},
  {name: "BALANCE", uid: "StudentBalance"},
  {name: "STATUS", uid: "StudentStatus", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const transactionColumns = [
    {name: "ID", uid: "TransactionId", sortable: true},
    {name: "STUDENT NO.", uid: "Student_id", sortable: true},
    {name: "DATE", uid: "TransactionDate", sortable: true},
    {name: "TIME", uid: "TransactionTime"},
    {name: "ACTIONS", uid: "actions"},
  ];
  

export {studentColumns, transactionColumns};
