import { atom } from "recoil"

export const isLoadingState = atom({
    key:'isLoadingState',
    default: false,
})

export const sizeUpTextState = atom({
    key: 'sizeUpTextState',
    default: false,
})

export const jobsListState = atom({
    key:'jobListState',
    default: {
        processedJobs: [],
      },
})

export const detailJobState = atom({
    key:'detailJobState',
    default: {
        job: {},
    }
})

export const moreLoadState = atom({
    key:'moreLoad',
    default:1,
})

export const moreHasState = atom({
    key:'hasMore',
    default: true,
})

export const isActiveBookMarkState = atom({
    key:'onlyBookMarkItem',
    default:false,
})

export const bookMarkItem  = atom({
    key:'bookMark',
   default:[],
})
