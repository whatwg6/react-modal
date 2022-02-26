import { Component } from "react";
import cx from "classnames";

import Portal from "../Portal";
import CSSTranstion from "../CSSTranstion";

import styles from "./index.module.scss";

const instanceStack = [];
const TRANSTION_DURATION = 300;

class Modal extends Component {
  state = {
    in: false,
    show: false,
    maskTransparent: false,
    children: this.props.children
  };

  componentDidMount() {
    this.props.children && this.handleShow();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.children && this.props.children) {
      this.handleShow();
    } else if (prevProps.children && !this.props.children) {
      this.handleHide();
    }

    if (
      prevProps.children &&
      this.props.children &&
      prevProps.children !== this.props.children
    ) {
      this.setState({
        children: this.props.children
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  timer = null;

  setMask = () => {
    // if (instanceStack.length > 1) {
    //   instanceStack.slice(0, -1).forEach((instance) =>
    //     instance.setState({
    //       maskTransparent: true,
    //     })
    //   );
    // }
  };

  handleShow = () => {
    clearTimeout(this.timer);
    instanceStack.push(this);
    this.setMask();

    this.setState({
      show: true,
      in: true,
      children: this.props.children
    });
  };

  handleHide = () =>
    this.setState(
      {
        in: false
      },
      () =>
        (this.timer = setTimeout(
          () =>
            this.setState(
              {
                children: false,
                show: false
              },
              this.props.onAfterClose
            ),
          this.props.timeout
        ))
    );

  render() {
    const { show, children } = this.state;

    return (
      show && (
        <Portal rootNode={this.props.rootNode}>
          <div className={styles.modal}>
            <CSSTranstion
              in={this.state.in}
              timeout={this.props.timeout}
              enterClassName={this.props.maskEnterClassName}
              enterActiveClassName={this.props.maskEnterActiveClassName}
              leaveClassName={this.props.maskLeaveClassName}
              leaveActiveClassName={this.props.maskLeaveActiveClassName}
            >
              <div className={styles.modalMask} />
            </CSSTranstion>
            <CSSTranstion
              onEntered={this.props.onEntered}
              in={this.state.in}
              timeout={this.props.timeout}
              enterClassName={this.props.enterClassName}
              enterActiveClassName={this.props.enterActiveClassName}
              leaveClassName={this.props.leaveClassName}
              leaveActiveClassName={this.props.leaveActiveClassName}
            >
              <div
                className={cx(
                  styles.modalContent,
                  {
                    [styles.default]: this.props.useDefaultModalContentClassName
                  },
                  this.props.className
                )}
              >
                {children}
              </div>
            </CSSTranstion>
          </div>
        </Portal>
      )
    );
  }
}

Modal.defaultProps = {
  timeout: TRANSTION_DURATION,
  useDefaultModalContentClassName: true,
  className: styles.modalContent,
  enterClassName: styles.enter,
  enterActiveClassName: styles.enterActive,
  leaveClassName: styles.leave,
  leaveActiveClassName: styles.leaveActive,
  maskEnterClassName: styles.maskEnter,
  maskEnterActiveClassName: styles.maskEnterActive,
  maskLeaveClassName: styles.maskLeave,
  maskLeaveActiveClassName: styles.maskLeaveActive,
  onEntered: () => {}
};

export default Modal;
