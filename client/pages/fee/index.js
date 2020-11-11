import CardColumns from "react-bootstrap/CardColumns";
import MainLayout from "../../components/layout/MainLayout";
import FeeCard from "../../components/cards/FeeCard";
import PaidFeeTable from "../../components/table/PaidFeeTable";

export default function Fee() {
	const DUE_FEE = [
		{
			amount: 1000,
			due: "27-10-2020",
			title: "Mess bill"
		},
		{
			amount: 2500,
			due: "28-10-2020",
			title: "Hostel bill"
		},
		{
			amount: 2500,
			due: "28-10-2020",
			title: "Hostel bill"
		},
		{
			amount: 2500,
			due: "28-10-2020",
			title: "Hostel bill"
		},{
			amount: 2500,
			due: "28-10-2020",
			title: "Hostel bill"
		},{
			amount: 2500,
			due: "28-10-2020",
			title: "Hostel bill"
		},
	];

	const PAID_FEE = [
		{
			amount: 2500,
			title: "Mess Bill",
			paid_at: "20-10-2020"
		},
		{
			amount: 2500,
			title: "Mess Bill",
			paid_at: "20-10-2020"
		},
		{
			amount: 2500,
			title: "Mess Bill",
			paid_at: "20-10-2020"
		},
		{
			amount: 2500,
			title: "Mess Bill",
			paid_at: "20-10-2020"
		},
		{
			amount: 2500,
			title: "Mess Bill",
			paid_at: "20-10-2020"
		},
		{
			amount: 2500,
			title: "Mess Bill",
			paid_at: "20-10-2020"
		},	
	];

	return (
		<MainLayout>
			<CardColumns>
				{DUE_FEE.map(due_fees => (
					<FeeCard fee={due_fees} />
				))}
			</CardColumns>
			<h1 className="pt-5 pb-3">Paid Fees</h1>
			<PaidFeeTable paid_fee={PAID_FEE} count={20} offset={0} />
		</MainLayout>
	);
}