import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { motion } from "framer-motion";
import github from "../assets/images/github-icon.jpg";

/* The portfolio assets for this webpage 
These are the images and short videos for each project
*/

// The Image API project
import imageapiVid from "../assets/Videos/WebDev/bandicam 2026-05-11 17-11-14-783.mp4";
import imaeapiPic1 from "../assets/images/WebDev/Screenshot (44).png";
import imaeapiPic2 from "../assets/images/WebDev/Screenshot (45).png";
import imaeapiPic3 from "../assets/images/WebDev/Screenshot (46).png";

// The AI Job tracker (SaaS application)
import aiJobTrackerVid from "../assets/Videos/WebDev";
import jobTrackerPic1 from "../assets/images/WebDev";
import jobTrackerPic2 from "../assets/images/WebDev";
import jobTrackerPic3 from "../assets/images/WebDev";

function WebDev(){
    const projects = [
        {
            title: "Image uploading API",
            desc: "An API that allows the user to upload save and delete video and image files.",
            link: "https://github.com/Nathi774-dev/Nathi774-dev/tree/web-development/ImageAPI-Project",
            tech: ["Python", "FastAPI", "HTML"],
            video: imageapiVid,
            gallery: [imaeapiPic1, imaeapiPic2, imaeapiPic3]
        },
        {
            title:"AI Job Tracker",
            desc: "I developed my first SaaS application project with AI integration, it tracks job applications",
            link: "https://github.com/Nathi774-dev/Nathi774-dev/tree/web-development/AI-Job-Tracker",
            tech: ["Python","FastAPI", "PostgresSQL", "AI Integration", "React"],
            video: aiJobTrackerVid,
            gallery: [jobTrackerPic1, jobTrackerPic2, jobTrackerPic3]
        }
    ];

    return (
        <>
            <NavBar />

            <div className='bg-black text-white min-h-screen pt-28 px-6'>

                {/* Hero */}
                <section className='max-w-7xl mx-auto py-20 text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className='text-cyan-400 text-lg mb-3'>
                            Web Development
                        </p>

                        <h1 className='text-5xl md:text-7xl font-bold mb-6'>
                            Junior level Web projects
                        </h1>
                        <p className='text-gray-400 max-w-3xl mx-auto text-lg'>
                            A showcase of my projects that I have done so far,
                            with screenshotes, short clips and github code and production
                            style representation.
                        </p>


                    </motion.div>
                </section>

                {/* Projects */}
                <section className='max-w-7xl mx-auto pb-24 space-y-16'>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.6 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className='bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-400 transition'
                        >
                            {/* Video preview */}
                            <video
                                src={project.video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className='w-full h-[280px] md:h-[280px] object-cover'
                            />

                            {/* Content */}
                            <div className='p-8'>
                                {/* The title */}
                                <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                                    {project.title}
                                </h2>

                                {/* Description */}
                                <p className='text-gray-400 leading-relaxed mb-6 text-lg'>
                                    {project.desc}
                                </p>

                                {/* Tech stack */}
                                <div className='flex flex-wrap gap-3 mb-8'>
                                    {project.tech.map((item, idx) => (
                                        <span
                                            key={idx}
                                            className='bg-black border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300'
                                        >{item}</span>
                                    ))}
                                </div>

                                {/* Scrolling style gallery */}
                                <div className='mb-8'>
                                    <p className='text-cyan-400 mb-4 font-semibold'>
                                        Screenshots
                                    </p>

                                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                        {project.gallery.map((pic, idx) => (
                                            <img 
                                                src={pic}
                                                key={idx}
                                                alt={`${project.title} screenshot`}
                                                className='rounded-2xl h-32 md:h-44 w-full object-cover border border-white/10 hover:scale-105 transition'
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className='flex flex-wrap gap-4'>
                                    <a
                                        href={project.link}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='bg-cyan-400 hover:bg-cyan-400 text-black px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition'
                                    >
                                        <img 
                                        src={github}
                                        className='w-10 h-10 object-contain'
                                        />
                                        <span>View on GitHub</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </section>
            </div>

            <Footer />
        </>
    )
}

export default WebDev;