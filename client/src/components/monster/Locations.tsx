import {LocationData} from "../../interfaces/location";
import Icon from "../Icon";
import {IconsAPI} from "../../utils/api";
import React from "react";
import {AccordionBody, AccordionHeader} from "../Accordion";

interface LocationProp {
    location: LocationData
}

const Location = ({location}: LocationProp) => {
    return (
        <div className='card' style={{maxWidth: '12rem'}}>
            <div className='card-body text-center'>
                <h5 className='card-title'>
                    {location.name}
                </h5>
                <h6 className='card-subtitle fst-italic'>
                    {location.subName ? location.subName : '\n'}
                </h6>
            </div>
            <div className='card-footer text-center'>
                {location.seasons.map(({name, imageSlug}, index) =>
                    <Icon iconSlug={imageSlug} key={index} name={name} displayName={false}/>
                )}
            </div>
        </div>
    );
};

interface LocationsProps {
    locations: LocationData[]
}

const Locations = ({locations}: LocationsProps) => {
    const id = 'LocationsPanel'
    return (
        <div className='accordion-item'>
            <AccordionHeader id={id}>
                <div className='h3'>Locations</div>
            </AccordionHeader>
            <AccordionBody id={id}>
                {locations
                    ? <div className='card-group'>
                        {locations.map((loc, index) =>
                            <Location location={loc} key={index}/>)}
                    </div>
                    : <div>Error Loading Locations...</div>
                }
            </AccordionBody>
        </div>
    );
};

export default Locations