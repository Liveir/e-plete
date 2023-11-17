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
import { addStudent, checkStudent, updateStudent } from "@/utils/queries"
import { Student, Transaction, TransactionJSON } from "@/types/objects"
import { MoneyIcon } from "../Icons/MoneyIcon";
import StatusTypeSelect from "../StatusTypeSelect";
import { v4 as uuidv4 } from "uuid";

interface AppProps {
}

const AddStudentModal: FC<AppProps> = ({}) => {
// ** STATE DECLARATIONS
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [statusType, setStatusType] = React.useState("active")
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [isValid, setValid] = React.useState("false")
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [submissionStatus, setStatus] = useState<string | null>(null);
 
  const handleStatusSelect = (statusType: string) => {
    setStatusType(statusType);
  };

  // ** DYNAMICALLY UPDATE FIELDS


  useEffect(() => {
    setEmail(`${id}@usc.edu.ph`);
    if (name !== '' && id !== '') {
        setValid("true")
    } else {
        setValid("false")
    }
  },[name, id])

  // ** ON SUBMIT 

  const createStudent = (): Student => {
    const rfid = uuidv4()
    return {
      RFID: uuidv4(),
      StudentId: Number(id),
      StudentName: name,
      StudentBalance: 0,
      StudentStatus: statusType,
      StudentEmail: email,
    }
  }


  const handleSubmit = async () => {
    setMessage(null);
    try {
      const res = await checkStudent(Number(id))
      const newStudent = createStudent();
      alert(JSON.stringify(newStudent, null, 2))
      if (res.status === "error") {
        const studentResponse = await addStudent(JSON.stringify(newStudent)) 

        if (studentResponse.status === "success") {
          setMessage("Student added successfully!");
          setStatus(studentResponse.status)
        } else {
          setMessage("Student not added. Please try again.");
        }
      } else {
        updateStudent(newStudent)
        setMessage("Student exists. Updated details.");
        setStatus(res.status)
      }
    } catch (error) {
      console.error("Error updating student:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    // Cleanup function to reset state when the component unmounts
    return () => {
      setStatusType("active");
      setName("");
      setId("");
      setEmail("");
      setAmount("");
      setValid("false");
      setSubmitted(false);
      setMessage(null);
      setStatus(null);
    };
  }, [isOpen]);

  return (
    <>
      <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        Add New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={isSubmitted ? 'hidden' : 'flex flex-col gap-1'}>New student</ModalHeader>
              <ModalBody>
                <div className={isSubmitted ? 'hidden' : 'flex flex-col gap-3'}>
                  <Input
                    endContent={
                      <PersonIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    placeholder="Enter name of student"
                    variant="bordered"
                    value={name}
                    onValueChange={setName}
                    isRequired
                    label="Name"
                  />
                  <Input
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    placeholder="Enter ID number"
                    variant="bordered"
                    value={id}
                    onValueChange={setId}
                    isRequired
                    label="ID"
                  />
                  <StatusTypeSelect onStatusSelect={handleStatusSelect} />
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
                 disabled={isValid.trim() === 'false'}
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

export default AddStudentModal;
