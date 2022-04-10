import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './Videos.css';
import myVideo from "../../../media/essence-of-the-delta.mp4";
import { Waypoint } from 'react-waypoint';

const Videos = () => {
    const [play, setPlay] = useState(false);

    const handleEnterViewport = () => {
        setPlay(true);
    }
    
    return ( 
        <>
        <Waypoint
        onEnter={handleEnterViewport}
        >
        <div className="player-wrapper">
            <ReactPlayer 
            url={myVideo} 
            width="100%" 
            height="100%" 
            playing={play}
            muted
            className='player'
            controls
            />
        </div>
        </Waypoint>
        </>
    );
}
 
export default Videos;