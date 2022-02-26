import React, { Component, cloneElement } from "react";
import cx from "classnames";

class CSSTranstion extends Component {
  state = {
    enter: false,
    enterActive: false,
    leave: false,
    leaveActive: false
  };

  componentDidMount() {
    this.props.children && this.handleEnter();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.in && this.props.in) {
      this.handleEnter();
    } else if (prevProps.in && !this.props.in) {
      this.handleLeave();
    }
  }

  timer = null;
  ref = React.createRef();

  forceRepaint = () => this.ref.current.scrollTop;

  handleEnter = () => {
    clearTimeout(this.timer);
    this.setState(
      {
        enter: true,
        enterActive: false,
        leave: false,
        leaveActive: false
      },
      this.handleEnterIng
    );
  };

  handleEnterIng = () => {
    this.forceRepaint();
    this.setState(
      {
        enterActive: true
      },
      this.handleEnterEnd
    );
  };

  handleEnterEnd = () => {
    this.props.onEntered();
    this.timer = setTimeout(
      () =>
        this.setState({
          enter: false,
          enterActive: false
        }),
      this.props.timeout
    );
  };

  handleLeave = () => {
    clearTimeout(this.timer);
    this.setState(
      {
        leave: true,
        enter: false,
        enterActive: false
      },
      this.handleLeavIng
    );
  };

  handleLeavIng = () =>
    this.setState(
      {
        leaveActive: true
      },
      this.handleLeaveEnd
    );

  handleLeaveEnd = () => {};

  render() {
    const { enter, enterActive, leave, leaveActive } = this.state;
    const {
      children,
      enterClassName,
      enterActiveClassName,
      leaveClassName,
      leaveActiveClassName
    } = this.props;

    return cloneElement(React.Children.only(children), {
      ref: this.ref,
      className: cx(children.props.className, {
        [enterClassName]: enter,
        [enterActiveClassName]: enterActive,
        [leaveClassName]: leave,
        [leaveActiveClassName]: leaveActive
      })
    });
  }
}

CSSTranstion.defaultProps = {
  timeout: 0,
  className: void 0,
  enterClassName: void 0,
  enterActiveClassName: void 0,
  leaveClassName: void 0,
  leaveActiveClassName: void 0,
  onEntered: () => {}
};

export default CSSTranstion;
