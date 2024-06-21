import { useRecoilCallback } from "recoil";
import { jobsListState,isLoadingState  } from "../recoil/atoms";
import { fetchJobData } from "../recoil/selector";

const useScrollJobList = () => useRecoilCallback(({ snapshot, set, reset }) => async (options) => {
    set(isLoadingState, true);
    try {
      const data = await snapshot.getPromise(fetchJobData({ nm: options.nm, row: options.row }));
      set(jobsListState, (prev) => ({
        ...prev,
        processedJobs: [...prev.processedJobs, ...data.processedJobs.filter(item => !prev.processedJobs.includes(item))],
        total: data.totalLength,
      }));
    } catch (error) {
      console.error('데이터를 가져오는 중 에러 발생:', error);
    } finally {
      reset(isLoadingState); 
    }
  }, [isLoadingState, jobsListState]);

export default useScrollJobList