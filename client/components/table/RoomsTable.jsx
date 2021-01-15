import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import {Pencil} from "react-bootstrap-icons";

export default function RoomsTable({ rooms, count, offset, setOffset }) {
  const LABELS = ["no", "beds", "rules", "students"]

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
          {rooms.map(room => (
            <tr key={room.id}>
              {LABELS.map((label) => (
                <td key={`${room.id} ${label}`}>{room[label]}</td>
              ))}
			  <td style={{ fontWeight: "bold" }}>
				<Pencil /> Edit
			  </td>
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