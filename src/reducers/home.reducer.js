const initialState = {
    tags: [],
    home: 'homehomehomehome'
};

export default function home(state = initialState, action) {
    switch (action.type) {
        case 'DEMO':
            return Object.assign({}, state, {tags: action.data});
        default:
            return state;
    }
}