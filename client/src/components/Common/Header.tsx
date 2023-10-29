import { useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useProjects } from "../../context/projectsContext";
import { fetchProjects } from "../../services/project/FetchProjects";
import { useUsers } from "../../context/userContext";
import { fetchUserData } from "../../services/user/FetchUsers";
import { useLogin } from "../../context/loginContext";
import { fetchUserDetails } from "../../services/user/FetchIUser";
import { useModal } from "../../context/modalContext";
import { logoutEC } from "../../services/auth/Logout";
import profilePic from "../../assets/profilPic.png";
import DefaultUser from "../../assets/defaultUserImg.webp";

import { FiLogOut, FiTool, FiUser, FiSettings } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setProjects } = useProjects();
  const { setUsers, users } = useUsers();
  const { setIsLoggedIn, isLoggedIn } = useLogin();
  const { openModal } = useModal();

  useEffect(() => {
    async function getProjects() {
      try {
        const response = await fetchProjects();
        const sorted = response.sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime(),
        );
        setProjects(sorted);
        getUsers();
        getUser();
        //setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        //setError(err as Error);
        //setLoading(false);
      }
    }
    getProjects();
  }, []);

  async function getUsers() {
    try {
      const response = await fetchUserData();
      setUsers(response);
      //setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      //setError(err as Error);
      //setLoading(false);
    }
  }

  async function getUser() {
    try {
      const response = await fetchUserDetails(setIsLoggedIn);
    } catch (err) {
      console.error("Error fetching users:", err);
      //setError(err as Error);
      //setLoading(false);
    }
  }

  return (
    <header className="mb-14 flex items-center justify-between p-5">
      <Link to={`/`}>
        <img src={Logo} />
      </Link>
      <div className="h-[45px] w-[320px]">
        <input
          className="absolute flex h-[45px] w-[320px] rounded-[40px] bg-neutral-100 pl-12 pr-8"
          placeholder="Search..."
        ></input>
        <div className="z-2 absolute ml-5 mt-3.5 text-lg">
          <BiSearch />
        </div>
      </div>
      {/* <ConnectButton /> */}
      <div className="">
        {!isLoggedIn || isLoggedIn.message === "unauthenticated" ? (
          <>
            <button onClick={() => openModal("register")}>Register</button>{" "}
            <button onClick={() => openModal("login")}>Login</button>
          </>
        ) : (
          <div
            className="flex cursor-pointer flex-col"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="hd relative">
                <img
                  src={users[isLoggedIn?.id]?.image || DefaultUser}
                  className="max-w-12 h-full max-h-12 w-full rounded-full border border-black"
                />
                <div className="text-md shadowClass absolute -ml-2 -mt-6 flex hidden h-7 w-7 items-center justify-center rounded-full bg-black font-semibold text-white shadow">
                  5
                </div>
              </div>
              <div className="relative cursor-pointer leading-5">
                <span>
                  Hello,
                  <br />
                  {isLoggedIn?.name.split(" ")[0]}
                </span>
                {menuOpen && (
                  <div className="dropdown--extended">
                    <div className="arrow-up absolute z-10 -ml-[37px] mt-2.5 "></div>
                    <div className="z-1 absolute -ml-[90px] mt-4 h-[152px] w-[160px] gap-2 rounded-xl bg-[#ffffff] p-4 pt-3">
                      <Link to={`/profile/${isLoggedIn?.id}`}>
                        <div className="flex items-center gap-2 py-1 text-base text-black hover:text-green-800">
                          <FiUser />
                          Profile
                        </div>
                      </Link>
                      <hr />
                      <div
                        className="flex cursor-pointer items-center gap-2 py-1 text-base text-black hover:text-green-800"
                        onClick={() => openModal("createProject")}
                      >
                        <FiTool />
                        Create Project
                      </div>
                      <hr />
                      <div
                        className="flex cursor-pointer items-center gap-2 py-1 text-base text-black hover:text-green-800"
                        onClick={() => openModal("editProfile")}
                      >
                        <FiSettings />
                        Edit Profile
                      </div>
                      <hr />
                      <div
                        className="flex cursor-pointer items-center gap-2 py-1 text-base text-black hover:text-green-800"
                        onClick={async () => {
                          await logoutEC(setIsLoggedIn);
                          console.log("now");
                        }}
                      >
                        <FiLogOut />
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* <button
              className="text-xs text-gray-400"
              onClick={async () => {
                await logoutEC(setIsLoggedIn);
                console.log("now");
              }}
            >
              Logout
            </button> */}
          </div>
        )}
      </div>
    </header>
  );
}
