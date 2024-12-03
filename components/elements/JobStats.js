import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const JobStats = ({ openJobs, closedJobs }) => {
    const data = {
        labels: ['Open Jobs', 'Closed Jobs'],
        datasets: [
            {
                label: 'Job Status',
                data: [openJobs, closedJobs],
                backgroundColor: ['#2563EB', '#F44336'], // Blue for open jobs, red for closed jobs
                hoverBackgroundColor: ['#64B5F6', '#EF5350'], // Lighter blue and red for hover effect
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw;
                        return ` ${tooltipItem.label}: ${value}`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full h-64 md:w-1/2 mx-auto">
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default JobStats;
