import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import video3BG from "../../../media/essence-of-the-delta.mp4";
import img1BG from "../../../media/img-bg-home/slider-1.jpg";
import img2BG from "../../../media/img-bg-home/slider-3.jpg";
import imgBG from "../../../media/img-bg-home/zambie-Chiawa-Camp-Safari-Canoe-Elephants.jpg";
import video2BG from "../../../media/six-senses-laamu.mp4";
import video1BG from "../../../media/sossusvlei-desert-lodge-namibia.mp4";
import './Videos.css';

const VideosHomePage = ({ display, handleSearch, paginatedTravels, scrollToView, search }) => {
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
                    <div className="search-bloc-2 text-center search-home">
                        <div className="form-group full-search position-relative">
                            <i className="fa fa-search position-absolute icon-search"></i>
                            <input
                                type="text"
                                onChange={handleSearch}
                                value={search}
                                className="input-search"
                            />
                        </div>
                        <Link to={{}} className="inspire-btn angle-down scrollButton" onClick={scrollToView}>
                            Faites vos valises
                        </Link>
                    </div>
                </div>
            </div>
            <div className="results-search">
            {display && paginatedTravels.map((travel) => (
                <Link key={travel.id} to={"/travel/" + travel.id} className="list-group-item">
                    {travel.title}
                </Link>
            ))}
            </div>
        </article>
        </Waypoint>
        </>
    );
}
 
export default VideosHomePage;