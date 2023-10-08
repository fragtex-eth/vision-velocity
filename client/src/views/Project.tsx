import ProfilePic from "./../assets/profilPic.png"
import ProjectImg from "./../assets/exampleImg.png"
import { FaLinkedin , FaSquareXTwitter, FaGithub,FaWallet} from 'react-icons/fa6';

export default function Project(){
    return (
        <div className="relative">
            <img src={ProfilePic} className="absolute left-0 right-0 w-64 m-auto -top-32"></img>
            <div className="flex flex-col gap-7 justify-between py-7 px-24 mt-[160px]  surveys flex flex-wrap  bg-red-50 border border-solid mt-11 border-white max-w-[1270px] rounded-[45px] ml-auto mr-auto">
                <h2 className="ml-auto mr-auto mt-28">Mike Mueller</h2>
                <div className="links flex justify-between w-40 text-2xl ml-auto mr-auto">
                    <FaSquareXTwitter/>
                    <FaGithub/>
                    <FaLinkedin/>
                    <FaWallet/>
                </div>
                <p className=" text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <div className="">
                <h3 className="mb-2">Gallery</h3>
                
                </div>
            </div>
        </div>
    )
}