import CardColumns from "react-bootstrap/CardColumns";
import MainLayout from "../../components/layout/MainLayout";
import ComplaintsTable from "../../components/table/ComplaintsTable.jsx";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import {Plus} from "react-bootstrap-icons";

export default function Complaints() {
	const complaints = {
		count: 1,
		rows: [
			{
				"subject": "Complaint 1",
				"submitted_at": "10/20/2010",
				"action_taken": "No action",
				"action_taken_date": ""
			}
		]
	}

	return (
		<MainLayout>
			<h1>Complaints</h1>
			<Link href="/complaint/new">
              <Button variant="primary" className="mb-3" type="submit">
				<Plus size={18} /> New Complaint
              </Button>
            </Link>
			<ComplaintsTable complaints={complaints.rows} count={1} offset={0} />
		</MainLayout>
	);
}