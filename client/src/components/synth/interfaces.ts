import {AddChildrenFunction, RawNodeDatum, TreeNodeDatum} from "react-d3-tree";
import {MonsterSimpleData} from "../../interfaces/monster";
import {MouseEventHandler} from "react";

export interface SynthNodeContent {
    synthCombo?: boolean
    location?: boolean
    monster?: MonsterSimpleData
    family?: { name: string, imageSlug: string }
    rank?: string
}

export interface SynthNodeDatum extends RawNodeDatum {
    content: SynthNodeContent
    children?: SynthNodeDatum[]
}

export interface SynthTreeNodeDatum extends TreeNodeDatum {
    content: SynthNodeContent
    children?: SynthTreeNodeDatum[]
}

export interface NodeDimensionProps {
    width: number
    height: number
// for translation
    x: number
// for translation
    y: number
}

export interface SharedNodeProps {
    collapsed: boolean
    leafNode: boolean
    children: SynthTreeNodeDatum[]
    toggleNode: () => void
    addChildren: AddChildrenFunction
}
