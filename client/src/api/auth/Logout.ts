const logout = async () => {
    const response = await fetch("http://127.0.0.1:7777/api/logout", {
        method: "POST"
    });
    const data = await response.json();
    return data;
}
