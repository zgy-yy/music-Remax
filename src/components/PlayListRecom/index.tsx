import * as React from 'react';
import {View, Text, Image, navigateTo} from 'remax/wechat';
import styles from './index.scss';
import {Playlist} from "@/types/dataTypes";
import PlaylistCom from "@/components/PlaylistCom";
import {usePageEvent} from "remax/macro";
import {getPlaylist} from "@/api";
import {useEffect, useState} from "react";


const Index: React.FC<{ name: string, resources: () => Promise<any> }> = (props) => {
    const {name, resources} = props
    // console.log('歌单', list)
    const [playlist, setPlaylist] = useState<Playlist[]>()
    useEffect(() => {
        resources().then(data => {
            // console.log('playlist', data)
            setPlaylist(data.playlists)
        })
    }, [])

    return (
        <View className={styles.main}>
            <View className={styles.title}>{name}</View>
            <View className={styles.list}>
                {
                    playlist?.map(item => {
                        return <View key={item.id} className={styles.playlistItem}>
                            <PlaylistCom playlist={item}></PlaylistCom>
                        </View>
                    })
                }
            </View>
        </View>
    );
};

export default Index
