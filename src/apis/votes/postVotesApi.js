import axiosInstance from '../axiosInstance';

const postVotes = async (id) => {
  try {
    await axiosInstance.post(`/votes`, {
      idolId: `${id}`,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default postVotes;
