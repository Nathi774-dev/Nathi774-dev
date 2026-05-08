import { useState } from 'react';
import { ChevronDown } from 'lucide-react';


function ResumeDropdown(){
    const [open, setOpen] = useState(false);

    const resumes = [
        { name: "Web-Development", file: "../assets/resumes" },
        { name: "Game Development", file: "../assets/resumes" },
        { name: "AI/ML Engineering", file: "../assets/resumes" },
        { name: "Robotics Engineering", file: "../assets/resumes" }
    ];

    const openResume = (file) => {
        window.open(file, "_blank");
        setOpen(false);
    }

    return (
        <div className='relative'>
            {/* The button */}
            <button 
            className=''
            onClick={() => setOpen(!open)}
            >
                Resume
                <ChevronDown size={18} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className='absolute right-0 mt-3 w-64 bg-zinc-900 border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50'>
                    {resumes.map((resume, index) => (
                        <button
                            key={index}
                            onClick={() => openResume(resume.file)}
                            className='w-full text-left px-5 py-3 text-white hover:bg-cyan-500 hover:text-black transition'
                        >
                            {resume.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ResumeDropdown;