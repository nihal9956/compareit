import React, { useEffect, useState } from 'react'
import { mockData } from '../MockData'
import Header from '../components/Header'
import ImgMediaCard from '../components/Card'
import { Grid, Typography } from '@mui/material'
import AnchorTemporaryDrawer from '../components/Comparison'

function Dashboard() {
    const [currentCategoryData, setCurrentCategoryData] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('Mobiles');
    const [comparisonItems, setcomparisonItems] = useState([]);
    const [opencomparisonWindow, setOpencomparisonWindow] = useState(false);
    let storedData = localStorage.getItem('comparisonItems');
    let parsedcomparisonItems = [];
    try {
        const storedData = localStorage.getItem('comparisonItems');
        parsedcomparisonItems = storedData ? JSON.parse(storedData) : [];
    } catch (e) {
        console.error('Invalid JSON in localStorage:', e);
        parsedcomparisonItems = [];
    }

    useEffect(() => {
        let dataSource = mockData || JSON.parse(storedData)
        let currentCategoryFilteredData = dataSource?.filter((data) => data.category === currentCategory);
        setCurrentCategoryData(currentCategoryFilteredData);
    }, [currentCategory]);

    useEffect(() => {
        let initialData = storedData ? JSON.parse(storedData) : [];
        setcomparisonItems(initialData);
    }, []);

    const handleClearcomparison = () => {
        setcomparisonItems([])
    }
    const handleIndividualcomparisonRemove = (itemId) => {
        let copyOfcomparisonItems = [...comparisonItems] || [...JSON.parse(storedData)]
        let indexOfItem = comparisonItems.findIndex((item) => item._id === itemId);
        copyOfcomparisonItems.splice(indexOfItem, 1);
        if (copyOfcomparisonItems.length < 2) {
            setcomparisonItems([]);
            setOpencomparisonWindow(false);
        }
        localStorage.removeItem('comparisonItems');
        localStorage.setItem('comparisonItems', JSON.stringify(copyOfcomparisonItems));
        setcomparisonItems(copyOfcomparisonItems);

    }

    return (
        <div>
            <Header
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                setCurrentCategoryData={setCurrentCategoryData}
            />
            <Grid container sx={{ px: 5,mt:2, width: '100%' }} spacing={3}>
                {
                    currentCategoryData?.map((data) => <Grid key={data?.name} size={{ lg: 3, md: 4, sm: 6, xs: 12 }}><ImgMediaCard cardData={data} comparisonItems={comparisonItems.length ? comparisonItems : parsedcomparisonItems} setcomparisonItems={setcomparisonItems} setOpencomparisonWindow={setOpencomparisonWindow} /></Grid>)
                }
                {
                    !currentCategoryData.length && <Typography variant='h4' sx={{m:'10rem auto',whiteSpace:'nowrap'}}>😔 No product found.</Typography>
                }
            </Grid>
            <AnchorTemporaryDrawer
                handleIndividualComparisonRemove={handleIndividualcomparisonRemove}
                handleClearComparison={handleClearcomparison}
                comparisonItems={comparisonItems.length ? comparisonItems : parsedcomparisonItems}
                setOpencomparisonWindow={setOpencomparisonWindow}
                opencomparisonWindow={opencomparisonWindow}

            />
        </div>
    )
}

export default Dashboard