import {request} from "remax/wechat";

type Method = "GET" | "POST"
const baseUrl = "http://zgy.ink:3001"

export default function http(url: string, method: Method = "GET", data = {}) {
    return request({
        url: baseUrl + url,
        method: method,
        data: data
    }).then(res => {
        return res.data
    })
}

//热门歌单分类
export function getPlaylistHotCat() {
    return http('/playlist/hot')
}

type Order = "new" | "hot"
type Cat = "华语" | "古风" | "流行" | "全部"

//调用此接口 , 可获取网友精选碟歌单
export function getPlaylist(isQuality = true, order: Order = "hot", cat: Cat = "全部", limit = 10, offset = 0) {
    return http(`/top/playlist${isQuality ? '/highquality' : ''}?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`)
}

//可获取推荐歌单
export function getRecommendPlaylist() {
    return http('/personalized').then(res => {
        console.log('re，每日推荐歌单', res)
        return {
            playlists: res.result
        }
    })
}

//获取歌单详情
export function getPlaylistDetail(id: number) {
    return http('/playlist/detail?id=' + id)
}

//获取歌单所有歌曲
export function getPlaylistSongs(playlistId: number, limit ?: number, offset ?: number) {
    return http(`/playlist/track/all?id=${playlistId}${limit ? `&limit=${limit}` : ''}${offset ? `&offset=${offset}` : ''}`)
}

export function getMusicPlay(...songIds: number[]) {
    return http('/song/url?id=' + songIds.toString())
}

/*
***************************************************************
*/
