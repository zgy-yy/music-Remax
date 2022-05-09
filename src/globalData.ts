import {createContext, Dispatch, SetStateAction, useState} from "react";
import {Playlist} from "@/types/dataTypes";


export interface DataType {
    screenInfo:{height:number,width:number}
    capsule: {
        StatusBar: number,
        CustomBar: {
            bottom: number
            height: number
            left: number
            right: number
            top: number
            width: number
        }
    }
    curPlayList: Playlist | undefined,
    setCurPlayList: Dispatch<SetStateAction<Playlist | undefined>>
    curSongIndex: number,
    setCurSongIndex: Dispatch<SetStateAction<number>>
}

export const DataContext = createContext<DataType>(<DataType>{
    capsule: {StatusBar: 0, CustomBar: {}}
})