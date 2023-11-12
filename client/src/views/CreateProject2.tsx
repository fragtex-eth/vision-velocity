import { useState } from "react";
import { useContractWrite } from "wagmi";
import FactoryABI from "../constants/factorycontractabi.json";
import { factoryContractAddress } from "../constants/factorycontractaddress";
import { chainIdC } from "../constants/factorycontractaddress";
import { stableCoinAddress } from "../constants/factorycontractaddress";
import { waitForTransaction } from "@wagmi/core";
import { readContract } from "@wagmi/core";
import { useAccount } from "wagmi";
import exampleImg from "../assets/profilPic.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useModal } from "../context/modalContext";

export default function CreateProject2() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [xLink, setXLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [requiredFunds, setRequiredFunds] = useState();
  const [sellPercentage, setSellPercentage] = useState("");
  const [error, setError] = useState("");
  const { closeModal } = useModal();
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: factoryContractAddress,
    abi: FactoryABI,
    functionName: "createProject",
    chainId: chainIdC,
    args: [requiredFunds, name, name.slice(0, 3), stableCoinAddress], //fundsToRaise(uint), _name(string), symbol(string, _stablecoin Address)
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      handleSubmitP2(data);
    },
  });
  const { address, isConnecting, isDisconnected } = useAccount();

  const handleSumbitP1 = async () => {
    write();
  };
  const handleSubmitP2 = async (data) => {
    await waitForTransaction({
      hash: data.hash,
    });

    const projectAddress = await readContract({
      address: factoryContractAddress,
      abi: FactoryABI,
      functionName: "getProjectAddress",
      args: [address],
    });

    const body = {
      name,
      projectAddress,
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
      <div className="relative overflow-hidden rounded-3xl bg-white p-14 text-black">
        <button
          className="absolute right-0 top-0 mr-5 mt-5 h-12 w-12 rounded-full bg-black text-white"
          onClick={closeModal}
        >
          X
        </button>
        <h2 className="mb-5 text-center text-4xl font-semibold text-black">
          Create project
        </h2>
        <div className="grid h-full max-w-[900px] grid-cols-2 gap-10 text-lg font-semibold">
          <div className="flex w-full flex-shrink-0 flex-col gap-3 text-green-950">
            <img src={exampleImg} />
          </div>
          <div className="text-normal flex h-full w-full flex-shrink-0 flex-col gap-1 gap-4">
            <div className="flex h-full flex-col gap-1">
              <label className="pl-5">Select Header</label>
              <input
                className="h-full flex-1 rounded-3xl bg-neutral-100 px-5 py-3 text-base"
                placeholder="Type here"
              />
              <label className="pl-5">Select Header (square)</label>
              <label className="pl-5">Select screenshots</label>
            </div>
            <button className="rounded-3xl bg-black px-10 py-3 text-base font-semibold text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
