import {createContext, Dispatch, SetStateAction, useState} from "react";
import {Playlist, PlaylistDetail} from "@/types/dataTypes";


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
    curPlayList: PlaylistDetail | undefined,
    setCurPlayList: Dispatch<SetStateAction<PlaylistDetail | undefined>>
    curSongIndex: number,
    setCurSongIndex: Dispatch<SetStateAction<number>>
}

export const DataContext = createContext<DataType>(<DataType>{
    capsule: {StatusBar: 0, CustomBar: {}}
})