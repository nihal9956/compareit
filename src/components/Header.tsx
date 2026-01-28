import React, { useState } from 'react';
import {
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
import ClearIcon from '@mui/icons-material/Clear';

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
  const [searchValue, setSearchValue] = useState('');

  const open = Boolean(anchorEl);

  /* ------------------ Handlers ------------------ */
  const handleNavClick = (category: string) => {
    setCurrentCategory(category);
    setAnchorEl(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  /* ------------------ Desktop Navigation ------------------ */
  const renderDesktopNav = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {categories.map((category) => {
        const isActive = category.name === currentCategory;

        return (
          <Typography
            key={category.name}
            onClick={() => handleNavClick(category.name)}
            sx={{
              position: 'relative',
              cursor: 'pointer',
              fontWeight: isActive ? 600 : 400,
              pb: 0.5,

              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                height: isActive ? '3px' : '2px',
                width: isActive ? '100%' : '0%',
                backgroundColor: 'primary.main',
                borderRadius: '2px',
                transition: 'width 0.3s ease',
              },

              '&:hover::after': {
                width: '100%',
              },
            }}
          >
            {category.name}
          </Typography>
        );
      })}
    </Box>
  );

  /* ------------------ Mobile Navigation ------------------ */
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

  /* ------------------ Search Field ------------------ */
  const renderSearchField = () => (
    <TextField
      value={searchValue}
      onChange={handleSearchChange}
      fullWidth
      placeholder="Search products"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: searchValue && (
          <InputAdornment position="end">
            <IconButton onClick={handleClearSearch} size="small">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
        sx: { height: 40, borderRadius: 2 },
      }}
    />
  );

  return (
    <Box sx={{ px: 3, py: 2 }}>
      {/* Top Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'auto 1fr auto',
            md: '200px 1fr auto',
          },
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Logo */}
        <Box display="flex" alignItems="center" justifyContent="right" >
          <Box
            component="img"
            src={Logo}
            alt="logo"
            sx={{
              width: { xs: 100, sm: 120, md: 150 },
              height: { xs: 40, sm: 48, md: 'auto' },
              objectFit: 'contain',
              borderRadius: '18px',
            }}
          />
        </Box>

        {/* Desktop Search */}
        {!isMobileOrTablet && renderSearchField()}

        {/* Nav / Actions */}
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
      {isMobileOrTablet && <Box sx={{ mt: 2 }}>{renderSearchField()}</Box>}
    </Box>
  );
};

export default Header;
