import { FieldArray, Form, Formik } from 'formik';
import { v4 as UIDV4 } from 'uuid';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import Button from '@mui/material/Button';
import { Add } from 'iconsax-react';

import Divider from '@mui/material/Divider';
import * as yup from 'yup';
import AddingProductItem from './AddingProductItem';
import AnimateButton from '../../components/@extended/AnimateButton';
import MainCard from '../../components/MainCard';
import InputLabel from '@mui/material/InputLabel';
import { useCallback, useState } from 'react';
import Typography from '@mui/material/Typography';
import { formatPrice } from '../../utils/functions';

const AddProductContractForm = ({ handleNext, category = [], isLoading, error, updateFormData, formData }) => {

  const [summariser, setSummariser] = useState(0);

  const calculateCountPrice = (values) => {

    const summ = values.products.reduce((acc, product) => {

      return acc + Number(product.count * product.price);
    }, 0);
    //

    // console.log(price);
    setSummariser(summ);
    // console.log(summariser);
  };

  const validationSchema = yup.object({
    products: yup
      .array()
      .required('Invoice details is required')
      .of(
        yup.object().shape({
          category_id: yup.string().required('Product name is required'),
          product_name: yup.string().required('Product name is required'),
          price: yup.string().required('Price name is required'),
          count: yup.string().required('qty name is required')

          // imei_1: yup.string().required('qty name is required')
        })
      )
      .min(1, 'Invoice must have at least 1 items')
  });

  const detectImei = (id, index, values) => {
    if (category && category.length > 0) {
      const oneCategory = category.find(item => item.id === id);
      const selectedProduct = values.products[index];
      selectedProduct.is_imei = oneCategory.is_imei;

      updateFormData(values);
      // const ImeiIndex = isImeiIndex.find(item => item.index === index);
      // if (ImeiIndex) {
      //   ImeiIndex.is_imei = oneCategory.is_imei;
      //   setImeiIndex(prevState => [...prevState, ImeiIndex]);
      // } else {
      //   const newValue = {
      //     'index': index,
      //     'is_imei': oneCategory.is_imei
      //   };
      //   setImeiIndex(prevState => [...prevState, newValue]);
      // }
    }
  };

  return (
    <Formik
      initialValues={{
        products: formData.products
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        updateFormData(values);
        handleNext();
      }}
    >
      {({ handleBlur, errors, handleChange, handleSubmit, values, isValid, setFieldValue, touched }) => {
        calculateCountPrice(values);

        return (
          <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Grid item xs={12}>
              <FieldArray
                name="products"
                render={({ remove, push }) => {
                  return (
                    <>
                      {values.products?.map((item, index) => (
                        <Stack sx={{ mb: 2 }}>
                          <MainCard title={`#${values.products.indexOf(item) + 1}`}>
                            <Grid container spacing={4} xs={12}>
                              <>
                                <Grid item xs={3}>
                                  {/*{values.products.indexOf(item) + 1}*/}
                                  <Stack sx={{}} spacing={1}>
                                    {/*<FormControlLabel control={} label={'asd'} />*/}
                                    <InputLabel>Kategoriya*</InputLabel>
                                    <FormControl>
                                      <Select
                                        id={`products-${index}`}
                                        name={`products[${index}].category_id`}
                                        displayEmpty

                                        value={item.category_id ? item.category_id : 0}
                                        // renderValue={(selected) => {
                                        //   if (selected.length === 0) {
                                        //     return <Box sx={{ color: 'secondary.400' }}>Select status</Box>;
                                        //   }
                                        //   return selected;
                                        //   // return selected.join(', ');
                                        // }}
                                        onChange={(e) => {
                                          detectImei(e.target.value, index, values);
                                          handleChange(e);
                                        }}
                                        error={errors.products && Boolean(errors.products[index]?.category_id && errors.products[index]?.category_id)}
                                      >
                                        <MenuItem disabled value="0">
                                          Kategoriya tanglang
                                        </MenuItem>
                                        {category && category.map((item, index) => {
                                          return (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>);
                                        })}
                                      </Select>
                                    </FormControl>
                                  </Stack>
                                </Grid>
                                <AddingProductItem
                                  key={item.id}
                                  id={item.id}
                                  index={index}
                                  item={item}
                                  onDeleteItem={(index) => remove(index)}
                                  onEditItem={handleChange}
                                  setFieldValue={setFieldValue}
                                  Blur={handleBlur}
                                  errors={errors}

                                  touched={touched}
                                />

                              </>
                            </Grid>
                          </MainCard>
                        </Stack>

                      ))}
                      <Divider />
                      <Stack sx={{ mt: 2 }}>
                        <MainCard>
                          <Typography variant="h4" component="div">
                            Jami: {formatPrice(summariser)} so'm
                          </Typography>
                        </MainCard>
                      </Stack>

                      <Grid container justifyContent="space-between">
                        <Grid item xs={12} md={8}>
                          <Box sx={{ pt: 2.5, pr: 2.5, pb: 2.5, pl: 0 }}>
                            <Button
                              color="primary"
                              startIcon={<Add />}
                              onClick={() =>
                                push({
                                  id: UIDV4(),
                                  category_id: '',
                                  product_name: '',
                                  count: 1,
                                  price: ''
                                })
                              }
                              variant="dashed"
                              sx={{ bgcolor: 'transparent !important' }}
                            >
                              Mahsulot qo'shish
                            </Button>
                          </Box>
                        </Grid>

                      </Grid>
                    </>
                  );
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end">
                <AnimateButton>
                  <Button variant="contained" type="submit">
                    Keyingisi
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
export default AddProductContractForm;