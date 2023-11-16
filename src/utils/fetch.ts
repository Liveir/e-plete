import axios from 'axios';

export async function fetchStudent() {
	const res = await axios.get('http://127.0.0.1:8000/student');
	return res.data;
}

export async function fetchTransaction() {
	const res = await axios.get('http://127.0.0.1:8000/transaction');
	return res.data;
}