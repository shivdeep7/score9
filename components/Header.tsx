import Menu from '@/components/MenuComposer';
import Link from 'next/link';
import React from 'react';



const Header = () => {
    return (
    <header className="flex w-full p-2 bg-orange-50">
      <nav className="flex flex-row m-auto w-full lg:max-w-7xl justify-between items-center space-x-2">
      <div className="flex flex-row items-center ">
        <Link href="/dashboard"><span className="bg-orange-600 font-bold text-2xl bg-clip-text text-transparent mr-3">Score9</span></Link>
         <Menu />
      
      </div>
          <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="" />
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
      
      </nav>
       

       
  </header>
    )
}
export default Header;