import React, { useState } from 'react'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { 
  Typography, 
  Button,
  Container,
  makeStyles,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@material-ui/core'
import { useHistory } from 'react-router';

// FormControl -> wrapper for certain section of form

// makeStyles returns a hook
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  }
});


export default function Create() {
  // invoke the hook created from makeStyles
  const classes = useStyles(); // returns object with the classes from above
  const history = useHistory()
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('money');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && details){
      fetch('http://localhost:8000/notes', {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({title, details, category})
      }).then(() => history.push('/'))
      // history.push() is simply used to redirect to another route in the application
    }
    title? setTitleError(false) : setTitleError(true);
    details? setDetailsError(false) : setDetailsError(true);
  }

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required // doesn't add validation, simply adds astric for ui
          error={titleError}
        />
        <TextField 
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required // doesn't add validation, simply adds astric for ui
          error={detailsError}
        />
        {/* We aren't using FormControlLabel bc we arent using the control prop w/ component */}
        <FormControl className={classes.field}>
          <FormLabel color='secondary'>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            {/* FormControlLabel wraps radio button (or any other form control button) with label */}
            <FormControlLabel value="money" control={<Radio />} label="Money"/>
            <FormControlLabel value="todos" control={<Radio />} label="Todos"/>
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders"/>
            <FormControlLabel value="work" control={<Radio />} label="Work"/>
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>


      {/* icons */}
      <br />
      
    </Container>
  )
}
