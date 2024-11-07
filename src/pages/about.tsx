"use client";
import Footer from '@/components/Footer';
import React, { useEffect } from 'react'
import { Swiper } from 'swiper';
import 'swiper/css/bundle';


const About = () => {
    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = "https://cdn.jsdelivr.net/npm/pagedone@1.1.2/src/js/pagedone.js";
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js";
        document.body.appendChild(script2);

        script2.onload = () => {
            var swiperThumbs = new Swiper(".mySwiper", {
                spaceBetween: 10,
                slidesPerView: 3,
                freeMode: true,
                watchSlidesProgress: true,
            });

            var testimonialSwiper = new Swiper(".mySwiper2", {
                loop: true,
                spaceBetween: 30,
                thumbs: {
                    swiper: swiperThumbs,
                },
                pagination: {
                    el: ".swiper-pagination",
                    type: "bullets",
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });

            var swiper = new Swiper(".teamswiper", {
                slidesPerView: 1,
                spaceBetween: 32,
                centeredSlides: false,
                slidesPerGroupSkip: 1,
                grabCursor: true,
                loop: true,
                keyboard: {
                    enabled: true,
                },
                breakpoints: {
                    769: {
                        slidesPerView: 2,
                        slidesPerGroup: 1,
                    },
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                scrollbar: {
                    el: ".swiper-scrollbar",
                },
                pagination: {
                    el: ".swiper-pagination",
                    type: "fraction",
                },
            });
        };

        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        };
    }, []);
    const teamMembers = [
        {
            name: "Saqib Iqbal",
            role: "Founder",
            image: "saqib.png",
            description: "I am the Co-founder & CTO of Orbimatrix and we’ve pushed our limit so far to make it successful.",
            links: {
                x: "https://x.com/neuro_crypt",
                linkedin: "https://www.linkedin.com/in/saqib77/"
            }
        },
        {
            name: "Daniyal Tariq",
            role: "Full Stack Engineer",
            image: "daniyal.png",
            description: "I’ve been Full Stack Engineer for Orbimatrix since the beginning of it and enjoyed every bit.",
            links: {
                x: "https://x.com/daniyal",
                linkedin: "https://www.linkedin.com/in/daniyal-tariq-wd/"
            }
        },
        {
            name: "Jawher Khalifa",
            role: "ML Engineer",
            image: "Jawher.png",
            description: "I Worked With ML team, responsible for creating AI Models & Trivia Models.",
            links: {
                x: "https://x.com/jawher",
                linkedin: "https://www.linkedin.com/in/jawherkh-569a33204/"
            }
        },
        {
            name: "Mahnoor Farooq",
            role: "Frontend Developer",
            image: "mahnoor.png",
            description: "I’ve been Frontend developer for Orbimatrix since the beginning of it and enjoyed every bit.",
            links: {
                x: "https://x.com",
                linkedin: "https://www.linkedin.com/in/mahnoor-farooq-649690239?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            }
        },
    ];


    return (
        <section className="custom-bg-hero relative pt-20 lg:pt-26 pb-26 " id="contact">
            <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
                <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden" />
                <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80" />
            </div>
            <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90" />
            <section className="py-14  lg:py-12 relative z-0 ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
                    <h1
                        className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-800 dark:text-gray-300 mb-5 md:text-5xl md:leading-normal">
                        Get to know the Team behind <span className="text-indigo-600">Orbimatrix </span>
                    </h1>
                    <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 dark:text-gray-300 mb-9">
                        Play, Learn & Earn!

                    </p>
                </div>
            </section>
            <section className="py-14 lg:py-24 relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
                        <div className="img-box">
                            <img src="/orbi-logo.png" alt="About Us tailwind page" width={400}
                                className="max-lg:mx-auto" />
                        </div>
                        <div className="lg:pl-[100px] flex items-center">
                            <div className="data w-full">
                                <h2
                                    className="font-manrope font-bold text-4xl lg:text-5xl dark:text-white mb-9 max-lg:text-center relative">
                                    About Us </h2>
                                <p className="font-normal text-xl leading-8 dark:text-gray-400 max-lg:text-center max-w-2xl mx-auto">

                                    Orbimatrix leads digital innovation by merging Web3 gaming and AI. Creating State of the Art fully on-chain and off-chain games.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-14 lg:py-24 relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 ">

                        <div className="lg:pr-24 flex items-center">
                            <div className="data w-full">
                                <img src="rewards.jpg" alt="About Us tailwind page"
                                    className="block lg:hidden mb-9 mx-auto" />
                                <h2 className="font-manrope font-bold text-4xl lg:text-5xl dark:text-white mb-9 max-lg:text-center">
                                    Earn Crypto Rewards!
                                </h2>
                                <p className="font-normal text-xl leading-8 dark:text-gray-400 max-lg:text-center max-w-2xl mx-auto">
                                    Challenge your sports knowledge and earn crypto rewards in our thrilling trivia game. Play, learn,
                                    and get rewarded for every correct answer. Join the game where knowledge pays off!
                                </p>
                            </div>
                        </div>
                        <div className="img-box ">
                            <img src="rewards.jpg" alt="About Us tailwind page"
                                className="hidden lg:block " />
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="font-manrope text-4xl text-center dark:text-gray-300 font-bold mb-14">Our results in numbers</h2>
                    <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
                        <div
                            className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
                            <div className="flex gap-5">
                                <div className="font-manrope text-2xl font-bold text-indigo-600">
                                    240%
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl text-gray-900 font-semibold mb-2">Company growth</h4>
                                    <p className="text-xm text-gray-500 leading-5">Company's remarkable growth journey as we
                                        continually innovate and drive towards new heights of success.</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
                            <div className="flex gap-5">
                                <div className="font-manrope text-2xl font-bold text-indigo-600">
                                    175+
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl text-gray-900 font-semibold mb-2">Company growth</h4>
                                    <p className="text-xm text-gray-500 leading-5">Our very talented team members are the powerhouse
                                        of Orbimatrix and pillars of our success. </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
                            <div className="flex gap-5">
                                <div className="font-manrope text-2xl font-bold text-indigo-600">
                                    100%
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl text-gray-900 font-semibold mb-2">Dream Big, Earn Big!
                                    </h4>
                                    <p className="text-xm text-gray-500 leading-5">No time? No problem! Spend 1 Min & start Making money today!


                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className=" py-14 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                    <div className="mb-16 rounded-full">
                        <h2 className="text-4xl font-manrope font-bold dark:text-gray-300 text-center">What our happy user says!</h2>
                    </div>

                    <div className="swiper mySwiper2">

                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="relative mb-20">
                                    <div className="max-w-max mx-auto lg:max-w-4xl">
                                        <p className="text-lg dark:text-gray-400 leading-8 mb-8 text-center">
                                            Playing this sports trivia game is a blast! Not only do I get to test my knowledge and learn new facts, but I also earn crypto rewards for every correct answer.
                                            It’s the perfect mix of fun and profit!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="relative mb-20">
                                    <div className="max-w-max mx-auto lg:max-w-4xl">
                                        <p className="text-lg dark:text-gray-400 leading-8 mb-8 text-center">
                                            I love how this game rewards me for what I know! Competing in sports trivia has never been this fun, and the crypto rewards are just the icing on the cake.                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="relative mb-20">
                                    <div className="max-w-max mx-auto lg:max-w-4xl">
                                        <p className="text-lg dark:text-gray-400 leading-8 mb-8 text-center">
                                            As a sports fan, this trivia game is perfect for me. I'm learning, competing, and earning crypto all at once. It's like getting paid to have fun!                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="swiper mySwiper">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <img src="https://pagedone.io/asset/uploads/1704349534.png" alt="Emily image"
                                    className="mx-auto scale-90 transition-all duration-300 swiper-slide:w-16 border rounded-full swiper-slide:border-indigo-600" />
                            </div>
                            <div className="swiper-slide">
                                <img src="https://pagedone.io/asset/uploads/1704349572.png" alt="Ethan image"
                                    className="mx-auto scale-90 transition-all duration-300 swiper-slide:w-16 border rounded-full swiper-slide:border-indigo-600" />
                            </div>
                            <div className="swiper-slide">
                                <img src="https://pagedone.io/asset/uploads/1704349514.png" alt="Olivia image"
                                    className="mx-auto scale-90 transition-all duration-300 swiper-slide:w-16 border rounded-full swiper-slide:border-indigo-600" />
                            </div>

                        </div>

                    </div>



                </div>
            </section>
            <section className="py-14 lg:py-24 ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-24">
                        <h2 className="font-manrope text-4xl text-center font-bold dark:text-gray-300 mb-6">Meet our Team!
                        </h2>
                        <p className="text-lg dark:text-gray-400 text-center">
                            Founded in 2024 by Saqib, Orbimatrix aims to revolutionize Gaming and AI Industry!
                        </p>
                    </div>
                    <div className="swiper teamswiper pb-10">
                        <div className="swiper-wrapper">
                            {teamMembers.map((member, index) => (
                                <div className="swiper-slide" key={index}>
                                    <div className="group w-full flex-wrap flex items-center gap-8 transition-all duration-500 p-8 lg:flex-nowrap">
                                        <div className="w-full lg:w-48 h-64 ">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="h-full object-contain mx-auto lg:mx-0 lg:w-full"
                                            />
                                        </div>
                                        <div className="text-center lg:text-left lg:max-w-xs flex-1">
                                            <div className="mb-5 pb-5 border-b border-solid border-gray-300">
                                                <h6 className="text-lg dark:text-gray-300 font-semibold mb-1">
                                                    {member.name}
                                                </h6>
                                                <span className="text-sm dark:text-gray-400 group-hover:text-indigo-600">
                                                    {member.role}
                                                </span>
                                            </div>
                                            <p className="dark:text-gray-400 leading-6 mb-7">
                                                {member.description}
                                            </p>
                                            <div className="flex items-center gap-4 justify-center lg:justify-start">
                                                <ul className="flex gap-4">
                                                    <li className="cursor-pointer text-gray-900 hover:text-white group w-12 h-12 rounded-full flex justify-center items-center bg-gray-100 transition-all duration-500 hover:bg-indigo-600">
                                                        <a href={member.links.x} target="_blank" rel="noopener noreferrer">
                                                            <svg className="w-5 h-5" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M18.1139 14.2985L26.3866 4.88892H24.4263L17.2431 13.0591L11.5059 4.88892H4.88867L13.5645 17.2437L4.88867 27.1111H6.84915L14.4348 18.4831L20.4937 27.1111H27.1109L18.1134 14.2985H18.1139ZM15.4288 17.3526L14.5497 16.1223L7.55554 6.333H10.5667L16.2111 14.2333L17.0902 15.4636L24.4272 25.7327H21.416L15.4288 17.3531V17.3526Z" fill="currentColor" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li className="cursor-pointer text-gray-900 hover:text-white group w-12 h-12 rounded-full flex justify-center items-center bg-gray-100 transition-all duration-500 hover:bg-indigo-600">
                                                        <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer">
                                                            <svg className="w-5 h-5" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M5.00626 18.8859V6.59092H0.909448V18.8859H5.00669H5.00626ZM2.95871 4.91254C4.38705 4.91254 5.27629 3.96844 5.27629 2.78857C5.24956 1.58182 4.38705 0.664062 2.98587 0.664062C1.58373 0.664062 0.667969 1.58182 0.667969 2.78846C0.667969 3.96833 1.55689 4.91244 2.93187 4.91244H2.95839L2.95871 4.91254ZM7.2739 18.8859H11.3704V12.0205C11.3704 11.6536 11.3971 11.2856 11.5054 11.0235C11.8014 10.289 12.4754 9.52875 13.6074 9.52875C15.0895 9.52875 15.6827 10.6561 15.6827 12.3091V18.8859H19.7791V11.8363C19.7791 8.05999 17.7583 6.30267 15.063 6.30267C12.8532 6.30267 11.8827 7.53471 11.3434 8.37384H11.3707V6.59135H7.27412C7.32759 7.74476 7.27379 18.8863 7.27379 18.8863L7.2739 18.8859Z" fill="currentColor" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                </div>
            </section>

            <Footer />

        </section>
    )
}

export default About