'use client'
import { IconButton, Snackbar, CloseIcon } from "@mui/material"
import { useState } from "react"

export function Alert({ message }) {
    const [open, setOpen] = useState(true)

    const handleClose = (e, reason) => {
        if(reason === "clickaway") {
            return
        }
        setOpen(false)
    }

    console.log("Hey! It worked")

    return (
        <div>
            <Snackbar anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            variant="warning"
            ContentProps={{
                "aria-describedby": "message-id"
            }}
            message={message}
            action={[
                <IconButton key="close" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            ]}
            />
        </div>
    )
}