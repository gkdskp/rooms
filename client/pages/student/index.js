import Link from 'next/link';
import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import StudentsTable from '../../components/table/StudentsTable';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Plus } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import CSVReader from 'react-csv-reader';

export default function Student() {
	const [Students, setStudents] = useState({ rows: [], count: 20 });
	const [show, setShow] = useState(false);

	useEffect(() => {
		fetch('http://localhost:4000/warden/all', {
			method: "POST"
		}).then(res => res.json())
			.then(res => setStudents({
				rows: res,
				count: res.length
			}));
	}, []);

	async function allocate(e) {
		e.preventDefault();
		fetch('http://localhost:4000/warden/rooms/allote', {
			method: "POST"
		}).then(res => res.json())
			.then(json => console.log(json));
		fetch('http://localhost:4000/warden/all', {
			method: "POST"
		}).then(res => res.json())
			.then(res => setStudents({
				rows: res,
				count: res.length
			}));
	}

	return (
		<div>
			<Head>
				<title>Students | BigBroAdmin</title>
			</Head>
			<MainLayout>
				<h1 className="my-3">Students</h1>
				<Button variant="primary" className="mb-3" onClick={() => setShow(true)}>
					<Plus size={18} /> Add New Student
              </Button>&nbsp;&nbsp;
			<Link href="/student/add">
					<Button variant="primary" className="mb-3" type="submit" onClick={allocate}>
						<Plus size={18} /> Allocate Rooms for Students
              </Button>
				</Link>&nbsp;&nbsp;
			<StudentsTable students={Students.rows} count={Students.count} />

				<Modal show={show} onHide={() => setShow(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Paid Students</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<CSVReader onFileLoaded={(data, fileInfo) => {
							const studData ={ students: data.map(datum => ({
								id: datum[0],
								full_name: datum[1],
								password: datum[2],
								email: datum[3],
								join_date: datum[4],
								semester: datum[5]
							}))};

							console.log(studData);

							fetch('http://localhost:4000/warden/batch', { method: "POST", body: JSON.stringify(studData), headers: { "Content-Type": "application/json" } })
								.then(res => res.json())
								.then(json => {
									setShow(false);
									fetch('http://localhost:4000/warden/all', {
										method: "POST"
									}).then(res => res.json())
										.then(res => setStudents({
											rows: res,
											count: res.length
										}));
								})
						}} />
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => setShow(false)}>
							Close
          </Button>
					</Modal.Footer>
				</Modal>
			</MainLayout>
		</div>
	)
}