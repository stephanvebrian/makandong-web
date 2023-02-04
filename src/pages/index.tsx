import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import {
  getNearestCityName,
  getNearestLocations,
  Location,
} from '@/services/location';
import { GeolocationType } from '@/utils/geolocation';

export default function Home() {
  const [myLat, setMyLat] = useState<number>(0);
  const [myLong, setMyLong] = useState<number>(0);
  const [myCity, setMyCity] = useState<string>('Loading');
  const [locations, setLocations] = useState<Location[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setMyLat(position.coords.latitude);
      setMyLong(position.coords.longitude);
    });
  });

  useEffect(() => {
    const geoLoc: GeolocationType = {
      Latitude: myLat,
      Longitude: myLong,
    };
    const cityName = getNearestCityName(geoLoc);
    setMyCity(cityName);
    if (myLat != 0 && myLong != 0) {
      const locations = getNearestLocations(geoLoc);
      setLocations(locations);
    }
  }, [myLat, myLong]);

  return (
    <>
      <header>
        <Container maxWidth="lg">
          <Box py={3} textAlign="center">
            <Typography fontSize="1.8rem" fontWeight="bold">
              MakanDong
            </Typography>
          </Box>
        </Container>
      </header>
      <Container maxWidth="lg">
        <Box>
          <Card variant="outlined" sx={{ borderWidth: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: {
                    xs: 'flex',
                    sm: 'flex',
                  },
                  gap: {
                    xs: 2,
                    sm: 0,
                  },
                  flexDirection: {
                    xs: 'column',
                    sm: 'row',
                  },
                  justifyContent: {
                    xs: 'center',
                    sm: 'space-between',
                  },
                  alignItems: {
                    xs: 'center',
                    sm: 'center',
                  },
                }}
              >
                <Box>
                  <Box display="flex">
                    <Typography>{'My Position: '}</Typography>
                    <Typography fontWeight="bold">{myCity}</Typography>
                  </Box>
                  <Box>
                    {myLat}, {myLong}
                  </Box>
                </Box>
                <Box>
                  <Button variant="contained">Refresh</Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Box>
          {locations &&
            locations.length > 0 &&
            locations.map((loc) => (
              <Card
                key={`${loc.Latitude}-${loc.Longitude}`}
                variant="outlined"
                sx={{ borderWidth: 2 }}
              >
                <CardContent>
                  <Box>
                    <Typography fontSize="1.25rem" fontWeight="bold">
                      {loc.Title}
                    </Typography>
                    <Typography>
                      {(Math.round(loc.Distance * 100) / 100).toFixed(2)}km
                    </Typography>
                  </Box>
                  <Divider variant="middle" />
                  <Box marginTop={1}>
                    {loc.Tags &&
                      loc.Tags.length > 0 &&
                      loc.Tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={
                            <Typography textTransform="uppercase">
                              {tag}
                            </Typography>
                          }
                          color="info"
                        />
                      ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Box>
      </Container>
    </>
  );
}
