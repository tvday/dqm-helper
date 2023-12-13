import {SynthData} from "../../interfaces/synth";
import SynthNode from "../synth/SynthNode";
import {MonsterSimpleData} from "../../interfaces/monster";
import {AccordionBody, AccordionHeader} from "../Accordion";
import SynthTree from "../synth/SynthTree";

interface SynthsProps {
    // synths: SynthData[]
    monster: MonsterSimpleData
}

const Synths = ({monster}: SynthsProps) => {
    const id = 'SynthTreePanel'
    return (
        <div className='accordion-item'>
            <AccordionHeader id={id}>
                <div className='h3'>
                    Synth Tree
                </div>
            </AccordionHeader>
            <AccordionBody id={id}>
                {/*<SynthNode monster={monster}/>*/}
                <SynthTree/>
            </AccordionBody>
        </div>
    );
};

export default Synths;