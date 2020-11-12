import MainLayout from "../../../components/layout/MainLayout";
import WardenComplaintsTable from "../../../components/table/WardenComplaintsTable.jsx";

export default function Complaints() {
	const complaints = {
		count: 1,
		rows: [
			{
				"subject": "Complaint 1",
				"submitted_at": "10/20/2010",
				"action_taken": "No action",
				"action_taken_date": "",
				"description": "Short description about the complaint"
			},
			{
				"subject": "Complaint 1",
				"submitted_at": "10/20/2010",
				"action_taken": "Solved",
				"action_taken_date": "10-20-2010",
				"description": "Short description about the complaint"
			},
		]
	}

	return (
		<MainLayout>
			<h1>Complaints</h1>
			<WardenComplaintsTable complaints={complaints.rows} count={1} offset={0} />
		</MainLayout>
	);
}