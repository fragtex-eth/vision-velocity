import Logo from "../../assets/logo.svg"
import { BiSearch } from 'react-icons/bi';
import { Link } from "react-router-dom";
export default function Header(){
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
            <button className="text-white bg-black rounded-[40px] shadow w-40 h-[45px]">Connect</button>
        </header>
    )
}