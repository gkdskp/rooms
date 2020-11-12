import Link from 'next/link';
import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import StudentsTable from '../../components/table/StudentsTable';
import Button from 'react-bootstrap/Button';
import { Plus } from 'react-bootstrap-icons';

export default function Student() {
	const Students = {
		rows: [
			{
				name: "Akshay Raj",
				address: "Address Line1\nLine2\nLine3",
				phone: "+918281049006\n+9185467893",
				room: "A21",
				semester: "B-Tech S5",
			},
			{
				name: "Akshay Raj",
				address: "Address Line1\nLine2\nLine3",
				phone: "+918281049006\n+9185467893",
				room: "A21",
				semester: "B-Tech S5",
			},
			{
				name: "Akshay Raj",
				address: "Address Line1\nLine2\nLine3",
				phone: "+918281049006\n+9185467893",
				room: "A21",
				semester: "B-Tech S5",
			},
			{
				name: "Akshay Raj",
				address: "Address Line1\nLine2\nLine3",
				phone: "+918281049006\n+9185467893",
				room: "A21",
				semester: "B-Tech S5",
			},
			{
				name: "Akshay Raj",
				address: "Address Line1\nLine2\nLine3",
				phone: "+918281049006\n+9185467893",
				room: "A21",
				semester: "B-Tech S5",
			},
		],
		count: 20
	}

	return (
		<div>
		<Head>
			<title>Students | BigBroAdmin</title>
		</Head>
		<MainLayout>
			<h1 className="my-3">Students</h1>
			<Link href="/student/add">
              <Button variant="primary" className="mb-3" type="submit">
				<Plus size={18} /> Add New Student
              </Button>
            </Link>&nbsp;&nbsp;
			<Link href="/student/add">
              <Button variant="primary" className="mb-3" type="submit">
				<Plus size={18} /> Allocate Rooms for Students
              </Button>
            </Link>&nbsp;&nbsp;
			<Link href="/student/add">
              <Button variant="primary" className="mb-3" type="submit">
				<Plus size={18} /> Promote Students
              </Button>
            </Link>
			<StudentsTable students={Students.rows} count={Students.count} />
		</MainLayout>
		</div>
	)
}