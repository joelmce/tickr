'use client'
import { DeleteForever, WarningRounded } from "@mui/icons-material";
import { DialogActions, DialogContent, Divider, Modal, ModalDialog } from "@mui/joy";
import Button from "@mui/joy/Button";
import { DialogTitle } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CircularProgress } from "@mui/joy";
import { Alert } from "./Alert";

export function DeleteConfirmationButton({ name, dashboard_id }) {
    const [open, setOpen] = useState(false);
    const [loading, isLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async() => {
        isLoading(true)
        setOpen(false)
        const supabase = createClientComponentClient()
        const { error } = await supabase
            .from("Dashboards")
            .delete()
            .eq("dashboard_id", dashboard_id);
            if (error) console.log(error);
        isLoading(false)

        
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
                        <Button variant="solid" color="danger" onClick={handleDelete} disabled={loading ? true : false}>
                            {loading ? <CircularProgress/> : "Delete"}
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