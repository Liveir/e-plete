import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { PlusIcon } from "../Icons/PlusIcon";
import { CloseIcon } from "../Icons/CloseIcon";
import { PersonIcon } from "../Icons/PersonIcon";
import { MailIcon } from "../Icons/MailIcon";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { addTransaction, fetchStudent, updateStudent } from "@/utils/queries"
import { Student, Transaction, TransactionJSON } from "@/types/objects"
import { MoneyIcon } from "../Icons/MoneyIcon";
import TransactionTypeSelect from "../TransactionTypeSelect";
import { randomUUID } from "crypto";

interface AppProps {
  transactions_length: number
}

const AddTransactionModal: FC<AppProps> = ({transactions_length}: AppProps) => {
// ** STATE DECLARATIONS
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [transactionType, setTransactionType] = React.useState("deposit")
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [submissionStatus, setStatus] = useState<string | null>(null);
 
  const handleTransactionSelect = (transactionType: string) => {
    setTransactionType(transactionType);
  };

  // ** DYNAMICALLY UPDATE FIELDS

  const { isLoading, data:student, refetch, isError} = useQuery({
    queryKey: ['students'],
    queryFn: () => {
      return fetchStudent(Number(id))
    },
    enabled: false,
  })

  useEffect(() => {
    refetch()
  },[id, refetch])

  useEffect(() => {
    if (!isLoading && !isError && student) {
      setName(student.StudentName);
      setEmail(student.StudentEmail);
    } else {
      setName('');
      setEmail('');
    }
  },[isLoading, isError, student])

  // ** ON SUBMIT 
  
  const updateStudentData = (data: any): Student => {
    let newBalance: number;

    if (transactionType === 'deposit' || transactionType === 'receive') {
      newBalance = data.StudentBalance + Number(amount)
    } else {
      newBalance = data.StudentBalance - Number(amount)
    }
    return {
      RFID: data.RFID,
      StudentId: data.StudentId,
      StudentName: data.StudentName,
      StudentBalance: newBalance,
      StudentStatus: data.StudentStatus,
      StudentEmail: data.StudentEmail,
    };
  };

  const createTransaction = (data: any): TransactionJSON => {
    const date = new Date();
    return {
      TransactionId: transactions_length+1,
      TransactionDate: String(date.toISOString().split('T')[0]),
      TransactionTime: String(date.toLocaleTimeString()),
      TransactionAmount: Number(amount),
      Student: {
        RFID: data.RFID,
        StudentId: data.StudentId,
        StudentName: data.StudentName,
        StudentBalance: data.StudentBalance,
        StudentStatus: data.StudentStatus,
        StudentEmail: data.StudentEmail,
      },
      TransactionType: transactionType
    }
  }


  const handleSubmit = async () => {
    setMessage(null);

    try {
      const newTransaction = createTransaction(student);
      const transactionResponse = await addTransaction(JSON.stringify(newTransaction))

      alert(JSON.stringify(newTransaction, null, 2))

      if (transactionResponse.status === "success") {
        const updatedStudent = updateStudentData(student);
        const studentResponse = await updateStudent(JSON.stringify(updatedStudent));
        alert(JSON.stringify(updatedStudent, null, 2))


        if (studentResponse.status === "success") {
          setMessage("Transaction successful!");
        } else {
          setMessage("Transaction failed. Please try again.");
        }
        setStatus(studentResponse.status)
      } else {
        setMessage("Transaction failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if(!isOpen && isSubmitted) {
      location.replace(location.href)
    }
    return () => {
      setTransactionType("deposit");
      setName("");
      setId("");
      setEmail("");
      setAmount("");
      setSubmitted(false);
      setMessage(null);
      setStatus(null);
    };
  }, [isOpen, isSubmitted]);

  return (
    <>
      <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        Add New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={isSubmitted ? 'hidden' : 'flex flex-col gap-1'}>New transaction</ModalHeader>
              <ModalBody>
                <div className={isSubmitted ? 'hidden' : 'flex flex-col gap-3'}>
                  <Input
                    autoFocus
                    endContent={
                      <CloseIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="ID"
                    placeholder="Enter student ID number"
                    variant="bordered"
                    value={id}
                    onValueChange={setId}
                    isRequired
                    isClearable
                  />
                  <Input
                    endContent={
                      <PersonIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    placeholder="Name"
                    variant="bordered"
                    value={name}
                    onValueChange={setName}
                    isReadOnly
                  />
                  <Input
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    placeholder="Email"
                    variant="bordered"
                    value={email}
                    onValueChange={setName}
                    isReadOnly
                  />
                  <Input
                    label="Amount"
                    placeholder="0.00"
                    variant="bordered"
                    isRequired
                    startContent={
                      <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">₱</span>
                      </div>
                    }
                    endContent={
                      <MoneyIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    value={amount}
                    onValueChange={setAmount}
                  />
                  <TransactionTypeSelect onTransactionSelect={handleTransactionSelect} />
                </div>
                {message && (
                  <div className={`flex justify-center items-center h-20 text-${submissionStatus === "success" ? "success" : "danger"}`}>
                    {message}
                  </div>
                )}
              </ModalBody>
              <ModalFooter className={isSubmitted ? 'hidden' : ''}>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                 color="primary" 
                 onPress={() => { handleSubmit(); }} 
                 >
                  Submit
                </Button>
                </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTransactionModal;
