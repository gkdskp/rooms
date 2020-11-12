import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
// import { useRouter } from 'next/router';
import Router from 'next/router';
import { Check2 } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';

export default function ComplaintForm() {
	return (
		<div>
			<Head>
				<title>Add Complaint | rooms</title>
			</Head>
			<MainLayout>
				<h1>Add a Complaint</h1>
				<Form>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Subject</Form.Label>
						<Form.Control type="text" />
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>Complaint</Form.Label>
						<Form.Control as="textarea" rows={3} />
					</Form.Group>
					<Button variant="primary" className="mt-2" type="submit">
						<Check2 size={18} /> Add
					</Button>
				</Form>
			</MainLayout>
		</div>
	)
}