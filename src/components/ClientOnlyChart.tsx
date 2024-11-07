
"use client";
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Footer from './Footer';

const ClientOnlyChart = () => {
    const [series, setSeries] = useState([60, 15, 5, 10, 10]);
    const colors = ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694", "#8B5CF6", "#FBBF24", "#EF4444", "#10B981", "#3B82F6"];

    const labels = [
        "Community", "Investors", "Marketing", "Development Fund",
        "Ecosystem"
    ];

    const getChartOptions = (): ApexOptions => {
        const total = series.reduce((a, b) => a + b, 0);
        return {
            series: series,
            colors: colors,
            chart: {
                height: 320,
                width: "100%",
                type: "donut" as 'donut',
            },
            stroke: {
                colors: ["transparent"],
                lineCap: "round",
            },
            plotOptions: {
                pie: {
                    donut: {
                        background: '',
                        labels: {
                            show: true,
                            name: {
                                color: '#ffffff',
                                show: true,
                                fontFamily: "Inter, sans-serif",
                                offsetY: 20,
                            },
                            total: {
                                color: '#ffffff',
                                showAlways: true,
                                show: true,
                                label: "Distribution",
                                fontFamily: "Inter, sans-serif",
                                formatter: function (w) {
                                    const sum = w.globals.seriesTotals.reduce((a: any, b: any) => a + b, 0);
                                    return sum + '%';
                                },
                            },
                            value: {
                                color: '#ffffff',
                                show: true,
                                fontFamily: "Inter, sans-serif",
                                offsetY: -20,
                                formatter: function (value) {
                                    return value + "%";
                                },
                            },
                        },
                        size: "80%",
                    },
                },
            },
            grid: {
                padding: {
                    top: -2,
                },
            },
            labels: labels,
            dataLabels: {
                enabled: true,
                formatter: (val: number, opts: any) => {
                    const totalValue = opts.w.globals.seriesTotals[opts.seriesIndex];
                    const percentage = ((totalValue / total) * 100).toFixed(2);
                    return `${percentage}%`;
                },
                style: {
                    colors: ['#fff'],
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                },
            },
            legend: {
                position: "bottom",
                fontFamily: "Inter, sans-serif",
                formatter: function (seriesName, opts) {
                    const value = opts.w.globals.series[opts.seriesIndex];
                    const percent = ((value / total) * 100).toFixed(2);
                    return `${seriesName}: ${percent}%`;
                },
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value + "%";
                    },
                },
            },
            xaxis: {
                labels: {
                    formatter: function (value) {
                        return value + "%";
                    },
                },
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 300,
                        },
                        dataLabels: {
                            enabled: false,
                        },
                    },
                },
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            height: 250,
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        };
    };




    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]');

            function handleCheckboxChange(event: { target: any; }) {
                const checkbox = event.target;
                let updatedSeries;

                switch (checkbox.value) {
                    case 'utility':
                        updatedSeries = checkbox.checked ? [12, 18, 22, 26, 32, 38, 42, 48, 52] : [10, 15, 20, 25, 30, 35, 40, 45, 50];
                        break;
                    case 'governance':
                        updatedSeries = checkbox.checked ? [15, 20, 25, 30, 35, 40, 45, 50, 55] : [10, 15, 20, 25, 30, 35, 40, 45, 50];
                        break;
                    case 'reserve':
                        updatedSeries = checkbox.checked ? [18, 22, 28, 32, 38, 42, 46, 50, 54] : [10, 15, 20, 25, 30, 35, 40, 45, 50];
                        break;
                    case 'development':
                        updatedSeries = checkbox.checked ? [20, 25, 30, 35, 40, 45, 50, 55, 60] : [10, 15, 20, 25, 30, 35, 40, 45, 50];
                        break;
                    default:
                        updatedSeries = [10, 15, 20, 25, 30, 35, 40, 45, 50];
                }

                setSeries(updatedSeries);
            }

            checkboxes.forEach((checkbox) => {
                checkbox.addEventListener('change', handleCheckboxChange);
            });

            return () => {
                checkboxes.forEach((checkbox) => {
                    checkbox.removeEventListener('change', handleCheckboxChange);
                });
            };
        }
    }, []);

    return (
        <><section className="relative custom-bg-hero pt-20 lg:pt-20">
            <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12">
                <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
                    <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden" />
                    <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80" />
                </div>
                <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90" />
                <div className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                    <h1 className="w-[100%] flex justify-center text-3xl font-extrabold  dark:text-white mb-6">Tokenomics Insights</h1>
                    <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-12">
                        <div className="max-w-7xl w-full bg-transparent rounded-lg shadow p-4 md:p-6 flex flex-col lg:flex-row gap-10 lg:gap-12">
                            <div className="flex-1 w-[80vw] rounded-lg dark:bg-transparent">
                                <ReactApexChart
                                    options={getChartOptions()}
                                    series={series}
                                    type="donut"
                                    height={1000} />
                            </div>

                            <div className="flex-1 w-full lg:w-1/2">
                                <div className=" ">
                                    <div className="flex flex-col gap-3 w-full">
                                        {labels.map((label, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-700 dark:bg-gray-700 rounded-lg shadow p-4 w-full flex justify-between items-center"
                                                style={{ borderLeft: `6px solid ${colors[index]}` }}
                                            >
                                                <h3 className="text-lg font-semibold text-white dark:text-white mb-2">{label}</h3>
                                                <p className="text-gray-300 dark:text-gray-300">
                                                    {series[index]}% of total
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section><Footer /></>
    );
};

export default ClientOnlyChart;
