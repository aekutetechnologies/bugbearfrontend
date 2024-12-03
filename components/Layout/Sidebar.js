import Link from "next/link";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState } from "react";

const Sidebar = ({ openClass }) => {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };

    return (
        <>
            <div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar  ${openClass}`}>
                <div className="mobile-header-wrapper-inner">
                    <div className="mobile-header-content-area">
                        <div className="perfect-scroll">
                            <div className="mobile-search mobile-header-border mb-30">
                                <form action="#">
                                    <input type="text" placeholder="Search…" /><i className="fi-rr-search" />
                                </form>
                            </div>
                            <div className="mobile-menu-wrap mobile-header-border">
                                {/* mobile menu start*/}
                                <nav>
                                    <ul className="mobile-menu font-heading">
                                         <li className={isActive.key == 1 ? "has-children active" : "has-children"}>
                                            <span onClick={() => handleToggle(1)} className="menu-expand"><i className="fi-rr-angle-small-down"></i></span>

                                            <Link legacyBehavior href="/"><a className="active">Home</a></Link>

                                            <ul className={isActive.key == 1 ? "sub-menu d-block" : "sub-menu d-none"}>
                                                <li>
                                                    <Link legacyBehavior href="/"><a>Home 1</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/index-2"><a>Home 2</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/index-3"><a>Home 3</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/index-4"><a>Home 4</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/index-5"><a>Home 5</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/index-6"><a>Home 6</a></Link>
                                                    </li>
                                            </ul>
                                        </li>
                                         <li className={isActive.key == 2 ? "has-children active" : "has-children"}>
                                            <span onClick={() => handleToggle(2)} className="menu-expand"><i className="fi-rr-angle-small-down"></i></span>

                                            <Link legacyBehavior href="/jobs-grid"><a>Find a Job</a></Link>

                                            <ul className={isActive.key == 2 ? "sub-menu d-block" : "sub-menu d-none"}>
                                                <li>
                                                    <Link legacyBehavior href="/jobs-grid"><a>Jobs Grid</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/jobs-list"><a>Jobs List</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/job-details"><a>Jobs Details</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/job-details-2"><a>Jobs Details 2            </a></Link>
                                                    </li>
                                            </ul>
                                        </li>
                                         <li className={isActive.key == 3 ? "has-children active" : "has-children"}>
                                            <span onClick={() => handleToggle(3)} className="menu-expand"><i className="fi-rr-angle-small-down"></i></span>

                                            <Link legacyBehavior href="/companies-grid"><a>Recruiters</a></Link>

                                            <ul className={isActive.key == 3 ? "sub-menu d-block" : "sub-menu d-none"}>
                                                <li>
                                                    <Link legacyBehavior href="/companies-grid"><a>Recruiters</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/company-details"><a>Company Details</a></Link>
                                                    </li>
                                            </ul>
                                        </li>
                                         <li className={isActive.key == 4 ? "has-children active" : "has-children"}>
                                            <span onClick={() => handleToggle(4)} className="menu-expand"><i className="fi-rr-angle-small-down"></i></span>

                                            <Link legacyBehavior href="/candidates-grid"><a>Candidates</a></Link>

                                            <ul className={isActive.key == 4 ? "sub-menu d-block" : "sub-menu d-none"}>
                                                <li>
                                                    <Link legacyBehavior href="/candidates-grid"><a>Candidates Grid</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/candidate-details"><a>Candidate Details</a></Link>
                                                    </li>
                                            </ul>
                                        </li>
                                         <li className={isActive.key == 5 ? "has-children active" : "has-children"}>
                                            <span onClick={() => handleToggle(5)} className="menu-expand"><i className="fi-rr-angle-small-down"></i></span>

                                            <Link legacyBehavior href="/blog-grid"><a>Pages</a></Link>

                                            <ul className={isActive.key == 5 ? "sub-menu d-block" : "sub-menu d-none"}>
                                                <li>
                                                    <Link legacyBehavior href="/page-about"><a>About Us</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/page-pricing"><a>Pricing Plan</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/page-contact"><a>Contact Us</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/page-register"><a>Register</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/login"><a>Signin</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/page-reset-password"><a>Reset Password</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/page-content-protected"><a>Content Protected</a></Link>
                                                    </li>
                                            </ul>
                                        </li>
                                         <li className={isActive.key == 6 ? "has-children active" : "has-children"}>
                                            <span onClick={() => handleToggle(6)} className="menu-expand"><i className="fi-rr-angle-small-down"></i></span>

                                            <Link legacyBehavior href="/blog-grid"><a>Blog</a></Link>

                                            <ul className={isActive.key == 6 ? "sub-menu d-block" : "sub-menu d-none"}>
                                                <li>
                                                    <Link legacyBehavior href="/blog-grid"><a>Blog Grid</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/blog-grid-2"><a>Blog Grid 2</a></Link>
                                                    </li>
                                                <li>
                                                    <Link legacyBehavior href="/blog-details"><a>Blog Single</a></Link>
                                                    </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/page-contact"><a>Contact</a></Link>
                                            </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="mobile-account">
                                <h6 className="mb-10">Your Account</h6>
                                <ul className="mobile-menu font-heading">
                                    <li>
                                        <Link legacyBehavior href="#"><a>Profile</a></Link>
                                        </li>
                                    <li>
                                        <Link legacyBehavior href="#"><a>Work Preferences</a></Link>
                                        </li>
                                    <li>
                                        <Link legacyBehavior href="#"><a>Account Settings</a></Link>
                                        </li>
                                    <li>
                                        <Link legacyBehavior href="#"><a>Go Pro</a></Link>
                                        </li>
                                    <li>
                                        <Link legacyBehavior href="/login"><a>Sign Out</a></Link>
                                        </li>
                                </ul>
                            </div>
                            {/* <div className="site-copyright">Copyright 2022 © bugbear. <br />Designed by AliThemes.</div> */}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Sidebar;

// import Link from "next/link";
// import { useState } from "react";

// const Sidebar = ({ isOpen }) => {
//     const [isActive, setIsActive] = useState({
//         status: false,
//         key: "",
//     });

//     const handleToggle = (key) => {
//         setIsActive((prev) => ({
//             status: prev.key === key ? false : true,
//             key: prev.key === key ? "" : key,
//         }));
//     };

//     return (
//         <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
//             <div className="p-4">
//                 <div className="flex items-center justify-between">
//                     <h2 className="text-lg font-semibold">Menu</h2>
//                     <button className="text-gray-600 hover:text-gray-800" onClick={() => handleToggle('')}>×</button>
//                 </div>
//                 <nav className="mt-4">
//                     <ul className="space-y-2">
//                         {/* Example menu items */}
//                         <li className={isActive.key === 1 ? "has-children active" : "has-children"}>
//                             <span onClick={() => handleToggle(1)} className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100">
//                                 <Link href="/">
//                                     Home
//                                 </Link>
//                                 <i className="fi-rr-angle-small-down"></i>
//                             </span>
//                             <ul className={`sub-menu pl-4 ${isActive.key === 1 ? "block" : "hidden"}`}>
//                                 <li>
//                                     <Link href="/">Home 1</Link>
//                                 </li>
//                                 <li>
//                                     <Link href="/index-2">Home 2</Link>
//                                 </li>
//                                 {/* Add more sub-menu items as needed */}
//                             </ul>
//                         </li>

//                         <li className={isActive.key === 2 ? "has-children active" : "has-children"}>
//                             <span onClick={() => handleToggle(2)} className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100">
//                                 <Link href="/jobs-grid">
//                                     Find a Job
//                                 </Link>
//                                 <i className="fi-rr-angle-small-down"></i>
//                             </span>
//                             <ul className={`sub-menu pl-4 ${isActive.key === 2 ? "block" : "hidden"}`}>
//                                 <li>
//                                     <Link href="/jobs-grid">Jobs Grid</Link>
//                                 </li>
//                                 <li>
//                                     <Link href="/jobs-list">Jobs List</Link>
//                                 </li>
//                             </ul>
//                         </li>

//                         {/* More menu items can be added in a similar way */}
//                     </ul>
//                 </nav>
//                 <div className="mt-6">
//                     <h6 className="mb-2">Your Account</h6>
//                     <ul className="space-y-2">
//                         <li>
//                             <Link href="#">Profile</Link>
//                         </li>
//                         <li>
//                             <Link href="#">Account Settings</Link>
//                         </li>
//                         <li>
//                             <Link href="/login">Sign Out</Link>
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="mt-6 text-center text-sm text-gray-500">
//                     Copyright 2022 © bugbear. <br /> Designed by AliThemes.
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
