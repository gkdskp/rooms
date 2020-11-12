import { useContext, useEffect } from "react";
import Router  from "next/router";
import { Container } from "react-bootstrap";
import SideBar from "./SideBar";
import WardenSideBar from "./WardenSideBar";

export default function MainLayout({children}) {
	// const [authState, authDispatch] = useContext(AuthContext);

	const authState = {
		isLoggedIn: "true",
		hasError: "false",
		jwt: "dummy",
		utype: 1
	}

	// useEffect(() => {
	// // 	if(! authState.isLoggedIn || authState.hasError || ! authState.jwt)
	// // 		Router.push("/");
	// // }, [authState]);

	return (
		<Container className="main-body" fluid>
			{authState.utype == 0? <SideBar />: <WardenSideBar />}
			<div className="main-container offset-lg-2 col-lg-10">
				{children}
			</div>
		</Container>
	);
}