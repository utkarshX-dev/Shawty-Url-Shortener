import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-14 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]"></div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <h2 className="text-[7rem] md:text-[12rem] font-black italic tracking-widest text-white/5 whitespace-nowrap select-none animate-pulse font-cedar">
                    SHAWTY
                </h2>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mb-10">
                    <div>
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-wide">
                            <span className="italic font-cedar">shawty</span>
                        </h2>

                        <p className="max-w-md text-zinc-400 leading-relaxed relative overflow-hidden">
                            <span className="bg-gradient-to-r from-zinc-500 via-white to-zinc-500 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shine_4s_linear_infinite]">
                                Shorten links in seconds <br /> fast, private, and trackable. Share more, type less.
                            </span>
                        </p>

                        {/* Social links removed to avoid showing G T L letters */}
                    </div>

                    <div className="md:ml-auto">
                        <h3 className="text-white text-xl font-semibold mb-5">Explore</h3>

                        <ul className="space-y-3">
                            {[
                                ["Home", "/"],
                                ["Dashboard", "/dashboard"],
                                ["Profile", "/profile"],
                                ["Privacy Policy", "/privacy-policy"],
                            ].map(([name, link]) => (
                                <li key={name}>
                                    <Link to={link} className="text-zinc-500 hover:text-white transition-all duration-300 text-lg">
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-600 text-sm">© 2026 <span className="font-cedar">shawty</span>. all rights reserved.</p>

                    <p className="text-zinc-700 text-sm italic">designed with midnight energy ✦</p>
                </div>
            </div>

            <style>{`
                @keyframes shine {
                    0% { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
            `}</style>
        </footer>
    )
}

export default Footer

