// test+beni.tsx

import React from 'react';
import Image from 'next/image';
import Testimonial from './testimonial';
import Benefits from './benifits';

const TestBeni = () => {
    return (
        <div className="relative w-full bg-white dark:bg-black dark:bg-custom-radial">
            <div className="absolute inset-0 hidden dark:block">
                <Image
                    src="/test+ben-bg.svg"
                    alt="Background"
                    fill
                    style={{ objectFit: 'cover' }}
                />

            </div>

            <div className="py-8 relative z-10 m-0 p-0">
                <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
                    <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden" />
                    <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80" />
                </div>
                <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90" />
                <section className="relative lg:pt-4 pb-14">
                    <Testimonial />
                </section>
                <section className="relative lg:pb-8">
                    <Benefits />

                </section>
            </div>
        </div>
    );
}

export default TestBeni;
