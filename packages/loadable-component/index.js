function loadable(promise) {
  return function () {
    const ref = React.createRef();
    React.useEffect(() => {
      promise().then((res) => {
        ReactDOM.render(res.default, ref.current);
      });
    }, []);
    return React.createElement("div", { ref });
  };
}

const OtherComponent = loadable(() => import("./page"));

const MyComponent = () => {
  return React.createElement("div", null, React.createElement(OtherComponent));
};

ReactDOM.render(
  React.createElement(MyComponent),
  document.getElementById("root")
);
