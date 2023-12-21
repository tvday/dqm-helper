import React from "react";
import {IconsAPI} from "../utils/api";

interface IconProps {
    iconURL?: string
    iconSlug?: string
    iconSize?: string
    name: string
    displayName: boolean
    className?: string
}

const Icon = ({iconURL, iconSlug, iconSize, name, displayName, className}: IconProps) => {
    return (
        displayName
            ? <span className={className}>
            <img src={iconURL ? iconURL : `${IconsAPI}/${iconSlug}`}
                 alt={`${name} icon`}
                 style={{display: '', height: iconSize ? iconSize : '1.5rem', width: iconSize ? iconSize : '1.5rem'}}/>
                {displayName && <span className='ms-1'>{name}</span>}
            </span>
            : <img src={iconURL ? iconURL : `${IconsAPI}/${iconSlug}`}
                   alt={`${name} icon`}
                   style={{display: '', height: iconSize ? iconSize : '1.5rem', width: iconSize ? iconSize : '1.5rem'}}/>
    );
};

export default Icon;