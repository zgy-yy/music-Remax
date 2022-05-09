import * as React from 'react';
import {View, Text, Image, navigateTo} from 'remax/wechat';
import styles from './index.scss';
import {Playlist} from "@/types/dataTypes";


const PlayListCom: React.FC<{ playlist: Playlist }> = (props) => {
    const {playlist} = props

    function toPlaylistDetailPage(id: number) {
        navigateTo({
            url: '/pages/playlist_detail/index?id=' + id
        }).then()
    }

    return (
        <View className={styles.main} onClick={() => {
            // console.log(playlist)
            toPlaylistDetailPage(playlist.id)
        }}>
            <Image mode={'widthFix'} className={styles.cover}
                   src={playlist.picUrl}></Image>
            <View className={styles.listenNum}>{Math.floor(playlist.playCount / 10000)}万</View>
            <Text className={styles.title}>{playlist.name}</Text>
        </View>
    );
};

export default PlayListCom
