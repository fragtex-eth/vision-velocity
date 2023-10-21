import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { loginEC } from "../api/auth/Login"; // Assume you have a login API
import { useLogin } from "../context/login";
export default function Login() {
    const{setIsLoggedIn} = useLogin();
    const { closeModal } = useModal();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!email || !password) {
            setError("Both email and password are required!");
            return;
        }

        try {
            const response = await loginEC(email, password,setIsLoggedIn);
            if (response && response.success) {
                closeModal();
            } else {
                setError(response.message || "Login failed!");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="fixed h-full w-full bg-opacity-60 bg-black z-10 text-white flex justify-center items-center">
            <div className="bg-white rounded-3xl overflow-hidden py-14 relative">
                <button className="absolute w-12 h-12 rounded-full bg-black right-0 top-0 mr-5 mt-5" onClick={closeModal}>X</button>
                <h1 className="text-center w-[550px] mb-5">Log In</h1>
                <div className="flex flex-col py-5 px-16">
                    {error && <span className="text-red-500 mb-4">{error}</span>}
                    <span className="ml-4 mb-1 text-green-950 text-base font-bold">Email:</span>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                        placeholder="Type the email address here..."
                    />
                    <span className="ml-4 mb-1 text-green-950 text-base font-bold">Password:</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4 p-4 h-12 bg-neutral-100 rounded-3xl text-zinc-500 text-base font-normal"
                        placeholder="Type the password here..."
                    />
                    <button onClick={handleSubmit} className="p-4 h-12 bg-black rounded-3xl flex items-center justify-center">Log In</button>
                </div>
            </div>
        </div>
    );
}
