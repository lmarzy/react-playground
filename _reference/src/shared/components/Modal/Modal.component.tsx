import * as React from 'react';
import { Icon } from '../Icon/Icon.component';
import * as styles from './styles.scss';

interface ModalProps {
  type: string;
  id: string;
  title: string;
  children: React.ReactNode;
  handleClose: () => void;
}

interface ModalState {
  lastActiveEl: any;
  focusableEls: any;
  firstFocusableEl: any;
  lastFocusableEl: any;
}

export class Modal extends React.Component<ModalProps, ModalState> {
  state = {
    lastActiveEl: null,
    focusableEls: null,
    firstFocusableEl: null,
    lastFocusableEl: null,
  } as ModalState;

  // @ts-ignore
  private modalWrapStyles = `${styles.modalWrap} ${styles[this.props.type]}`;
  private modalRef = React.createRef<HTMLDivElement>();
  private modalBodyClass = 'modal-open';

  handleKeyDown = (event: any): void => {
    const tabKey = 9;
    const escKey = 27;

    if (event.keyCode === tabKey) {
      if (this.state.focusableEls.length === 1) {
        event.preventDefault();
      }
      if (document.activeElement === this.state.lastFocusableEl) {
        event.preventDefault();
        this.state.firstFocusableEl.focus();
      }
    }

    if (event.keyCode === escKey) {
      this.props.handleClose();
    }
  };

  freezeVp = (event: any) => {
    event.preventDefault();
  };

  componentWillMount() {
    this.setState({
      lastActiveEl: document.activeElement,
    });
  }

  componentDidMount() {
    document.body.classList.add(this.modalBodyClass);

    this.state.focusableEls = Array.from(
      this.modalRef.current.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]',
      ),
    );
    this.state.firstFocusableEl = this.state.focusableEls[0];
    this.state.lastFocusableEl = this.state.focusableEls[this.state.focusableEls.length - 1];

    // @ts-ignore
    this.state.firstFocusableEl.focus();
    document.addEventListener('keydown', this.handleKeyDown);
    document.body.addEventListener('touchmove', this.freezeVp, { passive: false });
  }

  componentWillUnmount() {
    document.body.classList.remove(this.modalBodyClass);
    this.state.lastActiveEl.focus();
    document.removeEventListener('keydown', this.handleKeyDown);
    // @ts-ignore
    document.body.removeEventListener('touchmove', this.freezeVp, { passive: false });
  }

  render() {
    const { id, title, children, handleClose } = this.props;

    return (
      <div className={this.modalWrapStyles}>
        <section ref={this.modalRef} role="dialog" className={styles.modal} aria-labelledby={id}>
          <button type="button" className={styles.close} onClick={handleClose}>
            <span className="u-hidden-visually">Close Modal</span>
            <Icon name="cross" />
          </button>
          <h3 id={id} className={styles.title}>
            {title}
          </h3>
          {children}
        </section>
      </div>
    );
  }
}
