import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { loginEC } from "../api/auth/Login"; // Assume you have a login API
import { useLogin } from "../context/login";
export default function Login() {
  const { setIsLoggedIn } = useLogin();
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
      const response = await loginEC(email, password, setIsLoggedIn);
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
    <div className="fixed z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-60 text-white">
      <div className="relative overflow-hidden rounded-3xl bg-white py-14">
        <button
          className="absolute right-0 top-0 mr-5 mt-5 h-12 w-12 rounded-full bg-black"
          onClick={closeModal}
        >
          X
        </button>
        <h1 className="mb-5 w-[550px] text-center">Log In</h1>
        <div className="flex flex-col px-16 py-5">
          {error && <span className="mb-4 text-red-500">{error}</span>}
          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            Email:
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 h-12 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Type the email address here..."
          />
          <span className="mb-1 ml-4 text-base font-bold text-green-950">
            Password:
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 h-12 rounded-3xl bg-neutral-100 p-4 text-base font-normal text-zinc-500"
            placeholder="Type the password here..."
          />
          <button
            onClick={handleSubmit}
            className="flex h-12 items-center justify-center rounded-3xl bg-black p-4"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
