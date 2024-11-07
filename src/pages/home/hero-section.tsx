"use client";
import { useEffect } from "react";
import Image from "next/image";
import anime from "animejs";
import ContactForm from "@/components/HeroContact";
import Example from "@/components/Banner";

export default function HeroSection() {
    useEffect(() => {
        anime({
            targets: '.bg-green-400',
            scale: [1, 1.1],
            duration: 2000,
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate'
        });

        anime({
            targets: '.bg-blue-600',
            scale: [1, 1.1],
            duration: 2000,
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate'
        });

        anime({
            targets: '.bg-gradient-to-tr',
            rotate: [0, 360],
            duration: 10000,
            easing: 'linear',
            loop: true
        });
        anime({
            targets: '.animate-image',
            scale: [1, 1.2, 1],
            duration: 2000,
            easing: 'easeInOutSine',
        });
    }, []);

    return (
        <>
            <section className=" relative bg-white dark:bg-black dark:bg-custom-radial pt-32 lg:pt-36 pb-10">
                <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12">
                    <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
                        <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden" />
                        <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80" />
                    </div>
                    <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90" />
                    <div className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                        <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-black dark:text-white">
                            Play, Learn
                            {" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-500 from-20% via-orange-500 via-30% to-red-500">
                                and Earn
                            </span>
                        </h1>

                        <p className="mt-8 text-gray-800 dark:text-gray-300">
                            Explore an engaging sports trivia game that educates and entertains. Compete with friends, earn cryptocurrency rewards, and customize NFTs for a personalized gaming experience. Discover now to enhance your sports knowledge and embrace blockchain technology benefits.
                        </p>
                        <div className="hero-contact mt-10  w-full flex max-w-md mx-auto lg:mx-0">
                            <div className=" hero-section flex sm:flex-row flex-col gap-5 w-full">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-none lg:mx-0 mx-auto max-w-3xl items-start justify-center">
                        <div className="relative w-full h-auto lg:h-[80%]">
                            <Image
                                src="/chat.png"
                                alt="Orbimatrix logo"
                                width={800}
                                height={800}
                                className="rounded-3xl object-contain max-w-full max-h-full animate-image"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
