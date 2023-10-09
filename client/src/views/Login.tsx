export default function Login(){
    return (<div className="fixed h-full w-full  bg-opacity-60 bg-black z-10 text-white flex justify-center items-center ">
        <div className=" bg-white rounded-3xl overflow-hidden py-14 relative">
            <button className="absolute w-12 h-12 rounded-full bg-black right-0 top-0 mr-5 mt-5">X</button>
            <h1 className="text-center w-[550px] mb-5">Sign Up</h1>
            <div className="flex flex-col py-5 px-16 ">
                <span  className="ml-4 mb-1 text-green-950 text-base font-bold">Name:</span>
                <input className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal" placeholder="Type the name here..."></input>
                <span  className="ml-4 mb-1 text-green-950 text-base font-bold">Email:</span>
                <input className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal" placeholder="Type the email address here..."></input>
                <span  className="ml-4 mb-1 text-green-950 text-base font-bold">Wallet address:</span>
                <span  className=" flex items-center mb-12 p-4 h-12 bg-neutral-300 rounded-3xl text-zinc-500 text-base font-normal">0x65656446848464684684684</span>
                <button className="p-4 h-12  bg-black rounded-3xl flex items-center justify-center  ">Sign Up</button>
            </div>
        </div>
    </div>);
}