import React from "react";
import {IconsAPI} from "../utils/api";

interface IconProps {
    iconURL?: string
    iconSlug?: string
    name: string
    displayName: boolean
}
const Icon = ({iconURL, iconSlug, name, displayName}: IconProps) => {
    return (
        <span>
            <img src={iconURL ? iconURL : `${IconsAPI}/${iconSlug}`}
                 alt={`${name} icon`}
                 className='mx-1'
                 style={{display: 'inline-block', height: '1.5rem'}}/>
            {displayName && <span>{name}</span>}
        </span>
    );
};

export default Icon;