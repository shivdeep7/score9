import Menu from '@/components/MenuComposer';
import React from 'react';



const Header = () => {
    return (
    <header className="flex w-full shadow-md shadow-stone-500/20 p-2 justify-evenly items-center bg-white">
        <span className="bg-gradient-to-r from-pink-500 to-indigo-500 font-bold text-2xl bg-clip-text text-transparent">Score9</span>
         <Menu />
        <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>

       
    </header>
    )
}
export default Header;