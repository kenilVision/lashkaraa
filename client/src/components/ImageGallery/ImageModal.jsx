'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import ArrowRight from '../icons/ArrowRight';
import ArrowLeft from '../icons/ArrowLeft';
import Button from '../common/Button';
import ModalCloseIcon from '../icons/ModalCloseIcon';
import VideoLoudIcon from '../icons/VideoLoudIcon';
import VideoMute from '../icons/VideoMute';
import VidePlay from '../icons/VidePlay';
import VideoPause from '../icons/VideoPause';
import ArrowTop from '../icons/ArrowTop';

export default function ImageModal({
    image,
    onClose,
    onNext,
    onPrevious,
    isOpen
}) {
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);
    const videoRef = useRef(null);
    const videomobileRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    // (Mobile Screen)
    const toggleMobileMute = () => {
        if (!videomobileRef.current) return;
        videomobileRef.current.muted = !videomobileRef.current.muted;
        setIsMuted(videomobileRef.current.muted);
    };

    // (Mobile Screen)
    const toggleMobilePlay = () => {
        if (!videomobileRef.current) return;

        // Toggle based on current state
        if (videomobileRef.current.paused) {
            videomobileRef.current.play()
                .then(() => setIsPlaying(true))
                .catch((error) => {
                    console.error("Play failed:", error);
                    // Fallback with muted
                    videomobileRef.current.muted = true;
                    setIsMuted(true);
                    videomobileRef.current.play().then(() => setIsPlaying(true));
                });
        } else {
            videomobileRef.current.pause();
            setIsPlaying(false);
        }
    };

    const togglePlay = () => {
        console.log(videoRef.current)
        if (!videoRef.current) return;

        // Toggle based on current state
        if (videoRef.current.paused) {
            videoRef.current.play()
                .then(() => setIsPlaying(true))
                .catch((error) => {
                    console.error("Play failed:", error);
                    // Fallback with muted
                    videoRef.current.muted = true;
                    setIsMuted(true);
                    videoRef.current.play().then(() => setIsPlaying(true));
                });
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Remove the separate autoplay useEffect and integrate it here (Mobile Screen)
    useEffect(() => {
        if (videomobileRef.current && image?.videoSrc) {
            // Set initial state
            videomobileRef.current.muted = true;
            setIsMuted(true);

            // Try to play but don't force it
            videomobileRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(error => {
                    console.log('Autoplay prevented:', error);
                    setIsPlaying(false);
                });

            // Add event listeners for proper state tracking
            videomobileRef.current.addEventListener('play', () => setIsPlaying(true));
            videomobileRef.current.addEventListener('pause', () => setIsPlaying(false));

            return () => {
                videomobileRef.current?.removeEventListener('play', () => setIsPlaying(true));
                videomobileRef.current?.removeEventListener('pause', () => setIsPlaying(false));
            };
        }
    }, [image?.videoSrc]);

    // Remove the separate autoplay useEffect and integrate it here
    useEffect(() => {
        if (videoRef.current && image?.videoSrc) {
            // Set initial state
            videoRef.current.muted = true;
            setIsMuted(true);

            // Try to play but don't force it
            videoRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(error => {
                    console.log('Autoplay prevented:', error);
                    setIsPlaying(false);
                });

            // Add event listeners for proper state tracking
            videoRef.current.addEventListener('play', () => setIsPlaying(true));
            videoRef.current.addEventListener('pause', () => setIsPlaying(false));

            return () => {
                videoRef.current?.removeEventListener('play', () => setIsPlaying(true));
                videoRef.current?.removeEventListener('pause', () => setIsPlaying(false));
            };
        }
    }, [image?.videoSrc]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowRight') {
                onNext();
            } else if (e.key === 'ArrowLeft') {
                onPrevious();
            }
        };

        // const handleClickOutside = (e) => {
        //     if (modalRef.current && !modalRef.current.contains(e.target)) {
        //         onClose();
        //     }
        // };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // document.addEventListener('mousedown', handleClickOutside);
            // // Focus the close button when modal opens
            // setTimeout(() => closeButtonRef.current?.focus(), 100);
            // // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            // document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose, onNext, onPrevious]);

    if (!image || !isOpen) return null;

    // Format the date properly
    const formattedDate = (() => {
        try {
            return format(new Date(image.date), 'MMMM d, yyyy');
        } catch (error) {
            return image.date;
        }
    })();

    return (
        <Fragment>
            {/* Large Screen */}
            <div
                className="fixed inset-0 z-[70] xl:flex hidden items-center justify-center bg-black/80 backdrop-blur-sm"
                aria-modal="true"
                role="dialog"
                aria-labelledby="modal-title"
            >
                {/* Modal content */}
                <div
                    ref={modalRef}
                    className={cn(
                        " h-[90vh] bg-white rounded-2xl overflow-hidden",
                        "flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300",
                        "mx-4"
                    )}
                    style={{ maxWidth: '95vw' }}
                >
                    {/* Image container */}
                    <div className="relative flex-1 flex items-center justify-center min-w-[300px]">
                        {
                            image?.videoSrc ?
                                (
                                    <div className="relative group w-full h-full">
                                        {/* Video element without default controls */}
                                        <video
                                            ref={videoRef}
                                            className="w-full h-full object-contain"
                                            muted={isMuted}
                                            loop
                                            playsInline
                                        // autoPlay
                                        >
                                            <source src={image?.videoSrc} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>

                                        {/* Custom controls overlay */}
                                        <div className="absolute bottom-0 right-0 flex-col p-4 flex items-center gap-3 transition-opacity">
                                            <Button
                                                onClick={toggleMute}
                                                className="text-white border-0 size-10 flex items-center justify-center !p-2 bg-[#000000b3] !rounded-full"
                                            >
                                                {isMuted ? <VideoMute /> : <VideoLoudIcon />}
                                            </Button>
                                            <Button
                                                onClick={togglePlay}
                                                className="text-white border-0 size-10 flex items-center justify-center !p-2 bg-[#000000b3] !rounded-full"
                                            >
                                                {isPlaying ? <VideoPause /> : <VidePlay />}
                                            </Button>

                                        </div>
                                    </div>
                                )
                                :
                                <img
                                    src={image?.src}
                                    alt={image?.title}
                                    className="w-full h-full object-contain"
                                />
                        }
                    </div>

                    {/* Info panel */}
                    <div className="w-full md:w-[500px] flex-shrink-0 overflow-y-auto">
                        <div className='flex justify-between h-full flex-col'>
                            <div>
                                <div className='flex items-center border-b border-b-gray-200'>
                                    <h2 id="modal-title" className="text-2xl font-semibold m-3">
                                        <img src="https://instafeed.nfcube.com/assets/img/logo-instagram-transparent.png" alt="insta logo" className='h-[45px] w-[45px]' />
                                    </h2>
                                    <p className="text-[18px] tracking-[2px] text-black font-bold leading-[23px]">lashkaraa</p>
                                </div>

                                <div className="flex flex-col p-6 text-[15px] mt-14">
                                    <p className='text-[#666] leading-[1.3]'>{image?.content?.description}</p>
                                    <p className='text-[#666] pt-4 leading-[1.3]'>{image?.content?.tags}</p>
                                    <p className='text-[#666] pt-4 leading-[1.3]'>{image?.content?.type}</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center py-3 border-t border-gray-200'>
                                <p className='text-[#666] text-xs'>{image?.content?.date}</p>
                            </div>
                        </div>

                    </div>
                </div>
                {/* Navigation buttons */}
                <Button
                    ref={closeButtonRef}
                    onClick={onClose}
                    className="absolute border-0 top-4 right-5 !p-2 rounded-full text-white transition-colors"
                    aria-label="Close modal"
                >
                    <ModalCloseIcon size={18} />
                </Button>

                <Button
                    onClick={onPrevious}
                    className="absolute border-0 left-2 top-1/2 -translate-y-1/2 !p-2 rounded-full transition-colors"
                    aria-label="Previous image"
                >
                    <ArrowLeft width={21} height={20} color='#fff' />
                </Button>

                <Button
                    onClick={onNext}
                    className="absolute border-0 right-2 top-1/2 -translate-y-1/2 !p-2 rounded-full transition-colors"
                    aria-label="Next image"
                >
                    <ArrowRight width={21} height={20} color='#fff' />
                </Button>
            </div>
            {/* Small Screen */}
            <div
                className="fixed h-screen inset-0 z-[70] xl:hidden lg:flex bg-black/80 backdrop-blur-sm"
                aria-modal="true"
                role="dialog"
                aria-labelledby="modal-title"
            >
                {/* Modal content */}
                <div
                    ref={modalRef}
                    className={cn(
                        " h-full bg-white",
                        "flex flex-col w-full overflow-y-auto animate-in fade-in zoom-in-95 duration-300",
                        "md:mx-3 mx-1"
                    )}
                    style={{ maxWidth: '100vw' }}
                >
                    <div className='relative'>
                        <div className='flex w-full items-center'>
                            <h2 id="modal-title" className="text-2xl font-semibold m-3 border rounded-full border-gray-200">
                                <img src="https://instafeed.nfcube.com/assets/img/logo-instagram-transparent.png" alt="insta logo" className='h-[25px] w-[25px]' />
                            </h2>
                            <p className="text-[18px] tracking-[2px] text-black font-bold leading-[20px]">lashkaraa</p>
                            <Button
                                ref={closeButtonRef}
                                onClick={onClose}
                                className="absolute border-0 top-4 right-3 bg-[#000000b3] !p-2 !rounded-full text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <ModalCloseIcon size={10} />
                            </Button>
                        </div>
                        {/* Image container */}
                        <div className="relative flex-1 flex items-center justify-center w-full h-[95vh] min-w-0">
                            {
                                image?.videoSrc ?
                                    (
                                        <div className="relative group w-full h-full">
                                            {/* Video element without default controls */}
                                            <video
                                                ref={videomobileRef}
                                                className="w-full h-full object-contain"
                                                muted={isMuted}
                                                loop
                                                playsInline
                                            >
                                                <source src={image?.videoSrc} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>

                                            {/* Custom controls overlay */}
                                            <div className="absolute top-26 left-3 flex-col flex items-center gap-3 transition-opacity">
                                                <Button
                                                    onClick={toggleMobilePlay}
                                                    className="text-white border-0 size-8 flex items-center justify-center !p-2 bg-[#000000b3] !rounded-full"
                                                >
                                                    {isPlaying ? <VideoPause size={14} /> : <VidePlay size={14} />}
                                                </Button>
                                                <Button
                                                    onClick={toggleMobileMute}
                                                    className="text-white border-0 size-8 flex items-center justify-center !p-2 bg-[#000000b3] !rounded-full"
                                                >
                                                    {isMuted ? <VideoMute size={16} /> : <VideoLoudIcon size={16} />}
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                    :
                                    <img
                                        src={image?.src}
                                        alt={image?.title}
                                        className="w-full h-full object-cover"
                                    />
                            }
                            <Button
                                onClick={onPrevious}
                                className="absolute border-0 left-3 top-6 !p-2 bg-[#000000b3] !rounded-full transition-colors"
                                aria-label="Previous image"
                            >
                                <ArrowTop color='#fff' />
                            </Button>

                            <Button
                                onClick={onNext}
                                className="absolute border-0 left-3 top-16 !p-2 bg-[#000000b3] !rounded-full transition-colors"
                                aria-label="Next image"
                            >
                                <ArrowTop rotate180={true} color='#fff' />
                            </Button>
                        </div>
                        {/* Info panel */}
                        <div className="w-full flex-shrink-0 overflow-y-auto">
                            <div className='flex justify-between h-full flex-col'>
                                <div>
                                    <div className="flex flex-col py-6 lg:px-12 px-9 text-[15px] my-14">
                                        <p className='text-[#666] leading-[1.3]'>{image?.content?.description}</p>
                                        <p className='text-[#666] pt-4 leading-[1.3]'>{image?.content?.tags}</p>
                                        <p className='text-[#666] pt-4 leading-[1.3]'>{image?.content?.type}</p>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center py-2 border-t border-gray-200'>
                                    <p className='text-[#666] text-xs'>{image?.content?.date}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                {/* Navigation buttons */}


                {/* <Button
                    onClick={onPrevious}
                    className="absolute border-0 left-2 top-1/2 -translate-y-1/2 !p-2 rounded-full transition-colors"
                    aria-label="Previous image"
                >
                    <ArrowLeft width={21} height={20} color='#fff' />
                </Button>

                <Button
                    onClick={onNext}
                    className="absolute border-0 right-2 top-1/2 -translate-y-1/2 !p-2 rounded-full transition-colors"
                    aria-label="Next image"
                >
                    <ArrowRight width={21} height={20} color='#fff' />
                </Button> */}
            </div>
        </Fragment>
    );
}