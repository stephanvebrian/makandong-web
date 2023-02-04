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

export default function Home() {
  const [myLat, setMyLat] = useState<number>(0);
  const [myLong, setMyLong] = useState<number>(0);
  const [myCity, setMyCity] = useState<string>('Loading');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setMyLat(position.coords.latitude);
      setMyLong(position.coords.longitude);
    });

    setMyCity('Jakarta');
  });

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
                  <Box>My Position: {myCity}</Box>
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
          <Card variant="outlined" sx={{ borderWidth: 2 }}>
            <CardContent>
              <Box>
                <Typography fontSize="1.25rem" fontWeight="bold">
                  GyuKaku Senayan Park
                </Typography>
              </Box>
              <Divider variant="middle" />
              <Box marginTop={1}>
                <Chip
                  label={
                    <Typography textTransform="uppercase">ayce</Typography>
                  }
                  color="info"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}
