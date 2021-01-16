import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
// import { useRouter } from 'next/router';
import Router from 'next/router';
import { Check2 } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import { useState, useContext } from 'react';
import { AuthContext } from '../auth';


export default function LeaveApplication() {
	const [reason, setReason] = useState("");
	const [from, setFrom] = useState(new Date());
	const [to, setTo] = useState(new Date());
	const [authState, dispatch] = useContext(AuthContext);

	const submitLeave = () => {
		console.log(JSON.stringify({
			"from": from,
			"to": to,
			"reason": reason
		}))
		fetch('http://localhost:4000/leave/add', {
			method: "POST", body: JSON.stringify({
				"access_token": authState.jwt,
				"from": from,
				"to": to,
				"reason": reason
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(json => {
				Router.push('/leave');
			})
	}

	return (
		<div>
			<Head>
				<title>Leave Application | rooms</title>
			</Head>
			<MainLayout>
				<h1>Apply for Leave</h1>
				<Form>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Reason</Form.Label>
						<Form.Control type="text" value={reason} onChange={e => setReason(e.target.value)} />
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>From</Form.Label><br />
						<DatePicker selected={from} onChange={e => setFrom(e)} />
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