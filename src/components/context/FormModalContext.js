import React, { createContext, useContext, useState } from "react";
import Modal from "./Modal";
import Form from "./Form";

const formModalContext = createContext({});

const FormModalContext = React.memo(({ children }) => {
  const [visible, setVisible] = useState(false);
  const [formIds, setFormIds] = useState({});

  const handleModal = (formIds) => {
    setVisible(!visible);

    if (formIds) {
      setFormIds(formIds);
    }
  };

  const modal = () => {
    return (
      <Modal visible={visible} handleClose={handleModal}>
        <Form handleModal={handleModal} {...formIds} />
      </Modal>
    );
  };

  return (
    <formModalContext.Provider
      value={{
        handleModal,
      }}
    >
      {children}
      {visible && modal()}
    </formModalContext.Provider>
  );
});

export const useFormModalContext = () => useContext(formModalContext);
export default FormModalContext;
