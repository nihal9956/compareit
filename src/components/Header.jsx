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

import { categories, mockData } from '../MockData';
import Logo from '../../src/assets/logo.webp';
import LogoDark from '../../src/assets/logo-dark.webp';
import { useColorMode } from '../theme/ThemeContext';

function Header({ setCurrentCategoryData, currentCategory, setCurrentCategory }) {
    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
    const { toggleColorMode, mode } = useColorMode();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleNavClick = (selectedCategory) => {
        setCurrentCategory(selectedCategory);
        setAnchorEl(null);
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = mockData?.filter(
            (item) =>
                item.category === currentCategory &&
                item.name?.toLowerCase().includes(keyword)
        );
        setCurrentCategoryData(filtered);
    };

    const renderDesktopNav = () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {categories.map((category) => (
                <Typography
                    key={category.name}
                    onClick={() => handleNavClick(category.name)}
                    sx={{ cursor: 'pointer', fontWeight: 500 }}
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
                        const IconComponent = category.icon;
                        return (
                            <ListItem
                                button
                                key={category.name}
                                onClick={() => handleNavClick(category.name)}
                            >
                                {IconComponent && <IconComponent />}
                                <ListItemText primary={category.name} sx={{ ml: 1 }} />
                            </ListItem>
                        );
                    })}
                    <ListItem button onClick={toggleColorMode}>
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
            {/* Top row: Logo + Menu */}
            <Grid
                container
                display='flex'
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
            >
                <Grid item xs={6} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={mode === 'dark' ? LogoDark : Logo}
                            alt="logo"
                            style={{ width: '200px', objectFit: 'contain' }}
                        />
                    </Box>
                </Grid>
                {/* Search bar (inline) on large screens */}
                {!isMobileOrTablet && (
                    <Grid size={{ lg: 6 }} sx={{ mt: 2, px: 2 }}>
                        <TextField
                            onChange={handleSearch}
                            variant="outlined"
                            fullWidth
                            placeholder="Search products"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: 2,
                                    height: 40,

                                },
                            }}
                            sx={{
                                '& .MuiInputBase-input': { py: 1 },
                            }}
                        />
                    </Grid>
                )}
                <Grid
                    item
                    xs={6}
                    md={9}
                    sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                    {isMobileOrTablet ? renderMobileNav() : (
                        <>
                            {renderDesktopNav()}
                            <IconButton onClick={toggleColorMode} sx={{ ml: 2 }}>
                                {mode === 'dark' ? <BedtimeIcon /> : <SunnyIcon />}
                            </IconButton>
                        </>
                    )}
                </Grid>
            </Grid>

            {/* Bottom row: Search only on small/medium */}
            {isMobileOrTablet && (
                <Box sx={{ mt: 2,px:2 }}>
                    <TextField
                        onChange={handleSearch}
                        variant="outlined"
                        fullWidth
                        placeholder="Search products"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: 2,
                                height: 40,
                            },
                        }}
                        sx={{
                            '& .MuiInputBase-input': { py: 1 },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}

export default Header;
