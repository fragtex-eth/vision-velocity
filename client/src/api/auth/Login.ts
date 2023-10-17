export const loginEC = async (email:string, password:string) => {
    const response = await fetch("http://127.0.0.1:7777/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    return data;
}
