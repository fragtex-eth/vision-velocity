import { useState } from "react";
import { useModal } from "../context/modalContext";
import { useUsers } from "../context/userContext";
import { fetchUserData } from "../services/user/FetchUsers";
import { privateKeyToAccount } from "viem/accounts";
import { useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { verifyMessage } from "viem";

export default function EditProfile() {
  const verifiedMessage = "Vision Velocity: Verify account ownership";
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: verifiedMessage,
  });
  const { address, isConnecting, isDisconnected } = useAccount();

  const { closeModal } = useModal();
  const { setUsers } = useUsers();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [xLink, setXLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [error, setError] = useState("");

  async function valid() {
    if (address && data) {
      let verified = await verifyMessage({
        address: address,
        message: verifiedMessage,
        signature: data,
      });
      return verified;
    } else {
      return false;
    }
  }

  const handleSubmit = async () => {
    let x = await valid();
    if (x == false) {
      throw "Verification Error";
    } else {
      console.log(x);
    }
    const body = {
      name,
      description,
      links: {
        github: githubLink,
        x: xLink,
        linkedin: linkedinLink,
        address,
      },
    };
    try {
      console.log(body);
      const response = await fetch("http://127.0.0.1:7777/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
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
    <div className="fixed z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-60 text-white">
      <div className="relative overflow-hidden rounded-3xl bg-white py-14">
        <button
          className="absolute right-0 top-0 mr-5 mt-5 h-12 w-12 rounded-full bg-black"
          onClick={closeModal}
        >
          X
        </button>
        <h1 className="mb-5 w-[550px] text-center">Edit Profile</h1>
        <div className="flex flex-col px-16 py-5">
          {error && <span className="mb-4 text-red-500">{error}</span>}
          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            Name:
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 h-12 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Type the name here..."
          />
          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            X Link:
          </span>
          <input
            value={xLink}
            onChange={(e) => setXLink(e.target.value)}
            className="mb-4 h-12 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Type the X link here..."
          />
          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            Github Link:
          </span>
          <input
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="mb-4 h-12 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Type the Github link here..."
          />
          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            LinkedIn Link:
          </span>
          <input
            value={linkedinLink}
            onChange={(e) => setLinkedinLink(e.target.value)}
            className="mb-4 h-12 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Type the LinkedIn link here..."
          />

          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            Description:
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 h-32 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Type your description here..."
          />

          {isDisconnected ? (
            <ConnectButton />
          ) : (
            <>
              {!isSuccess ? (
                <button
                  onClick={() => signMessage()}
                  className="flex h-12 items-center justify-center rounded-3xl bg-green-950 p-4"
                >
                  {isError && "Error signing message"}
                  {isLoading && "Loading..."}
                  {!isLoading && !isError && "1/2 Sign update"}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex h-12 items-center justify-center rounded-3xl bg-green-950 p-4"
                >
                  2/2 Save changes
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
