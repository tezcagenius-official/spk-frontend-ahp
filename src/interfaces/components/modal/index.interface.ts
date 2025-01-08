import { ModalOwnProps } from "@mui/material";
import React from "react";

export interface IBaseModalProps {
  children: React.ReactNode;
  name: string;
  activeModal?: string | null;
  onClose: ModalOwnProps["onClose"];
}
