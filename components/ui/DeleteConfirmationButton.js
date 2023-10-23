import { DeleteForever, WarningRounded } from "@mui/icons-material";
import { DialogActions, DialogContent, Divider, Modal, ModalDialog } from "@mui/joy";
import Button from "@mui/joy/Button";
import { DialogTitle } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export function DeleteConfirmationButton({ name, dashboard_id }) {
    const [open, setOpen] = useState(false);

    const handleDelete = async() => {
        setOpen(false)
        const supabase = createClientComponentClient()
        const { error } = await supabase
            .from("Dashboards")
            .delete()
            .eq("dashboard_id", dashboard_id);
            if (error) console.log(error);

            router.refresh();
    }

    return (
        <>
            <Button
            variant="outlined"
            color="danger"
            endDecorator={<DeleteForever/>}
            onClick={() => setOpen(true)}>
                Delete
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRounded/>
                        Confirmation
                    </DialogTitle>
                    <Divider/>
                    <DialogContent>
                        Are you sure you want to delete {name}?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </>
    )
}