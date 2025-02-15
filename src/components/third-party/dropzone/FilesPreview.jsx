import PropTypes from 'prop-types';
// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// project-imports
import IconButton from 'components/@extended/IconButton';
import { DropzopType } from 'config';

// assets
import { Trash } from 'iconsax-react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Lightbox from 'yet-another-react-lightbox';
import { useState } from 'react';
import 'yet-another-react-lightbox/styles.css';
// ==============================|| MULTI UPLOAD - PREVIEW ||============================== //

export default function FilesPreview({ showList = false, files, onRemove, type, accessEdit }) {
  const hasFile = files;
  const [open, setOpen] = useState(false);
  const [closeOnBackdropClick, setCloseOnBackdropClick] = useState(true);
  return (
    <List
      disablePadding
      sx={{
        ...(hasFile && type !== DropzopType.STANDARD && { my: 0 }),
        ...(type === DropzopType.STANDARD && { width: 'calc(100% - 84px)' })
      }}
    >
      <ListItem

        sx={{
          p: 0,
          m: 0.5,
          width: '100%',
          height: '100px',
          borderRadius: 1.25,
          position: 'relative',
          display: 'inline-flex',
          verticalAlign: 'text-top',
          border: '1px solid',
          borderColor: 'divider',
          alignSelf: 'center',
          alignItems: 'start',
          justifyContent: 'start',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
      >
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          animation={'fade-in'}
          controller={{ closeOnBackdropClick }}
          styles={{ background: 'transparent' }}
          slides={[
            { src: files.path }
          ]}
        />

        <img onClick={() => setOpen(true)}
             alt="preview" src={files.path}
             style={{ width: '150px', height: '-webkit-fill-available' }} />

        <Typography variant="h5" style={{ marginTop: 10, paddingLeft: 10 }}
                    component="div">{files.type_name}</Typography>

        {accessEdit && onRemove && (
          <IconButton
            color="error"
            onClick={onRemove}
            sx={{
              fontSize: '1.875rem',
              p: 0,
              bottom: 30,
              right: 20,
              position: 'absolute'
            }}
          >
            <Trash style={{ width: 20, height: 20 }} variant="Bold" />
          </IconButton>
        )}
      </ListItem>
    </List>
  );
}

FilesPreview.propTypes = {
  showList: PropTypes.bool,
  files: PropTypes.any,
  onRemove: PropTypes.any,
  type: PropTypes.any
};
