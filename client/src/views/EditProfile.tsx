import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { useUsers } from "../context/userContext";
import { fetchUserData } from "../api/user/FetchUsers";
export default function EditProfile() {
    const { closeModal } = useModal();
    const {setUsers} = useUsers();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [xLink, setXLink] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [linkedinLink, setLinkedinLink] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [error, setError] = useState(""); 

    const handleSubmit = async () => {
        const body = {
            name,
            description,
            links: {
                github: githubLink,
                x: xLink,
                linkedin: linkedinLink,
                walletAddress
            }
        };
        try {

            console.log(body)
            const response = await fetch("http://127.0.0.1:7777/api/user", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            });

            const data = await response.json();

            if (data && data.success) {
                const response = await fetchUserData();
                setUsers(response);
                closeModal();
            } else {
                setError(data.message || "Update failed!");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
    <div className="fixed h-full w-full bg-opacity-60 bg-black z-10 text-white flex justify-center items-center">
        <div className="bg-white rounded-3xl overflow-hidden py-14 relative">
            <button className="absolute w-12 h-12 rounded-full bg-black right-0 top-0 mr-5 mt-5" onClick={closeModal}>X</button>
            <h1 className="text-center w-[550px] mb-5">Edit Profile</h1>
            <div className="flex flex-col py-5 px-16">
            {error && <span className="text-red-500 mb-4">{error}</span>}
            <span className="ml-4 mb-1 text-green-950 text-base font-bold">Name:</span>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                placeholder="Type the name here..."
            />
            <span className="ml-4 mb-1 text-green-950 text-base font-bold">X Link:</span>
            <input
                value={xLink}
                onChange={(e) => setXLink(e.target.value)}
                className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                placeholder="Type the X link here..."
            />
            <span className="ml-4 mb-1 text-green-950 text-base font-bold">Github Link:</span>
            <input
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                placeholder="Type the Github link here..."
            />
            <span className="ml-4 mb-1 text-green-950 text-base font-bold">LinkedIn Link:</span>
            <input
                value={linkedinLink}
                onChange={(e) => setLinkedinLink(e.target.value)}
                className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                placeholder="Type the LinkedIn link here..."
            />
            <span className="ml-4 mb-1 text-green-950 text-base font-bold">Wallet Address:</span>
            <input
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                placeholder="Type the wallet address here..."
            />
            <span className="ml-4 mb-1 text-green-950 text-base font-bold">Description:</span>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-4 p-4 h-32 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                placeholder="Type your description here..."
            />

            <button onClick={handleSubmit} className="p-4 h-12 bg-black rounded-3xl flex items-center justify-center">Update Profile</button>
        </div>
        </div>
    </div>
    );
}