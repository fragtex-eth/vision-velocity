import { fetchUserDetails } from "../user/FetchIUser";

export const registerEC = async (name:string, email:string, password:string) => {
    const response = await fetch("http://127.0.0.1:7777/api/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        }),
        credentials: 'include'
    });
    const data = await response.json();
    return data;
}
