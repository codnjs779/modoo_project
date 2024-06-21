import { useRecoilCallback } from "recoil";
import {  detailJobState  } from "../recoil/atoms";
import { fetchDetailJobData } from "../recoil/selector";

const useDetailJobList = () => useRecoilCallback(({ snapshot, set }) => async (options) => {
    try {
      const data = await snapshot.getPromise(fetchDetailJobData(options.id));
      set(detailJobState, (prevJobState) => ({
        ...prevJobState,
        job: data,
      }));
    } catch (error) {
      console.error('없는 공고입니다!', error);
    } 
  }, [detailJobState]);

export default useDetailJobList