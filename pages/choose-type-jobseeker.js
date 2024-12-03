import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';

export default function ChooseTypeJobseeker() {
    const router = useRouter();

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
            {/* <div className="choose-type-container">
                <h1 className="title">Choose Jobseeker Type</h1>
                <p>Select whether you're a Freelancer or an Organization.</p>
                <div className="button-group">
                    <button
                        className="btn btn-type"
                        onClick={() => handleJobseekerTypeSelection('freelancer')}
                    >
                        Freelancer
                    </button>
                    <button
                        className="btn btn-type"
                        onClick={() => handleJobseekerTypeSelection('organization')}
                    >
                        Organization
                    </button>
                </div>

                <style jsx>{`
                .choose-type-container {
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
                    <h1 className='text-5xl font-black'>Choose Jobseeker Type</h1>
                    <p>Select whether you're a Freelancer or an Organization.</p>
                </div>

                <div className='flex w-full justify-evenly py-16'>
                    <div className=" flex flex-col items-center h-fit">
                        <button
                            className="flex justify-center items-center bg-white rounded-full shadow-xl hover:shadow-blue-200"
                            onClick={() => handleJobseekerTypeSelection('freelancer')}
                        >
                            <img
                                src="/assets/imgs/role/freelancer-3.jpg"
                                alt=""
                                className="rounded-full"
                                width={300}
                            />
                        </button>
                        <span className="w-full text-center mt-9 font-black text-xl">Freelancer</span>
                    </div>
                    <div className=" flex flex-col items-center h-fit">
                        <button
                            className="flex justify-center items-center bg-white rounded-full shadow-xl hover:shadow-blue-200"
                            onClick={() => handleJobseekerTypeSelection('organization')}
                        >
                            <img
                                // src='/assets/imgs/role/recruter-2.png'
                                src='/assets/imgs/role/organization-2.png'
                                alt=""
                                className="rounded-full"
                                width={300}
                            />
                        </button>
                        <span className="w-full text-center mt-9 font-black text-xl">Organization</span>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
