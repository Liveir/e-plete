import axios from 'axios';

// ** GET

export async function fetchAllStudents() {
	const res = await axios.get('http://127.0.0.1:8000/student');
	return res.data;
}

export async function fetchStudent(id: number) {
	const res = await axios.get(`http://127.0.0.1:8000/student/${id.toString()}`);
	return res.data;
}

export async function fetchAllTransactions() {
	const res = await axios.get('http://127.0.0.1:8000/transaction');
	return res.data;
}

// ** PUT

export async function updateStudent(student: any) {
	try {
	  const res = await axios.put('http://127.0.0.1:8000/student/', student);
	  return { status: 'success', data: res.data };
	} catch (error: any) {
	  return { status: 'error'};
	}
  }