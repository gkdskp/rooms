import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import {Pencil} from "react-bootstrap-icons";
import {Trash} from "react-bootstrap-icons";

export default function StudentsTable({ students, count, offset, setOffset }) {
  const LABELS = ["name", "address", "phone", "semester", "room"];

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
          {students.map(student => (
            <tr key={student.name}>
              {LABELS.map((label) => (
                <td key={`${student.name} ${label}`}>{student[label].replace("\n", ",")}</td>
              ))}
			  <td style={{ fontWeight: "bold" }}>
				<Pencil /> Edit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<Trash /> Delete
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