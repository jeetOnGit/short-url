
import { Link } from 'react-router-dom';
import './App.css';



function App() {

  const handleGenerate = () => {
    fetch('https://airbnb-dl81.onrender.com/api/category/all')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching hotels:', error));
  }

  return (
    <div className="App bg-[#0F162A] h-screen text-white">
      <div className="container mx-auto">
        <header className='flex justify-between items-center py-5'>
          <div className='flex justify-between items-center'>
            <Link to='/' className='flex justify-between items-center gap-2 text-[1.5rem]'><i className="fa-solid fa-link" /><h1 className='font-semibold'>ShortURL</h1></Link>
            
          </div>
          <div className="links flex justify-between items-center gap-4 text-[1.3rem]">
            <Link to='https://github.com/jeetOnGit/' target='_blank'><i className="fa-brands fa-github" /></Link>
            <Link to='https://www.linkedin.com/in/connectwithjeet/' target='_blank'><i className="fa-brands fa-linkedin" /></Link>
            <Link to='https://www.instagram.com/jeetdas709/' target='_blank'><i className="fa-brands fa-instagram" /></Link>
            
          </div>
        </header>

        <main className=''>
          <div className='w-[700px] mx-auto text-center'>
            <input type="text" placeholder='Enter your URL' className='w-[60%] pl-2 py-[12px] focus:outline-none text-black'/>
            <button className='btn bg-[#21fda8] text-[#0F162A] font-semibold px-4 py-3'>Generate</button>
          </div>

          <div className='getData text-center mt-5'>
            <div className="userlink">asdfghjklqwertyuiozxcvbnm <button><i class="fa-solid fa-copy" /></button></div>
            <h4>Total clicks : </h4>
          </div>
        </main>

        <footer className='text-center bottom-[20px] absolute left-[42%]'>
          <h4>Made by <Link to='https://www.linkedin.com/in/connectwithjeet/' target='_blank' className='font-semibold text-[#21fda8]'>Jeet Das</Link> with <i class="fa-solid fa-heart text-[#fd2121]" /></h4>
        </footer>
      </div>
    </div>
  );
}

export default App;
