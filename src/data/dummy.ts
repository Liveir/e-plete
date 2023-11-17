import React from "react";

const students = [
  {
    RFID: "a1b2c3",
    StudentId: 20102663,
    StudentName: "Johnfil L. Initan",
    StudentBalance: 2320.23,
    StudentStatus: "active",
    StudentEmail: "20102663@usc.edu.ph",
  },
];

const transactions = [
  {
    TransactionId: 1,
    TransactionDate: "16/11/2023",
    TransactionTime: "01:50",
    TransactionAmount: -123.00,
    Student_id: 201026633,
    TransactionType: "payment",
  },
];

export {students, transactions};
