import React from "react";
import ReactDOM from "react-dom";
import AddLocation from "./AddLocation";
import { ColumnContainer } from "../../components";

const ChangeLocation: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  return (
    <ColumnContainer>
      <header>
        <h2>Change location</h2>
      </header>
      <AddLocation closeModal={closeModal} />
    </ColumnContainer>
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
