import * as React from 'react';
import './Authors.css';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import michal from 'images/avatar/michal_patz.jpg';
import wojtek from 'images/avatar/wojtek_witczak.jpg';
import pawix from 'images/avatar/pawel_biniak.jpg';
import maciej from 'images/avatar/maciej_wegrzak.jpg';

const Authors = () => {
  const tiers = [
    {
      title: 'Free',
      name: 'Michał',
      surrname: 'Patz',
      role: 'Project Manager',
      picUrl: michal,
      description: ['C++', 'ICT', '5G', ''],
      url: 'https://pl.linkedin.com/in/micha%C5%82-patz-962a55206',
      buttonText: 'Linkedin',
      buttonVariant: 'outlined'
    },
    {
      title: 'Pro',
      name: 'Wojciech',
      surrname: 'Witczak',
      role: 'Fullstack Dev',
      picUrl: wojtek,
      description: ['C++', 'PHP', 'ICT', ''],
      url: 'https://pl.linkedin.com/in/wojciech-witczak-416829197',
      buttonText: 'Linkedin',
      buttonVariant: 'outlined'
    },
    {
      title: 'Enterprise',
      name: 'Paweł',
      surrname: 'Biniak',
      role: 'Frontend Dev',
      picUrl: pawix,
      description: ['React', 'ICT', 'Python', ''],
      url: 'https://pl.linkedin.com/in/pawe%C5%82-biniak-6446141ba',
      buttonText: 'Linkedin',
      buttonVariant: 'outlined'
    },
    {
      title: 'Enterprise1',
      name: 'Maciej',
      surrname: 'Węgrzak',
      role: 'Backend Dev',
      picUrl: maciej,
      description: ['Data bases', 'ICT', 'Python', ''],
      url: 'https://pl.linkedin.com/in/maciej-w%C4%99grzak-307a41212',
      buttonText: 'Linkedin',
      buttonVariant: 'outlined'
    }
  ];

  return (
    <>
      <main>
        {/* Hero unit */}
        <div className='heroContent'>
          <div className='onas'>
            <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
              O nas
            </Typography>
            <Typography variant='h6' align='center' color='textSecondary' component='p'>
              Jesteśmy grupą studentów z Politechniki Poznańskiej, która wspólnie utworzyła zespół o nazwie "Team Koncentrator". Wspólnie chcemy
              ułatwiać innym życie, tworząc autorskie aplikacje dostępne dla wszystkich.
            </Typography>
          </div>
        </div>
        {/* End hero unit */}

        <Grid container spacing={4} alignItems='flex-end' className='peopleCont'>
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6} md={6}>
              <Card>
                <CardHeader
                  avatar={<Avatar alt='Remy Sharp' src={tier.picUrl} sx={{ width: 56, height: 56 }} />}
                  title={tier.name + ' ' + tier.surrname}
                  subheader={tier.role}
                  titleTypographyProps={{ align: 'left' }}
                  subheaderTypographyProps={{ align: 'left' }}
                  className='cardHeader'
                />
                <CardContent>
                  <div className='cardPricing'>
                    <Typography variant='h8' color='textSecondary'>
                      Specjalizacje:
                    </Typography>
                  </div>
                  {tier.description.map((line) => (
                    <Typography variant='subtitle1' align='center' key={line}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} href={tier.url} color='primary'>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </>
  );
};

export default Authors;
