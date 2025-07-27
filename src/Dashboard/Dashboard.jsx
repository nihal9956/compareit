import React, { useEffect, useState } from 'react'
import { mockData } from '../MockData'
import Header from '../components/Header'
import ImgMediaCard from '../components/Card'
import { Grid, Typography } from '@mui/material'
import AnchorTemporaryDrawer from '../components/Comparision'

function Dashboard() {
    const [currentCategoryData, setCurrentCategoryData] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('Mobiles');
    const [comparisionItems, setComparisionItems] = useState([]);
    const [openComparisionWindow, setOpenComparisionWindow] = useState(false);
    let storedData = localStorage.getItem('comparisionItems');
    let parsedComparisionItems = [];
    try {
        const storedData = localStorage.getItem('comparisionItems');
        parsedComparisionItems = storedData ? JSON.parse(storedData) : [];
    } catch (e) {
        console.error('Invalid JSON in localStorage:', e);
        parsedComparisionItems = [];
    }

    useEffect(() => {
        let dataSource = mockData || JSON.parse(storedData)
        let currentCategoryFilteredData = dataSource?.filter((data) => data.category === currentCategory);
        setCurrentCategoryData(currentCategoryFilteredData);
    }, [currentCategory]);

    useEffect(() => {
        let initialData = storedData ? JSON.parse(storedData) : [];
        setComparisionItems(initialData);
    }, []);

    const handleClearComparision = () => {
        setComparisionItems([]);
    }
    const handleIndividualComparisionRemove = (itemId) => {
        let copyOfComparisionItems = [...comparisionItems] || [...JSON.parse(storedData)]
        let indexOfItem = comparisionItems.findIndex((item) => item._id === itemId);
        copyOfComparisionItems.splice(indexOfItem, 1);
        if (copyOfComparisionItems.length < 2) {
            setComparisionItems([]);
            setOpenComparisionWindow(false);
        }
        localStorage.removeItem('comparisionItems');
        localStorage.setItem('comparisionItems', JSON.stringify(copyOfComparisionItems));
        setComparisionItems(copyOfComparisionItems);

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
                    currentCategoryData?.map((data) => <Grid key={data?.name} size={{ lg: 3, md: 4, sm: 6, xs: 12 }}><ImgMediaCard cardData={data} comparisionItems={comparisionItems.length ? comparisionItems : parsedComparisionItems} setComparisionItems={setComparisionItems} setOpenComparisionWindow={setOpenComparisionWindow} /></Grid>)
                }
                {
                    !currentCategoryData.length && <Typography variant='h4' sx={{m:'10rem auto',whiteSpace:'nowrap'}}>😔 No product found.</Typography>
                }
            </Grid>
            <AnchorTemporaryDrawer
                handleIndividualComparisionRemove={handleIndividualComparisionRemove}
                handleClearComparision={handleClearComparision}
                comparisionItems={comparisionItems.length ? comparisionItems : parsedComparisionItems}
                setOpenComparisionWindow={setOpenComparisionWindow}
                openComparisionWindow={openComparisionWindow}

            />
        </div>
    )
}

export default Dashboard