import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const VdiStats = ({ runningvdi, closedvdi }) => {
    // Ensure the data is available before rendering
    useEffect(() => {
        if (!runningvdi || !closedvdi) {
            console.warn("Missing VDI data: running_vdi or closed_vdi might be undefined");
        }
    }, [runningvdi, closedvdi]);

    const data = {
        labels: ['Running VDI', 'Closed VDI'], // Updated labels
        datasets: [
            {
                label: 'VDI Status',
                data: [Number(runningvdi), Number(closedvdi)], // Ensure the data is numeric
                backgroundColor: ['#2563EB', '#F44336'], // Blue for running VDI, red for closed VDI
                hoverBackgroundColor: ['#64B5F6', '#EF5350'],
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
            {Number(runningvdi) === 0 && Number(closedvdi) === 0 ? (
                <p className="text-center text-gray-600">No VDIs created this week.</p>
            ) : (
                <Doughnut data={data} options={options} />
            )}
        </div>
    );
};

export default VdiStats;
