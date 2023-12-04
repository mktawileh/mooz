const Styles = {
  wrapper: {
    "position": "absolute",
    "left": "0",
    "top": "0",
    "width": "100vw",
    "height": "100vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-wrap": "wrap",
    "background-color": "rgba(0, 0, 0, 0.3)",
    "overflow": "hidden"
  },
  get: (key: string) : string => {
    if (Styles.hasOwnProperty(key) && key !== 'get') {
      let res : string = "";
      for (let prop in Styles[key]) {
        res += prop + ":" + Styles[key][prop] + ";";
      }
      return res;
    } return "";
  }
};

export default Styles;
