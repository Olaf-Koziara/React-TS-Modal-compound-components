import React, { Component, createContext, SyntheticEvent } from "react";
import "./Modal.css";
const context = createContext({ toggle: (event: SyntheticEvent) => {} });
const { Provider, Consumer } = context;

interface IModalProps {
  isVisible: boolean;
  toggle: () => void;
}
export default class Modal extends Component<IModalProps> {
  public static Header: React.FC<{ title: string }>;
  public static Content: ({ children }: { children: string }) => JSX.Element;
  public static Footer: ({
    callToActionLabel,
  }: {
    callToActionLabel: string;
  }) => JSX.Element;
  handleToggle = (event: SyntheticEvent) => {
    event.preventDefault();

    if (event.target === event.currentTarget) {
      this.props.toggle();
    }
  };
  render() {
    return (
      <>
        {this.props.isVisible ? (
          <div className="modal" onClick={this.handleToggle}>
            <section className="modal__main">
              <Provider value={{ toggle: this.handleToggle }}>
                {this.props.children}
              </Provider>
            </section>
          </div>
        ) : null}
      </>
    );
  }
}
const Header: React.FC<{ title: string }> = ({ title }) => (
  <Consumer>
    {({ toggle }) => (
      <header className="modal__header">
        <span>{title}</span>
        <button onClick={toggle}>X</button>
      </header>
    )}
  </Consumer>
);
const Content = ({ children }: { children: string }) => (
  <div className="modal__content">{children}</div>
);
const Footer = ({ callToActionLabel }: { callToActionLabel: string }) => {
  return (
    <Consumer>
      {({ toggle }) => (
        <footer className="modal__footer">
          <button onClick={toggle}>Cancel</button>
          <button
            onClick={(event: SyntheticEvent) => {
              toggle(event);
              window.alert(callToActionLabel);
            }}
          >
            {callToActionLabel}
          </button>
        </footer>
      )}
    </Consumer>
  );
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;
