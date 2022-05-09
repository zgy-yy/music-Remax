import * as React from 'react';
import {useContext, useEffect, useMemo, useState} from 'react';
import {
    createSelectorQuery,
    getBackgroundAudioManager,
    Image,
    ScrollView,
    showToast,
    Swiper,
    SwiperItem,
    View
} from 'remax/wechat';
import styles from './index.scss';
import {DataContext} from "@/globalData";
import {Song} from "@/types/dataTypes";
import {usePageEvent} from "remax/macro";
import {debounce} from "@/util";


function formatSingers(arr: Array<any>): string {
    return arr.map((item, index) => {
        return item.name
    }).toString().replace(',', '|')
}

const audioContext = getBackgroundAudioManager();

const Index: React.FC = () => {
    const {curPlayList, setCurPlayList, curSongIndex, setCurSongIndex} = useContext(DataContext);
    const curSong = curPlayList?.tracks[curSongIndex]
    const swiperIndex = curSongIndex == -1 ? 0 : curSongIndex
    const [isPlaying, setIsPlaying] = useState<boolean>();

    //初始化
    usePageEvent("onShow", () => {
        if (curPlayList) {
            if (audioContext.paused) {
                setIsPlaying(false)
            } else {
                setIsPlaying(true)
            }
        }
    })


    const miniMusicList = useMemo(() => {

        audioContext. //监听事件
            onError(() => {
                console.log('error')
                showToast({title: '暂无链接', icon: 'none', duration: 1000}).then(() => {
                    nextMusic()
                })
            })
        const {onEnded, onNext, onPrev, onPlay, onCanplay, onPause} = audioContext
        //自然播放结束，进行下一曲
        onEnded(() => {
            nextMusic()
        })

        onNext(() => {
            nextMusic()
        })
        onPrev(() => {
            preMusic()
        })
        onCanplay(() => {
            console.log('onCanplay')
        })
        //播放事件
        onPlay(() => {
            console.log('onplay')
            setIsPlaying(true)
        })
        //暂停事件
        onPause(() => {
            console.log('onPause')
            setIsPlaying(false)
        })

        if (curPlayList) {
            const playListLength = curPlayList.tracks.length
            const nexSong = curPlayList.tracks[(curSongIndex + 1) % playListLength]
            //正在播放的歌曲一样
            if (curSong != undefined) {
                if (`https://music.163.com/song/media/outer/url?id=${curSong.id}.mp3` == audioContext.src) {
//点击正在播放的歌曲 ，什么也不做
                } else {
                    //当前播放音乐信息
                    audioContext.title = curSong.name
                    audioContext.epname = curSong.name//专辑名
                    audioContext.singer = formatSingers(curSong.ar)
                    audioContext.coverImgUrl = curSong.al.picUrl

                    audioContext.src = `https://music.163.com/song/media/outer/url?id=${curSong.id}.mp3`

                    // audioContext.play()
                }
            }

        }
        return curPlayList?.tracks
    }, [curSongIndex])


    function nextMusic() {
        if (curPlayList) {
            setCurSongIndex((curSongIndex + 1) % curPlayList?.tracks.length)
        }
    }

    function preMusic() {
        if (curPlayList) {
            const curPlayListLength = curPlayList.tracks.length
            // console.log((curSongIndex - 1) % curPlayList?.tracks.length)
            setCurSongIndex((curSongIndex + curPlayListLength - 1) % curPlayListLength)
        }
    }

    function getTextLength(str: string): number {
        const chinese = str.replace(/[^\u4E00-\u9FA5]/g, '');
        const english = str.replace(/[^a-zA-Z]/g, '')
        const legth = chinese.length + 1 + english.length / 1.5
        return legth * 32
    }

    return (
        <View className={styles.mainBody}
              style={{backgroundImage: `url(${miniMusicList?.[curSongIndex].al.picUrl})`}}>

            <View className={styles.main}>
                <View className={styles.coverBox}>
                    <Image mode={"widthFix"} className={styles.cover} src={curSong?.al.picUrl}></Image>
                </View>

                <Swiper className={styles.infoBox}
                        easingFunction="easeInOutCubic"
                        current={swiperIndex}
                        onChange={e => {
                            const index = e.detail.current
                            debounce(() => {
                                // console.log(Math.random())
                                setCurSongIndex(index)
                            }, 1000)()
                            // setCurSongIndex(index)
                        }}
                >
                    {
                        miniMusicList?.map(item => {
                            return <SwiperItem key={item.id}>
                                <View className={styles.swiperItem}>
                                    <View
                                        className={getTextLength(item.name + formatSingers(item.ar)) > 460 && item.id == curSong?.id ? styles.scrollInfo : styles.info}
                                        style={{width: `${getTextLength(item.name + formatSingers(item.ar))}px`}}
                                    >  {item.name} - {formatSingers(item.ar)}</View>
                                </View>

                            </SwiperItem>
                        })
                    }
                </Swiper>

                <View className={isPlaying ? "iconfont icon-zanting" : "iconfont icon-bofang"} onClick={() => {
                    if (isPlaying) {
                        audioContext.pause()
                    } else {
                        audioContext.play()
                    }
                }}></View>
                <View className="iconfont icon-bofanggedan" onClick={() => {

                }}></View>
            </View>
        </View>
    );
};

export default Index
