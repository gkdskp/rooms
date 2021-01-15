import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Pencil, Trash, Eye } from "react-bootstrap-icons";
import { useState, useEffect } from "react";

export default function WardenFeeTable({
  paid_fee,
  count,
  offset,
  refresh,
  setOffset,
}) {
  const LABELS = ["title", "fee", "due"];
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [paidStudents, setPaidStudents] = useState([]);
  const [unpaidStudents, setunPaidStudents] = useState([]);

  const del = (id) => {
    fetch("http://localhost:4000/fee/" + id + "/delete", {
      method: "POST",
    }).then((res) => refresh());
  };

  useEffect(() => {
    if(!isNaN(show) && typeof show == "number") {
      fetch('http://localhost:4000/fee/' +show+ "/paid", {method: "POST"})
        .then(res => res.json())
        .then(json => setPaidStudents(json));
    }
  }, [show])

  useEffect(() => {
    if(!isNaN(show) && typeof show == "number") {
      fetch('http://localhost:4000/fee/' +show+ "/unpaid", {method: "POST"})
        .then(res => res.json())
        .then(json => setunPaidStudents(json));
    }
  }, [show])

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
          {paid_fee.map((paid_fees) => (
            <tr key={paid_fees.title}>
              {LABELS.map((label) => (
                <td key={`${paid_fees.title} ${label}`}>{paid_fees[label]}</td>
              ))}
              <td style={{ fontWeight: "bold" }}>
                <Trash onClick={() => del(paid_fees.id)} />{" "}
                Delete&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Eye onClick={() => setShow(paid_fees.id)} /> View Paid
                Students&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Eye onClick={() => setShow2(paid_fees.id)} /> View Unpaid
                Students&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Paid Students</Modal.Title>
        </Modal.Header>
              <Modal.Body>{paidStudents.map(paid => (
                <p>
                  {paid.User.full_name}
                </p>
              ))}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={() => setShow2(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Paid Students</Modal.Title>
        </Modal.Header>
              <Modal.Body>{unpaidStudents.map(paid => (
                <p>
                  {paid.User.full_name}
                </p>
              ))}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow2(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
