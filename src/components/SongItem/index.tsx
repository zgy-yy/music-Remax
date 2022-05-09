import * as React from 'react';
import {View, Text, Image} from 'remax/wechat';
import styles from './index.scss';
import {Song} from "@/types/dataTypes";

const SongItem: React.FC<{ song: Song, onPlay?: () => void }> = (props) => {
    const {song,onPlay} = props
    return (
        <View className={styles.main} onClick={()=>{
            onPlay?.()
        }}>
            <View key={song.id} className={styles.song}>
                <View className={styles.songMsg}>
                    <Text className={styles.name}>
                        {song.name}
                    </Text>
                    <Text className={styles.singer}>
                        {song.ar.map((singer, index) => {
                            if (index == song.ar.length - 1) {
                                return singer.name
                            }
                            return singer.name + ' / '
                        })}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default SongItem
