import { useEffect } from "react";
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

export default function Header() {
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
          <div className="flex flex-col">
            <div className="flex items-center justify-center gap-1">
              <div className="relative">
                <img
                  src={profilePic}
                  className="h-13 w-13 rounded-full border border-black"
                />
                <div className="text-md shadowClass absolute -ml-2 -mt-6 flex h-7 w-7 items-center justify-center rounded-full bg-black font-semibold text-white shadow">
                  5
                </div>
              </div>
              <div className="relative leading-5">
                <span>
                  Hello,
                  <br />
                  <Link to={`/profile/${isLoggedIn?.id}`}>
                    {isLoggedIn?.name.split(" ")[0]}
                  </Link>
                </span>
                <div className="dropdown--extended">
                  <div className="arrow-up absolute z-10 -ml-[42px] mt-3.5 "></div>
                  <div className="z-1 absolute -ml-[75px] mt-5 h-[150px] w-[150px] rounded-xl bg-[#ffffff]"></div>
                </div>
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
