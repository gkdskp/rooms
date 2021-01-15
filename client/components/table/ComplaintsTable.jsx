import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

export default function ComplaintsTable({ complaints, count, offset, setOffset }) {
  const LABELS = ["subject", "submitted_at", "action_taken", "action_taken_date"];

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
          {complaints.map(complaint => (
            <tr key={complaint.subject}>
              {LABELS.map((label) => (
                <td key={`${complaint.subject} ${label}`}>{complaint[label]}</td>
              ))}
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
      