import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import { useState } from 'react';

export default function ChooseTypeJobseeker() {
    const router = useRouter();
    const [hoveredType, setHoveredType] = useState(null);

    const handleJobseekerTypeSelection = (type) => {
        // Redirect based on jobseeker type selection
        if (type === 'freelancer') {
            router.push('/page-register?usertype=1'); // Redirect to freelancer sign-in
        } else if (type === 'organization') {
            router.push('/page-register?usertype=2'); // Redirect to organization sign-in
        }
    };

    return (
        <Layout>
            <div className='min-h-[80vh] flex flex-col justify-center items-center gap-10 py-16'>
                <div className='w-full text-center max-w-3xl mx-auto'>
                    <h1 className='text-4xl md:text-5xl font-black text-gray-800 mb-4 animate__animated animate__fadeIn'>
                        Choose Your <span className="text-[#3457D5]">Security Profile</span>
                    </h1>
                    <p className='text-gray-600 text-lg animate__animated animate__fadeIn animate__delay-1s'>
                        Are you an individual security professional or representing an organization?
                    </p>
                </div>

                <div className='flex flex-col md:flex-row w-full max-w-5xl mx-auto justify-evenly py-8 gap-10'>
                    {/* Freelancer Card */}
                    <div 
                        className={`relative flex flex-col items-center transition-all duration-300 transform ${hoveredType === 'freelancer' ? 'scale-105' : ''}`}
                        onMouseEnter={() => setHoveredType('freelancer')}
                        onMouseLeave={() => setHoveredType(null)}
                    >
                        <div className="absolute -top-6 right-0 w-16 h-16 bg-blue-50 rounded-full animate-pulse-slow opacity-70"></div>
                        <div className="absolute top-20 -left-4 w-10 h-10 bg-blue-50 rounded-full animate-pulse-slower opacity-70"></div>
                        
                        <button
                            className={`group relative flex justify-center items-center bg-white rounded-2xl shadow-xl hover:shadow-blue-200 
                                      transition-all duration-300 p-4 border-2 ${hoveredType === 'freelancer' ? 'border-[#3457D5]' : 'border-transparent'}`}
                            onClick={() => handleJobseekerTypeSelection('freelancer')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative">
                                <div className={`absolute inset-0 rounded-full bg-blue-100 transform scale-0 group-hover:scale-100 transition-transform duration-500 m-6 opacity-50`}></div>
                                <img
                                    src="/assets/imgs/role/freelancer-3.jpg"
                                    alt="Individual Security Professional"
                                    className="rounded-2xl relative z-10"
                                    width={280}
                                />
                                
                                {/* Individual Icons Floating Animation */}
                                <div className="absolute top-4 right-4 z-20 transition-all duration-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="bg-white p-2 rounded-full shadow-md animate-float-slow">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3457D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-4 left-4 z-20 transition-all duration-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-100">
                                    <div className="bg-white p-2 rounded-full shadow-md animate-float-slow-reverse">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3457D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </button>
                        
                        <div className="mt-6 text-center">
                            <h3 className="font-black text-xl text-gray-800 mb-2">Individual Professional</h3>
                            <p className="text-gray-600 max-w-xs">Offer your cybersecurity expertise as an individual consultant or freelancer</p>
                            
                            <button 
                                onClick={() => handleJobseekerTypeSelection('freelancer')}
                                className="mt-4 px-6 py-2 bg-[#3457D5] text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
                            >
                                Continue as Individual
                            </button>
                        </div>
                    </div>

                    {/* Organization Card */}
                    <div 
                        className={`relative flex flex-col items-center transition-all duration-300 transform ${hoveredType === 'organization' ? 'scale-105' : ''}`}
                        onMouseEnter={() => setHoveredType('organization')}
                        onMouseLeave={() => setHoveredType(null)}
                    >
                        <div className="absolute -top-6 left-0 w-16 h-16 bg-blue-50 rounded-full animate-pulse-slow opacity-70"></div>
                        <div className="absolute top-20 -right-4 w-10 h-10 bg-blue-50 rounded-full animate-pulse-slower opacity-70"></div>
                        
                        <button
                            className={`group relative flex justify-center items-center bg-white rounded-2xl shadow-xl hover:shadow-blue-200 
                                      transition-all duration-300 p-4 border-2 ${hoveredType === 'organization' ? 'border-[#3457D5]' : 'border-transparent'}`}
                            onClick={() => handleJobseekerTypeSelection('organization')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative">
                                <div className={`absolute inset-0 rounded-full bg-blue-100 transform scale-0 group-hover:scale-100 transition-transform duration-500 m-6 opacity-50`}></div>
                                <img
                                    src='/assets/imgs/role/organization-2.png'
                                    alt="Security Organization"
                                    className="rounded-2xl relative z-10"
                                    width={280}
                                />
                                
                                {/* Organization Icons Floating Animation */}
                                <div className="absolute top-4 left-4 z-20 transition-all duration-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="bg-white p-2 rounded-full shadow-md animate-float-slow">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3457D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-4 right-4 z-20 transition-all duration-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-100">
                                    <div className="bg-white p-2 rounded-full shadow-md animate-float-slow-reverse">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3457D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </button>
                        
                        <div className="mt-6 text-center">
                            <h3 className="font-black text-xl text-gray-800 mb-2">Security Organization</h3>
                            <p className="text-gray-600 max-w-xs">Represent your cybersecurity company, consultancy or agency</p>
                            
                            <button 
                                onClick={() => handleJobseekerTypeSelection('organization')}
                                className="mt-4 px-6 py-2 bg-[#3457D5] text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
                            >
                                Continue as Organization
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="text-center mt-6 text-sm text-gray-500 animate__animated animate__fadeIn animate__delay-2s">
                    Not sure which option to choose? <a href="#" className="text-[#3457D5] hover:underline" onClick={() => router.back()}>Go back</a> or <a href="mailto:support@bugbear.com" className="text-[#3457D5] hover:underline">contact our support team</a>
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
