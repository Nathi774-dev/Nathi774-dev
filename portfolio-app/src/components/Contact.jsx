import { motion } from "framer-motion";

import linkedin from '../assets/images/linkedin-icon.jpg';
import gmail from '../assets/images/gmail-icon.jpg';
import github from '../assets/images/github-icon.jpg';
import upwork from '../assets/images/upwork-icon.png';
import freelancer from '../assets/images/freelancer-icon.jpg';
import fiverr from '../assets/images/fiverr-icon.png'

function Contact(){
    return (
        <section id="contact" className="bg-black text-white py-24 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Get in touch
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Got an idea, project, or opportunity. Let's build it together.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -1 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">
                                Contact Details
                            </h3>

                            <p className="text-gray-400">
                                Feel free to reach out to me via email or other social platforms
                                mentioned below
                            </p>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-4 text-gray-300">
                            <span>adamschad589@gmail.com</span>
                        </div>

                        {/* Socials */}
                        <div className="flex gap-4 pt-4">
                            <a
                                href="https://github.com/Nathi774-dev/Nathi774-dev.git"
                                target="_blank"
                                className="w-12 h-12 bg-zinc-900 hover:bg-cyan-500 hover:text-black flex items-center justify-center rounded-xl transition"
                            >
                                <img 
                                    src={github}
                                    className='w-10 h-10 object-contain'
                                />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/anathi-feni-464534342/"
                                target="_blank"
                                className="w-12 h-12 bg-zinc-900 hover:bg-cyan-500 hover:text-black flex items-center justify-center rounded-xl transition"
                            >
                                <img 
                                    src={linkedin}
                                    className='w-10 h-10 object-contain'
                                />
                            </a>
                            <a
                                href="mailto:adamschad589@gmail.com"
                                target="_blank"
                                className="w-12 h-12 bg-zinc-900 hover:bg-cyan-500 hover:text-black flex items-center justify-center rounded-xl transition"
                            >
                                <img 
                                    src={gmail}
                                    className='w-10 h-10 object-contain'
                                />
                            </a>
                            <a
                                href="https://www.fiverr.com/sellers/sigmaf0xx/edit"
                                target="_blank"
                                className="w-12 h-12 bg-zinc-900 hover:bg-cyan-500 hover:text-black flex items-center justify-center rounded-xl transition"
                            >
                                <img 
                                    src={fiverr}
                                    className='w-10 h-10 object-contain'
                                />
                            </a>
                            <a
                                href="https://www.freelancer.com/u/anathif2"
                                target="_blank"
                                className="w-12 h-12 bg-zinc-900 hover:bg-cyan-500 hover:text-black flex items-center justify-center rounded-xl transition"
                            >
                                <img 
                                    src={freelancer}
                                    className='w-10 h-10 object-contain'
                                />
                            </a>
                            <a
                                href="https://www.upwork.com/freelancers/~01c9a86cd4f4359808"
                                target="_blank"
                                className="w-12 h-12 bg-zinc-900 hover:bg-cyan-500 hover:text-black flex items-center justify-center rounded-xl transition"
                            >
                                <img 
                                    src={upwork}
                                    className='w-10 h-10 object-contain'
                                />
                            </a>
                        </div>
                    </motion.div>

                    {/* Contact form */}
                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-zinc-900 border border-white/10 rounded-2xl p-8 space-y-5"
                    >
                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full p-3 rounded-xl bg-black border border-white/10 focus:border-cyan-500 outline-none"
                        />

                        <textarea placeholder="Your message"
                            rows="5"
                            className="w-full p-3 rounded-xl bg-black border border-white/10 focus:border-cyan-500 outline-none"
                        />

                        <button
                            type="button"
                            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl transition"
                        >
                            Send Message
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    )
}

export default Contact;