const initialState = {
  records: [],
  posting: false,
  posted: false,
  fetching: false,
  fetched: false,
  erorr: null
}

const marker = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING_RECORDS':
      return{
        ...state,
        fetching: true,
        fetched: false,
      }
    case 'FETCHED_RECORDS_SUCCESS':
      return{
        ...state,
        records: action.records,
        fetching: false,
        fetched: true,
      }
    case 'FETCHED_RECORDS_ERROR':
      return{
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      }
    case 'POSTING_RECORD':
      return {
        ...state,
        posting: true,
        posted: false
      }
    case 'POSTED_RECORD_SUCCESS':
      return {
        ...state,
        records: [...state.records, action.record],
        posting: false,
        posted: true
      }
    case 'POSTED_RECORD_ERROR':
      return {
        ...state,
        posting: false,
        posted: false,
        error: action.error
      }
    default:
      return state
  }
}

export default marker;
