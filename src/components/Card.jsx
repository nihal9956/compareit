import * as React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Grid,
    Tooltip,
    useTheme,
    Box,
} from '@mui/material';
import { ToastContainer, toast } from "react-toastify";

export default function ImgMediaCard({
    cardData,
    comparisonItems,
    setcomparisonItems,
    setOpencomparisonWindow,
}) {

    const theme = useTheme();

    const isSelected = comparisonItems?.some(item => item._id === cardData._id);

    React.useEffect(() => {
        if (comparisonItems?.length) {
            try {
                const storedData = localStorage.getItem('comparisonItems');
                const existingItems = storedData ? JSON.parse(storedData) : [];

                // Combine and remove duplicates by _id
                const combined = [...existingItems, ...comparisonItems];
                const uniqueItems = Array.from(
                    new Map(combined.map(item => [item._id, item])).values()
                );

                localStorage.setItem('comparisonItems', JSON.stringify(uniqueItems));
            } catch (e) {
                console.error('Failed to save to localStorage:', e);
            }
        }
    }, [comparisonItems]);


    const handleComparison = (cardData, buttonText) => {
        if (buttonText === 'See comparison') {
            setOpencomparisonWindow(true);
        } else {
            if (comparisonItems?.length === 3) {
                notify();
            }
            setcomparisonItems(prev => {
                const exists = prev.some(p => p._id === cardData._id);
                return exists || comparisonItems?.length === 3 ? prev : [...prev, cardData];
            });
        }
    };

    const renderButtonText = currentCardData => {
        let isInList = comparisonItems?.some(item => item._id === currentCardData?._id);
        if (comparisonItems?.length >= 2 && isInList) return 'See comparison';
        else if (comparisonItems?.length === 1 && isInList) return 'Added';
        else return 'Add to comparison';
    };

    const notify = () => toast.error("Only up to 3 products can be compared.");

    return (
        <Box
            role="group"
            tabIndex={0}
            aria-label={`Product card: ${cardData?.name}`}
            sx={{
                outline: 'none',
                '&:focus': {
                    boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
                    borderRadius: '1rem',
                },
            }}
        >
            <Card
                sx={{
                    width: '100%',
                    backgroundColor: isSelected
                        ? theme.palette.action.selected
                        : theme.palette.background.paper,
                    border: isSelected
                        ? `2px solid ${theme.palette.primary.main}`
                        : `1px solid ${theme.palette.divider}`,
                    borderRadius: '1rem',
                }}
            >
                <ToastContainer />
                <img
                    src={cardData?.Image}
                    alt={cardData?.name}
                    style={{
                        width: '250px',
                        height: '250px',
                        objectFit: 'contain',
                        display: 'block',
                        margin: '1rem auto',

                    }}
                />
                <CardContent>
                    <Tooltip title={cardData?.name.length > 50 ? cardData?.name : ''}>
                        <Typography
                            tabIndex={0}
                            aria-label={`Product name: ${cardData?.name}`}
                            sx={{ cursor: 'pointer' }}
                            gutterBottom
                            variant="h6"
                            color="text.primary"
                        >
                            {cardData?.name.length > 50
                                ? cardData?.name.substring(0, 40) + '...'
                                : cardData?.name}
                        </Typography>
                    </Tooltip>


                    <Grid
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}
                    >
                        <Typography variant="body2" color="text.primary" fontWeight={600}>
                            Price:
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            {cardData?.price}
                        </Typography>
                    </Grid>

                    <Grid
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: 1,
                        }}
                    >
                        <Typography variant="body2" color="text.primary" fontWeight={600}>
                            Brand:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {cardData?.brand}
                        </Typography>
                    </Grid>

                    <Grid
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: 1,
                        }}
                    >
                        <Typography variant="body2" color="text.primary" fontWeight={600}>
                            Warranty:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {cardData?.Warrenty}
                        </Typography>
                    </Grid>
                </CardContent>

                <CardActions
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        size="small"
                        aria-pressed={isSelected}
                        aria-label={
                            isSelected
                                ? 'Remove from comparison'
                                : 'Add product to comparison list'
                        }
                        sx={{
                            m: 2,
                            px: 2,
                            backgroundColor: theme.palette.action.button,
                            color: theme.palette.primary.contrastText,
                            '&:hover': {
                                backgroundColor: theme.palette.action.buttonHover,
                            },
                        }}
                        variant="contained"
                        onClick={() => handleComparison(cardData, renderButtonText(cardData))}
                    >
                        {renderButtonText(cardData)}
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
