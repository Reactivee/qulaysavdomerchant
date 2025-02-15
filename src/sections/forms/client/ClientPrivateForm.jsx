import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import MainCard from 'components/MainCard';
import { Divider, MenuItem, Select } from '@mui/material';
import { PatternFormat } from 'react-number-format';
import {
  TYPE_ADDRESS,
  TYPE_BACK,
  TYPE_FRONT,
  TYPE_SELF_WITH_PASSPORT
} from 'data/type-photo';
// import FilesPreview from 'components/FilePreview';
import { useClientContext } from '../../../contexts/ClientContext';
import UploadSingleFile from '../../../components/third-party/dropzone/SingleFile';
import AnimateButton from '../../../components/@extended/AnimateButton';

import FormHelperText from '@mui/material/FormHelperText';
import { useMemo, useState } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Autocomplete from '@mui/material/Autocomplete';
import { Send2 } from 'iconsax-react';
import FilesPreview from '../../../components/third-party/dropzone/FilesPreview';

import { LoadingButton } from '@mui/lab';
import { ru } from 'date-fns/locale';
import { openSnackbar } from '../../../api/snackbar';
import AlertCustomerConfirmation from '../../apps/customer/AlertCustomerSkoring';
import Button from '@mui/material/Button';
import { FormattedMessage } from 'react-intl';


