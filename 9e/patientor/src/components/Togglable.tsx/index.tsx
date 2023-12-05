import { useState, forwardRef, useImperativeHandle } from "react";
import { Collapse, Container } from "react-bootstrap";
import { Button } from "@mui/material";

interface TogglableProps {
  className?: string;
  openButtonLabel: string;
  closeButtonLabel?: string;
  children: JSX.Element[];
  isVisible?: boolean;
}

const Togglable = forwardRef(
  (
    { className, openButtonLabel, closeButtonLabel, children, isVisible }: TogglableProps,
    refs,
  ) => {
    const [visible, setVisible] = useState(isVisible || false);

    const [componentOnHide, componentOnShow] = children;

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <Container className={`${className} togglable-container`}>
        <Collapse in={visible}>
          <div id="example-collapse-text">
            {visible ? componentOnShow : componentOnHide}
          </div>
        </Collapse>
        { visible && closeButtonLabel !== "_nobutton" ?
          <Button
            onClick={toggleVisibility}
            aria-controls="example-collapse-text"
            aria-expanded={visible}
            variant="contained"
            color="primary"
          >
            {visible ? (closeButtonLabel ? closeButtonLabel : "Cancel") : openButtonLabel}
          </Button>:
          <></>
        }
        { !visible && openButtonLabel !== "_nobutton" ?
          <Button
            onClick={toggleVisibility}
            aria-controls="example-collapse-text"
            aria-expanded={visible}
            variant="contained"
            color="primary"
          >
            {openButtonLabel}
          </Button>
          : <></>}
      </Container>
    );
  },
);

Togglable.displayName = "Togglable";

export default Togglable;
