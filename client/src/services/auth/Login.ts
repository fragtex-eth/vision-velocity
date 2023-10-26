import { fetchUserDetails } from "../user/FetchIUser";

export const loginEC = async (email:string, password:string,setIsLoggedInFunc:any ) => {
    const response = await fetch("http://127.0.0.1:7777/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        }),
        credentials: 'include'
    });
    const data = await response.json();
    await fetchUserDetails(setIsLoggedInFunc)
    return data;
}
