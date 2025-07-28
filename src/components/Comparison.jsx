import * as React from 'react';
import {
    Box,
    Drawer,
    Grid,
    Typography,
    List,
    Button,
    Divider,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ComparisonDrawer({
    handleClearComparison,
    comparisonItems,
    opencomparisonWindow,
    setopencomparisonWindow,
    handleIndividualComparisonRemove
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [state, setState] = React.useState({
        bottom: false,
    });

    // List of fields to show and compare
    const fieldsToCompare = [
        { key: 'price', label: 'Price' },
        { key: 'brand', label: 'Brand' },
        { key: 'Warrenty', label: 'Warranty' },
        { key: 'batteryLife', label: 'Battery Life' },
        { key: 'screenSize', label: 'Screen Size' },
        { key: 'CountryOfOrigin', label: 'Country of Origin' },
    ];

    // Compute the most common value for each field
    const getMostCommonFieldValues = (items, fields) => {
        const result = {};

        fields.forEach((field) => {
            const freqMap = {};
            items?.forEach((item) => {
                const value = item?.[field];
                if (value !== undefined && value !== null) {
                    freqMap[value] = (freqMap[value] || 0) + 1;
                }
            });

            const entries = Object.entries(freqMap);
            const mostCommonValue =
                entries.length > 0
                    ? entries.reduce((a, b) => (a[1] >= b[1] ? a : b))[0]
                    : null;

            result[field] = mostCommonValue;
        });

        return result;
    };

    const mostCommonValues = getMostCommonFieldValues(
        comparisonItems,
        fieldsToCompare.map((f) => f.key)
    );

    React.useEffect(() => {
        if (comparisonItems?.length === 1) {
            setState({ ...state, bottom: false });
        }
        if (comparisonItems?.length >= 2 && opencomparisonWindow) {
            setState({ ...state, bottom: true });
        }
    }, [comparisonItems, opencomparisonWindow]);

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setopencomparisonWindow(false);
        setState({ ...state, [anchor]: open });
    };

    const clearComparison = () => {
        handleClearComparison();
        localStorage.setItem('comparisonItems', [])
        setState({ ...state, bottom: false });
    }

    const renderDrawerContent = (anchor) => (
        <Box
            sx={{
                width: anchor === 'bottom' ? 'auto' : 250,
                height: 600,
                p: 0,
                display: 'flex',
                flexDirection: 'column',
            }}
            role="presentation"
        >
            {/* Fixed Header */}
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: theme.palette.background,
                    zIndex: 10,
                    px: 4,
                    py: 2,

                }}
            >
                <Grid
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 'bold',fontSize:`${isMobile&&'1.3rem'}` }}>
                        Comparison
                    </Typography>
                    <Button variant="outlined" sx={{ color: theme.palette.action.button,fontSize:`${isMobile&&'0.8rem'}` }} onClick={clearComparison}>
                        Clear comparison
                    </Button>
                </Grid>
            </Box>

            {/* Scrollable cards area */}
            <Box
                sx={{
                    overflowY: 'auto',
                    px: 4,
                    py: 2,
                    mt: 3,
                    flex: 1,
                }}
            >
                <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {comparisonItems?.map((item) => (
                        <Grid
                            key={item?._id}
                            size={{ lg: 3, md: 6, sm: 6, xs: 12 }}
                            sx={{
                                border: '1px solid #eee',
                                p: 3,
                                borderRadius: '8px',
                                flexDirection: 'column',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                position: 'relative',
                            }}
                        >
                            <CloseIcon
                                onClick={() => handleIndividualComparisonRemove(item?._id)}
                                sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    color: theme.palette.action.buttonHover,
                                    cursor: 'pointer',
                                }}
                            />
                            <img
                                src={item?.Image}
                                alt={item?.name}
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'contain',
                                    marginBottom: '12px',
                                }}
                            />
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    mb: 2,
                                }}
                            >
                                {item?.name}
                            </Typography>

                            {fieldsToCompare.map(({ key, label }) => (
                                <Grid
                                    container
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mt={1}
                                    key={key}
                                    sx={{
                                        backgroundColor:
                                            item?.[key] !== mostCommonValues[key] ? '#fff3cd' : 'transparent',
                                        borderRadius: '4px',
                                        px: 1,
                                        py: 0.5,
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: '600', mr: 1, color: `${item?.[key] !== mostCommonValues[key] && theme.palette.text.highlight}` }}
                                    >
                                        {label}:
                                    </Typography>
                                    <Typography variant="body2" sx={{ textAlign: 'right', color: `${item?.[key] !== mostCommonValues[key] && theme.palette.text.highlight}` }}>
                                        {item?.[key]}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );


    return (
        <div>
            {['bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {renderDrawerContent(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
