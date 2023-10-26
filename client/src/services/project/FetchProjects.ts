export const fetchProjects = async () => {
    const response = await fetch("http://127.0.0.1:7777/api/projects");
    const data = await response.json();
    return data;
}
