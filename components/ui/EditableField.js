import { useEffect, useState } from "react";
import { ModeEdit } from "@mui/icons-material";
import { CircularProgress } from "@mui/joy";

export function EditableField({ value, name, classes, onSave }) {
    const [isEditable, setEditable] = useState(false)
    const [content, setContent] = useState(value)
    const [isLoading, setLoading] = useState(false)

    const handleEditClick = () => {
        setEditable(true)
    }

    const handleSave = (e) => {
        setContent(e.target.textContent)
        setEditable(false)
    }

    useEffect(() => {
        setLoading(true)
        onSave(name, content)
        setLoading(false)
    }, [content])

    return (
        <div className={`editable ${isEditable ? 'active' : ''} ${classes}`} onClick={handleEditClick} onBlur={handleSave} contentEditable={isEditable} suppressContentEditableWarning={true}>
            {content}
            {isLoading ? <CircularProgress/> : <ModeEdit/>}
        </div>
    )

}