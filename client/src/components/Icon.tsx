import React from "react";
import {IconsAPI} from "../utils/api";

interface IconProps {
    iconURL?: string
    iconSlug?: string
    name: string
    displayName: boolean
    className?: string
}
const Icon = ({iconURL, iconSlug, name, displayName, className}: IconProps) => {
    return (
        <span className={className}>
            <img src={iconURL ? iconURL : `${IconsAPI}/${iconSlug}`}
                 alt={`${name} icon`}
                 style={{display: 'inline-block', height: '1.5rem'}}/>
            {displayName && <span className='ms-1'>{name}</span>}
        </span>
    );
};

export default Icon;