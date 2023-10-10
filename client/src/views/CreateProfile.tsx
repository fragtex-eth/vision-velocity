import React, { useState } from 'react';

export default function CreateProfile() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setSelectedImage(file);
            setImagePreviewUrl(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (<div className="fixed h-full w-full  bg-opacity-60 bg-black z-10 text-white flex justify-center items-center ">
        <div className=" bg-white rounded-3xl overflow-hidden py-14 relative">
            <button className="absolute w-12 h-12 rounded-full bg-black right-0 top-0 mr-5 mt-5">X</button>
            <h1 className="text-center w-[550px] mb-5">Create Profile</h1>
            <div className="flex flex-col py-5 px-16 ">
                <span  className="ml-4 mb-1 text-green-950 text-base font-bold">Name:</span>
                <input className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal" placeholder="Type the name here..."></input>
                <div className="">
                <span className="ml-4 mb-1 text-green-950 text-base font-bold">Image:</span>
                <input className="" type="file" onChange={handleImageChange} />
                </div>
                    {imagePreviewUrl && <img src={imagePreviewUrl} alt="Profile Preview" className="mt-4 w-20 h-20 object-cover" />}                <span  className="ml-4 mb-1 text-green-950 text-base font-bold">Description</span>
                <textarea className="h-18 mb-4 p-4 h-28 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal" placeholder="Type the email address here..."></textarea>
                <span  className="ml-4 mb-1 text-green-950 text-base font-bold">Links:</span>
                <input className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal" placeholder="Github"></input>
                <input className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal" placeholder="X"></input>
                <input className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal" placeholder="Linkedin"></input>
                <button className="p-4 h-12  bg-black rounded-3xl flex items-center justify-center  ">Save</button>
            </div>
        </div>
    </div>);
}