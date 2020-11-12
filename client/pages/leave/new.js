import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
// import { useRouter } from 'next/router';
import Router from 'next/router';
import { Check2 } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';

export default function LeaveApplication() {
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
						<Form.Control type="text" />
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>Remarks</Form.Label>
						<Form.Control as="textarea" rows={3} />
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>From</Form.Label><br />
						<DatePicker />
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>To</Form.Label><br/>
						<DatePicker />
					</Form.Group>
					<Button variant="primary" className="mt-2" type="submit">
						<Check2 size={18} /> Create
					</Button>
				</Form>
			</MainLayout>
		</div>
	)
}