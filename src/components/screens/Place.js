import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "./includes/Header";
import axios from "axios";
import styled from "styled-components";
import placeIcon from "../../assets/images/place.svg"; 
import { Link } from "react-router-dom";

function Place() {
    const [place, setPlace] = useState({
        name: "",
        category_name: "",
        location: "",
        image: "",
        gallery: [],
        description: "",
    });

    useEffect(() => {
        axios
            .get("https://traveller.talrop.works/api/v1/places/view/30")
            .then((response) => {
                setPlace(response.data.data); // ✅ fixed
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Helmet>
                <title>{place.name}</title>
            </Helmet>
            <Header />
            <MainContainer>
                <Title>{place.name}</Title>
                <InfoContainer>
                    <CategoryName>{place.category_name}</CategoryName>
                    <LocationContainer>
                        <LocationIcon src={placeIcon} alt="Location Icon" />
                        <LocationName>{place.location}</LocationName>
                    </LocationContainer>
                </InfoContainer>
                <GalleryContainer>
                    <GalleryItem>
                        <GalleryImage src={place.image} alt="Main" />
                    </GalleryItem>
                    {place.gallery &&
                        place.gallery.map((image) => (
                            <GalleryItem key={image.id}>
                                <GalleryImage src={image.image} alt="Gallery" />
                            </GalleryItem>
                        ))}
                </GalleryContainer>
                <SubHeading>Place Details</SubHeading>
                <Description>{place.description}</Description>
            </MainContainer>
        </>
    );
}

// Styled components
const MainContainer = styled.div`
    width: 70%;
    margin: 70px auto 0;
`;
const Title = styled.h1``;
const InfoContainer = styled.div``;
const CategoryName = styled.h2``;
const LocationContainer = styled.div`
    display: flex;
    align-items: center;
`;
const LocationIcon = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 10px;
`;
const LocationName = styled.p``;
const GalleryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;
const GalleryItem = styled.div`
    width: 200px;
`;
const GalleryImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
`;
const SubHeading = styled.h2`
    margin-top: 30px;
`;
const Description = styled.p`
    font-size: 16px;
    line-height: 1.6;
`;

export default Place;
