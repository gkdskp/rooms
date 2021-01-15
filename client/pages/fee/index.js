import CardColumns from "react-bootstrap/CardColumns";
import MainLayout from "../../components/layout/MainLayout";
import FeeCard from "../../components/cards/FeeCard";
import PaidFeeTable from "../../components/table/PaidFeeTable";
import { useState, useEffect } from "react";

export default function Fee() {
	const [dueFee, setDueFee] = useState([]);
	const [paidFee, setPaidFee] = useState([]);

	useEffect(() => {
		fetch('http://localhost:4000/fee/user', { method: "POST" })
			.then(req => req.json())
			.then(json => {
				setDueFee(json.due_fee);
				setPaidFee(json.paid_fee.map(fee => {
					fee.paid_at = fee.createdAt;
					return fee;
				}));
			})
	}, []);

	const payfee = (id) => {
		fetch('http://localhost:4000/fee/' + id + '/pay', { method: "POST" })
			.then(res => res.json())
			.then(json => {
				if (json.message === "Success") {
					fetch('http://localhost:4000/fee/user', { method: "POST" })
						.then(req => req.json())
						.then(json => {
							setDueFee(json.due_fee);
							setPaidFee(json.paid_fee.map(fee => {
								fee.paid_at = fee.createdAt;
								return fee;
							}));
						})
				} else {
					fetch('http://localhost:4000/fee/user', { method: "POST" })
						.then(req => req.json())
						.then(json => {
							setDueFee(json.due_fee);
							setPaidFee(json.paid_fee.map(fee => {
								fee.paid_at = fee.createdAt;
								return fee;
							}));
						})
				}
			})
	}

	return (
		<MainLayout>
			<h1>Due Fees</h1>
			<CardColumns>
				{dueFee.map(due_fees => (
					<FeeCard fee={due_fees} payFee={payfee} />
				))}
			</CardColumns>
			<h1 className="pt-5 pb-3">Paid Fees</h1>
			<PaidFeeTable paid_fee={paidFee} count={20} offset={0} />
		</MainLayout>
	);
}