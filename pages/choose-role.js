import { useRouter } from 'next/router';
import Layout from "../components/Layout/Layout";
import { useState, useEffect } from 'react';

export default function ChooseRole() {
    const router = useRouter();
    const [hoveredRole, setHoveredRole] = useState(null);

    const handleRoleSelection = (role) => {
        // Redirect based on role selection
        if (role === 'jobseeker') {
            router.push('/choose-type-jobseeker'); // Change to registration page for jobseeker if needed
        } else if (role === 'recruiter') {
            router.push('/page-register?usertype=3'); // Change to registration page for recruiter if needed
        }
    };

    return (
        <Layout>
            <div className='min-h-[80vh] flex flex-col justify-center items-center gap-10 py-16'>
                <div className='w-full text-center max-w-3xl mx-auto'>
                    <h1 className='text-4xl md:text-5xl font-black text-gray-800 mb-4 animate__animated animate__fadeIn'>
                        Choose Your <span className="text-[#3457D5]">Security Role</span>
                    </h1>
                    <p className='text-gray-600 text-lg animate__animated animate__fadeIn animate__delay-1s'>
                        Select whether you're a cybersecurity professional seeking new opportunities or a recruiter looking for security talent.
                    </p>
                </div>

                <div className='flex flex-col md:flex-row w-full max-w-5xl mx-auto justify-evenly py-8 gap-10'>
                    {/* Job Seeker Card */}
                    <div 
                        className={`relative flex flex-col items-center transition-all duration-300 transform ${hoveredRole === 'jobseeker' ? 'scale-105' : ''}`}
                        onMouseEnter={() => setHoveredRole('jobseeker')}
                        onMouseLeave={() => setHoveredRole(null)}
                    >
                        <div className="absolute -top-6 right-0 w-16 h-16 bg-blue-50 rounded-full animate-pulse-slow opacity-70"></div>
                        <div className="absolute top-20 -left-4 w-10 h-10 bg-blue-50 rounded-full animate-pulse-slower opacity-70"></div>
                        
                        <button
                            className={`group relative flex justify-center items-center bg-white rounded-2xl shadow-xl hover:shadow-blue-200 
                                      transition-all duration-300 p-4 border-2 ${hoveredRole === 'jobseeker' ? 'border-[#3457D5]' : 'border-transparent'}`}
                            onClick={() => handleRoleSelection('jobseeker')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative">
                                <div className={`absolute inset-0 rounded-full bg-blue-100 transform scale-0 group-hover:scale-100 transition-transform duration-500 m-6 opacity-50`}></div>
                                <img
                                    src="/assets/imgs/role/freelancer-2.webp"
                                    alt="Cybersecurity Professional"
                                    className="rounded-2xl relative z-10"
                                    width={280}
                                />
                                
                                {/* Security Icons Floating Animation */}
                                <div className="absolute top-4 right-4 z-20 transition-all duration-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="bg-white p-2 rounded-full shadow-md animate-float-slow">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3457D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-4 left-4 z-20 transition-all duration-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-100">
                                    <div className="bg-white p-2 rounded-full shadow-md animate-float-slow-reverse">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3457D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </button>
                        
                        <div className="mt-6 text-center">
                            <h3 className="font-black text-xl text-gray-800 mb-2">Security Professional</h3>
                            <p className="text-gray-600 max-w-xs">Find your ideal role in the cybersecurity industry</p>
                            
                            <button 
                                onClick={() => handleRoleSelection('jobseeker')}
                                className="mt-4 px-6 py-2 bg-[#3457D5] text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Recruiter Card */}
                    <div 
                        className={`relative flex flex-col items-center transition-all duration-300 transform ${hoveredRole === 'recruiter' ? 'scale-105' : ''}`}
                        onMouseEnter={() => setHoveredRole('recruiter')}
                        onMouseLeave={() => setHoveredRole(null)}
                    >
                        <div className="absolute -top-6 left-0 w-16 h-16 bg-blue-50 rounded-full animate-pulse-slow opacity-70"></div>
                        <div className="absolute top-20 -right-4 w-10 h-10 bg-blue-50 rounded-full animate-pulse-slower opacity-70"></div>
                        
                        <button
                            className={`group relative flex justify-center items-center bg-white rounded-2xl shadow-xl hover:shadow-blue-200 
                                      transition-all duration-300 p-4 border-2 ${hoveredRole === 'recruiter' ? 'border-[#3457D5]' : 'border-transparent'}`}
                            onClick={() => handleRoleSelection('recruiter')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative">
                                <div className={`absolute inset-0 rounded-full bg-blue-100 transform scale-0 group-hover:scale-100 transition-transform duration-500 m-6 opacity-50`}></div>
                                <img
                                    src='/assets/imgs/role/recruter-2.png'
                                    alt="Security Recruiter"
                                    className="rounded-2xl relative z-10"
                                    width={280}
                                />
                                
                                {/* Recruiter Icons Floating Animation */}
                                <div className="absolute top-4 left-4 z-20 transition-all duration-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="bg-white p-2 rounded-full shadow-md animate-float-slow">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3457D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-4 right-4 z-20 transition-all duration-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-100">
                                    <div className="bg-white p-2 rounded-full shadow-md animate-float-slow-reverse">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3457D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </button>
                        
                        <div className="mt-6 text-center">
                            <h3 className="font-black text-xl text-gray-800 mb-2">Security Recruiter</h3>
                            <p className="text-gray-600 max-w-xs">Find talent for your company's security needs</p>
                            
                            <button 
                                onClick={() => handleRoleSelection('recruiter')}
                                className="mt-4 px-6 py-2 bg-[#3457D5] text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="text-center mt-6 text-sm text-gray-500 animate__animated animate__fadeIn animate__delay-2s">
                    Looking for something else? <a href="mailto:support@bugbear.com" className="text-[#3457D5] hover:underline">Contact our support team</a>
                </div>
            </div>

            <style jsx>{`
                @keyframes float-slow {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                
                @keyframes float-slow-reverse {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(10px); }
                    100% { transform: translateY(0px); }
                }
                
                @keyframes pulse-slow {
                    0% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.1); opacity: 0.5; }
                    100% { transform: scale(1); opacity: 0.7; }
                }
                
                @keyframes pulse-slower {
                    0% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.15); opacity: 0.5; }
                    100% { transform: scale(1); opacity: 0.7; }
                }
                
                .animate-float-slow {
                    animation: float-slow 3s ease-in-out infinite;
                }
                
                .animate-float-slow-reverse {
                    animation: float-slow-reverse 3s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                
                .animate-pulse-slower {
                    animation: pulse-slower 6s ease-in-out infinite;
                }
            `}</style>
        </Layout>
    );
}
