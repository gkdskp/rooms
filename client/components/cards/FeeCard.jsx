import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function FeeCard({ fee, payFee }) {
  return (
    <Card style={{ textAlign: "center" }}>
      <Card.Header style={{ fontWeight: "bold" }}>{fee.title}</Card.Header>
      <Card.Body>
        <Card.Title style={{ fontSize: 40 }}>₹ {fee.fee}</Card.Title>
        <Button variant="primary" onClick={() => payFee(fee.id)}>Pay now</Button>
      </Card.Body>
      <Card.Footer>
        <small className="date">Due at {fee.due}</small>
      </Card.Footer>
    </Card>
  );
}
