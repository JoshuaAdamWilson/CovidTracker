import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './TotalCard.css'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      textDecoration: 'underline'
    },
    pos: {
      marginBottom: 6,
    },
  });

const TotalCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
            <Typography className={classes.title} component="h2" variant="h5">
                {props.region} Total: 
            </Typography><br />
                Cases: 
                <Typography className='number' variant="h5">
                  {props.cases}
                </Typography>
                Deaths: 
                <Typography className='number' variant="h5">
                  {props.deaths}
                </Typography>
                {props.date}
                <Typography className='number' variant="h5">
                  {props.updated}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default TotalCard;
