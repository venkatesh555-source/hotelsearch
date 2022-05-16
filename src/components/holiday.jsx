import {
  MoreVert,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  ShareOutlined,
  InfoRounded,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  MobileStepper,
  Button,
  useTheme,
  Rating,
  Divider,
  CardActionArea,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Holiday = ({ holiday }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  const maxSteps = holiday?.hotel?.content?.images?.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Card sx={{ maxWidth: 345 }} elevation={3}>
      <CardHeader
        action={
          <IconButton aria-label='settings'>
            <MoreVert />
          </IconButton>
        }
        title={holiday?.hotel?.name}
      />
      <AutoPlaySwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {holiday?.hotel?.content?.images?.map((image, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component='img'
                sx={{
                  maxWidth: 400,
                  height: 255,
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                }}
                src={"https:" + image?.RESULTS_CAROUSEL?.url}
                alt={`hotel image ${index}`}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <Divider />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {holiday?.hotel?.content?.hotelDescription.substring(0, 100) + "..."}
        </Typography>
        <Divider />
        <Typography component='legend'>Hotel Facilities</Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {/* map hotel facilities */}
          {holiday?.hotel?.content?.hotelFacilities?.map(
            (facility) => facility + ", "
          )}
        </Typography>

        {/* hotel ratings  */}
        <Typography component='legend'>Hotel Rating</Typography>
        <Rating
          name='read-only'
          value={holiday?.hotel?.content?.starRating}
          readOnly
        />
        <Typography component='legend'>Hotel Rating</Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {holiday?.hotel?.content?.parentLocation}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <IconButton aria-label='share'>
          <ShareOutlined />
        </IconButton>
        <IconButton aria-label='share'>
          <InfoRounded />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Holiday;
