import { Link } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScaleLoader } from 'react-spinners';
import ScaleLoader from "react-spinners/ScaleLoader";

function App() {
  const [userURL, setUserURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [loader, setLoader] = useState(false)
  const [color, setColor] = useState("#21fda8")
  
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setLoader(true)
    fetch('https://short-url-backend-vx4y.onrender.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: userURL }), 
    })
      .then((response) => response.json())
      .then(data => {
        setShortURL(data.id)
      })
      .catch(error => console.error('Error shortening URL:', error))
      .finally(() =>{
        setLoader(false)
      })
    
  };



  const handleCopy = () => {
    const textToCopy = document.querySelector('.copy-text').innerText
    navigator.clipboard.writeText(textToCopy);
    toast.success("Link Copied", { position: "top-right", });
  };

  return (
    <div className="App bg-[#0F162A] h-screen text-white px-2">
      <ToastContainer />

      <div className="container mx-auto">
        <header className="flex justify-between items-center py-5">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex justify-between items-center gap-2 text-[1.5rem]"
            >
              <i className="fa-solid fa-link" />
              <h1 className="font-semibold">ShortURL</h1>
            </Link>
          </div>
          <div className="links flex justify-between items-center gap-4 text-[1.3rem]">
            <Link to="https://github.com/jeetOnGit/" target="_blank">
              <i className="fa-brands fa-github" />
            </Link>
            <Link
              to="https://www.linkedin.com/in/connectwithjeet/"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin" />
            </Link>
            <Link to="https://www.instagram.com/jeetdas709/" target="_blank">
              <i className="fa-brands fa-instagram" />
            </Link>
          </div>
        </header>

        <main>
          <form className="w-[700px] mx-auto text-center max-[778px]:w-[500px] max-[520px]:w-[300px]" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your URL"
              value={userURL}
              onChange={(e) => setUserURL(e.target.value)}
              className="w-[80%] pl-2 py-[12px] focus:outline-none text-black max-[520px]:w-[100%] max-[520px]:mb-3"
            />
            <button
              type="submit" 
              className="btn bg-[#21fda8] text-[#0F162A] font-semibold px-4 py-3"
            >
              Generate
            </button>
          </form>

            {loader && (<ScaleLoader className='text-center mt-4 w-full'
            color={color}
            loading='true'
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />)}

          <div className="getData text-center mt-5">
            { shortURL && (
             <div className="userlink">
             <p>Your shortened URL: <a href={shortURL} target="_blank" rel='noreferrer' className="copy-text">https://short-url-3cjn.onrender.com/{shortURL}</a></p>
             <button onClick={handleCopy} className="bg-[#21fda8] py-2 px-3 mt-2">
               <i className="fa-solid fa-copy text-[1.5rem]" />
             </button>
           </div>
            )}
            
          </div>
        </main>


        <footer className="text-center bottom-[20px] absolute left-[42%]">
          <h4>
            Made by{" "}
            <Link
              to="https://www.linkedin.com/in/connectwithjeet/"
              target="_blank"
              className="font-semibold text-[#21fda8]"
            >
              Jeet Das
            </Link>{" "}
            with <i class="fa-solid fa-heart text-[#fd2121]" />
          </h4>
        </footer>
      </div>
    </div>
  );
}

export default App;
