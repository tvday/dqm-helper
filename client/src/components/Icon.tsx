import {IconsURL} from "../utils/api";
import React from "react";

interface IconProps {
    iconURL: string
    name: string
}

const Icon = ({iconURL, name}: IconProps) => {
    return (
        <div>
            <img src={iconURL} alt={`${name} icon`}
                 className='mx-2'
                 style={{display: 'inline-block', height: '1.5rem'}}/>
            <span>{name}</span>
        </div>
    );
};

export default Icon;