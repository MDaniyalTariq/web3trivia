import React from 'react';
import reviews from '@/components/data';
import Testimonials from '@/components/Testimonials';
const Testimonial = () => {
    return (
        <section className="w-full pb-12 ">
            <div className="container mx-auto">
                <div className="max-w-100vh mx-auto text-center text-gray-900 dark:text-white">
                    <h2 className="text-5xl sm:text-6xl font-bold mb-4">Testimonials</h2>
                    <p className="text-xl mb-8">See what our users are saying about us.</p>
                    <Testimonials reviews={reviews} />
                </div>
            </div>
        </section>
    );
}

export default Testimonial;
