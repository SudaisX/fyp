import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { FormControl, InputLabel, Select } from "@mui/material";
import LanguageContext from "../context";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "Categories", "Phrases"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [language, setLanguage] = React.useState("english");
  const { token, logout, user } = useAuth();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const languageContext = React.useContext(LanguageContext);

  const handleLanguageChange = (event) => {
    languageContext.setLanguage(event.target.value);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar sx={{ backgroundColor: "white", color: "black" }} position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant='h6'
            noWrap
            component='a'
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            <span>Assistive</span> <span style={{ color: "green" }}>X</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='black'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem key={"categories"} onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>Categories</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            Assistive X
          </Typography>
          {token && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {/* {pages.map((page) => (
                  <Button href={`/${page}`} key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: "black", display: "block" }}>
                    {page}
                  </Button>
                ))} */}
                <Button onClick={() => navigate("/")} sx={{ my: 2, color: "black", display: "block" }}>
                  Home
                </Button>
                <Button onClick={() => navigate("/categories")} sx={{ my: 2, color: "black", display: "block" }}>
                  Categories
                </Button>
              </Box>

              <FormControl sx={{ marginRight: "20px" }}>
                <InputLabel id='language-select-label'>Language</InputLabel>
                <Select
                  sx={{ padding: 0 }}
                  labelId='language-select-label'
                  id='language-select'
                  value={languageContext.language}
                  label='Language'
                  onChange={handleLanguageChange}
                >
                  <MenuItem value='english'>English</MenuItem>
                  <MenuItem value='urdu-roman'>Urdu (Roman)</MenuItem>
                  <MenuItem value='urdu'>Urdu</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt='Remy Sharp' src={user ? user.avatar : "X"} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  ))} */}
                  <MenuItem onClick={() => navigate("/profile")}>
                    <Typography textAlign='center'>Profile</Typography>
                  </MenuItem>

                  <MenuItem onClick={() => logout()}>
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
