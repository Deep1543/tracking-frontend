import React, { useState, useRef, useEffect, useCallback } from "react";
import {
    FaFlagCheckered,
    FaUser,
    FaTransgenderAlt,
    FaClock,
    FaFlagCheckered as FaFinishFlag,
    FaStopwatch,
    FaRunning,
    FaDownload,
    FaPrint,
} from "react-icons/fa";
import html2canvas from "html2canvas";
import certificateBg1 from '../images/logo.png';
import certificateBg2 from '../images/logoold.png';
import certificateBg3 from '../images/logo11.jpg';
import certificateBg4 from '../images/logo-black.png';
import { useLocation } from 'react-router-dom';
import api from "../axios";

const RaceTimes2 = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("bibno");
    const [raceInfo, setRaceInfo] = useState(null);
    const [error, setError] = useState(null);
    const certificateRef = useRef();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.bibno && location.state?.autoGenerate) {
            setSearchQuery(location.state.bibno.toString());
            setSearchType('bibno');
            // Trigger the search automatically
            const autoGenerateCertificate = async () => {
                try {
                    // Include event_id in the API call if available
                    const eventIdParam = location.state.event_id ? `&event_id=${location.state.event_id}` : '';
                    const response = await api.get(`/race-info?bibno=${location.state.bibno}${eventIdParam}`);
                    if (!response.ok) {
                        throw new Error('No data found for the given bib number');
                    }
                    const data = await response.json();
                    if (data.length > 0) {
                        // Include the event_id from location state in the race info
                        setRaceInfo({
                            ...data[0],
                            event_id: location.state.event_id || data[0].event_id
                        });
                    } else {
                        setError("No results found");
                    }
                } catch (err) {
                    setError(err.message);
                }
            };
            autoGenerateCertificate();
        }
    }, [location.state]);

    const calculateTimeDifference = (startTime, endTime) => {
        if (!startTime || !endTime) return "00:00:00";

        const start = new Date(`1970-01-01T${startTime}Z`);
        const end = new Date(`1970-01-01T${endTime}Z`);

        const diffMs = end - start;
        const hours = Math.floor(diffMs / 3600000);
        const minutes = Math.floor((diffMs % 3600000) / 60000);
        const seconds = Math.floor((diffMs % 60000) / 1000);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const calculateTotalTime = () => {
        if (!raceInfo) return "00:00:00";
        let totalMs = 0;

        for (let i = 2; i <= 5; i++) {
            const prevCheckpointKey = `checkpoint${i - 1}Time`;
            const currentCheckpointKey = `checkpoint${i}Time`;
            const timeDifference = calculateTimeDifference(
                raceInfo[prevCheckpointKey],
                raceInfo[currentCheckpointKey]
            );

            const [hours, minutes, seconds] = timeDifference.split(':').map(Number);
            totalMs += (hours * 3600 + minutes * 60 + seconds) * 1000;
        }

        const totalHours = Math.floor(totalMs / 3600000);
        const totalMinutes = Math.floor((totalMs % 3600000) / 60000);
        const totalSeconds = Math.floor((totalMs % 60000) / 1000);

        return `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
    };

    const fetchRaceInfo = async (event) => {
        event.preventDefault();
        setRaceInfo(null);
        setError(null);

        if (!searchQuery) {
            setError(`Please enter a ${searchType === 'bibno' ? 'bib number' : 'name'}`);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/race-info?${searchType}=${searchQuery}`);
            if (!response.ok) {
                throw new Error(`No data found for the given ${searchType === 'bibno' ? 'bib number' : 'name'}`);
            }
            const data = await response.json();
            if (data.length > 0) {
                console.log('API Response:', data[0]);
                console.log('Available fields:', Object.keys(data[0]));
                setRaceInfo(data[0]);
            } else {
                setError("No results found");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const downloadCertificate = async () => {
        if (!certificateRef.current) return;

        const canvas = await html2canvas(certificateRef.current);
        const link = document.createElement("a");
        link.download = `${raceInfo.name}-Certificate.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const printCertificate = async () => {
        if (!certificateRef.current) return;

        const canvas = await html2canvas(certificateRef.current);
        const imageDataUrl = canvas.toDataURL("image/png");

        const printWindow = window.open("", "", "width=800,height=600");
        const styles = `
            <style>
                @media print {
                    @page {
                        size: auto;
                        margin: 0mm;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .certificate-container {
                        width: 100%;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                        page-break-inside: avoid;
                    }
                    /* Add certificate content styles */
                    .main-content {
                        position: relative;
                        z-index: 2;
                        transform: translate3d(0,0,0);
                        backface-visibility: hidden;
                    }
                    .certificate-name {
                        font-family: 'Brush Script MT', cursive;
                        margin-top: 2rem;
                        margin-bottom: 2rem;
                        position: relative;
                        z-index: 3;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                        font-size: 2.5rem;
                        font-weight: 800;
                        color: #1f2937;
                    }
                    .background-image {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-size: 50%;
                        background-position: center;
                        background-repeat: no-repeat;
                        opacity: 0.2;
                        z-index: 1;
                        transform: translate3d(0,0,0);
                        will-change: transform;
                    }
                }
                body { 
                    margin: 0; 
                    padding: 0; 
                    font-family: Arial, sans-serif;
                    background: #f0f0f0;
                }
                .certificate-container { 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    min-height: 100vh;
                    padding: 20px;
                }
                img { 
                    width: 100%; 
                    max-width: 800px; 
                    height: auto; 
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
            </style>
        `;

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>${raceInfo.name} - Race Certificate</title>
                    ${styles}
                    <link href="https://fonts.googleapis.com/css2?family=Brush+Script+MT&display=swap" rel="stylesheet">
                </head>
                <body>
                    <div class="certificate-container">
                        <img src="${imageDataUrl}" alt="Race Certificate" />
                    </div>
                    <script>
                        window.onload = () => {
                            setTimeout(() => {
                                window.print();
                                window.onafterprint = () => window.close();
                            }, 500);
                        };
                    </script>
                </body>
            </html>
        `);

        printWindow.document.close();
    };

    const getCertificateStyles = useCallback((eventId, recipientName) => {
        console.log('Race Info Event Details:', {
            eventid: raceInfo?.eventid,
            event_id: raceInfo?.event_id,
            rawEventId: eventId
        });

        const finalEventId = Number(
            location.state?.event_id ||
            eventId ||
            raceInfo?.eventid ||
            raceInfo?.event_id ||
            1
        );

        console.log('Final Event ID used:', finalEventId);

        switch (finalEventId) {
            case 1:
                return {
                    background: certificateBg1,
                    nameStyle: "text-red-500 font-bold text-3xl",
                    layout: "above",
                    certificateText: `This certificate goes to ${recipientName} for their outstanding performance.`
                };
            case 2:
                return {
                    background: certificateBg2,
                    nameStyle: "text-green-500 italic text-4xl",
                    layout: "below",
                    certificateText: `This certificate is given to ${recipientName} in recognition of their achievements.`
                };
            case 3:
                return {
                    background: certificateBg3,
                    nameStyle: "text-blue-600 underline text-2xl",
                    layout: "above",
                    certificateText: `${recipientName} is honored with this certificate for their dedication.`
                };
            case 4:
                return {
                    background: certificateBg4,
                    nameStyle: "text-yellow-400 font-extrabold text-5xl",
                    layout: "below",
                    certificateText: `We proudly award this certificate to ${recipientName} for excellence.`
                };
            default:
                return {
                    background: certificateBg1,
                    nameStyle: "text-black text-xl",
                    layout: "above",
                    certificateText: `Certificate of Appreciation awarded to ${recipientName}.`
                };
        }
    }, [location.state?.event_id, raceInfo]);





    // const getCertificateBackground = useCallback((eventId) => {
    //     console.log('Race Info Event Details:', {
    //         eventid: raceInfo?.eventid,
    //         event_id: raceInfo?.event_id,
    //         rawEventId: eventId
    //     });

    //     const finalEventId = Number(
    //         location.state?.event_id ||
    //         eventId ||
    //         raceInfo?.eventid ||
    //         raceInfo?.event_id ||
    //         1
    //     );

    //     console.log('Final Event ID used:', finalEventId);

    //     switch (finalEventId) {
    //         case 1:
    //             return certificateBg1;
    //         case 2:
    //             return certificateBg2;
    //         case 3:
    //             return certificateBg3;
    //         case 4:
    //             return certificateBg4;
    //         default:
    //             return certificateBg1;
    //     }
    // }, [location.state?.event_id, raceInfo]);

    useEffect(() => {
        if (raceInfo) {
            console.log('Event ID:', raceInfo.eventid, 'Race info:', raceInfo);
        }
    }, [raceInfo]);

    useEffect(() => {
        if (raceInfo) {
            console.log('Debug info:', {
                eventId: raceInfo.eventid,
                eventIdType: typeof raceInfo.eventid,
                selectedBackground: getCertificateStyles(raceInfo.eventid)
            });
        }
    }, [raceInfo, getCertificateStyles]);

    useEffect(() => {
        if (raceInfo) {
            console.log('Certificate Debug:', {
                eventId: raceInfo.event_id,
                eventName: raceInfo.event_name,
                backgroundImage: getCertificateStyles(raceInfo.event_id),
                raceInfo: raceInfo
            });
        }
    }, [raceInfo, getCertificateStyles]);

    useEffect(() => {
        if (raceInfo) {
            console.log('Race Info Object:', {
                ...raceInfo,
                keys: Object.keys(raceInfo)
            });

            // Log all available fields and their values
            Object.keys(raceInfo).forEach(key => {
                console.log(`${key}:`, raceInfo[key]);
            });
        }
    }, [raceInfo]);

    const InfoCard = ({ icon: Icon, label, value }) => (
        <div className="bg-blue-50 p-4 md:p-6 rounded-md shadow-lg flex items-center space-x-4">
            <Icon className="text-blue-600 text-xl md:text-2xl" />
            <div>
                <p className="text-gray-700 font-medium text-sm md:text-base">{label}</p>
                <p className="text-lg md:text-xl">{value || "N/A"}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-center mb-4 md:mb-8">
                    <FaFlagCheckered className="text-3xl md:text-5xl text-blue-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-700 text-center mb-4 md:mb-6">
                    Race Information
                </h1>
                {/* Input Form */}
                <form onSubmit={fetchRaceInfo} className="flex flex-col md:flex-row gap-4 mb-6">
                    <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="bibno">Bib Number</option>
                        <option value="name">Name</option>
                    </select>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Enter ${searchType === 'bibno' ? 'Bib Number' : 'Name'}`}
                    />
                    <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Get Race Info
                    </button>
                </form>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {raceInfo && (
                    <div className="space-y-6">
                        {/* General Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InfoCard icon={FaUser} label="Name" value={raceInfo.name} />
                            <InfoCard icon={FaTransgenderAlt} label="Gender" value={raceInfo.gender} />
                            <InfoCard icon={FaClock} label="Start Time" value={raceInfo.StartTime} />
                            <InfoCard icon={FaFinishFlag} label="Finish Time" value={raceInfo.FinishLine} />
                            <InfoCard icon={FaStopwatch} label="Race Time" value={calculateTotalTime()} />
                            <InfoCard icon={FaRunning} label="Distance" value={`${raceInfo.participatein} km`} />
                        </div>

                        {/* Certificate Section */}
                        <div
                            ref={certificateRef}
                            className="border-4 border-gray-800 shadow-xl p-4 md:p-8 rounded-xl text-center space-y-4 relative"
                            style={{
                                backgroundImage: `url(${getCertificateStyles(raceInfo?.eventid || raceInfo?.event_id).background})`,
                                backgroundSize: '50%',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                minHeight: '800px',
                                width: '100%',
                                maxWidth: '1200px',
                                margin: '0 auto',
                                backgroundColor: 'white',
                                position: 'relative',
                                transform: 'translate3d(0,0,0)',
                                backfaceVisibility: 'hidden', 

                            }}
                        >
                            <div className="absolute inset-0 bg-white/70"></div>

                            <div style={{ position: 'relative', zIndex: 2 }}>
                                {/* Decorative Border */}
                                <div className="absolute inset-0 mx-8 -top-8 mb-3 pointer-events-none">
                                    <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-black rounded-tl-lg -m-1"></div>
                                    <div className="absolute top-0 right-0 w-16 h-16 border-t-[3px] border-r-[3px] border-black rounded-tr-lg -m-1"></div>
                                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[3px] border-l-[3px] border-black rounded-bl-lg -m-1"></div>
                                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[3px] border-r-[3px] border-black rounded-br-lg -m-1"></div>
                                </div>
                                {/* Header with adjusted spacing */}
                                <div className="mb-8 mt-8">
                                    <div className="flex justify-center mb-4">

                                    </div>
                                    <div className="flex flex-col items-center">
                                        <h2 className="text-3xl md:text-5xl font-bold text-green-600 mb-4" style={{ fontFamily: 'Copperplate, Fantasy' }}>
                                            Certificate of Achievement
                                        </h2>
                                        <div className="h-1 w-32 bg-green-600"></div>
                                    </div>
                                </div>


                                {/* Main Content */}
                                <div className="space-y-6">
                                    <p className="text-lg italic text-gray-600">This is to certify that</p>
                                    <h3 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4"
                                        style={{
                                            fontFamily: 'Brush Script MT, cursive',
                                            marginTop: '0.3rem',
                                            marginBottom: '2rem',
                                            position: 'relative',
                                            zIndex: 3,
                                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                                        }}>
                                        {raceInfo.name}
                                    </h3>

                                    {/* Participant Details */}
                                    {/* Conditional Rendering for Name Position */}
                                    {getCertificateStyles(raceInfo?.eventid || raceInfo?.event_id).layout === "above" && (
                                        <h3 className={getCertificateStyles(raceInfo?.eventid || raceInfo?.event_id).nameStyle}>
                                            {raceInfo.name}
                                        </h3>
                                    )}

                                    {/* Participant Details */}
                                    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto my-6">
                                        <div className="border-r border-gray-300">
                                            <p className="text-gray-600">Bib Number</p>
                                            <p className="font-bold text-xl">{raceInfo.bibno}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Category</p>
                                            <p className="font-bold text-xl">{raceInfo.categoryid || "Open"}</p>
                                        </div>
                                        <div className="border-r border-gray-300">
                                            <p className="text-gray-600">Position</p>
                                            <p className="font-bold text-xl">{raceInfo.position || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Distance</p>
                                            <p className="font-bold text-xl">{raceInfo.participatein} km</p>
                                        </div>
                                    </div>

                                    {/* Conditional Rendering for Name Position */}
                                    {getCertificateStyles(raceInfo?.eventid || raceInfo?.event_id).layout === "below" && (
                                        <h3 className={getCertificateStyles(raceInfo?.eventid || raceInfo?.event_id).nameStyle}>
                                            {raceInfo.name}
                                        </h3>
                                    )}


                                    {/* Achievement Text */}
                                    <div className="my-6">
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            Has successfully completed the
                                            <span className="font-bold text-green-600"> {raceInfo.event} </span>
                                            with a remarkable time of
                                            <span className="font-bold text-green-600"> {calculateTotalTime()} </span>
                                            on <span className="font-semibold">{raceInfo.date}</span>
                                        </p>
                                    </div>

                                    {/* Signature Section */}
                                    <div className="flex justify-around mt-16 mb-8">
                                        <div className="text-center px-8">
                                            <div className="w-48 border-b-2 border-gray-400 mb-4"></div>
                                            <p className="text-gray-600 text-lg">Race Director</p>
                                        </div>
                                        <div className="text-center px-8">
                                            <div className="w-48 border-b-2 border-gray-400 mb-4"></div>
                                            <p className="text-gray-600 text-lg">Event Coordinator</p>
                                        </div>
                                    </div>

                                    {/* Footer with adjusted spacing */}
                                    <div className="mt-8 text-sm text-gray-500 pb-8">
                                        <p>presented by</p>
                                        <p className="text-xs mt-1"></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <button
                                onClick={downloadCertificate}
                                className="w-full md:w-auto px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <FaDownload /> Download
                            </button>
                            <button
                                onClick={printCertificate}
                                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <FaPrint /> Print
                            </button>
                        </div>

                        {/* Checkpoints Info */}
                        <div className="bg-white p-4 md:p-6 rounded-md shadow-lg">
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">Checkpoint Times</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[1, 2, 3, 4, 5].map((checkpointNumber) => {
                                    const checkpointKey = `checkpoint${checkpointNumber}Time`;
                                    const checkpointLabel = `Checkpoint ${checkpointNumber}`;
                                    const prevCheckpointKey = `checkpoint${checkpointNumber - 1}Time`;
                                    const timeDifference =
                                        checkpointNumber === 1
                                            ? "N/A"
                                            : calculateTimeDifference(raceInfo[prevCheckpointKey], raceInfo[checkpointKey]);
                                    return (
                                        <div key={checkpointNumber} className="flex flex-col bg-gray-50 p-4 rounded-md shadow-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">{checkpointLabel}</span>
                                                <span className="text-base md:text-lg">{raceInfo[checkpointKey]}</span>
                                            </div>
                                            {checkpointNumber !== 1 && (
                                                <div className="flex justify-between mt-2">
                                                    <span className="text-gray-600">Time Difference</span>
                                                    <span className="text-base md:text-lg">{timeDifference}</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RaceTimes2;


