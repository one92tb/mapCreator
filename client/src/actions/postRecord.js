import axios from 'axios';

const postedRecord = (record) => ({
  type: 'POSTED_RECORD_SUCCESS',
  record
});

const postedError = (error) => ({
  type: 'POSTED_RECORD_ERROR',
  error
});

export const postRecord = (record) => (dispatch) => {
    console.log(record);
    dispatch({type: 'POSTING_RECORD'});
    axios.create({baseURL: 'http://localhost:8080'}).post('/markers', record)
      .then(res=> {
        console.log(res);
        dispatch(postedRecord(res.data));
      })
      .catch(error=>{
        dispatch(postedError(error));
      })
}
