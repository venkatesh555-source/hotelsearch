import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import axios from "axios";
import Holiday from "./holiday";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import hotelFacil from "../util/hotelFacil";

export default function SearchBar() {
  const [location, setLocation] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [facility, setFacility] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");
  const [holidays, setHolidays] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [departureDate, setDepartureDate] = React.useState(new Date());
  const [filtering, setIsFiltering] = React.useState(false);
  const selectLocation = (event) => {
    setLocation(event.target.value);
  };
  const selectPricePerPerson = (event) => {
    setPrice(event.target.value);
  };
  const selectRating = (event) => {
    setRating(event.target.value);
  };
  const selectFacility = (event) => {
    setFacility(event.target.value);
  };
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const searchItems = (event) => {
    // event.preventDefault();
    // console.log(searchInput);

    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://www.virginholidays.co.uk/cjs-search-api/search",
        {
          bookingType: "hotel",
          location: location,
          departureDate: moment(departureDate).format("DD-MM-YYYY"),
          duration: "7",
          partyCompositions: [
            {
              adults: 2,
              childAges: [],
              infants: 0,
            },
          ],
        }
      )
      .then((res) => {
        console.log("RES", res.data.holidays);
        setHolidays(res.data.holidays);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };
  //filter holidays by price, rating, facility
  const filterItems = () => {
    const filteredHolidays = holidays.filter((holiday) => {
      //filter by price, rating, facility
      if (
        holiday.pricePerPerson.toString() <= price ||
        holiday.rating === rating ||
        hotelFacil.includes(facility)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return setFiltered(filteredHolidays);
  };
  let hotelList = filtering ? filtered : holidays;
  console.log("HOLIDAYS", holidays);
  return (
    <>
      <Container maxWidth='md'>
        {" "}
        <Typography
          variant='h6'
          sx={{ marginTop: "auto" }}
          gutterBottom
          component='div'
        >
          Search
        </Typography>
        <Paper elevation={2} sx={{ padding: "10px", width: "50%" }}>
          <div style={{ margin: "20px" }}>
            {" "}
            <div sx={{ margin: "20px", marginTop: "10px" }}>
              {" "}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {" "}
                <DesktopDatePicker
                  value={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  label='Departure Date'
                  inputFormat='yyyy/MM/dd'
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </div>
            <FormControl fullWidth size='small' sx={{ marginTop: "10px" }}>
              <InputLabel id='location'>Location</InputLabel>{" "}
              <Select
                labelId='location'
                id='hotel-location'
                value={location}
                label='Select Location'
                onChange={selectLocation}
              >
                <MenuItem value='new-york'>New-York</MenuItem>
                <MenuItem value='orlando'>Orlando</MenuItem>
                <MenuItem value='barbados'>Barbados</MenuItem>
                <MenuItem value='toronto'>Toronto</MenuItem>
              </Select>
            </FormControl>
            <div>
              <Button
                onClick={searchItems}
                sx={{ width: "40%", marginTop: "10px" }}
                variant='contained'
                color='primary'
              >
                Search
              </Button>
            </div>
          </div>
        </Paper>
      </Container>{" "}
      <Divider sx={{ margin: "20px" }} />
      <Container maxWidth='md' sx={{ marginTop: "20px" }}>
        {" "}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}></Grid>
          <Grid container item xs={12} sm={6} md={8} spacing={2}>
            <Typography gutterBottom variant='subtitle1' component='div'>
              Filters
            </Typography>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size='small'>
                <InputLabel id='location'>Price per Person</InputLabel>{" "}
                <Select
                  labelId='location'
                  id='hotel-location'
                  value={price}
                  label='Price per Person'
                  onChange={selectPricePerPerson}
                >
                  <MenuItem value='1500'>1000-1500</MenuItem>
                  <MenuItem value='2000'>1500-2000</MenuItem>
                  <MenuItem value='2500'>2000-2500</MenuItem>
                  <MenuItem value='3000'>2500-3000</MenuItem>
                </Select>
              </FormControl>
            </Grid>{" "}
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size='small'>
                <InputLabel id='location'>Hotel Facilities</InputLabel>{" "}
                <Select
                  labelId='location'
                  id='hotel-location'
                  value={facility}
                  label='Hotel Facilities'
                  onChange={selectFacility}
                >
                  {hotelFacil.map((facility) => {
                    return (
                      <MenuItem value={facility.value}>
                        {facility.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size='small'>
                <InputLabel id='location'>Hotel rating</InputLabel>{" "}
                <Select
                  labelId='location'
                  id='hotel-location'
                  value={rating}
                  label='Hotel Rating'
                  onChange={selectRating}
                >
                  <MenuItem value={5}>
                    <Rating readOnly value={5} />
                  </MenuItem>
                  <MenuItem value={4}>
                    {" "}
                    <Rating readOnly value={4} />
                  </MenuItem>
                  <MenuItem value={3}>
                    {" "}
                    <Rating readOnly value={3} />
                  </MenuItem>
                  <MenuItem value={2}>
                    {" "}
                    <Rating readOnly value={2} />
                  </MenuItem>
                  <MenuItem value={1}>
                    {" "}
                    <Rating readOnly value={1} />
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}></Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => {
              filterItems();
              setIsFiltering(!filtering);
            }}
            variant='contained'
            color='primary'
          >
            Filter
          </Button>
          {filtering && (
            <Button
              onClick={() => {
                setFiltered([]);
                setIsFiltering(!filtering);
              }}
              variant='contained'
              color='primary'
              style={{ marginLeft: "10px" }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </Container>{" "}
      <Divider sx={{ margin: "20px" }} />
      <Container maxWidth='lg'>
        {" "}
        <Grid container spacing={1}>
          {" "}
          {
            //map through the holidays

            hotelList.map((holiday) => {
              return (
                <Grid item xs='auto'>
                  <Holiday key={holiday.id} holiday={holiday} />
                </Grid>
              );
            })
          }
        </Grid>
      </Container>
      {
        //map holidays to Holiday component
        hotelList.length === 0 && (
          <Box
            sx={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant='h6' gutterBottom>
              No Results Found
            </Typography>
          </Box>
        )
      }
    </>
  );
}
