import React from 'react';
import { Link } from "react-router-dom";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { TRAVELS_API } from "../../config";
import "./SocialShare.css";

const SocialShare = ({ id }) => {
    return ( 
        <>
            <div className="col-md-12 text-center pb-2">
                <div className="social-media">
                    <h5>Partager</h5>
                    <div className="spcs-links">
                        <FacebookShareButton 
                        url={TRAVELS_API + "/" + id}
                        className="Demo__some-network__share-button me-1"
                        >
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <LinkedinShareButton
                        url={TRAVELS_API + "/" + id}
                        className="Demo__some-network__share-button me-1"
                        >
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                        <TwitterShareButton
                        url={TRAVELS_API + "/" + id}
                        className="Demo__some-network__share-button me-1"
                        title="Partagez cet article sur Twitter"
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <EmailShareButton
                        url={TRAVELS_API + "/" + id}
                        className="Demo__some-network__share-button"
                        >
                            <EmailIcon size={32} round />
                        </EmailShareButton>
                    </div>
                    <h3>
                        <Link to={{}}>Découvrez cet endroit magique sur Luxury Travel</Link>
                    </h3>
                </div>
            </div>
        </>
     );
}
 
export default SocialShare;