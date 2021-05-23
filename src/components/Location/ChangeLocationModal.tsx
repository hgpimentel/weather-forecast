import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import AddLocation from "./AddLocation";
import SelectLocation from "./SelectLocation";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  z-index: 100;
  background: white;
  width: 50%;
  max-height: 90vh;
  border-radius: 0.5rem;
  overflow: hidden;

  @media (max-width: 991.98px) {
    width: 75%;
  }

  @media (max-width: 767.98px) {
    width: 100%;
    font-size: 14px;
    height: 100vh;
  }

  & > * {
    padding: 0 4rem 2rem;
  }

  header {
    border-bottom: 2px solid teal;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;

    & > * {
      display: flex;
      align-items: center;
    }

    button {
      background-color: transparent;
      border: none;
      font-weight: bolder;
      cursor: pointer;
    }
  }

  h2 {
    margin: 1rem 0 0.5rem;
  }
`;

const CloseButton: React.FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  return (
    <div>
      <button onClick={onCloseModal}>X Close</button>
    </div>
  );
};

const ChangeLocation: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  return (
    <>
      <Backdrop>
        <Modal>
          <header>
            <h2>Change location</h2>
            <CloseButton onCloseModal={closeModal} />
          </header>
          <AddLocation closeModal={closeModal} />
          <SelectLocation closeModal={closeModal} />
        </Modal>
      </Backdrop>
    </>
  );
};

const ChangeLocationModal: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const modal = document.getElementById("modal-root");

  if (!modal) return null;

  return (
    <>
      {ReactDOM.createPortal(<ChangeLocation closeModal={closeModal} />, modal)}
    </>
  );
};

export default ChangeLocationModal;
