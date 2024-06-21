import axios from 'axios';
import { makeNewJobs } from '../makeNewJobs';

const url = process.env.REACT_APP_BASE_URL;

export const axiosData = async ({ nm, row }) => {
  try {
        const res = await axios.get(url, {
            params: {
                page: nm,
                limit: row,
            },
        });
        const processedData = makeNewJobs(res);
        return processedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export const detailJobAxiosData = async(id) => {
    try {
        const res = await axios.get(url+'/'+id);
        const detailJob = res
        return detailJob
    } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
    }
}

