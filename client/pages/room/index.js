import Link from 'next/link';
import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import RoomsTable from '../../components/table/RoomsTable';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Check, Pencil } from 'react-bootstrap-icons';

export default function Room() {
	const rooms = {
		count: 20,
		rows: [
			{
				id: "A31",
				capacity: 3,
				occupancy_rules: "B-Tech S3, B-Tech S5, B-Tech S6",
				current_students: "Name1, Name2, Name3"
			},
			{
				id: "A32",
				capacity: 3,
				occupancy_rules: "B-Tech S3, B-Tech S5, B-Tech S6",
				current_students: "Name1, Name2, Name3"
			},
			{
				id: "A33",
				capacity: 3,
				occupancy_rules: "B-Tech S3, B-Tech S5, B-Tech S6",
				current_students: "Name1, Name2, Name3"
			},
			{
				id: "A34",
				capacity: 3,
				occupancy_rules: "B-Tech S3, B-Tech S5, B-Tech S6",
				current_students: "Name1, Name2, Name3"
			},
			{
				id: "A35",
				capacity: 3,
				occupancy_rules: "B-Tech S3, B-Tech S5, B-Tech S6",
				current_students: "Name1, Name2, Name3"
			},
			{
				id: "A36",
				capacity: 3,
				occupancy_rules: "B-Tech S3, B-Tech S5, B-Tech S6",
				current_students: "Name1, Name2, Name3"
			},
		],
	}

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
				<RoomsTable rooms={rooms.rows} count={rooms.count} />
			</MainLayout>
		</div>
	)
}