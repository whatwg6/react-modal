import { Component } from "react";
import ReactDOM from "react-dom";

class Portal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.rootNode = props.rootNode || document.body;
    this.rootNode.appendChild(this.el);
  }

  componentWillUnmount() {
    this.rootNode.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Portal;
