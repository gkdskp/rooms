import Link from 'next/link';
import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import RoomsTable from '../../components/table/RoomsTable';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Check, Pencil } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';

export default function Room() {
	const [rooms, setRooms] = useState({ count: 0, rows: [] });
	const [filteredList, setFilterList] = useState({ count: 0, rows: [] });
	const [filters, setFilter] = useState("Block A");

	useState(() => {
		fetch('http://localhost:4000/warden/rooms/all', {method: "POST"})
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
		setFilterList({ rows: rooms.rows.filter(room => room.no[0] === filters[filters.length-1]), count: 20})
	}, [rooms, filters])

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
				</Form>
				<Link href="/leave/new">
					<Button variant="primary" className="mb-3" type="submit">
						<Check size={18} /> Apply
              </Button>
				</Link>&nbsp;&nbsp;&nbsp;&nbsp;
				<Link href="/leave/new">
					<Button variant="primary" className="mb-3" type="submit">
						<Pencil size={18} /> Batch Edit Block
              </Button>
				</Link>
				<RoomsTable rooms={filteredList.rows} count={filteredList.count} />
			</MainLayout>
		</div>
	)
}