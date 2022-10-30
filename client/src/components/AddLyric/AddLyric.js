import React, { useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { Alert, Autocomplete, Box, FormControl, Snackbar, TextField, Typography } from "@mui/material";
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
    height: "800px",
    overflow: "scroll"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  form: {
    justifySelf: 'flex-end',
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    marginBottom: 20,
  },
  wrapperClass: {
    padding: '1rem',
    border: '1px solid #ccc',
  },
  editorClass: {
    backgroundColor: 'lightgray',
    padding: '1rem',
    border: '1px solid #ccc',
  },
  toolbarClass: {
    border: '1px solid #ccc',
  }
}));

const AddLyric = ({
  postLyric,
  user
}) => {
  const classes = useStyles();
  const [artist, setArtist] = React.useState(null);
  const [inputArtist, setInputArtist] = React.useState('');
  const [artists, setArtists] = React.useState([]);


  const contentDataState = ContentState.createFromBlockArray(convertFromHTML(""));
  const editorDataState = EditorState.createWithContent(contentDataState);
  
  const [editorState, setEditorState] = React.useState(editorDataState);

  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onEditorStateChange = (editorStateData) => {
    setEditorState(editorStateData);
  };

  useEffect(() => {
    try {
      const fetchArtists = async () => {
        const { data } = await axios.get('/api/artists');
        setArtists(data);
      }
      fetchArtists();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const data = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const reqBody = {
      user: user,
      title: formElements['title-lyric'].value,
      seequence: formElements['sequence-lyric'].value,
      content: data,
      artist: artist ? artist : {name: inputArtist},
    };
    await postLyric(reqBody).then(() => {
      setOpen(true);
    });
    // setText('');
  };

  // Select artists
  const defaultProps = {
    options: artists,
    getOptionLabel: (option) => option.name,
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Box >
          <Typography variant="h4">Ajoutez paroles</Typography>
        </Box>
      </Box>
      <Box className={classes.chatContainer}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth hiddenLabel>
            <TextField id="title-lyric" label="Titre" aria-describedby="my-helper-text" classes={{ form: classes.input }} required />
            
            <TextField id="sequence-lyric" label="Séquence" aria-describedby="my-seq-text" required />

            <Autocomplete
              freeSolo
              {...defaultProps}
              id="artist-lyric"
              disableClearable
              autoComplete
              value={artist}
              onChange={(event, newValue) => {
                setArtist(newValue);
              }}
              inputValue={inputArtist}
              onInputChange={(event, newInputValue) => {
                setInputArtist(newInputValue);
              }}
              includeInputInList
              renderInput={(params) => (
                <TextField {...params} label="Entrez un artiste" variant="standard" required />
              )}
            />

            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName={classes.wrapperClass}
              editorClassName={classes.editorClass}
              toolbarClassName={classes.toolbarClass}
              toolbar={{
                  options: ['inline', 'list', 'textAlign'],
                  inline: {
                      options: ['bold', 'italic', 'underline'],
                  },
                  list: {
                      options: ['unordered', 'ordered', 'indent', 'outdent'],
                  },
                  textAlign: {
                      options: ['left', 'center', 'right'],
                  },
              }}
            />
            
            <input
              value="Ajouter"
              color="primary"
              type="submit"
            />
          </FormControl>
        </form>
        {/* <AlertDialog
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          text={textDialog}
        /> */}
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Lyric ajouté avec succès
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddLyric;
