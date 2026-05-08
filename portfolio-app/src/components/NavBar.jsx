import { useState } from "react";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ResumeDropdown from "./ResumeDropdown";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        {name: "Home", path: "/"},
        {name: "About", path: "#about"},
        {name: "Skills", path: "#skills"},
        {name: "Projects", path: "#cards"},
        {name: "Contact", path: "#contact"}
    ];

    return (
        <nav className='w-full fixed top-0 left-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10'>
            <div className='max-w-7xl max-auto px-6 py-4 flex items-center justify-between'>
                
                <Link to='/' className='text-2xl font-bold text-white tracking-wide'>
                    Anathi Feni<span className='text-cyan-500'>.</span>
                </Link>

                <ul className='hidden md:flex items-center gap-8 text-white font-medium'>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <a
                                href={link.path}
                                className='hover:text-cyan-400 transition duration-300'
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* This is the resume button, this should be connected to a resume component */}
                <ResumeDropdown />
                {/* Mobile Menu button */}
                <button
                    className='md:hidden text-white'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className='md:hidden bg-black border-t border-white/10 px-6 py-6 space-y-5'>
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.path}
                            className='block text-white text-lg hover:text-cyan-400 transition'
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}

                    <button className='w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-xl font-semibold'>
                        Resume
                    </button>
                </div>
            )}
        </nav>
    )

}

export default NavBar;