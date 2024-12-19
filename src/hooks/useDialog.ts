import { useState } from "react";

const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return { isDialogOpen, openDialog, closeDialog };
};

export default useDialog;
