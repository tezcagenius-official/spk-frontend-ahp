import { IBaseModalProps } from "@/interfaces/components/modal/index.interface";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";

const BaseModal: React.FC<IBaseModalProps> = ({
  name,
  activeModal,
  children,
  onClose,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(name === activeModal);
  }, [activeModal]);

  return (
    <Modal
      className="rounded-md"
      open={open}
      onClose={onClose}
      aria-labelledby={name}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <Fade in={open}>
        <Box
          className="rounded-xl"
          sx={[
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            },
          ]}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default BaseModal;
