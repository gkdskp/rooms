import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { ArrowDown, Check, X } from "react-bootstrap-icons";

export default function LeaveTable({ leaves, count, offset, setOffset, accept }) {
  const LABELS = ["applicant", "reason", "applied_at", "from", "to"];
  const STATUS_COLORS = {
    Accepted: "green",
    Declined: "red",
    "Waiting Response": "black",
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {LABELS.map((label, index) => (
              <th key={index} style={{ textTransform: "capitalize" }}>
                {label.replace("_", " ")}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.reason}>
              {LABELS.map((label) => (
                <td key={`${leave.reason} ${label}`}>{leave[label]}</td>
              ))}
              <td style={{fontWeight: "bold"}}>{leave.status == "Waiting Response" ? <>
				<Check onClick={() => accept(1, leave.id)}/> Accept &nbsp;&nbsp;&nbsp;&nbsp;
				<X onClick={() => accept(2, leave.id)}/> Decline
			  </> : <p>{leave.status}</p>}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination size="md">
        {Array.from(Array(Math.floor(count / 20)).keys()).map((index) => (
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
