import _controller from "app/controllers";

const controllerForInterface = platform =>
  Object.keys(_controller).reduce((acc, key) => {
    acc[key] = _controller[key](platform);
    return acc;
  }, {});

export default controllerForInterface;
