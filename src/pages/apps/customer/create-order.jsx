import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useLayoutEffect, useState } from 'react';

import { useParams } from 'react-router';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AnimateButton from '../../../components/@extended/AnimateButton';
import SelectProductContract from '../../../sections/contracts/SelectProductContract';
import ListOfTariff from '../../../sections/contracts/ListOfTariff';
import SelectDateContract from '../../../sections/contracts/SelectDateContract';
import { useContractContext } from '../../../contexts/ContractContext';
import { LoadingButton } from '@mui/lab';
import ThanksContract from '../../../sections/contracts/Thanks';
import Confirmation from '../../../sections/contracts/Confirmation';
import FirstPaymentCredit from '../../../sections/contracts/FirstPaymentCredit';
import { useClientContext } from '../../../contexts/ClientContext';
import { useNavigate } from 'react-router-dom';

const steps = ['Mahsulotlar', 'Shartnoma muddati', 'Ariza yaratish',  'Boshlang\'ich to\'lov','Arizani tasdiqlash'];

const CreateOrder = () => {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const { sendCustomerContactDetail } = useContractContext();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useClientContext();
  const navigate = useNavigate();

  // useLayoutEffect(() => {
  //   if (data && data.limit <= 0) {
  //     navigate(`/customer/edit/${id}`);
  //   }
  // }, [data]);

  const [formData, setFormData] = useState({
    'client_id': Number(id),
    'tariff_id': '',
    'payment_date': '', // min=1 max=20
    'products': [
      {
        'product_name': '',
        'price': '',
        'count': 1,
        'category_id': '',
        'imei_1': null,
        'imei_2': null,
        'is_imei': -1
      }
    ]
  });


  const handleNext = () => {
    if (activeStep === steps.length - 3) {
      handleSendCustomerContactDetail();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const updateFormData = (data) => {
    const key = Object.keys(data);
    const values = Object.values(data);
    if (values && key)
      setFormData(prev => {
        return { ...prev, [key[0]]: values[0] };
      });

  };


  const handleSendCustomerContactDetail = async () => {
    setIsLoading(true);
    await sendCustomerContactDetail(formData).then((response) => {
      if (response && response.status) {
        setActiveStep(activeStep + 1);
      }
    }).catch((error) => {

    }).finally(() => {
      setIsLoading(false);
    });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SelectProductContract formData={formData} updateFormData={updateFormData} handleNext={handleNext} />;
      case 1:
        return <ListOfTariff formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <SelectDateContract formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <FirstPaymentCredit handleNext={handleNext} handleBack={handleBack} />;
      case 4:
        return <Confirmation handleNext={handleNext} />;
      case 5:
        return <ThanksContract />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ pt: 1, mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {getStepContent(activeStep)}
      <>
        <Stack sx={{ mt: 3 }} direction="row" justifyContent={'flex-end'}>
          {activeStep !== 0 && activeStep < 3 && (
            <AnimateButton>
              <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                Orqaga
              </Button>
            </AnimateButton>
          )}
          {activeStep > 0 && activeStep < 3 ?
            <AnimateButton>
              <LoadingButton loading={isLoading} variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                {activeStep === steps.length - 1 ? 'Ariza yuborish' : 'Keyingisi'}
              </LoadingButton>
            </AnimateButton> : ''}
        </Stack>
      </>
    </>
  );

};
export default CreateOrder;