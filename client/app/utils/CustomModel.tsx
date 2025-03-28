/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { Modal, Box } from "@mui/material";
type Props = {
  open: boolean;
  activeItem: any;
  setOpen: (open: boolean) => void;
  component: any;
  setRoute?: (route: string) => void;
};
const CustomModel: FC<Props> = ({
  open,
  setRoute,
  setOpen,
  component: Component,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] max-[500px]:w-60 bg-white dark:bg-slate-900 rouded-[8px] shadow p-4 outline-none ">
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  );
};

export default CustomModel;
