import * as React from 'react';
import './app.css';
import {DataContext, DataType} from "@/globalData";
import {getSystemInfo, getMenuButtonBoundingClientRect, getSystemInfoSync, View} from "remax/wechat";
import {useMemo, useState} from "react";
import {Playlist} from "@/types/dataTypes";
import Player from "@/components/Player";

const App: React.FC = props => {
    const systemInfo = getSystemInfoSync()
    const sysCapsule = getMenuButtonBoundingClientRect();
    const StatusBar: number = systemInfo.statusBarHeight
    const [curPlayList, setCurPlayList] = useState<Playlist | undefined>()
    const [curSongIndex, setCurSongIndex] = useState<number>(-1)

    const data: DataType = {
        screenInfo: {height: systemInfo.screenHeight, width: systemInfo.screenWidth},
        capsule: {CustomBar: sysCapsule, StatusBar: StatusBar},
        curPlayList,
        setCurPlayList: setCurPlayList,
        curSongIndex,
        setCurSongIndex: setCurSongIndex
    }
    return (<DataContext.Provider value={data}>
        {props.children as Element}
    </DataContext.Provider>)
}

export default App;
