import React, { useState } from 'react';
import {
  Grid,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import SunnyIcon from '@mui/icons-material/Sunny';
import SearchIcon from '@mui/icons-material/Search';

import Logo from '../assets/logo.png';
import { useColorMode } from '../theme/ThemeContext';
import { categories } from '../data/categories';

interface HeaderProps {
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  onSearch: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  currentCategory,
  setCurrentCategory,
  onSearch,
}) => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleColorMode, mode } = useColorMode();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleNavClick = (category: string) => {
    setCurrentCategory(category);
    setAnchorEl(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const renderDesktopNav = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {categories.map((category) => (
        <Typography
          key={category.name}
          onClick={() => handleNavClick(category.name)}
          sx={{
            cursor: 'pointer',
            fontWeight: category.name === currentCategory ? 600 : 400,
          }}
        >
          {category.name}
        </Typography>
      ))}
    </Box>
  );

  const renderMobileNav = () => (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MenuIcon />
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <List sx={{ minWidth: 200 }}>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <ListItem
                key={category.name}
                onClick={() => handleNavClick(category.name)}
                sx={{ cursor: 'pointer' }}
              >
                {Icon && <Icon />}
                <ListItemText primary={category.name} sx={{ ml: 1 }} />
              </ListItem>
            );
          })}

          <ListItem onClick={toggleColorMode} sx={{ cursor: 'pointer' }}>
            <ListItemText>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {mode === 'light' ? (
                  <>
                    <BedtimeIcon sx={{ mr: 1 }} /> Dark Mode
                  </>
                ) : (
                  <>
                    <SunnyIcon sx={{ mr: 1 }} /> Light Mode
                  </>
                )}
              </Box>
            </ListItemText>
          </ListItem>
        </List>
      </Popover>
    </>
  );
return (
  <Box sx={{ px: 3, py: 2 }}>
    {/* Top row */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr auto',
          md: '200px 1fr auto',
        },
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* Logo */}
      <Box display={'flex'} alignItems={'center'} justifyContent={'right'}>
        <img
          src={Logo}
          alt="logo"
          style={{ width: '150px', objectFit: 'contain',borderRadius:'18px' }}
        />
      </Box>

      {/* Desktop Search */}
      {!isMobileOrTablet && (
        <TextField
          onChange={handleSearch}
          fullWidth
          placeholder="Search products"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { height: 40, borderRadius: 2 },
          }}
        />
      )}

      {/* Nav / Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {isMobileOrTablet ? (
          renderMobileNav()
        ) : (
          <>
            {renderDesktopNav()}
            <IconButton onClick={toggleColorMode} sx={{ ml: 2 }}>
              {mode === 'dark' ? <BedtimeIcon /> : <SunnyIcon />}
            </IconButton>
          </>
        )}
      </Box>
    </Box>

    {/* Mobile Search */}
    {isMobileOrTablet && (
      <Box sx={{ mt: 2 }}>
        <TextField
          onChange={handleSearch}
          fullWidth
          placeholder="Search products"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { height: 40, borderRadius: 2 },
          }}
        />
      </Box>
    )}
  </Box>
);

};

export default Header;
