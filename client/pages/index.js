import Head from 'next/head'
import MainLayout from '../components/layout/MainLayout'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState, useContext } from "react";
import Router from "next/router";
import { AuthContext } from './auth'

export default function Home() {
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [authState, dispatch] = useContext(AuthContext);

  const onSubmit = () => {
    fetch('http://localhost:4000/auth/login', {
      method: "POST",
      body: JSON.stringify({ email: formUsername, password: formPassword }),
      headers: { "Content-Type": "application/json" }
    }).then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.error == "InvalidEmail") {
          alert("Failed to login");
        } else {
          if (json.utype == 0) {
            dispatch({
              type: "login",
              payload: {
                "jwt": json.access_token,
                "utype": 0
              }
            });
            Router.push('/student');
          }
          else {
            dispatch({
              type: "login",
              payload: {
                "jwt": json.access_token,
                "utype": 1
              }
            });
            Router.push('/fee');
          }
        }
      })
  }

  return (
    <Container>
      <h1>Rooms</h1>
      {/* {authState.hasErr && (
          <Alert variant="danger">Authentication failed</Alert>
        )} */}
      <Form action="#">
        <Col>
          <Form.Group controlId="formBasicEmail" className="mt-4">
            <Form.Control
              type="text"
              value={formUsername}
              onChange={(e) => setFormUsername(e.target.value)}
              placeholder="Email"
              autoComplete="false"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicPassword" className="mt-2">
            <Form.Control
              type="password"
              placeholder="Password"
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Button
            variant="primary"
            className="mt-2"
            onClick={onSubmit}
          >
            Log In
            </Button>
        </Col>
      </Form>
    </Container>
  )
}
