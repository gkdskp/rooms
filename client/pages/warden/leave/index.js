import Link from 'next/link';
import Head from 'next/head';
import MainLayout from '../../../components/layout/MainLayout';
import WardenLeaveTable from '../../../components/table/WardenLeaveTable';
import Button from 'react-bootstrap/Button';
import { Plus } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';

export default function Leave() {
	const [leaves, setLeaves] = useState({
		count: 0,
		rows: []
	});

	const status = ["Waiting Response", "Accepted", "Rejected"]

	useEffect(() => {
		fetch('http://localhost:4000/leave/all', { method: "POST" })
			.then(res => res.json())
			.then(json => {
				json = json.map((json) => {
					json.status = status[json.status]
					json.applied_at = json.createdAt
					json.applicant = json.Student?.User?.full_name
					return json
				})
				setLeaves({
					count: json.length,
					rows: json
				})
			})
	}, []);

	const accept = (status, id) => {
		if (status == 1) {
			fetch(`http://localhost:4000/leave/${id}/accept`, { method: "POST" })
				.then(res => res.json)
				.then(json => {
					if (json.message == "Success") {
						alert("Success");
						fetch('http://localhost:4000/leave/all', { method: "POST" })
							.then(res => res.json())
							.then(json => {
								json = json.map((json) => {
									json.status = status[json.status]
									json.applied_at = json.createdAt
									return json
								})
								setLeaves({
									count: json.length,
									rows: json
								})
							})
					} else {
						alert("Failed");
					}
				})
		} else {
			fetch(`http://localhost:4000/leave/${id}/decline`, { method: "POST" })
				.then(res => res.json)
				.then(json => {
					if (json.message == "Success") {
						alert("Success");
						fetch('http://localhost:4000/leave/all', { method: "POST" })
							.then(res => res.json())
							.then(json => {
								json = json.map((json) => {
									json.status = status[json.status]
									json.applied_at = json.createdAt
									return json
								})
								setLeaves({
									count: json.length,
									rows: json
								})
							})
					} else {
						alert("Failed");
					}
				})
		}
	}

	return (
		<div>
			<Head>
				<title>Leave | BigBroAdmin</title>
				<link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"></link>
			</Head>
			<MainLayout>
				<h1 className="my-3">Leave</h1>
				<WardenLeaveTable leaves={leaves.rows} count={leaves.count} accept={accept} />
			</MainLayout>
		</div>
	)
}