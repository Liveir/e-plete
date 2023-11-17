import React from "react";

const studentColumns = [
  {name: "NAME", uid: "StudentName", sortable: true},
  {name: "ID", uid: "StudentId", sortable: true},
  {name: "BALANCE", uid: "StudentBalance"},
  {name: "STATUS", uid: "StudentStatus", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const transactionColumns = [
    {name: "REF #", uid: "TransactionId", sortable: true},
    {name: "STUDENT", uid: "Student", sortable: true},
    {name: "DATE & TIME", uid: "TransactionDate", sortable: true},
    {name: "TRANSACTION", uid: "TransactionAmount"},
    {name: "ACTIONS", uid: "actions"},
  ];
  

export {studentColumns, transactionColumns};
