import MainLayout from "../../../components/layout/MainLayout";
import WardenFeeTable from "../../../components/table/WardenFeeTable";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import {Check, Pencil} from "react-bootstrap-icons";
import {useState, useEffect} from "react";

export default function Fee() {
	const [fees, setFees] = useState([]);

	useEffect(() => {
		fetch('http://localhost:4000/fee/all', { method: "POST" })
			.then(res => res.json())
			.then(json => setFees(json));
	} ,[])

	const refresh = () => {
		fetch('http://localhost:4000/fee/all', { method: "POST" })
			.then(res => res.json())
			.then(json => setFees(json));
	}

	return (
		<MainLayout>
			<h1>Fees</h1>
			<Link href="/warden/fee/add">
					<Button variant="primary" className="mb-3" type="submit">
						<Check size={18} /> Add New Fee
              </Button>
				</Link>&nbsp;&nbsp;
			<WardenFeeTable paid_fee={fees} count={20} refresh={refresh} offset={0} />

		</MainLayout>
	);
}