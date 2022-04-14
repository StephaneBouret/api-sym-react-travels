import React from 'react';
import './SecondElementTravel.css';

const SecondElementTravel = ({ Img1, travel }) => {
    // html to string travel.hobbies
    function createMarkup() {
        return {__html: travel.hobbies};
    }
    
    return ( 
        <>
            <section id="secondElement" className="secondElement">
                <div className="container">
                    <div className="block-experiments">
                        <div className="row experiments mb-25">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <img src={Img1} className="img-fluid img-responsive " />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <div className="col-md-12 text-experiments">
                                    <h2>Les loisirs</h2>
                                    <div className="content-text-experiments">
                                        <div dangerouslySetInnerHTML={createMarkup()}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row experiments mb-25">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <div className="col-md-12 text-experiments description-left">
                                    <h2>La situation</h2>
                                    <div className="content-text-experiments">
                                    <p className="text-justify">
                                    {travel.situation}
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white col-sol">
                                <img src={Img1} className="img-fluid img-responsive " />
                            </div>
                        </div>
                        <div className="row experiments mb-25">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <img src={Img1} className="img-fluid img-responsive " />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 bg-white">
                                <div className="col-md-12 text-experiments">
                                    <h2>Autour du voyage</h2>
                                    <div className="content-text-experiments">
                                    <p className="text-justify">
                                    {travel.arroundTrip}
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default SecondElementTravel;