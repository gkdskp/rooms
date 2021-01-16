import Link from 'next/link';
import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import RoomsTable from '../../components/table/RoomsTable';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Check, Pencil } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';


export default function Room() {
	const [rooms, setRooms] = useState({ count: 0, rows: [] });
	const [filteredList, setFilterList] = useState({ count: 0, rows: [] });
	const [filters, setFilter] = useState("Block A");

	useState(() => {
		fetch('http://localhost:4000/warden/rooms/all', { method: "POST" })
			.then(res => res.json())
			.then(json => {
				json = json.map(record => {
					record.students = record.students.join(", ");
					record.rules = record.rules.join(", ");
					return record;
				});
				setRooms({
					count: 20,
					rows: json
				})
			})
	}, []);

	useEffect(() => {
		console.log("Hi");
		setFilterList({ rows: rooms.rows.filter(room => room.no[0] === filters[filters.length - 1]), count: 20 })
	}, [rooms, filters])
	const [show, setShow] = useState(false);

	const BLOCK_LIST = ["Block A", "Block B", "Block C", "Block D"];

	return (
		<div>
			<Head>
				<title>Rooms | rooms</title>
			</Head>
			<MainLayout>
				<h1 className="my-3">Rooms</h1>
				<Form className="my-3" action="#">
					<Form.Control
						as="select"
						size="sm"
						value={filters}
						onChange={e => setFilter(e.target.value)}
					>
						{BLOCK_LIST.map((block) => (
							<option>{block}</option>
						))}
					</Form.Control>
				</Form>&nbsp;&nbsp;&nbsp;&nbsp;
					<Button variant="primary" className="mb-3" onClick={() => setShow(true)}>
					<Pencil size={18} /> Batch Add Rooms
              </Button>
				<RoomsTable rooms={filteredList.rows} count={filteredList.count} />

				<Modal show={show} onHide={() => setShow(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Paid Students</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<CSVReader onFileLoaded={(data, fileInfo) => {
							console.log(data);
							const roomData = {
								rooms: data.map(room => ({
									no: room[0],
									beds: room[1],
									rules: room.slice(2)
								}))
							}

							console.log(roomData);

							fetch('http://localhost:4000/warden/rooms/add', { method: "POST", body: JSON.stringify(roomData), headers: { "Content-Type": "application/json" } })
								.then(res => res.json())
								.then(json => {
									setShow(false);
									fetch('http://localhost:4000/warden/rooms/all', { method: "POST" })
										.then(res => res.json())
										.then(json => {
											json = json.map(record => {
												record.students = record.students.join(", ");
												record.rules = record.rules.join(", ");
												return record;
											});
											setRooms({
												count: 20,
												rows: json
											})
										})
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