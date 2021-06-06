import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import NoteCard from "../components/NoteCard"
import Masonry from 'react-masonry-css'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
  masonryGrid: {
    display: '-webkit-box',
    display: '-ms-flexbox',
    display: 'flex',
    marginLeft: '-30px',
    width: 'auto',
  },
  masonryGridColumn: {
    paddingLeft: '30px',
    backgroundClip: 'padding-box',
  },
  masonryInnerDiv: {
    marginBottom: '30px',
  }
})

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const classes = useStyles();

  useEffect(()=> {
    fetch("http://localhost:8000/notes")
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id) => {
    // send delete request to json server
    const res = await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'DELETE',
    })

    if (res.ok){
      const newNotes = notes.filter(note => note.id !== id);
      setNotes(newNotes);
    }
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className={classes.masonryGrid}
        columnClassName={classes.masonryGridColumn}
      >
        {notes.map(note => (
          <div key={note.id} className={classes.masonryInnerDiv}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
