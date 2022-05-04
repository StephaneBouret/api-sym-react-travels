import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Waypoint } from 'react-waypoint';
import video1BG from "../../../media/sossusvlei-desert-lodge-namibia.mp4";
import video2BG from "../../../media/six-senses-laamu.mp4";
import video3BG from "../../../media/cipriani-1280x720.mp4";
import imgBG from "../../../media/img-bg-home/zambie-Chiawa-Camp-Safari-Canoe-Elephants.jpg";
import img1BG from "../../../media/img-bg-home/slider-1.jpg"
import img2BG from "../../../media/img-bg-home/slider-3.jpg"
import './Videos.css';

const VideosHomePage = () => {
    const [play, setPlay] = useState(false);
    const [imgUrl, setImgUrl] = useState([]);
    const [videoUrl, setVideoUrl] = useState([]);

    const videoURLs = [
        video1BG,
        video2BG,
        video3BG
    ]

    const imgURLs = [
        imgBG,
        img1BG,
        img2BG
    ]

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * videoURLs.length);
        const randomIndexImg = Math.floor(Math.random() * imgURLs.length);
        const videoURL = videoURLs[randomIndex];
        const imgURL = imgURLs[randomIndexImg];
        setVideoUrl([videoURL]);
        setImgUrl([imgURL]);
    }, [])
    

    const handleEnterViewport = () => {
        setPlay(true);
    }
    
    return ( 
        <>
        <Waypoint
        onEnter={handleEnterViewport}
        >
        <article>
            <div className="row m-0">
                <div className="col-md-12 p-0 slider-top">
                    <div className="col-md-12 p-0 bloc-video">
                        <ReactPlayer
                            url={videoUrl}
                            playing={play}
                            width='100%'
                            height='auto'
                            muted
                            loop
                            className="myVideo"
                        />
                    </div>
                    <img src={imgUrl} className="img-fluid img-bloc1 bg-mobile" />
                </div>
            </div>
        </article>
        </Waypoint>
        </>
    );
}
 
export default VideosHomePage;