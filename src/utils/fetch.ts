import axios from 'axios';

export async function fetchAllStudents() {
	const res = await axios.get('http://127.0.0.1:8000/student');
	return res.data;
}

export async function fetchStudent(id: any) {
	const res = await axios.get(`http://127.0.0.1:8000/student/${id}`);
	return res.data;
}

export async function fetchAllTransactions() {
	const res = await axios.get('http://127.0.0.1:8000/transaction');
	return res.data;
}