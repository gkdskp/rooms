import Link from 'next/link';
import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import LeaveTable from '../../components/table/LeaveTable';
import Button from 'react-bootstrap/Button';
import { Plus } from 'react-bootstrap-icons';

export default function Leave() {
	const leaves = {
		count: 20,
		rows: [
			{
				reason: "Going Home",
				applied_at: "10/10/2020",
				from: "22/10/2020",
				to: "24/10/2020",
				status: 0
			},
			{
				reason: "Going Home",
				applied_at: "10/10/2020",
				from: "22/10/2020",
				to: "24/10/2020",
				status: 1
			},
			{
				reason: "Going Home",
				applied_at: "10/10/2020",
				from: "22/10/2020",
				to: "24/10/2020",
				status: 2
			},
			{
				reason: "Going Home",
				applied_at: "10/10/2020",
				from: "22/10/2020",
				to: "24/10/2020",
				status: 0
			},
			{
				reason: "Going Home",
				applied_at: "10/10/2020",
				from: "22/10/2020",
				to: "24/10/2020",
				status: 0
			}
		].map(leave => {
			leave.status = leave.status == 0 ? "Accepted": leave.status == 1? "Declined": "Waiting Response";
			return leave;
		}),
	}

	return (
		<div>
		<Head>
			<title>Leave | BigBroAdmin</title>
			<link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"></link>
		</Head>
		<MainLayout>
			<h1 className="my-3">Leave</h1>
			<Link href="/leave/new">
              <Button variant="primary" className="mb-3" type="submit">
				<Plus size={18} /> Apply
              </Button>
            </Link>
			<LeaveTable leaves={leaves.rows} count={leaves.count} />
		</MainLayout>
		</div>
	)
}