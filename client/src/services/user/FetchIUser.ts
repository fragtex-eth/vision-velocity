
export const fetchUserDetails = async (setIsLoggedInFunc:any) => {
    const response = await fetch(`http://127.0.0.1:7777/api/user`, {
        credentials: 'include'
    });
    const data = await response.json();
    setIsLoggedInFunc(data)
    return data;
}
