import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAuth = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
      // User exists – login
      if (users[email].password === password) {
        localStorage.setItem("currentUser", email);
        navigate("/profile");
      } else {
        setError("Incorrect password");
      }
    } else {
      // New user – signup
      users[email] = { password };
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", email);
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Login / Sign Up
            </h1>

            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm mb-3"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm mb-3"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

                <button
                  onClick={handleAuth}
                  className="mt-3 tracking-wide font-semibold bg-indigo-500 text-white w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
                >
                  <span className="ml-3">Continue</span>
                </button>

                <Link
                  to="/"
                  className="mt-3 tracking-wide font-semibold bg-indigo-500 text-white w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
                >
                  <span className="ml-3">Return to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
