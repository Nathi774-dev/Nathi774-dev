import { motion } from 'framer-motion';
import avatarGif from '../assets/images/web-dev.gif';

function AboutMe(){
    return (
        <section id='about' className='bg-black text-white py-24 px-6'>
            <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center'>
                {/* Left side is the image and avatar */}

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.03, rotate: 1 }}
                    viewport={{ once: true }}
                    className='flex justify-center'
                >
                    <div className='relative w-80 h-80 md:w-[420px] md:h-[420px] rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-700 p-1 shadow-2xl'>
                        <div className='w-full h-full rounded-3xl bg-zinc-900 flex items-center justify-center text-6xl font-bold'>
                            <img src={avatarGif} alt="Anathi's avatar" className='w-full h-full object-cover rounded-3xl' />
                        </div>
                    </div>
                </motion.div>

                {/* Right side content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <p className='text-cyan-400 text-lg mb-3'>
                        About me
                    </p>

                    <h2 className='text-4xl md:text-5xl font-bold mb-6'>
                        Combining ideas and creativity with reality
                    </h2>

                    <p className='text-gray-400 leading-relaxed text-lg mb-6'>
                        Hello there, I'm Anathi Feni, a South African junior developer and robotics builder.
                        I am currently in college but excel higher than the average students. I work in a spectrum of 
                        fields in technology, such as computer science, artificial intellience and robotics engineering.
                    </p>

                    <p className='text-gray-400 leading-relaxed text-lg mb-6'>
                        I enjoy solving problems, recently started game development because of my love for games and creativity.
                        My goal is to become a world-class engineer capable of building digital, virtual and physical innovations.
                        I have always wanted to start my own company from these fields, but for now I just offer services.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutMe;