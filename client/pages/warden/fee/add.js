import Head from 'next/head';
import MainLayout from '../../../components/layout/MainLayout';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
// import { useRouter } from 'next/router';
import Router from 'next/router';
import { Check2 } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

export default function LeaveApplication() {
	const [reason, setReason] = useState("");
	const [fee, setFee] = useState(0);
	const [to, setTo] = useState(new Date());

	const submitLeave = () => {
		console.log(JSON.stringify({
			"fee": fee,
			"due": to,
			"title": reason
		}))
		fetch('http://localhost:4000/fee/add', {
			method: "POST", body: JSON.stringify({
				"fee": fee,
				"due": to,
				"title": reason
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(json => {
				Router.push('/warden/fee');
			})
	}

	return (
		<div>
			<Head>
				<title>Add Fee | rooms</title>
			</Head>
			<MainLayout>
				<h1>Add Fee</h1>
				<Form>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Title</Form.Label>
						<Form.Control type="text" value={reason} onChange={e => setReason(e.target.value)} />
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Fee</Form.Label>
						<Form.Control type="text" value={fee} onChange={e => setFee(e.target.value)} />
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>To</Form.Label><br />
						<DatePicker selected={to} onChange={e => setTo(e)} />
					</Form.Group>
					<Button variant="primary" className="mt-2" onClick={submitLeave}>
						<Check2 size={18} /> Create
					</Button>
				</Form>
			</MainLayout>
		</div>
	)
}