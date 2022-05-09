import * as React from 'react';
import {View, Text, Image, createSelectorQuery, ScrollView, showToast} from 'remax/wechat';
import {usePageEvent} from 'remax/macro';
import styles from './index.scss';
import CuNav from "@/components/CuNav";
import {useQuery} from "remax";
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {getPlaylistDetail, getPlaylistSongs} from "@/api";
import {Playlist, Song} from "@/types/dataTypes";
import {DataContext} from "@/globalData";
import SongItem from "@/components/SongItem";
import Loading from "@/components/Loading";
import Player from "@/components/Player";
import RecycleView, {Item} from "remax-recycle-view/lib/src";


let songsBuffer = new Array<Song>()

const Index: React.FC = () => {
    const query = useQuery();
    const playListId: number = query.id as unknown as number
    const context = useContext(DataContext);
    const {screenInfo, capsule, curPlayList, setCurPlayList, curSongIndex, setCurSongIndex} = context
    const MAIN_HIGHT = curPlayList ? context.capsule.CustomBar.bottom * 2 + 92 + 'px' : context.capsule.CustomBar.bottom * 2 + 'px'

    const [playlist, setPlaylist] = useState<Playlist>()
    const [songsList, setSongsList] = useState<Song[]>()
    const [renderSongsList, setRenderSongsList] = useState<Item[]>()
    const [bgImg, setBgImg] = useState<string | undefined>()
    const [isLoading, setIsLoading] = useState(true);


    usePageEvent("onLoad", () => {
        getPlaylistDetail(playListId).then(res => {
            const cdListDetail: Playlist = res.playlist
            setPlaylist(cdListDetail)
            setBgImg(cdListDetail.coverImgUrl)

            //根据歌单ID获取歌单里的歌曲
            getPlaylistSongs(cdListDetail.id).then(res => {
                // console.log('songs', res.songs)
                //将所有歌曲缓存
                songsBuffer = [...res.songs]
                setRenderSongsList(songsBuffer.map(item => {
                    return {height: 100, song: item}
                }))

                setSongsList(songsBuffer.slice(0, 30))
                //歌单详情默认只有10首歌，更新tracks  存的歌曲列表
                cdListDetail.tracks = songsBuffer
                setPlaylist(cdListDetail)
                setIsLoading(false)
                //根据播放歌曲位置滑动到当前播放歌曲处
                if (curPlayList?.id == cdListDetail.id) {
                    setShowTitle(true)
                    scrollToCurrentSong()
                }
            })
        })
    })

    const [showTitle, setShowTitle] = useState(false)
    const [openDisText, setOpenDisText] = useState(false)

    const [scrollHeight, setScrollHeight] = useState(screenInfo.height - capsule.CustomBar.bottom)


    function scrollToCurrentSong() {
        createSelectorQuery()
            .select('#scrollRef')
            .node()
            .exec((res) => {
                const scrollView = res[0].node;
                const midHeight = 120
                const scrollY = curSongIndex * (50) - midHeight
                scrollView.scrollTo({
                    top: scrollY > 0 ? scrollY > scrollHeight ? scrollHeight : scrollY : 0,
                    velocity: 0.1,
                    duration: 2,
                    animated: true
                })

            })
    }

    const limit = 30//每次显示30个
    function getMore() {
        setIsLoading(true)
        // const offset = songsList?.length as number / limit + 1
        setSongsList(songsBuffer.slice(0, songsList?.length as number + limit))
        setIsLoading(false)
    }

    return (
        <View className={styles.page}>
            <CuNav bgImg={bgImg}>
                <CuNav.Back>
                    {showTitle ? <View className={styles.animation}>
                        {playlist?.name}
                    </View> : ''}
                </CuNav.Back>
                <ScrollView
                    id={'scrollRef'}
                    scrollY={true}
                    enhanced={true}
                    onScrollToUpper={() => {
                        setShowTitle(false)
                    }}
                    onScroll={e => {
                        setScrollHeight(e.detail.scrollHeight)
                        setShowTitle(true)
                        // console.log(e.detail.scrollTop)
                        // console.log(e)
                    }}
                    onScrollToLower={() => {
                        getMore()
                    }}

                    upperThreshold={100}
                    scrollWithAnimation={true}
                    enableBackToTop={true}
                    scrollAnchoring={true}//更新不抖动
                    className={styles.main}
                    style={{
                        height: `calc(100vh - ${MAIN_HIGHT})`
                    }}>
                    <View className={styles.content}>
                        <View className={styles.name}>{playlist?.name}</View>
                        <Image mode={'widthFix'} className={styles.coverImg} src={playlist?.coverImgUrl}></Image>
                    </View>
                    <View className={styles.playlistBackground}>
                        <View className={styles.description}
                              style={openDisText ? {WebkitLineClamp: 100} : {}}
                              onClick={() => {
                                  setOpenDisText(!openDisText)
                              }}>
                            {playlist?.description}
                        </View>
                        <View className={styles.list}>
                            {
                                songsList?.map((item, index) => {
                                    return <View key={item.id} className={styles.song}
                                                 id={'a' + item.id.toString()}
                                                 style={curPlayList?.id == playlist?.id && curSongIndex == index ? {color: '#36ef61'} : {}}
                                    >
                                        <View style={{
                                            margin: "20px",
                                            width: '26px',
                                            color: '#6c6d6d',
                                            fontSize: "100%"
                                        }}>{index + 1}</View>
                                        <SongItem song={item} onPlay={() => {
                                            setCurSongIndex(index)
                                            setCurPlayList(playlist)
                                        }
                                        }></SongItem>
                                    </View>
                                })
                            }
                        </View>
                        <View style={{
                            transform: "translateY(-6px)"
                        }}>
                            {
                                isLoading ? <Loading></Loading> : ''
                            }
                        </View>
                    </View>
                </ScrollView>
            </CuNav>
            {
                <View className={styles.player}
                      style={curPlayList ? {display: "inherit"} : {display: 'none'}}>
                    <Player></Player>
                </View>
            }
        </View>
    );
};

export default Index
