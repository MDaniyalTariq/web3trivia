// "use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios from 'axios';
import { motion } from "framer-motion";
import Lottie from 'react-lottie';
import confettiAnimation from '../../public/f9Jvb710UY.json';
import { ThirdwebSDK, useAddress } from '@thirdweb-dev/react';

interface Question {
    question: string;
    options: string[];
    answer: string;
}

interface LifeData {
    life: number;
    can_play: boolean;
}
interface Props {
    lifedata: LifeData ; // Life data retrieved from the database
    responseData: Question[];


}


const QuizStepper: React.FC<Props> = ({ lifedata,responseData }) => {
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [answers, setAnswers] = useState<string[]>(Array(10).fill(''));
    const [answerCorrectness, setAnswerCorrectness] = useState<boolean[]>(Array(10).fill(false));
    const [timeLeft, setTimeLeft] = useState(20);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const [life, setLife] = useState(30);
    const [total_life, settotalLife] = useState(0);
    const [paused, setPaused] = useState(false);
    const [countdown, setCountdown] = useState(1800);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const wallet = useAddress();
   


    const token = process.env.NEXT_PUBLIC_JWT_TOKEN;


    const ConfettiAnimation = {
        loop: true,
        autoplay: true,
        animationData: confettiAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
                type: "spring",
                stiffness: 120
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const buttonVariants = {
        hover: {
            scale: 1.1,
            textShadow: "0px 0px 8px rgb(255, 255, 255)",
            boxShadow: "0px 0px 15px rgb(0, 0, 255)",
            transition: {
                yoyo: Infinity, // Makes it repeat
                duration: 0.3
            }
        },
        tap: { scale: 0.95 }
    };

   
    //post method for updating life
    const updateLife = async (walletAddress: any, newLife: any) => {
        try {
            const response = await axios.post(
                `/api/life/?wallet_address=${walletAddress}`,
                {
                    wallet_address: walletAddress,
                    life: newLife
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error updating life:', error);
            return null;
        }
    };


    useEffect(() => {
        const fetchLife = async () => {
            if (wallet) {
                
                settotalLife(lifedata?.life);

                setLife(lifedata?.life);

            }
        };

        fetchLife();

    }, [wallet, token]);

    const handleUpdateLife = async (newLife: any) => {
        if (wallet && (life >= 0)) {
            const updatedLife = await updateLife(wallet, newLife);

        }
    };


    //Trivia Category
    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            setError(null);
            try {
               

                const apiQuestions = responseData;

                const formattedQuestions = apiQuestions.map((item: any) => ({
                    question: item.question,
                    options: [item.A, item.B, item.C, item.D],
                    answer: item[item.answer]
                }));

                setQuestions(formattedQuestions.slice(0, 10));
            } catch (error) {
                console.error("Error fetching trivia questions:", error);
                setError("Failed to fetch questions. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();

    }, [responseData]);



    

    

    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;

        if (paused && countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [paused, countdown]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
    useEffect(() => {
        if (intervalId) {
            clearInterval(intervalId);
        }

        if (!paused) {
            const id = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(id);
                        handleNext();
                        return 10;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            setIntervalId(id);

            return () => {
                clearInterval(id);
            };
        }
    }, [currentStep, paused]);

    const handleNext = () => {
        if (currentStep === questions.length) {
            handleFinish();
        } else {
            setCurrentStep(prevStep => Math.min(prevStep + 1, questions.length));
            setTimeLeft(20);
        }
    };

    const handleSkip = () => {
        if (!answers[currentStep - 1]) {
            setCurrentStep(prevStep => Math.min(prevStep + 1, questions.length));
            setTimeLeft(5);
        }
    };

    const handleOptionChange = (option: string) => {
        if (answers[currentStep - 1]) return;

        const isCorrect = option === questions[currentStep - 1].answer;
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[currentStep - 1] = option;
            return newAnswers;
        });
        setAnswerCorrectness(prevCorrectness => {
            const newCorrectness = [...prevCorrectness];
            newCorrectness[currentStep - 1] = isCorrect;
            return newCorrectness;
        });

        if (!isCorrect) {
            setLife(prevLife => {
                const updatedLife = prevLife - 1;
                if (updatedLife <= 0) {
                    const currentTime = new Date().getTime();
                    localStorage.setItem("DeadTime", currentTime.toString());
                    localStorage.setItem("canPlay", "false");



                    handleUpdateLife(5);
                    setPaused(true);

                    setTimeout(() => {
                        setPaused(false);

                        // setLife(5);

                        localStorage.setItem("canPlay", "true");  // Allow the user to play after 30 minutes

                    }, 60 * 30 * 1000);
                    setShowPopover(true);

                }
                return updatedLife;
            });
        }

        setTimeout(() => {
            handleNext();
        }, 2000);
    };

    const handleFinish = async () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        setIsQuizComplete(true);
        handleUpdateLife(life);
        const xp=calculateScore();
        const tokensEarned=xp*0.1;

        const gameData = {
            wallet_address: wallet,
            game_date: new Date().toISOString().split('T')[0], // Format date as YYYY-MM-DD
            xp_earned: xp,
            tokens_earned: tokensEarned // Example token calculation
        };
        // Display the corrected answers
        // showCorrectedAnswers();





        try {
            const response = await axios.post('https://djangosport.azurewebsites.net/api/game/', gameData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error("Error saving game data:", error);
        }
        if(xp>0 && tokensEarned>0){

            const blockchainResponse = await axios.post('/api/blockchain', {
              wallet: wallet,
              tokens: tokensEarned
            })        
        }



    };

    // Create a new function to show the corrected answers
    const showCorrectedAnswers = () => {
        const correctedAnswers = questions.map((question, index) => {
            const userAnswer = answers[index];
            const correctAnswer = question.answer;

            return (
                <div key={index} className="mb-6">
                    <h4 className="text-lg font-semibold dark:text-gray-200 mb-2">{question.question}</h4>
                    <p className="text-sm">
                        <span
                            className={`font-semibold ${userAnswer === correctAnswer
                                ? 'text-green-400' // Correct Answer in green
                                : 'text-red-500'   // Incorrect Answer in red
                                }`}
                        >
                            Your Answer: {userAnswer}
                        </span>
                        <br />
                        <span className="font-semibold text-blue-400">
                            Correct Answer: {correctAnswer}
                        </span>
                    </p>
                </div>
            );
        });

        return (
            <div className="p-6  rounded-lg shadow-lg text-neuteral">
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Review Your Answers</h3>
                {correctedAnswers}
                <button
                    onClick={handleOkRevClick}
                    className="mt-6 py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out text-white font-semibold"
                >
                    OK
                </button>
            </div>
        );
    };


    const calculateScore = () => {
        const correctAnswers = answerCorrectness.filter(correct => correct).length;
        return correctAnswers * 10;
    };

    const handleOkClick = () => {
        router.push('/dashboard/general');
    };
    const handleOkRevClick = () => {
        setShowPopover(true);
    };
    const handlecancelClick = () => {
        setShowPopover(false);
    };
    const handleRegainLife = () => {
        router.push('/dashboard/pricing');
    };

    useEffect(() => {
        if (life === 0) {
            setPaused(true);
            setTimeout(() => {
                setPaused(false);
            }, 30 * 60 * 1000);
        }
    }, [life]);

    const stepContent = (step: number) => {
        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }


        const question = questions[step - 1];
        if (!question) {
            console.error('Question is undefined for step:', step);
            return <div>loading...</div>;
        }

        return (
            <div className="flex items-start justify-center select-none">
                <div>
                    <h3 className="text-lg text-neutral-300 mb-8 text-center">
                        {question.question}
                    </h3>
                    <div className="space-y-4">
                        {question.options.map((option: string, index: number) => {
                            const isSelected = answers[step - 1] === option;
                            const isCorrect = answerCorrectness[step - 1] && isSelected;
                            const isIncorrect = !isCorrect && isSelected;

                            return (
                                <label key={index} className="relative block">
                                    <input
                                        type="radio"
                                        name={`question-${step}`}
                                        value={option}
                                        checked={isSelected}
                                        onChange={() => handleOptionChange(option)}
                                        className="sr-only"
                                    />
                                    <a
                                        href="#"
                                        className={`block max-w-sm mx-auto p-6 transition-colors duration-200 border rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-600 ${isSelected
                                            ? isCorrect
                                                ? 'bg-green-100 dark:bg-green-700'
                                                : 'bg-red-100 dark:bg-red-700'
                                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                                            }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleOptionChange(option);
                                        }}
                                    >
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {option}
                                        </h5>
                                        {isCorrect && isSelected && (
                                            <svg
                                                className="absolute top-2 right-2 w-5 h-5 text-green-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        )}
                                        {isIncorrect && isSelected && (
                                            <svg
                                                className="absolute top-2 right-2 w-5 h-5 text-red-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        )}
                                    </a>
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>
        );

    };

    return (
        <div>
            <p className="2xl:hidden text-lg text-neutral-500"> Life: {life} / {total_life}</p>
            


            {/* Question Indicators */}
            <ul className="relative flex-wrap gap-2 hidden 2xl:flex 2xl:flex-wrap 2xl:gap-2">
                {[...Array(questions.length)].map((_, index) => (
                    <li
                        key={index + 1}
                        className={`flex items-center gap-x-2 shrink basis-0 flex-1 ${currentStep === index + 1 ? 'active' : ''}`}
                    >
                        <span
                            className={`min-w-7 min-h-7 flex justify-center items-center text-xs align-middle rounded-full ${index + 1 <= currentStep && answers[index]
                                ? answerCorrectness[index]
                                    ? 'bg-green-600 text-white'
                                    : 'bg-red-600 text-white'
                                : index + 1 === currentStep
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-300 text-gray-800 dark:bg-neutral-600 dark:text-white'
                                }`}
                        >
                            {index + 1 <= currentStep && answers[index] ? (
                                answerCorrectness[index] ? (
                                    <svg
                                        className="flex-shrink-0 size-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                ) : (
                                    <svg
                                        className="flex-shrink-0 size-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                )
                            ) : (
                                index + 1
                            )}
                        </span>
                        <span className="hidden text-sm font-medium text-gray-800 dark:text-white md:inline">
                            Question {index + 1}
                        </span>
                        {index < questions.length - 1 && (
                            <div className="flex-1 h-px bg-gray-400 dark:bg-gray-600"></div>
                        )}
                    </li>
                ))}
            </ul>

            {/* Current Question Indicator for Small Screens */}
            <div className="2xl:hidden flex items-center justify-center text-lg font-medium text-gray-800 dark:text-white">
                Question {currentStep} / {questions.length}
            </div>


            {/* Question Content */}
            <div className="p-4 mt-5 sm:mt-8 flex justify-center items-center border-4 border-solid border-green-600 dark:bg-neutral-800 dark:border-neutral-700 shadow-lg dark:shadow-xl">
                {stepContent(currentStep)}
            </div>

            {/* Bottom Section */}
            <div className="mt-5 flex justify-between items-center gap-x-2">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    Time Left: {timeLeft} seconds
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    Score: {calculateScore()} XP
                </div>
                <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                    onClick={handleSkip}
                    disabled={!!answers[currentStep - 1]}
                >
                    Skip
                </button>
            </div>

            {/* life showing */}
            <p className="hidden md:block text-neutral-500">Life: {life} / {total_life}</p>

            {isQuizComplete && showCorrectedAnswers()}
            {/* Popover for Quiz Completion or Life Regain */}
            {showPopover && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="absolute inset-0">
                        {isQuizComplete && (
                            <div className="absolute inset-0">
                                <DotLottieReact
                                    src="https://lottie.host/88f0600f-051b-4141-8850-0305b47b2703/GvpgTmEoAI.json"
                                    backgroundColor="transparent"
                                    speed={1}
                                    style={{ width: '100%', height: '100%', opacity: 0.5 }}
                                    loop
                                    autoplay
                                />
                            </div>
                        )}
                        {paused && (
                            <div className="absolute inset-0">
                                <DotLottieReact
                                    src="https://lottie.host/d1a3a84d-63d9-4687-a67d-d4e210564954/gDcmav6TXA.json"
                                    backgroundColor="transparent"
                                    speed={1}
                                    style={{ width: '100%', height: '40%', opacity: 0.5 }}
                                    loop
                                    autoplay
                                />
                            </div>
                        )}
                    </div>
                    <div className="relative p-4 md:p-6 lg:p-8 bg-white dark:bg-gray-800 dark:bg-neutral-700 rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full text-center z-10">
                        {life > 0 ? (
                            isQuizComplete ? (
                                <>
                                    <Lottie options={ConfettiAnimation} height={300} width={300} />
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="flex flex-col items-center justify-center"
                                    >
                                        <motion.h2
                                            variants={itemVariants}
                                            className="text-3xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400"
                                        >
                                            Congratulations!
                                        </motion.h2>
                                        <motion.p
                                            variants={itemVariants}
                                            className="text-center text-lg text-gray-700 dark:text-gray-400"
                                        >
                                            You have earned <span className="font-bold text-green-400">{calculateScore()}</span> XP points.
                                        </motion.p>
                                        <motion.p
                                            variants={itemVariants}
                                            className="text-center text-lg text-gray-700 dark:text-gray-400"
                                        >
                                            Additionally, you have earned <span className="font-bold text-yellow-400">{(calculateScore() * 0.1).toFixed(2)}</span> tokens.
                                        </motion.p>
                                        <motion.button
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            onClick={handleOkClick}
                                            className="mt-6 py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-blue-300"
                                        >
                                            OK
                                        </motion.button>
                                    </motion.div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold mb-4 text-center text-gray-700 dark:text-white">
                                        Life Regained!
                                    </h2>
                                    <p className="text-center text-gray-700 dark:text-neutral-400">
                                        {paused
                                            ? 'The game has been paused. It will resume shortly.'
                                            : 'Your life has been regained. You can continue playing now!'}
                                    </p>
                                    <button
                                        onClick={handlecancelClick}
                                        className="mt-4 py-2 px-3 sm:py-2.5 sm:px-4 lg:py-3 lg:px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                    >
                                        OK
                                    </button>
                                </>
                            )
                        ) : (
                            <>
                                <h2 className="text-xl font-bold mb-4 text-center text-gray-700 dark:text-white">
                                    Game Over!
                                </h2>
                                <p className="text-center text-gray-700 dark:text-neutral-400">
                                    You have lost all your lives.
                                </p>
                                <button
                                    onClick={handleRegainLife}
                                    className="mt-4 py-2 px-3 sm:py-2.5 sm:px-4 lg:py-3 lg:px-5 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
                                >
                                    Regain Life (Go to Pricing)
                                </button>
                                {paused && (
                                    <p className="mt-4 text-yellow-500">
                                        Game paused. It will resume in {formatTime(countdown)}.
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

};

export default QuizStepper;


// // Fetch transaction data based on wallet address using getServerSideProps
// export async function getServerSideProps(context: any) {
//     const user = await getUser(context.req); // Get wallet address from the request (thirdweb session)
//     await connectDB(); // Connect to MongoDB

//     if (!user?.address) {
//         // If wallet address is not found, redirect to login page
//         return {
//             redirect: {
//                 destination: "/login",
//                 permanent: false,
//             },
//         };
//     }

//     try {
//         const wallet_address = user.address;
//         // Fetch life data and other data based on wallet address

//         const lifeData = await LifeSystem.findOne({ wallet_address }).exec();
//         console.log(lifeData);

//         if (!lifeData) {
//             return {
//                 notFound: true, // Return 404 if user not found
//             };
//         }

//         const lifedata= {
//             life: lifeData.life,
//             can_play: lifeData.can_play,
//         }

//         console.log("hello : ",lifedata);


       
//         // Pass formatted transactions as props
//         return {
//             props: {
//                 lifedata:lifedata,


//             }
//         };
//     } catch (error) {
//         // Handle internal server error
//         return {
//             props: {
//                 error: 'Internal server error',
//             }
//         };
//     }
// }