import {motion} from 'framer-motion';
import {ArrowRight} from 'lucide-react';
import avatarGif from '../assets/images/web-dev2.gif';

function Header() {
    return (
        <header className='min-h-screen bg-black text-white flex items-center pt-24 px-6' id='top'>
            <div className='max-w-7x1 mx-auto w-grid grid md:grid-cols-2 gap-12 items-center'>

                {/* Left side */}
                <motion.div
                    initial={{opacity: 0, x: -40}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.8}}
                >
                    <p className='text-cyan-400 text-lg mb-3'>
                        Hello I'm
                    </p>
                    <h1 className='text-5x1 md:text-7x1 font-bold leading-tight mb-6'>
                        Anathi <span className='text-cyan-400'>Feni</span>
                    </h1>

                    <h2 className='text-2x1 md:text-3x1 font-semibold text-gray-300 mb-6'>
                        Web Developer | AI/ML Engineer | Game Developer | Robotics Builder
                    </h2>

                    <p className='text-gray-400 text-lg mx-w-xl mb-8 leading-relaxed'>
                        I build websites, intelligent systems, game experiences,
                        and hardware solutions that combine creativity with technology.
                    </p>

                    {/* The buttons go here */}
                    <div className='flex flex-wrap gap-4'>
                        <a
                            href='#cards'
                            className='bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition duration-300'
                        >
                            View My Work
                            <ArrowRight size={19} />
                        </a>
                        <a
                            href="#contact"
                            className='border border-white/20 hover:border-cyan-400 hover:text-cyan-400 px-6 py-3 rounded-xl font-semibold transition duration-300'
                        >
                            Contact Me
                        </a>
                    </div>
                </motion.div>

                {/*Right side ofth screen*/}
                <motion.div
                    initial={{opacity: 0, x: -40}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.8}}
                >
                    <div className='relative w-72 h-72 md:96 md:h-96 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 p-1 shadow-2x1'>
                        <div className='w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-7x1 font-bold text-white'>
                            <img src={avatarGif} alt="Anathi's avatar" className='w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-7x1 font-bold text-white' />
                        </div>

                        {/* Floating Glow */}
                        <div className='absolute inset-0 rounded-full blur-3x1 bg-cyan-500/20 animate-pulse'></div>
                    </div>
                </motion.div>
            </div>
        </header>
    )
}

export default Header;