import { fetchUserDetails } from "../user/FetchIUser";

export const logoutEC = async (setIsLoggedInFunc:any) => {
    const response = await fetch("http://127.0.0.1:7777/api/logout", {
        method: "POST",
        credentials: 'include'
    });
    const data = await response.json();
    await fetchUserDetails(setIsLoggedInFunc);
    return data;
}
