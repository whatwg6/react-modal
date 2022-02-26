import Modal from "../Modal";

import styles from "./index.module.scss";

function Popup(props) {
  return <Modal {...props} useDefaultModalContentClassName={false} />;
}

Popup.defaultProps = {
  ...Modal.defaultProps,
  className: styles.content,
  enterClassName: styles.enter,
  enterActiveClassName: styles.enterActive,
  leaveClassName: styles.leave,
  leaveActiveClassName: styles.leaveActive,
  maskEnterClassName: styles.maskEnter,
  maskEnterActiveClassName: styles.maskEnterActive,
  maskLeaveClassName: styles.maskLeave,
  maskLeaveActiveClassName: styles.maskLeaveActive
};

export default Popup;
