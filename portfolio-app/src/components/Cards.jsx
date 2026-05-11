import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import webIcon from '../assets/images/web-dev-icon.jpg';
import gameIcon from '../assets/images/gamedev-icon.jpg';
import robotIcon from '../assets/images/robotic-icon.jpg';
import aiIcon from '../assets/images/AI-dev-icon.jpg';

function Cards(){
    const nav = useNavigate()

    const cardData = [
        {
            title: "AI/ML Engineering",
            description: "I develop train and test small AI models and build AI systems",
            icon: aiIcon,
            route: "/ai-ml",
            glow: "hover:shadow-purple-500/20"
        },
        {
            title: "Robotics Building",
            description: "I combine computer science, mechanical and electrical engineering to make smart machines",
            icon: robotIcon,
            route: "/robots",
            glow: "hover:shadow-orange-500/20"
        },
        {
            title: "Web development",
            description: "I create modern full-stack websites, apps and APIs, but I mainly specialize in APIs",
            icon: webIcon,
            route: "/webdev",
            glow: "hover:shadow-green-500/20"
        },
        {
            title: "Game Development",
            description: "I build small indie games for now, but will scale overtime",
            icon: gameIcon,
            route: "/gamedev",
            glow: "hover:shadow-blue-500/20"
        },
    ];

    return (
        <section
            id='cards'
            className='bg-black text-white py-24 px-6'
        >
            <div className='max-w-7xl mx-auto'>

                {/* Heading */}
                <motion.div
                    initial={{opacity: 0, x: -40}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.7}}
                    viewport={{once: true}}
                    className='text-center mb-16'
                >
                    <p className='text-cyan-400 text-lg mb-40'>
                        What I do
                    </p>

                    <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                        Explore my Fields
                    </h2>

                    <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
                        I work across multiple areas of technology - from building full-stack websites, immersive experiences and AI systems to building hardware robotic solutions.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-8'>
                    {cardData.map((card, index) => (
                        <motion.div
                            key={index}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{delay: index * 0.1, duration: 0.6}}
                            viewport={{once: true}}
                            onClick={() => nav(card.route)}
                            className={`b-zinc-400 border border-white/10 rounded-2xl p-7 cursor-pointer transition duration-300 hover:-translate-y-2 hover:border-cyan-400 shadow-xl ${card.glow}`}
                        >
                            {/* The icon goes here */}
                            <div className='w-15 h-15 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6'>
                                <img 
                                    src={card.icon}
                                    alt={card.title}
                                    className='w-10 h-10 object-contain'
                                />
                            </div>

                            {/* The title goes here */}
                            <h3 className='text-2xl font-bold mb-4'>
                                {card.title}
                            </h3>

                            {/* Description goes here */}
                            <p className='text-gray-400 leading-relaxed mb-6'>
                                {card.description}
                            </p>

                            {/* CTA */}
                            <div className='flex items-center gap-2 text-cyan-400 font-semibold'>
                                Explore
                                <ArrowRight size={18} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Cards;