import { useReducer, createContext } from "react";

export const AuthContext = createContext();

const initialState = {
	isLoggedIn: false,
	hasErr: false,
	role: null
};

const reducer = (state, action) => {
	console.log(action.payload);
	switch (action.type) {
		case 'logout':
			return {
				isLoggedIn: false,
				hasErr: false,
				jwt: ""
			};

		case 'login':
			return {
				isLoggedIn: true,
				hasErr: false,
				jwt: action.payload.jwt,
				utype: action.payload.utype
			};
	}
}

export const AuthContextProvider = props => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AuthContext.Provider value={[state, dispatch]} >
			{props.children}
		</AuthContext.Provider>
	);
}