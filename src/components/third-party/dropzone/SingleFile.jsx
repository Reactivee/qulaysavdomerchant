import PropTypes from 'prop-types';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// third-party
import { useDropzone } from 'react-dropzone';

// project-imports
import RejectionFiles from './RejectionFiles';
import PlaceholderContent from './PlaceholderContent';
import { LoadingButton } from '@mui/lab';
import { Send2, Trash } from 'iconsax-react';
import LinearProgress from '@mui/material/LinearProgress';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(2, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.paper,
  border: '1px dashed',
  borderColor: theme.palette.secondary.main,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - SINGLE FILE ||============================== //

export default function SingleFileUpload({ error, file, setFieldValue, sx, onUploadPhoto, field, uploading }) {

  const theme = useTheme();
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: { 'image/*': [] },
    maxSize: 5000000,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFieldValue(
        field,
        acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
      );
    }
  });

  const thumbs =
    file &&
    file.map((item) => (
      <img
        key={item.id}
        alt={item.name}
        src={item.preview}
        style={{
          top: 0,
          left: '50%',
          transform: 'translate(-50%, 0)',
          borderRadius: 2,
          position: 'absolute',
          // width: 'calc(100% - 100px)',
          height: 'calc(100% - 10px)',
          margin: '0 auto',
          background: theme.palette.background.paper
        }}
        onLoad={() => {
          onUploadPhoto(file, field);
          URL.revokeObjectURL(item.preview);
          setFieldValue(
            field,
            []
          );
        }}
      />
    ));

  const onRemove = () => {
    setFieldValue(field, null);
  };
  const onUpload = (file) => {
    onUploadPhoto(file, field);
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropzoneWrapper
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && { color: 'error.main', borderColor: 'error.light', bgcolor: 'error.lighter' }),
          ...(file && { padding: '2% 0' })
        }}
      >
        <input {...getInputProps()} />
        {file && file.length > 0 ? '' : <PlaceholderContent />}
        {thumbs}
      </DropzoneWrapper>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
      {uploading.key === field && uploading.loading ? <LinearProgress /> : ''}
    </Box>
  );
}

SingleFileUpload.propTypes = {
  error: PropTypes.any,
  file: PropTypes.any,
  setFieldValue: PropTypes.any,
  sx: PropTypes.any
};
