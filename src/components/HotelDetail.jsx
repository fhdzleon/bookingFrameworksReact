/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import BookingForm from "./BookingForm";
import {
  Card,
  Typography,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

const fetchHotel = async (id) => {
  const res = await fetch(`http://localhost:3001/hotels/${id}`);
  if (!res.ok) {
    throw new Error("Hotel fetch failed");
  }
  return res.json();
};

const HotelDetail = () => {
  const [match, params] = useRoute("/hotel/:id");
  const {
    data: hotel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotel", params?.id],
    queryFn: () => fetchHotel(params?.id),
    enabled: !!params?.id,
  });

  if (isLoading) {
    return <div>...loading</div>;
  }
  if (error) {
    return <div>Error fetching hotel {error.message}</div>;
  }

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#e8e8e8" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={hotel?.image}
        title={hotel?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hotel?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hotel?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <BookingForm hotel={hotel} />
      </CardActions>
    </Card>
  );
};

export default HotelDetail;
