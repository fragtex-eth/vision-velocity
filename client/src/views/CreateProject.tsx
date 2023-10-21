import { useState } from "react";

export default function CreateProject() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [preview1, setPreview1] = useState("");
    const [preview2, setPreview2] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [xLink, setXLink] = useState("");
    const [linkedinLink, setLinkedinLink] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [requiredFunds, setRequiredFunds] = useState("");
    const [sellPercentage, setSellPercentage] = useState("");
    const [error, setError] = useState(""); 

    const handleSubmit = async () => {
        const body = {
            name,
            description,
            image,
            preview: [
                { img: preview1 },
                { img: preview2 }
            ],
            links: {
                github: githubLink,
                x: xLink,
                linkedin: linkedinLink,
                walletAddress
            },
            funds: {
                required: parseFloat(requiredFunds),
            },
            sellPercentage: parseInt(sellPercentage)
        };

        try {
            const response = await fetch("http://127.0.0.1:7777/api/projects", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            });

            const data = await response.json();

            if (data && data.success) {
                // Optionally, you can handle success response, e.g., redirect to another page
            } else {
                setError(data.message || "Project creation failed!");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="fixed h-full w-full bg-opacity-60 bg-black z-10 text-white flex justify-center items-center">
            <div className="bg-white rounded-3xl overflow-hidden py-14 relative">
                <h1 className="text-center w-[550px] mb-5">Create Project</h1>
                <div className="flex flex-wrap py-5 px-16">
                    {error && <span className="text-red-500 mb-4">{error}</span>}
                    
                    {/* Name input */}
                    <span className="ml-4 mb-1 text-green-950 text-base font-bold">Project Name:</span>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                        placeholder="Enter project name..."
                    />
    
                    {/* Description textarea */}
                    <span className="ml-4 mb-1 text-green-950 text-base font-bold">Description:</span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mb-4 p-4 h-32 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                        placeholder="Enter project description..."
                    />
    
                    {/* Image input */}
                    <span className="ml-4 mb-1 text-green-950 text-base font-bold">Image URL:</span>
                    <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                        placeholder="Enter image URL..."
                    />
    
                    {/* Two preview image inputs */}
                    <span className="ml-4 mb-1 text-green-950 text-base font-bold">Preview Image 1 URL:</span>
                    <input
                        value={preview1}
                        onChange={(e) => setPreview1(e.target.value)}
                        className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                        placeholder="Enter preview image 1 URL..."
                    />
    
                    <span className="ml-4 mb-1 text-green-950 text-base font-bold">Preview Image 2 URL:</span>
                    <input
                        value={preview2}
                        onChange={(e) => setPreview2(e.target.value)}
                        className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                        placeholder="Enter preview image 2 URL..."
                    />
    
                    {/* Links input fields */}
                    {/* ... similar to the EditProfile component for github, x, linkedin, and walletAddress links ... */}
    
                    {/* Funds input fields */}
                    <span className="ml-4 mb-1 text-green-950 text-base font-bold">Required Funds:</span>
                    <input
                        value={requiredFunds}
                        onChange={(e) => setRequiredFunds(e.target.value)}
                        className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                        placeholder="Enter required funds..."
                        type="number"
                    />
    
    
                    {/* Sell Percentage input */}
                    <span className="ml-4 mb-1 text-green-950 text-base font-bold">Sell Percentage:</span>
                    <input
                        value={sellPercentage}
                        onChange={(e) => setSellPercentage(e.target.value)}
                        className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                        placeholder="Enter sell percentage..."
                        type="number"
                    />
    
                    <button onClick={handleSubmit} className="p-4 h-12 bg-black rounded-3xl flex items-center justify-center">Create Project</button>
                </div>
            </div>
        </div>
    );
    
}
