import { motion } from 'framer-motion';

function Skills(){
    const skills = [
        {
            title: "Problem-Solving",
            desc: "Breaking complex problems into simple chunks for understanding"
        },
        {
            title: "Git and Github workflow",
            desc: "I know how to make pull requests, push files to remote repos and work with the git CLI"
        },
        {
            title: "UI/UX Thinking",
            desc: "I can design modern UIs with the principles of UX design"
        },
        {
            title: "Data manipulation",
            desc: "I can work with numpy, pandas and matplotlib to clean and prepare data for training (at a junior level)"
        },
        {
            title: "Creativity",
            desc: "This aids me when creating websites or games, I have an eye for art in the fields of engineering."
        },
        {
            title: "AI model understanding",
            desc: "I understand how the training and testing workflow works for models"
        },
        {
            title: "Basic Robotics and hardware control",
            desc: "I have worked with sensors and breadboard circuits, but not motors or transistors yet."
        },
        {
            title: "Building and Maintaining Servers",
            desc: "I have made one API project so far, so I just need to learn to build a full-stack application"
        },
    ];
    return (
        <section id="skills" className='bg-black text-white py-24 px-6'>
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className='text-center mb-16'
                >
                    <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                        My Skills
                    </h2>

                    <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
                        These are the core skills I have obtained across development, AI and Robotics
                    </p>
                </motion.div>

                {/* Grid */}
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className='bg-zinc-900 border border-white/10 rounded-xl p-6 hover:border-cyan-400 transition'
                        >
                            <h3 className='text-xl font-semibold text-cyan-400 mb-3'>
                                {skill.title}
                            </h3>

                            <p className='text-gray-400 leading-relaxed'>
                                {skill.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills;