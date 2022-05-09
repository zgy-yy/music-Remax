export interface Creator {
    accountStatus: number
    anchor: boolean
    authStatus: number
    authenticationTypes: number
    authority: number
    avatarDetail: {
        identityIconUrl: string
        identityLevel: number
        userType: number
    }
    avatarImgId: number
    avatarImgIdStr: string
    avatarImgId_str: string
    avatarUrl: string
    backgroundImgId: number
    backgroundImgIdStr: string
    backgroundUrl: string
    birthday: number
    city: number
    defaultAvatar: boolean
    description: string
    detailDescription: string
    djStatus: number
    expertTags: string[]
    experts: {}
    followed: boolean
    gender: number
    mutual: boolean
    nickname: string
    province: number
    remarkName: string
    signature: string
    userId: number
    userType: number
    vipType: number
}

export interface Song {
    a?: null
    al: {
        id: number,
        name: string,//歌名
        pic: number,
        picUrl: string,//
        pic_str: string,
        tns: string[]
    },
    alia: string[]
    ar: Array<{ alias: string[], id: number, name: string, tns: string[] }>
    cd: string
    cf: string
    copyright: number
    cp: number
    crbt?: null
    djId: number
    dt: number
    entertainmentTags?: null
    fee: number
    ftype: number
    h: { br: number, fid: number, size: number, vd: number, sr: number }
    hr?: null
    id: number
    l: { br: number, fid: number, size: number, vd: number, sr: number }
    m: { br: number, fid: number, size: number, vd: number, sr: number }
    mark: number
    mst: number
    mv: number
    name: string
    no: number
    noCopyrightRcmd?: null
    originCoverType: number
    originSongSimpleData: {
        albumMeta: { id: number, name: string }
        artists: { id: number, name: string }[],
        name: string
        songId: number
    }
    pop: number
    pst: number
    publishTime: number
    resourceState: boolean
    rt: number
    rtUrl: number
    rtUrls?: []
    rtype: number
    rurl?: null
    s_id: number
    single: number
    songJumpInfo?: null
    sq: { br: number, fid: number, size: number, vd: number, sr: number }
    st: number
    t: number
    tagPicList?: null
    tens?: string[]
    v: number
    version: number
}

export interface Playlist {
    alg: string
    canDislike: boolean
    copywriter: string
    highQuality: boolean
    id: number
    name: string
    picUrl: string
    playCount: number
    trackCount: number
    trackNumberUpdateTime: number
    type: number
}

//歌单详细
export interface PlaylistDetail {
    adType: number
    alg: string
    anonimous: boolean
    cloudTrackCount: number
    commentCount: number
    commentThreadId: string
    coverImgId: number
    coverImgId_str: string
    coverImgUrl: string
    coverStatus: number
    createTime: number
    creator: Creator
    description: string
    englishTitle: string//
    highQuality: boolean//高质量
    id: number
    name: string//歌单名
    newImported: boolean
    officialPlaylistType?: null
    opRecommend: boolean
    ordered: boolean
    playCount: number
    privacy: number
    remixVideo?: null
    shareCount: number
    specialType: number
    status: number
    subscribedCount: number
    subscribers: Creator[]
    tags: string[]
    titleImage: number
    titleImageUrl: string

    recommendInfo?: null
    tag: string
    totalDuration: number
    trackCount: number
    trackNumberUpdateTime: number
    trackUpdateTime: number
    updateTime: number
    userId: number
    //
    backgroundCoverId: number
    backgroundCoverUrl: string
    historySharedUsers?: null
    sharedUsers?: null
    subscribed?: null
    trackIds: Array<{
        alg: string,
        at: number,
        id: number,
        rcmdReason: string,
        sc: string,
        t: number,
        uid: number,
        v: number
    }>
    tracks: Song[]
    updateFrequency: null
    videoIds: null
    videos: null
}

//****************************

//
interface Playlist_back {
    adType: number
    alg: string
    anonimous: boolean
    cloudTrackCount: number
    commentCount: number
    commentThreadId: string
    coverImgId: number
    coverImgId_str: string
    coverImgUrl: string
    coverStatus: number
    createTime: number
    creator: Creator
    description: string
    highQuality: boolean
    id: number
    name: string
    newImported: boolean
    ordered: boolean
    playCount: number
    privacy: number
    recommendInfo?: null
    shareCount: number
    specialType: number
    status: number
    subscribed: null
    subscribedCount: number
    subscribers: Creator[]
    tag: string
    tags: string[]
    totalDuration: number
    trackCount: number
    trackNumberUpdateTime: number
    trackUpdateTime: number
    tracks?: null
    updateTime: number
    userId: number
}