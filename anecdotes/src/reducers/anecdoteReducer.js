const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const voteTo = (id) => {
  return {
    type: "anecdotes/vote",
    data: { id },
  };
};

export const createNew = (anecdote) => {
  return {
    type: "anecdotes/new",
    data: {
      content: anecdote,
      id: getId(),
      votes: 0,
    },
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "anecdotes/vote": {
      return state
        .map((anc) => {
          if (anc.id === action.data.id) {
            return { ...anc, votes: anc.votes + 1 };
          } else {
            return { ...anc };
          }
        })
        .sort((a, b) => {
          return b.votes - a.votes;
        });
    }
    case "anecdotes/new": {
      const newState = state.map((anc) => {
        return { ...anc };
      });
      newState.push(action.data);
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
