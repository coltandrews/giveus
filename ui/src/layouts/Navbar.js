import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "@mui/material";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import { getMe } from "../utility/api";
import { useNavigate } from "react-router-dom";
import { getToken, clearToken } from "../utility/utils";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [me, setMe] = useState();
  const [initial, setInitial] = useState();

  const navigate = useNavigate();

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

  useEffect(() => {
    const getMyData = async () => {
      if (getToken()) {
        const myData = await getMe();
        setMe(myData);
      }
    };
    getMyData();
  }, []);

  useEffect(() => {
    if (me) {
      const getInitial = () => {
        if (me.organizationName) {
          setInitial(me.organizationName.split("")[0].toUpperCase());
        } else if (me.firstname) {
          setInitial(me.firstname.split("")[0].toUpperCase());
        } else setInitial(null);
      };
      getInitial();
    }
  }, [me]);

  function Logout() {
    clearToken();
    navigate("/login");
    window.location.reload(false);
    
  }

  if (!getToken()) {
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <VolunteerActivismRoundedIcon
              fontSize="large"
              sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: "28px",
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link href="/" style={{ textDecoration: "none", color: "white" }}>
                GiveUs
              </Link>
            </Typography>
            <VolunteerActivismRoundedIcon
              fontSize="large"
              sx={{ display: { xs: "flex", md: "none" }, mr: 2 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="'/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link href="/" style={{ textDecoration: "none", color: "white" }}>
                GiveUs
              </Link>
            </Typography>

          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  if (getToken() && !me) {
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <VolunteerActivismRoundedIcon
              fontSize="large"
              sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: "28px",
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link href="/" style={{ textDecoration: "none", color: "white" }}>
                GiveUs
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  if (getToken() && me) {
    return (
      <AppBar position="static">
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <VolunteerActivismRoundedIcon
              fontSize="large"
              sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: "28px",
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link href="/home" style={{ textDecoration: "none", color: "white" }}>
                GiveUs
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
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
                {me.role === "auctioneer" ? (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link href="/event/new">
                        <Typography textAlign="center">
                          <ControlPointIcon fontSize="large" />
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link href={`/my/events/${me.id}`}>
                        <Typography textAlign="center">
                          <CalendarViewMonthIcon fontSize="large" />
                        </Typography>
                      </Link>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link href="/donation/new">
                        <Typography textAlign="center">
                          <ControlPointIcon fontSize="large" />
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link href={`/my/donations/${me.id}`}>
                        <Typography textAlign="center">
                          <CalendarViewMonthIcon fontSize="large" />
                        </Typography>
                      </Link>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
            <VolunteerActivismRoundedIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 2 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link href="/home" style={{ textDecoration: "none", color: "white" }}>
                GiveUs
              </Link>
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "right",
                marginRight: "15px",
                color: "white",
                mt: 0.5,
              }}
            >
              {me.role === "auctioneer" ? (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/event/new">
                      <Typography textAlign="center">
                        <ControlPointIcon
                          sx={{ color: "white" }}
                          fontSize="large"
                        />
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href={`/my/events/${me.id}`}>
                      <Typography textAlign="center">
                        <CalendarViewMonthIcon
                          sx={{ color: "white" }}
                          fontSize="large"
                        />
                      </Typography>
                    </Link>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/donation/new">
                      <Typography textAlign="center">
                        <ControlPointIcon
                          sx={{ color: "white" }}
                          fontSize="large"
                        />
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href={`/my/donations/${me.id}`}>
                      <Typography textAlign="center">
                        <CalendarViewMonthIcon
                          sx={{ color: "white" }}
                          fontSize="large"
                        />
                      </Typography>
                    </Link>
                  </MenuItem>
                </>
              )}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: "#DBD8AE", color: "#153243" }}>
                      {initial}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
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
                  <Link
                    href={"/profile/me"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: 700,
                          fontSize: 17,
                        }}
                        textAlign="center"
                      >
                        Profile
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link
                    href={"/settings"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: 700,
                          fontSize: 17,
                        }}
                        textAlign="center"
                      >
                        Settings
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link style={{ textDecoration: "none", color: "black" }}>
                    <MenuItem onClick={Logout}>
                      <Typography
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: 700,
                          fontSize: 17,
                        }}
                        textAlign="center"
                      >
                        Logout
                      </Typography>
                    </MenuItem>
                  </Link>
                </Menu>
              </>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
export default Navbar;
