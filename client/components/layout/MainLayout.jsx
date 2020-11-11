import { useContext, useEffect } from "react";
import Router  from "next/router";
import { Container } from "react-bootstrap";
import SideBar from "./SideBar";

export default function MainLayout({children}) {
	// const [authState, authDispatch] = useContext(AuthContext);

	const authState = {
		isLoggedIn: "true",
		hasError: "false",
		jwt: "dummy"
	}

	// useEffect(() => {
	// // 	if(! authState.isLoggedIn || authState.hasError || ! authState.jwt)
	// // 		Router.push("/");
	// // }, [authState]);

	return (
		<Container className="main-body" fluid>
			<SideBar />
			<div className="main-container offset-lg-2 col-lg-10">
				{children}
			</div>
		</Container>
	);
}