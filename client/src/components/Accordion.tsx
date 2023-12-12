import React, {PropsWithChildren} from "react";

interface AccordionProps {
    id: string
}

export const AccordionHeader = ({id, children}: PropsWithChildren<AccordionProps>) => {
    return (
        <div className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`}
                    aria-expanded="true" aria-controls={id}>
                {children}
            </button>
        </div>
    );
};

export const AccordionBody = ({id, children}: PropsWithChildren<AccordionProps>) => {
    return (
        <div id={id} className="accordion-collapse collapse show">
            <div className="accordion-body px-1">
                {children}
            </div>
        </div>
    );
};