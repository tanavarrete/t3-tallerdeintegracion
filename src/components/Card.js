import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function convertTimestamp(timestamp) {
    var d = new Date(timestamp*1000),	// Convert the passed timestamp to milliseconds
          yyyy = d.getFullYear()- 50313,
          mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
          dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
          hh = d.getHours(),
          h = hh,
          min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
          ampm = 'AM',
          time;
              
      if (hh > 12) {
          h = hh - 12;
          ampm = 'PM';
      } else if (hh === 12) {
          h = 12;
          ampm = 'PM';
      } else if (hh == 0) {
          h = 12;
      }
      
      // ie: 2013-02-18, 8:35 AM	
      time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
          
      return time;
  }
export default function SimpleCard(data) {
  const classes = useStyles();
  var formatted = convertTimestamp(data.children.time)
  return (
      <center>
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
            {data.children.ticker}
        </Typography>

        <br />
        <Typography className={classes.pos} color="textSecondary">
        {formatted}
        </Typography>
        <Typography variant="body2" component="p">
        {data.children.value}
          <br />
        </Typography>
      </CardContent>
    </Card>
    </center>
  );
}
