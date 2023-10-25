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
      preview: [{ img: preview1 }, { img: preview2 }],
      links: {
        github: githubLink,
        x: xLink,
        linkedin: linkedinLink,
        walletAddress,
      },
      funds: {
        required: parseFloat(requiredFunds),
      },
      sellPercentage: parseInt(sellPercentage),
    };

    try {
      const response = await fetch("http://127.0.0.1:7777/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
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
    <div className="fixed z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-60 text-white">
      <div className="relative overflow-hidden rounded-3xl bg-white py-14">
        <h1 className="mb-5 w-[550px] text-center">Create Project</h1>
        <div className="flex flex-wrap px-16 py-5">
          {error && <span className="mb-4 text-red-500">{error}</span>}

          {/* Name input */}
          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            Project Name:
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 h-12 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Enter project name..."
          />

          {/* Description textarea */}
          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            Description:
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 h-32 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Enter project description..."
          />

          {/* Image input */}
          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            Image URL:
          </span>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mb-4 h-12 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Enter image URL..."
          />

          {/* Two preview image inputs */}
          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            Preview Image 1 URL:
          </span>
          <input
            value={preview1}
            onChange={(e) => setPreview1(e.target.value)}
            className="mb-4 h-12 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Enter preview image 1 URL..."
          />

          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            Preview Image 2 URL:
          </span>
          <input
            value={preview2}
            onChange={(e) => setPreview2(e.target.value)}
            className="mb-4 h-12 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Enter preview image 2 URL..."
          />

          {/* Links input fields */}
          {/* ... similar to the EditProfile component for github, x, linkedin, and walletAddress links ... */}

          {/* Funds input fields */}
          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            Required Funds:
          </span>
          <input
            value={requiredFunds}
            onChange={(e) => setRequiredFunds(e.target.value)}
            className="mb-4 h-12 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Enter required funds..."
            type="number"
          />

          {/* Sell Percentage input */}
          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            Sell Percentage:
          </span>
          <input
            value={sellPercentage}
            onChange={(e) => setSellPercentage(e.target.value)}
            className="mb-4 h-12 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Enter sell percentage..."
            type="number"
          />

          <button
            onClick={handleSubmit}
            className="flex h-12 items-center justify-center rounded-3xl bg-black p-4"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}
