import Button from "@mui/material/Button";

export default function SettingsPanel() {
    return (
        <div>
            <h1 className="mb-1">Account Settings</h1>
            <div className="flex flex-col">
                <Button variant="contained" className="m-1 w-max">Update Username</Button>
                <Button variant="contained" className="m-1 w-max">Update Password</Button>
                <Button variant="contained" className="m-1 w-max">Update Local Currency</Button>
            </div>
        </div>
    );
}
