import { AppBar, IconButton, Toolbar } from "@mui/material";
import { ReactComponent as Logo } from '../logo.svg';

function Navbar() {
    return (
        <>
        <AppBar position="fixed" sx={{backgroundColor: '#ffffff'}}>
            <Toolbar>
                <IconButton
                        size="large"
                        edge="start"
                        aria-label="logo"
                        sx={{ mr: 1 }}
                >
                    <Logo width={50} height={50} />
                </IconButton>
            </Toolbar>
        </AppBar>
        </>
    );
}

export default Navbar;