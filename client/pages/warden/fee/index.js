import MainLayout from "../../../components/layout/MainLayout";
import WardenFeeTable from "../../../components/table/WardenFeeTable";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import {Check, Pencil} from "react-bootstrap-icons";

export default function Fee() {
	const PAID_FEE = [
		{
			amount: 2500,
			title: "Mess Bill",
			due_at: "20-10-2020",
			group: "MTech Students"
		},
		{
			amount: 2500,
			title: "Mess Bill",
			due_at: "20-10-2020",
			group: "All"
		},
		{
			amount: 2500,
			title: "Mess Bill",
			due_at: "20-10-2020",
			group: "Custom"
		},
		{
			amount: 2500,
			title: "Mess Bill",
			due_at: "20-10-2020",
			group: "All"
		},
	];

	return (
		<MainLayout>
			<h1>Fees</h1>
			<Link href="/leave/new">
					<Button variant="primary" className="mb-3" type="submit">
						<Check size={18} /> Add New Fee
              </Button>
				</Link>&nbsp;&nbsp;&nbsp;&nbsp;
				<Link href="/leave/new">
					<Button variant="primary" className="mb-3" type="submit">
						<Pencil size={18} /> Edit Student Gropus
              </Button>
				</Link>
			<WardenFeeTable paid_fee={PAID_FEE} count={20} offset={0} />
		</MainLayout>
	);
}