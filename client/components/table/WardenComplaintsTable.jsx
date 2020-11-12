import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

export default function WardenComplaintsTable({
	complaints, count
}) {
	const LABELS = ["subject", "description", "submitted_at", "action_taken", "action_taken_date"];
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
          {complaints.map(complaint => (
            <tr key={complaint.subject}>
              {LABELS.map((label) => (
                <td key={`${complaint.subject} ${label}`}>{complaint[label]}</td>
              ))}
			  <td style={{ fontWeight: "bold" }}>
				  {complaint.action_taken == "No action" && (<>Take Action</>)}
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