const ClientPassportForm = ({ accessEdit }) => {
  const {
    data,
    flyClientDocPhotos,
    regions,
    districts,
    getDistricts,
    sendPassData,
    getRegions,
    mutateClientData,
    deleteDocumentPhoto,
    getClientSingle
  } = useClientContext();

  const {
    full_name,
    first_name,
    last_name,
    middle_name,
    passport_serial,
    passport_code,
    phone,
    images,
    birthday,
    document_type,
    gender,
    passport_given_date,
    passport_given_by,
    passport_expired_date,
    district,
    district_id = district?.id,
    region,
    region_id = region?.id,
    status,
    address,
    passport_full_serial,
    id
  } = data;

  // const { name: regionName } = data.region;
  // const { name: districtName } = data.district;

  const documentTypes = [
    { id: 2, name: <FormattedMessage id="passport" /> },
    { id: 1, name: <FormattedMessage id="idcard" /> }
  ];

  const genderTypes = [
    { id: 1, name: 'Мужской' },
    { id: 2, name: 'Женский' }
  ];

  const detectedDocumentTypes = documentTypes.find(type => type.id == document_type);
  const detectGender = genderTypes.find(type => type.name === gender);

  const [docType, setDocType] = useState(detectedDocumentTypes?.id ? detectedDocumentTypes.id : documentTypes[0].id);
  const [docGender, setGender] = useState(detectGender?.id ? detectGender.id : genderTypes[0].id);

  const [uploading, setUploading] = useState({ status: false, loading: false, key: '' });
  const [resError, setResError] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  let frontPages = [];
  let backPages = [];
  let selfiePages = [];
  let addressPages = [];

  frontPages = images?.filter((item) => {
    return item.type == TYPE_FRONT;
  });
  backPages = images?.filter((item) => {
    return item.type == TYPE_BACK;
  });
  selfiePages = images?.filter((item) => {
    return item.type == TYPE_SELF_WITH_PASSPORT;
  });
  addressPages = images?.filter((item) => {
    return item.type == TYPE_ADDRESS;
  });

  let formik = {
    full_name,
    first_name,
    last_name,
    middle_name,
    passport_serial,
    passport_code,
    phone,
    birthday,
    document_type: docType,
    gender: docGender,
    passport_given_by,
    passport_given_date,
    passport_full_serial,
    passport_expired_date,
    district,
    district_id,
    region,
    region_id,
    status,
    address,
    address_photo: ''
  };
  useMemo(() => {
    getRegions();
  }, [id]);

  useMemo(() => {
    if (region) {
      getDistricts(region_id);
    }
  }, [region]);


  const customerPhotoUpload = async (even, key) => {

    setUploading({ status: false, loading: true, key });
    const res = await flyClientDocPhotos(even, key);
    if (res.status === true) {
      setUploading({ status: true, loading: false, key });
      getClientSingle(id);
    } else {
      setUploading({ status: false, loading: false, key });
    }
  };

  const sendPrivateData = async (form) => {
    await sendPassData({ form, id }).then((result) => {
        mutateClientData(result?.data);
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: 'Yuklandi',
          variant: 'alert',
          alert: {
            color: 'success'
          }
        });
      },
      (error) => {
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: error.message || 'Serverda xatolik',
          variant: 'alert',
          alert: {
            color: 'error'
          }
        });
        setResError(error.errors);
      }
    );
  };

  const deleteUserDocumentPhoto = async (id, key) => {


    await deleteDocumentPhoto(id).then((result) => {
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: result?.data?.message,
          variant: 'alert',
          alert: {
            color: 'success'
          }
        });
        const deletedImages = images?.filter((item) => item.id != id);
        const newData = { ...data, images: deletedImages };
        mutateClientData(newData);

      },
      (res) => {

        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: res.message || 'Serverda xatolik',
          variant: 'alert',
          alert: {
            color: 'error'
          }
        });
      }
    );

  };

  const setUpDate = (date) => {
    const time = new Date(date);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  };

  const validationSchema = yup.object({
    // firstName: yup.string().required('First Name is required'),
    // first_name: yup.string().required('Ism kiritilmadi'),
    // last_name: yup.string().required('Fammilya kiritilmadi'),
    // middle_name: yup.string().required('Otasining ismini kiritilmadi'),
    // passport_expired_date: yup.string().required('Hujjat amal qilish muddati kiritilmadi'),
    // passport_given_by: yup.string().required('Passport sanasi kiritilmadi'),
    passport_code: yup.string().min(14, 'Belgilar soni 14 tadan kam bo\'lmasligi kerak')
      .max(14, 'Too Long!').required('JSHSHIR kiritilmadi'),
    // passport_serial: yup.string().required('Passport seriya kiritilmadi'),
    // passport_full_serial: yup.string().required('Passport seriya kiritilmadi'),
    // passport_given_date: yup.string().required('Hujjat berilgan sana kiritilmadi'),
    // gender: yup.string().required('Jinsi sanasi kiritilmadi'),
    region_id: yup.string().required('Viloyat tanlang'),
    district_id: yup.string().required('Tuman tanlang'),
    address: yup.string().required('Ro\'yxatdan o\'tgan manzil kiritilmadi'),
    birthday: yup.string().required('Tug\'ilgan sana kiriting')
  });
  const today = new Date();
  return (
    <>
      {data?.id ?
        <MainCard title="To'liq ma'lumotlar">
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          </Typography>
          <Formik
            initialValues={formik}
            enableReinitialize={true} // Enable reinitializing on prop changes
            onSubmit={() => {
              // submit form
            }}
            validationSchema={yup.object().shape({
              // files: yup.mixed().required('Avatar is a required.')
            })}
          >
            {({ values, handleSubmit, setFieldValue, handleChange, touched, errors }) => (
              <form onChange={handleChange} onSubmit={handleSubmit}>

                <Grid className="" item xs={12} sm={12}>
                  <Stack spacing={1}>
                    <InputLabel>Hujjat turi</InputLabel>
                    <Select id="document_type" name="document_type"
                            value={docType}
                            onChange={(e) => {
                              handleChange(e);
                              setDocType(e.target.value);
                            }}>
                      {documentTypes && documentTypes.map(docType => {
                        return (<MenuItem value={docType.id}>{docType.name}</MenuItem>);
                      })}
                    </Select>
                  </Stack>

                  <Grid item xs={12}>
                    <Stack sx={{ my: 2 }} alignItems="start">
                      <InputLabel>Hujjat old sahifasi</InputLabel>
                    </Stack>
                    {frontPages &&
                      frontPages.map((item, index) => {
                        return (
                          <FilesPreview
                            key={index}
                            accessEdit={accessEdit}
                            files={item}
                            onRemove={() => {
                              deleteUserDocumentPhoto(item.id, 'front');
                              frontPages = [];
                            }}
                          />
                        );
                      })}
                    {frontPages && frontPages.length > 0 ? '' : <Stack spacing={2} alignItems="center">
                      <UploadSingleFile setFieldValue={setFieldValue}
                                        field={'front'}
                                        onUploadPhoto={customerPhotoUpload}
                                        uploading={uploading}
                                        file={values.front}
                                        error={touched.front && !!errors.front} />
                    </Stack>}
                    {touched.front && errors.front && (
                      <FormHelperText error id="standard-weight-helper-text-password-login">
                        {errors.front}
                      </FormHelperText>
                    )}
                  </Grid>

                  {Number(docType) === 1 ? <>
                    <Grid item xs={12}>
                      <Stack spacing={1.5} sx={{ my: 2 }} alignItems="start">
                        <InputLabel>Hujjat orqa tomoni</InputLabel>
                      </Stack>
                      {backPages &&
                        backPages.map((item, index) => {

                          return (
                            <FilesPreview
                              key={index}
                              accessEdit={accessEdit}
                              files={item}
                              onRemove={() => {
                                deleteUserDocumentPhoto(item.id, 'back');
                              }}
                            />
                          );
                        })}

                      {backPages && backPages.length ? '' : <Stack spacing={1.5} alignItems="end">
                        <UploadSingleFile setFieldValue={setFieldValue}
                                          field={'back'}
                                          onUploadPhoto={customerPhotoUpload}
                                          uploading={uploading}
                                          file={values.back}
                                          error={touched.back && !!errors.back} />
                      </Stack>}

                      {touched.back && errors.back && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.back}
                        </FormHelperText>
                      )}
                    </Grid>
                  </> : <Grid item xs={12}>
                    <Stack spacing={1.5} sx={{ my: 2 }} alignItems="start">
                      <InputLabel>Hujjat manzil sahifasi</InputLabel>
                    </Stack>
                    {addressPages &&
                      addressPages.map((item, index) => {

                        return (
                          <FilesPreview
                            key={index}
                            accessEdit={accessEdit}
                            files={item}
                            onRemove={() => {
                              deleteUserDocumentPhoto(item.id, 'address_photo');
                            }}
                          />
                        );
                      })}

                    {addressPages && addressPages.length ? '' : <Stack spacing={1.5} alignItems="end">
                      <UploadSingleFile setFieldValue={setFieldValue}
                                        field={'address_photo'}
                                        onUploadPhoto={customerPhotoUpload}
                                        uploading={uploading}
                                        file={values.address_photo}
                                        error={touched.address_photo && !!errors.address_photo} />
                    </Stack>}

                  </Grid>}


                  <Grid item xs={12}>
                    <Stack sx={{ my: 2 }} alignItems="start">
                      <InputLabel>Hujjat bilan selfi</InputLabel>
                    </Stack>
                    {selfiePages &&
                      selfiePages.map((item, index) => {
                        return (
                          <FilesPreview
                            key={index}
                            accessEdit={accessEdit}
                            files={item}
                            onRemove={() => {
                              deleteUserDocumentPhoto(item.id, 'selfie');
                            }}
                          />
                        );
                      })}

                    {selfiePages && selfiePages.length > 0 ? '' : <Stack spacing={1.5} alignItems="end">
                      <UploadSingleFile setFieldValue={setFieldValue}
                                        field={'selfie'}
                                        onUploadPhoto={customerPhotoUpload}
                                        uploading={uploading}
                                        file={values.selfie}
                                        error={touched.selfie && !!errors.selfie} />
                    </Stack>}

                    {touched.selfie && errors.selfie && (
                      <FormHelperText error id="standard-weight-helper-text-password-login">
                        {errors.selfie}
                      </FormHelperText>
                    )}
                  </Grid>


                </Grid>
              </form>
            )}
          </Formik>
          <Divider style={{ marginBottom: 20, marginTop: 20 }} />

          <Formik
            initialValues={formik}
            enableReinitialize={true} // Enable reinitializing on prop changes
            onSubmit={async (form, { setSubmitting, setErrors }) => {
              setSubmitting(true);
              const newVal = { ...form, document_type: docType };
              await sendPrivateData(newVal);
              setSubmitting(false);
              // submit form
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleSubmit, setFieldValue, handleChange, isSubmitting, touched, errors }) => (
              <form onSubmit={handleSubmit} id="forms-details">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>JSHSHIR*</InputLabel>
                      <PatternFormat
                        id="passport_code"
                        name="passport_code"
                        placeholder="JSHSHIR"
                        format="##############"
                        onChange={handleChange}
                        value={values.passport_code}
                        mask=""
                        customInput={TextField}
                        error={touched.passport_code && Boolean(errors.passport_code)}
                        helperText={touched.passport_code && errors.passport_code}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Familiya</InputLabel>
                      <TextField
                        id="first_name"
                        name="last_name"
                        placeholder="Familiya"
                        value={values.last_name}
                        onChange={handleChange}
                        error={touched.last_name && Boolean(errors.last_name)}
                        helperText={touched.last_name && errors.last_name}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Ism</InputLabel>
                      <TextField
                        id="first_name"
                        name="first_name"
                        placeholder="Ism"
                        value={values.first_name}
                        // fullwidth
                        onChange={handleChange}
                        error={touched.first_name && Boolean(errors.first_name)}
                        helperText={touched.first_name && errors.first_name}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Otasining ismi</InputLabel>
                      <TextField
                        id="middle_name"
                        name="middle_name"
                        placeholder="Otasining ismi"
                        value={values.middle_name}
                        onChange={handleChange}
                        error={touched.middle_name && Boolean(errors.middle_name)}
                        helperText={touched.middle_name && errors.middle_name}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Seriya va raqam*</InputLabel>
                      <TextField
                        id="passport_serial"
                        name="passport_serial"
                        placeholder="Seriya va raqam"
                        disabled
                        value={values.passport_full_serial}
                        onChange={handleChange}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                      <Stack spacing={1}>

                        <InputLabel>Tug'ilgan sana</InputLabel>
                        <DesktopDatePicker
                          id="birthday"
                          name="birthday"
                          inputFormat="dd/MM/yyyy"
                          defaultValue={values.birthday ? new Date(values.birthday) : null}
                          onChange={(e) => {
                            const date = setUpDate(e);
                            setFieldValue('birthday', date);
                          }}
                          placeholder="birthday"
                          renderInput={(params) => <TextField {...params} />}
                          error={touched.birthday && Boolean(errors.birthday)}
                          helperText={touched.birthday && errors.birthday}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              border: 1,
                              borderColor: errors.birthday ? 'red' : 'transparent'
                            }
                          }}
                          // slotProps={{ textField: { placeholder: 'Helper Text', helperText: 'Helper Text' } }}
                          // sx={{ '& .MuiInputBase-input': { border: '1px', borderColor: 'red' } }}
                          // sx={{ '& .MuiInputBase-input': { border: '1px', borderColor: 'red' } }}
                        />
                      </Stack>
                      {touched.birthday && errors.birthday && (
                        <FormHelperText style={{ marginTop: 0 }} error id="standard-birthday">
                          {errors.birthday}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Kim tomonidan berilgan</InputLabel>
                      <TextField
                        id="passport_given_by"
                        name="passport_given_by"
                        placeholder="Hujjat Kim tomonidan berilgan"
                        value={values.passport_given_by}
                        onChange={handleChange}
                        error={touched.passport_given_by && Boolean(errors.passport_given_by)}
                        helperText={touched.passport_given_by && errors.passport_given_by}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Jinsi*</InputLabel>
                      <Select id="gender" name="gender" onChange={handleChange}
                              defaultValue={gender ? gender : 1}>
                        <MenuItem value={1}>Erkak</MenuItem>
                        <MenuItem value={2}>Ayol</MenuItem>
                      </Select>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                      <Stack spacing={1}>

                        <InputLabel>Hujjat berilgan sana</InputLabel>
                        <DesktopDatePicker
                          id="passport_given_date"
                          name="passport_given_date"
                          inputFormat="dd/MM/yyyy"
                          maxDate={today}
                          defaultValue={values.passport_given_date ? new Date(values.passport_given_date) : null}
                          onChange={(e) => {
                            const date = setUpDate(e);
                            setFieldValue('passport_given_date', date);
                          }}
                          placeholder="passport_given_date"
                          renderInput={(params) => <TextField {...params} />}
                          error={touched.passport_given_date && Boolean(errors.passport_given_date)}
                          helperText={touched.passport_given_date && errors.passport_given_date}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              border: 1,
                              borderColor: errors.passport_given_date ? 'red' : 'transparent'
                            }
                          }}
                        />
                      </Stack>
                      {touched.passport_given_date && errors.passport_given_date && (
                        <FormHelperText style={{ marginTop: 0 }} error id="standard-passport_given_date">
                          {errors.passport_given_date}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                      <Stack spacing={1}>
                        <InputLabel>Hujjat amal qilish muddati</InputLabel>

                        <DesktopDatePicker
                          id="passport_expired_date"
                          name="passport_expired_date"
                          placeholder="passport_expired_date"
                          defaultValue={values.passport_expired_date ? new Date(values.passport_expired_date) : null}
                          minDate={today}

                          onChange={(e) => {
                            const date = setUpDate(e);
                            setFieldValue('passport_expired_date', date);
                          }}
                          renderInput={(params) => (
                            <TextField {...params}
                                       sx={{ '& .MuiInputBase-input': { border: '1px', borderColor: 'red' } }}
                            />
                          )}
                          error={touched.passport_expired_date && Boolean(errors.passport_expired_date)}
                          helperText={touched.passport_expired_date && errors.passport_expired_date}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              border: 1,
                              borderColor: errors.passport_expired_date ? 'red' : 'transparent'
                            }
                          }}
                        />
                      </Stack>
                      {touched.passport_expired_date && errors.passport_expired_date && (
                        <FormHelperText style={{ marginTop: 0 }} error id="standard-passport_given_by">
                          {errors.passport_expired_date}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>


                    <InputLabel htmlFor="region">Viloyat*</InputLabel>
                    <Autocomplete
                      id="region"
                      onChange={(event, newValue) => {
                        const id = regions?.find(e => e.name === newValue);
                        setFieldValue('region', newValue);
                        setFieldValue('region_id', id?.id);
                        getDistricts(id?.id);
                      }}
                      sx={{ paddingY: 1 }}
                      value={values.region?.name}
                      options={regions?.map((item) => item.name)}
                      error={touched.region_id && Boolean(errors.region_id)}
                      helperText={touched.region_id && errors.region_id}

                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Viloyat tanlang"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              mt: 0,
                              py: '6px',
                              border: 1,
                              borderColor: errors.region_id ? 'red' : 'transparent'
                            }
                          }}
                        />
                      )}
                    />
                    {errors.region_id && (
                      <FormHelperText style={{ marginTop: 0 }} error id="standard-region">
                        {errors.region_id}
                      </FormHelperText>
                    )}

                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>


                    <InputLabel htmlFor="addresses.district">Tuman*</InputLabel>
                    <Autocomplete
                      id="district_id"
                      onChange={(event, newValue) => {
                        const id = districts?.find(e => e.name === newValue);
                        setFieldValue('district', newValue);
                        setFieldValue('district_id', id?.id);
                      }}
                      sx={{ paddingY: 1 }}
                      defaultValue={values.district?.name}
                      options={districts?.map((item) => item.name)}
                      error={touched.district_id && Boolean(errors.district_id)}
                      helperText={touched.district_id && errors.district_id}

                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Tuman tanlang"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              py: '6px',
                              border: 1,
                              borderColor: errors.district_id ? 'red' : 'transparent'
                            }
                          }}
                        />
                      )}
                    />
                    {errors.district_id && (
                      <FormHelperText style={{ marginTop: 0 }} error id="standard-district">
                        {errors.district_id}
                      </FormHelperText>
                    )}

                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="address">Ro'yxatdan o'tgan manzil*</InputLabel>
                      <TextField
                        id="address"
                        name="address"
                        placeholder="Ro'yxatdan o'tgan manzil"
                        value={values?.address}
                        multiline
                        rows={3}
                        onChange={handleChange}
                        error={touched.address && Boolean(errors.address)}
                        helperText={touched.address && errors.address}
                        // error={formik.touched.addresses.district && Boolean(formik.errors.addresses.district)}
                        // helperText={formik.touched.addresses.district && formik.errors.addresses.district}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end">
                      {accessEdit ? <AnimateButton offset={5}>
                        <LoadingButton size="large" loading={isSubmitting}
                                       variant="shadow" sx={{ my: 1, ml: 1, px: 5, py: 1 }}
                                       type="submit">
                          <Send2 style={{ marginRight: 10 }} />
                          Saqlash
                        </LoadingButton>
                      </AnimateButton> : <AnimateButton offset={5}>
                        <Button disabled={!accessEdit} variant="dashed" sx={{ my: 1, ml: 1, px: 5, py: 1 }}>
                          <Send2 style={{ marginRight: 10 }} />
                          Saqlash
                        </Button>
                      </AnimateButton>}

                    </Stack>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </MainCard> :
        ''
      }
      <AlertCustomerConfirmation title={'Rasm o\'chirilishini xoxlaysizmi?'} open={open} handleClose={handleClose}
                                 confirmOperation={deleteUserDocumentPhoto} />

    </>
  );


};
export default ClientPassportForm;

ClientPassportForm.propTypes = {
  setErrorIndex: PropTypes.func
};
