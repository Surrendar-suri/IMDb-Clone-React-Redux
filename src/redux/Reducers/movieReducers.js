import { ActionTypes } from "../Actions/movieActions";

const initialState = {
    movieList: [],
    movieUpComingList: [],
    movieDetails: {},
    error: null,
};

export const movie = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_MOVIE_LIST:
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.GET_UPCOMING_MOVIE_LIST:
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.GET_MOVIE_DETAIL:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
