import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import {ArrowDown} from "react-bootstrap-icons";

export default function LeaveTable({ leaves, count, offset, setOffset }) {
  const LABELS = ["reason", "applied_at", "from", "to", "status"];
  const STATUS_COLORS = {
	  "Accepted": "green",
	  "Declined": "red",
	  "Waiting Response": "black"
  }

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {LABELS.map((label, index) => (
              <th key={index} style={{ textTransform: "capitalize" }}>{label.replace("_", " ")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leaves.map(leave => (
            <tr key={leave.reason}>
              {LABELS.map((label) => (
				<td key={`${leave.reason} ${label}`}>{
					label == "status" ?
						<span style={{ color: STATUS_COLORS[leave.status] }} >{leave.status}</span>
						: leave[label]
				}</td>
              ))}
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