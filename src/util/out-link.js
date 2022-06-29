import {OpenInNew} from "@mui/icons-material";

import '../styles/link.css';
import {Tooltip} from "@mui/material";

export default function OutLink({
    href,
    children,
}) {
    return (
        <Tooltip title={ href } placement="right" arrow>
            <a href={ href } target="_blank" className="out-link">
                { children } <OpenInNew sx={{
                fontSize: '12px',
            }}/>
            </a>
        </Tooltip>
    );
}