import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import {ArrowDown} from "react-bootstrap-icons";

export default function PaidFeeTable({ paid_fee, count, offset, setOffset }) {
  const LABELS = ["title", "amount", "paid_at"];
  console.log(paid_fee);

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {LABELS.map((label, index) => (
              <th key={index} style={{ textTransform: "capitalize" }}>{label.replace("_", " ")}</th>
            ))}
			<th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paid_fee.map(paid_fees => (
            <tr key={paid_fees.title}>
              {LABELS.map((label) => (
                <td key={`${paid_fees.title} ${label}`}>{paid_fees[label]}</td>
              ))}
			  <td style={{ fontWeight: "bold" }}>
				<ArrowDown /> Download Receipt
			  </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <Pagination size="md">
        {Array.from(Array(Math.floor(count / 5)).keys()).map((index) => (
          <Pagination.Item
            key={index}
            active={index == offset}
            onClick={() => setOffset(index)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}