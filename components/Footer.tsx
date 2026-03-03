"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <footer id="contact" className="bg-accent text-cream pt-16 sm:pt-20 pb-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Info */}
                    <div className="space-y-6 text-center sm:text-left">
                        <Link href="/" className="inline-block relative h-20 w-40 sm:h-24 sm:w-48 mx-auto sm:mx-0">
                            <Image
                                src="/chopsticklog.png"
                                alt="Chopsticks Spice Malabar"
                                fill
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 font-light leading-relaxed text-sm max-w-xs mx-auto sm:mx-0">
                            A culinary journey through the authentic flavours of Malabar, China, and Tandoor. Serving happiness since 1999.
                        </p>
                        <div className="flex justify-center sm:justify-start space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-accent transition-all duration-300" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-accent transition-all duration-300" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-accent transition-all duration-300" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6 text-center sm:text-left">
                        <h3 className="text-lg font-bold font-display text-white">Quick Links</h3>
                        <ul className="space-y-3 text-sm font-light text-gray-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/menu" className="hover:text-primary transition-colors">Order Online</Link></li>
                            <li><Link href="#gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                            <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6 text-center sm:text-left">
                        <h3 className="text-lg font-bold font-display text-white">Contact Us</h3>
                        <ul className="space-y-4 text-sm font-light text-gray-400">
                            <li className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                                <span className="max-w-[200px]">Datta Mandir Chowk, Viman Nagar, Pune.</span>
                            </li>
                            <li className="flex flex-col sm:flex-row items-center gap-3">
                                <FaPhone className="text-primary flex-shrink-0" />
                                <span>9665065344 / 9890082699</span>
                            </li>
                            <li className="flex flex-col sm:flex-row items-center gap-3">
                                <FaEnvelope className="text-primary flex-shrink-0" />
                                <span className="truncate max-w-full">chopsticksspicemalabar@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Map */}
                    <div className="space-y-6 text-center sm:text-left">
                        <h3 className="text-lg font-bold font-display text-white">Locate Us</h3>
                        <div className="w-full h-48 bg-gray-800 rounded-sm overflow-hidden shadow-2xl">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.0847469896707!2d73.91447807516857!3d18.57254826835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c14df5e7e1c5%3A0x8e4e4e4e4e4e4e4e!2sDatta%20Mandir%20Chowk!5e0!3m2!1sen!2sin!4v1647844059000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Restaurant Location"
                            ></iframe>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-[10px] sm:text-xs text-gray-500 font-light space-y-4 md:space-y-0">
                    <p>&copy; {new Date().getFullYear()} Chopsticks Spice Malabar. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
