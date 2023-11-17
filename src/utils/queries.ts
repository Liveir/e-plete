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

export async function checkStudent(id: number) {
	try {
		await axios.get(`http://127.0.0.1:8000/student/${id.toString()}`);
		return { status: 'success'};
	  } catch (error: any) {
		return { status: 'error'};
	  }
	}

export async function fetchAllTransactions() {
	const res = await axios.get('http://127.0.0.1:8000/transaction');
	return res.data;
}

// ** POST
export async function addStudent(student: any) {
	try {
	  const res = await axios.post('http://127.0.0.1:8000/student/', student);
	  return { status: 'success', data: res.data };
	} catch (error: any) {
	  return { status: 'error'};
	}
  }

export async function addTransaction(transaction: any) {
	try {
	  const res = await axios.post('http://127.0.0.1:8000/transaction/', transaction);
	  return { status: 'success', data: res.data };
	} catch (error: any) {
	  return { status: 'error'};
	}
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