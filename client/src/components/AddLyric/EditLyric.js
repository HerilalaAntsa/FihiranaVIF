import React, { useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { Alert, Autocomplete, Box, Button, FormControl, Input, InputLabel, Snackbar, TextField, Typography } from "@mui/material";
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

const EditLyric = ({
  putLyric,
  lyric,
  user,
  activeEditLyric
}) => {
  const classes = useStyles();
  const [artist, setArtist] = React.useState(lyric.artists);
  const [inputArtist, setInputArtist] = React.useState(lyric.artists?.name);
  const [artists, setArtists] = React.useState([]);


  const [editorState, setEditorState] = React.useState(null);
  const [convertedContent, setConvertedContent] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const textDialog = "Veuillez vérifier les fautes avant de continuer";

  const handleClickOpen = () => {
    setOpen(true);
  };

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
    console.log(lyric.artists)
    setArtist(lyric.artists ? lyric.artists : null);
    setInputArtist(lyric.artists ? lyric.artists.name : "");

    const contentDataState = ContentState.createFromBlockArray(convertFromHTML(lyric.content));
    const editorDataState = EditorState.createWithContent(contentDataState);
    setEditorState(editorDataState);
    try {
      const fetchArtists = async () => {
        const { data } = await axios.get('/api/artists');
        setArtists(data);
      }
      fetchArtists();
    } catch (error) {
      console.error(error);
    }
  }, [lyric]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const data = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const reqBody = {
      user: user,
      lyricId: lyric.id,
      title: formElements['title-lyric'].value,
      seequence: formElements['sequence-lyric'].value,
      content: data,
      artist: artist ? artist : { name: inputArtist },
    };
    await putLyric(reqBody).then(() => {
      setOpen(true);
    });
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
          <Typography variant="h4">Modifier parole</Typography>
        </Box>
      </Box>
      <Box className={classes.chatContainer}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth hiddenLabel>
            <TextField id="title-lyric" label="Titre" aria-describedby="my-helper-text" value={lyric.title} required />

            <TextField id="sequence-lyric" label="Séquence" aria-describedby="my-seq-text" value={lyric.sequence} required />

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

            <Button onClick={activeEditLyric} >
              Annuler
            </Button>
            <input
              value="Modifier"
              color="primary"
              type="submit"
            />
          </FormControl>
        </form>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Lyric modifié avec succès
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditLyric;
