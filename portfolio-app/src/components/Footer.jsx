import { ArrowUp } from 'lucide-react';


function Footer(){
    const year = new Date().getFullYear()

    return (
        <footer className='bg-black text-white border-t border-white/10 px-6 py-12'>
            <div className='max-w-7xl mx-auto'>

                {/* Top section */}
                <div className='grid md:grid-cols-3 gap-10 items-start'>

                    {/* Brand */}
                    <h2 className='text-3xl font-bold mb-3'>
                        Anathi <span className='text-cyan-400'>.</span>
                    </h2>

                    <p className='text-gray-400 leading-relaxed max-w-sm'>
                        Mulit-crafted builder focused on Web development, AI systems, Game Development and Robotics Engineering
                    </p>
                </div>

                {/* The final section of the footer */}
                <div className='border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4'>

                    <p className='text-gray-500 text-sm'>
                        &copy; {year} Anathi Feni. All rights reserved
                    </p>

                    <a
                        href='top'
                        className='flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition'
                    >
                        Back to Top
                        <ArrowUp size={18} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;