// AIzaSyDU9Djlm04TBLBOhdw3GzMsVHxdmGqxNzk

import attractions from "./attractions.json";

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import { FaMapMarkerAlt } from "react-icons/fa";

const markerStyle = {
    color: "red",
    fontSize: "30px"
}

// const AnyReactComponent = ({ text }) => <div><FaMapMarkerAlt onClick={console.log({text})}/>{text}</div>;
const AnyReactComponent = () => <div><FaMapMarkerAlt style={markerStyle}/></div>;

class SimpleMap extends Component {

    constructor(props) {

        super(props);

        this.initCities();

        this.state = {
            attractionsToShow: attractions,
            citiesToShow: [],
            showAtt: false,
            currentAttraction: null
        };


        this.filterByCity = this.filterByCity.bind(this);
        this.showAttractionDetails = this.showAttractionDetails.bind(this);
        this.hideAttractionDetails = this.hideAttractionDetails.bind(this);
    }

    removeValueFromArray(array, value) {
        const index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    }

    filterByCity(e) {
        const city = e.target.name;
        const isChecked = e.target.value;
        // console.log(e.target.name, e.target.value);

        if (this.state.citiesToShow.length === this.cities.length) {
            this.setState({
                citiesToShow: []
            });
        }
        
        if (isChecked && !this.state.citiesToShow.includes(city)) {
            let newCities = this.state.citiesToShow;
            newCities.push(city);
            this.setState({
                citiesToShow: newCities
            });
        } else if (!isChecked && this.state.citiesToShow.includes(city)) {
            let newCities = this.removeValueFromArray(this.state.citiesToShow, city);
            this.setState({
                citiesToShow: newCities
            });
        }

        let newAttractions = [];

        if (this.state.citiesToShow.length === 0) {
            this.setState({
                attractionsToShow: attractions
            })
        } else {
            attractions.forEach(attraction => {
                if (this.state.citiesToShow.includes(attraction.City)) {
                    newAttractions.push(attraction);
                }
            });
    
            this.setState({
                attractionsToShow: newAttractions
            });
        }

        console.log(this.state.citiesToShow);
    }

    initCities() {
        this.cities = [];
        attractions.forEach(attraction => {
            if (!this.cities.includes(attraction.City) && attraction.City !== "") {
                this.cities.push(attraction.City);
            }
        });
        this.cities.sort();
    }

    showAttractionDetails(attractionId) {
        // let currentAttraction = null;
        for (let i = 0; i < attractions.length; i++) {
            if (attractions[i].Id === attractionId) {
                this.setState({
                    currentAttraction: attractions[i]
                })
                break;
            }
        }
        this.setState({
            showAtt: true
        });
    }

    hideAttractionDetails() {
        this.setState({
            showAtt: false
        })
    }

    render() {
        let modal;
        if (this.state.showAtt && this.state.currentAttraction !== null) {
            modal = (
                <div
                    style={{
                        zIndex: 999,
                        position: "fixed",
                        top: "0",
                        left: "0",
                        height: "100vh",
                        width: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onClick={this.hideAttractionDetails}
                >
                    <div
                        style={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "#fff",
                            paddingRight: "10px",
                            paddingLeft: "10px",
                            borderRadius: "10px"
                        }}
                    >
                        <div style={{display: "flex", flexDirection:"row"}}>
                            <h2 onClick={this.hideAttractionDetails} style={{width: "10%", textAlign: "left"}}>X</h2>
                            <h2 style={{width: "90%", textAlign: "right"}}>{this.state.currentAttraction.Name}</h2>
                        </div>
                        <div style={{direction: "rtl"}}>
                            <div dangerouslySetInnerHTML={{__html: this.state.currentAttraction.FullDescription}}></div>
                            <hr/>
                            <p>שעות פתיחה:<br/>{this.state.currentAttraction.Opening_Hours}</p>
                            <div style={{display: "flex", flexDirection: "row"}} >
                                <div style={{width: "50%", textAlign: "right"}}>
                                    <p>עיר: {this.state.currentAttraction.City}</p>
                                    <p>יש חניה? {this.state.currentAttraction.Parking}</p>
                                    <p>מתאים לילדים? {this.state.currentAttraction.Suitable_for_Children}</p>
                                </div>
                                <div style={{width: "50%", textAlign: "right"}}>
                                    <p>כתובת: {this.state.currentAttraction.Address}</p>
                                    <p>נגיש לנכים? {this.state.currentAttraction.Accessibility}</p>
                                    <p>אתר: <a href={this.state.currentAttraction.URL}>{this.state.currentAttraction.URL}</a></p>
                                </div>
                            </div>
                        </div>
                        {/* <p>{this.state.currentAttraction.FullDescription}</p> */}
                    </div>
                </div>
            );
        } else {
            modal = (<></>);
        }
        return (
        // Important! Always set the container height explicitly
        <div style={{display: "flex", flexDirection:"row-reverse"}}>
            {modal}
            <div style={{width: "25%", padding: "20px", direction: "rtl", textAlign: "right"}}>
                <h2>סינונים</h2>
                <div>
                    <p>ערים:</p>
                    {/* <div style={{maxHeight: "150px", overflowX: "hidden", overflowY: "scroll"}}> */}
                    <div style={{maxHeight: "750px", overflowX: "hidden", overflowY: "scroll"}}>
                        {
                            this.cities.map(city => {
                                return (
                                    <div>
                                        <input key={city} name={city} type="checkbox" value={city} onChange={(e) => {this.filterByCity({
                                            target: {
                                                name:e.target.name,
                                                value: e.target.checked
                                            }
                                        })}}/>
                                        <label for={city}>{city}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div style={{ height: '100vh', width: '75%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDU9Djlm04TBLBOhdw3GzMsVHxdmGqxNzk" }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                onChildClick={this.showAttractionDetails}
                >
                    {
                        this.state.attractionsToShow.map((attraction) => {
                            return <AnyReactComponent
                                lng={attraction.X}
                                lat={attraction.Y}
                                text={attraction.Name}
                                key={attraction.Id}
                                // onChildClick={this.showAttractionDetails.bind(this, attraction)}
                            />
                        })
                    }
                {/* <AnyReactComponent
                    lat={32.014369}
                    lng={34.773842}
                    text="My Marker"
                /> */}
                </GoogleMapReact>
            </div>
        </div>
        );
    }
}

SimpleMap.defaultProps = {
    center: {
        lat: 32.014369,
        lng: 34.773842
    },
    zoom: 11
};

export default SimpleMap;