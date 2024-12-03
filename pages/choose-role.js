import { useRouter } from 'next/router';
import Layout from "../components/Layout/Layout";
import freelancer from '../public/assets/imgs/role/freelancer.webp'

export default function ChooseRole() {
    const router = useRouter();

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
            {/* <div className="choose-role-container">
                <h1 className="title">Choose Your Role</h1>
                <p>Select whether you're a jobseeker or a recruiter.</p>
                <div className="button-group">
                    <button
                        className="btn btn-role"
                        onClick={() => handleRoleSelection('jobseeker')}
                    >
                        Jobseeker
                    </button>
                    <button
                        className="btn btn-role"
                        onClick={() => handleRoleSelection('recruiter')}
                    >
                        Recruiter
                    </button>
                </div>


                <style jsx>{`
                .choose-role-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    text-align: center;
                    background-color: #f9f9f9;
                }
                .title {
                    font-size: 2rem;
                    margin-bottom: 20px;
                }
                .button-group {
                    display: flex;
                    gap: 20px;
                }
                .btn {
                    padding: 10px 20px;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1rem;
                }
                .btn:hover {
                    background-color: #005bb5;
                }
            `}</style>
            </div> */}

            <div className='h-[90vh]  flex flex-col justify-center items-center gap-10 '>
                <div className=' w-full text-center'>
                    <h1 className='text-5xl font-black'>Choose Your Role</h1>
                    <p>Select whether you're a jobseeker or a recruiter.</p>
                </div>

                <div className='flex w-full justify-evenly py-16'>
                    <div className=" flex flex-col items-center h-fit">
                        <button
                            className="flex justify-center items-center bg-white rounded-full shadow-xl hover:shadow-blue-200"
                            onClick={() => handleRoleSelection('jobseeker')}
                        >
                            <img
                                src="/assets/imgs/role/freelancer-2.webp"
                                alt=""
                                className="rounded-full"
                                width={300}
                            />
                        </button>
                        <span className="w-full text-center mt-9 font-black text-xl">Job Seeker</span>
                    </div>
                    <div className=" flex flex-col items-center h-fit">
                        <button
                            className="flex justify-center items-center bg-white rounded-full shadow-xl hover:shadow-blue-200"
                            onClick={() => handleRoleSelection('recruiter')}
                        >
                            <img
                                src='/assets/imgs/role/recruter-2.png'
                                alt=""
                                className="rounded-full"
                                width={300}
                            />
                        </button>
                        <span className="w-full text-center mt-9 font-black text-xl">Recruiter</span>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
