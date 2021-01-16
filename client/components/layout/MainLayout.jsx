import { useContext, useEffect } from "react";
import Router  from "next/router";
import { Container } from "react-bootstrap";
import SideBar from "./SideBar";
import WardenSideBar from "./WardenSideBar";
import { AuthContext } from '../../pages/auth'

export default function MainLayout({children}) {
	const [authState, authDispatch] = useContext(AuthContext);
	console.log(authState);
	return (
		<Container className="main-body" fluid>
			{authState.utype == 1? <SideBar />: <WardenSideBar />}
			<div className="main-container offset-lg-2 col-lg-10">
				{children}
			</div>
		</Container>
	);
}
