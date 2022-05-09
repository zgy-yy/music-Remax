import * as React from 'react';
import {View, Text, Image, ScrollView, createSelectorQuery} from 'remax/wechat';
import styles from './index.scss';
import {useContext, useEffect, useState} from "react";
import {getDailyRecommendPlaylist, getHomePage, getPlaylist, getRecommendPlaylist} from "@/api";
import {DataContext} from "@/globalData";
import CuNav from '@/components/CuNav';
import PlayListRecom from "@/components/PlayListRecom";
import {Playlist} from "@/types/dataTypes";
import {usePageEvent} from "remax/macro";
import Loading from "@/components/Loading";
import Player from "@/components/Player";

const navBar = [
    {name: '推荐'},
    {name: '歌手'},
    {name: 'MV'}
]

const Index: React.FC = () => {
    const [curBarIndex, setCurBarIndex] = useState(0);
    const {curPlayList} = useContext(DataContext);

    return (
        <View className={styles.page}>
            <CuNav>
                <View className={styles.navTop}>
                    {navBar.map((barItem, index) => {
                        return <View key={index} className={curBarIndex == index ? styles.curBar : styles.item}>
                            {barItem.name}
                        </View>
                    })
                    }
                </View>
            </CuNav>
            <View className={styles.main}>
                {/*<PlayListRecom name={'e'} resources={getPlaylist}/>*/}
                <PlayListRecom name={'推荐歌单'} resources={getRecommendPlaylist}></PlayListRecom>
            </View>
            {
                <View className={styles.player}
                      // style={curPlayList ? {display: "inherit"} : {display: 'none'}}
                >
                    <Player></Player>
                </View>
            }
        </View>
    );
};

export default Index
