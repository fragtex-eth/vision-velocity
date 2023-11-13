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
import { useLogin } from "../context/loginContext";
import ProjectPrev from "../components/Common/ProjectPrev";

export default function CreateProject2() {
  const [name, setName] = useState("");
  const [screenshotPreviews, setScreenshotPreviews] = useState([]);

  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageSquare, setImageSquare] = useState("");
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
  const { setIsLoggedIn, isLoggedIn } = useLogin();

  const project = {
    id: 12341234,
    userId: "",
    image: image,
    name: "TestProject",
    funds: {
      collected: 350,
      required: 1200,
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };

  const handleCoverImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverSquareImageSelect = (event) => {
    console.log("handleCoverSquareImageSelect called");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Image loaded:", reader.result);
        setImageSquare(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScreenshotsSelect = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const previews = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === files.length) {
            setScreenshotPreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  const renderScreenshotPreviews = () => {
    return screenshotPreviews.map((preview, index) => (
      <img
        key={`preview${index + 1}`}
        className="h-8 w-12 rounded-xl"
        src={preview}
        alt={`Screenshot ${index + 1}`}
      />
    ));
  };

  return (
    <div className="fixed z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-60 text-white">
      <div className="relative  h-full max-h-[500px] w-full max-w-[1000px] overflow-hidden rounded-3xl bg-white p-14 text-black">
        <button
          className="absolute right-0 top-0 mr-5 mt-5 h-12 w-12 rounded-full bg-black text-white"
          onClick={closeModal}
        >
          X
        </button>
        <h2 className="mb-5 text-center text-4xl font-semibold text-black">
          Create project
        </h2>
        <div className="grid h-full max-w-[900px] grid-cols-2 gap-10 pb-10 text-lg font-semibold">
          <div className="flex w-full flex-shrink-0 flex-col justify-center gap-3 text-green-950">
            <ProjectPrev project={project} users={isLoggedIn} />
          </div>
          <div className="text-normal flex h-full  w-full flex-shrink-0 flex-col gap-4">
            <div className="flex h-full flex-col gap-1">
              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <label className="mb-2 block pl-5">Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageSelect}
                    className="hidden"
                    id="coverImageInput"
                  />
                  <div className="flex items-center">
                    <label
                      htmlFor="coverImageInput"
                      className="flex-1 cursor-pointer rounded-3xl bg-neutral-100 px-10 py-3 text-center text-base"
                    >
                      Select
                    </label>
                    {image && (
                      <img className="h-8 w-12 rounded-xl" src={image}></img>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <label className="mb-2 block pl-5">Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverSquareImageSelect}
                    multiple
                    className="hidden"
                    id="logoInput"
                  />
                  <div className="flex items-center">
                    <label
                      htmlFor="logoInput"
                      className=" w-full flex-1 cursor-pointer rounded-3xl bg-neutral-100 px-12 py-3 text-center text-base"
                    >
                      Select
                    </label>
                    {imageSquare && (
                      <img
                        className="h-8 w-12 rounded-xl"
                        src={imageSquare}
                      ></img>
                    )}
                  </div>
                </div>
              </div>
              <>
                <label className="mb-2 mt-12 pl-5">Screenshots</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotsSelect}
                  multiple
                  className="hidden"
                  id="screenshotsInput"
                />
                <label
                  htmlFor="screenshotsInput"
                  className="flex-1 cursor-pointer rounded-3xl bg-neutral-100 px-5 py-3 text-base"
                >
                  Select
                </label>
                {renderScreenshotPreviews()}
              </>
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
