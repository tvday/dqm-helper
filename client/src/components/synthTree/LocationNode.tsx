import {LocationData} from "../../interfaces/location";
import {IconsAPI} from "../../utils/api";
import {AutoTextSize} from "auto-text-size";
import React from "react";
import {SharedNodeProps} from "./SynthTree";
import Icon from "../Icon";

interface LocationNodeProps {
    location: LocationData
    nodeProps: SharedNodeProps
}

const LocationNode = ({location}: LocationNodeProps) => {
    return (
        <div className='synth-node'>
            <div className='synth-node-body'>
                <div className="synth-node-locations">
                    <div className='fw-bold'>{location.name}</div>
                    <div className='fst-italic'>{location.subName}</div>
                </div>
                <div className='synth-node-title'>
                    {location.seasons.map(({name, imageSlug}, index) =>
                        <Icon iconSlug={imageSlug} key={index} name={name} displayName={false} iconSize={'1.5rem'}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocationNode;