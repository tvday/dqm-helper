import {LocationData} from "../../interfaces/location";
import Icon from "../Icon";
import {fetchSetData, IconsAPI} from "../../utils/api";
import React, {useEffect, useState} from "react";
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
    // locations: LocationData[]
    monsterSlug: string
}

const Locations = ({monsterSlug}: LocationsProps) => {
    const [locationData, setLocationData] = useState<LocationData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchSetData(`/monsters/${monsterSlug}/locations`, [], setLocationData, setLoading, setError)
    }, []);

    const id = 'LocationsPanel'
    return (
            <div className='accordion-item'>
                <AccordionHeader id={id}>
                    <div className='h3'>Locations</div>
                </AccordionHeader>
                <AccordionBody id={id}>
                    {locationData &&
                        <div className='card-group'>
                            {locationData.map((loc, index) =>
                                <Location location={loc} key={index}/>)}
                        </div>
                    }
                    {locationData && locationData.length === 0 &&
                        <div className='fst-italic'>This monster cannot be scouted.</div>
                    }
                    {loading &&
                        <div>Loading...</div>}
                    {error &&
                        <div>Error Loading Locations...</div>
                    }
                </AccordionBody>
            </div>
    );
};

export default Locations