import { useEffect } from "react";
import Logo from "../../assets/logo.svg"
import { BiSearch } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useProjects } from "../../context/projectsContext";
import { fetchProjects } from "../../api/project/FetchProjects";
import { useUsers } from "../../context/userContext";
import { fetchUserData } from "../../api/user/FetchUsers";
import { useLogin } from "../../context/login";
import {fetchUserDetails} from "../../api/user/FetchIUser"
import { useModal } from "../../context/ModalContext";

export default function Header(){
    const { setProjects } = useProjects();
    const {setUsers,users} = useUsers();
    const {isLoggedIn, setIsLoggedIn} = useLogin();
    const {openModal} = useModal();

        useEffect(() => {
            async function getProjects() {
                try {
                    const response = await fetchProjects();
                    const sorted = response.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
                    setProjects(sorted);
                    console.log(sorted)
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

        async function getUsers(){
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

        async function getUser(){
            try {
                const response = await fetchUserDetails();
                console.log(response)
                setIsLoggedIn(response);
                //setLoading(false);
            } catch (err) {
                console.error("Error fetching users:", err);
                //setError(err as Error);
                //setLoading(false);
            }
        }

    return (
        <header className="flex justify-between p-5 items-center mb-14">
            <Link to={`/`}>
                <img src={Logo}/>
            </Link>
            <div className=" w-[320px] h-[45px]">
                <input className="absolute w-[320px] h-[45px] pr-8 pl-12 bg-neutral-100 rounded-[40px]" placeholder="Search..." ></input>
                <div className="absolute z-2 text-lg mt-3.5 ml-5">
                    <BiSearch/>
                </div>
            </div>
            {/* <ConnectButton /> */}
            <div className="">
                {!isLoggedIn || isLoggedIn.message === "unauthenticated" ?
                (<><button onClick={()=> openModal('register')}>Register</button>
                {" "}
                <button onClick={()=> openModal('login')}>Login</button></>): null
            }
            </div>
        </header>
    )
}