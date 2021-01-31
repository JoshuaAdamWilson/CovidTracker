import React from "react";
import symptoms from "./symptoms.json";

//material-ui
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Divider, List, ListItem, ListItemSecondaryAction } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { Card, CardContent } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    arrow: {
      marginLeft: 20,
    }
  })
);

const Info = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent variant="h5" component="h2">
          Do you have Coronavirus?
        </CardContent>
        <CardContent>
          Symptoms may appear 2-14 days after exposure to the virus. People with
          these symptoms may have COVID-19:
        </CardContent>

        <List dense className={classes.root}>
          {symptoms.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <>
                <Divider />
                <ListItem key={value} button className={classes.item}>
                  <ArrowRight className={classes.arrow} />
                  <ListItemText id={labelId} primary={`${value}`} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </>
            );
          })}
        </List>
      </Card>
    </>
  );
};

export default Info;
