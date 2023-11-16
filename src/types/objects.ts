export interface Student {
    RFID: string;
    StudentId: number;
    StudentName: string;
    StudentBalance: number;
    StudentStatus: string;
    StudentEmail: string;
  }

export interface Transaction {
    TransactionId: number;
    TransactionDate: string;
    TransactionTime: string;
    TransactionAmount: number;
    Student_id: number;
  }
  
  