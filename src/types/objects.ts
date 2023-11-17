export interface Student {
    RFID: string;
    StudentId: number;
    StudentName: string;
    StudentBalance: number;
    StudentStatus: string;
    StudentEmail: string;
  }

export interface TransactionJSON {
    TransactionId: number;
    TransactionDate: string;
    TransactionTime: string;
    TransactionAmount: number;
    Student: {
      RFID: string;
      StudentId: number;
      StudentName: string;
      StudentBalance: number;
      StudentStatus: string;
      StudentEmail: string;
    };
    TransactionType: string;
  }

  export interface Transaction {
    TransactionId: number;
    TransactionDate: string;
    TransactionTime: string;
    TransactionAmount: number;
    StudentId: number;
    StudentName: string;
    TransactionType: string;
  }
  
  