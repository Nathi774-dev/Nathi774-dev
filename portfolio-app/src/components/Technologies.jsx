import pythonIcon from '../assets/images/python-icon.png';
import basicsIcon from '../assets/images/basics-icon.jpg';
import nodeIcon from '../assets/images/nodejs-icon.jpg';
import reactIcon from '../assets/images/react-icon.jpg';
import gitIcon from '../assets/images/git-icon.png';
import mongoIcon from '../assets/images/mongodb-icon.png';
import pandasIcon from '../assets/images/pandas-icon.jpg';
import godotIcon from '../assets/images/godot-icon.jpg';
import numpyIcon from '../assets/images/numpy-icon.png';
import { motion } from 'framer-motion';



function Technologies(){
    const techstack = [
        { name: "React", icon: reactIcon },
        { name: "Node.js", icon: nodeIcon },
        { name: "Basic web technologies", icon: basicsIcon },
        { name: "MongoDB", icon: mongoIcon },
        { name: "Git", icon: gitIcon },
        { name: "Python", icon: pythonIcon },
        { name: "Godot engine", icon: godotIcon },
        { name: "Pandas", icon: pandasIcon },
        { name: "Numpy", icon: numpyIcon }
    ];

    return (
        <section id='technologies' className='bg-black text-white py-24 px-6'>
            <div className='max-w-7xl mx-auto'>
                {/* Heading */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className='text-center mb-16'
                >
                    <p className='text-cyan-400 text-l mb-2'>
                        Tech Stack
                    </p>

                    <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                        The tools I use
                    </h2>

                    <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
                        These are the technologies and tools I use to build modern projects across my multiple fields.
                    </p>
                </motion.div>

                {/* grid */}
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>

                    {techstack.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                duration: 0.35,
                                delay: index * 0.05
                            }}
                            viewport={{ once: true }}
                            className="bg-zinc-900 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center hover:border-cyan-400 transition cursor-pointer"
                        >
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                className='w-14 h-14 object-contain mb-4'
                            />

                            <p className='text-sm text-gray-300 text-center font-medium'>
                                {tech.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Technologies;