function createStore(reducer) {
  const store = {};
  let state = undefined;
  let listenders = [];
  store.dispatch = function (action) {
    state = reducer(state, action);
    listenders.map((listener) => listener());
  };
  store.getState = function () {
    return state;
  };
  store.subscribe = function (func) {
    listenders.push(func);
  };
  return store;
}

const initState = 0;

function reducer(state = initState, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    default:
      return state;
  }
}

const store = createStore(reducer);
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: "add" });
store.dispatch({ type: "add" });
store.dispatch({ type: "add" });
