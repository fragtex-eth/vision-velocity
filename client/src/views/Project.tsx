import ProfilePic from "./../assets/profilPic.png"
import ProjectImg from "./../assets/exampleImg.png"
import { FaLinkedin , FaSquareXTwitter, FaGithub,FaWallet} from 'react-icons/fa6';
//@ts-ignore
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



export default function Project(){
    function FullCarousel(){
        return(
            <Carousel infiniteLoop={true} emulateTouch={true} showStatus={false} autoPlay={true} className="text-center" >
                <div>
                    <img src={ProjectImg} />
                </div>
                <div>
                    <img src={ProjectImg}  />
                </div>
                <div>
                    <img src={ProjectImg}  />
                </div>
            </Carousel>
        )
    }
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
                <div className="flex justify-center">
                    <span className="-mt-4 -mb-4 text-right w-[850px] text-green-950 text-xl"><span className="font-semibold text-2xl">1100$</span> / 1300$</span>
                </div>
                <div className="progress h-0.5 w-3/4 bg-gray-400  ml-auto mr-auto">
                    <div className="inside h-1 bg-black w-3/4 -mt-[1px] rounded-[40px]"></div>
                </div>
                <div className="mx-auto w-96 flex justify-between gap-5">
                    <div className="h-12 flex border border-black rounded-3xl ">
                        <input className="bg-white h-full w-full  rounded-s-3xl  px-8" placeholder="10"></input>
                        <div className="   bg-gray-50 h-full w-[75px] rounded-e-3xl flex items-center px-4">BUSD</div>
                    </div>
                    <button className="px-8 h-12 bg-white rounded-3xl shadow border border-black justify-center">Invest</button>
                </div>
                <p className="flex justify-center text-xs -mt-4">By continuing, you agree to our<a>Terms of Service</a> and acknowledge our <a>Privacy Policy</a></p>
                <p className=" text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <div className="">
                <h3 className="overflow-hidden mb-3">Gallery</h3>
                    <FullCarousel/>
                </div>
                <div className="">
                    <h3 className="overflow-hidden mb-3">Updates</h3>
                    <div className="gap-7 columns-3 block updateblock ">
                    <div className="slide w-[340px] bg-white rounded-[30px] overflow-hidden h-min mb-7">
                        <img src={ProjectImg}></img>
                        <div className="p-4">
                        <p>Media</p>
                        <p>Update: Thu 4 Aug 2023</p>
                        <h3>Blockchain Name</h3>
                        <p>Focus: Now</p>
                        <p>Status: In progress</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                    <div className="slide w-[340px] bg-white rounded-[30px] overflow-hidden  h-min mb-7">
                        <img src=""></img>
                        <div className="p-4">
                        <p>Media</p>
                        <p>Update: Thu 4 Aug 2023</p>
                        <h3>Blockchain Name</h3>
                        <p>Focus: Now</p>
                        <p>Status: In progress</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                    <div className="slide w-[340px] bg-white rounded-[30px] overflow-hidden  h-min  mb-7">
                        <img src=""></img>
                        <div className="p-4">
                        <p>Media</p>
                        <p>Update: Thu 4 Aug 2023</p>
                        <h3>Blockchain Name</h3>
                        <p>Focus: Now</p>
                        <p>Status: In progress</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                    <div className="slide w-[340px] bg-white rounded-[30px] overflow-hidden  h-min mb-7">
                        <img src=""></img>
                        <div className="p-4">
                        <p>Media</p>
                        <p>Update: Thu 4 Aug 2023</p>
                        <h3>Blockchain Name</h3>
                        <p>Focus: Now</p>
                        <p>Status: In progress</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                    <div className="slide w-[340px] bg-white rounded-[30px] overflow-hidden h-min mb-7">
                        <img src={ProjectImg}></img>
                        <div className="p-4">
                        <p>Media</p>
                        <p>Update: Thu 4 Aug 2023</p>
                        <h3>Blockchain Name</h3>
                        <p>Focus: Now</p>
                        <p>Status: In progress</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}