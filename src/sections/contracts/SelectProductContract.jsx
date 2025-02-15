
import AddProductContractForm from '../forms/AddProductContractForm';
import { useGetCategories } from '../../api/categories';

const SelectProductContract = ({ handleNext, formData, updateFormData }) => {

  const { category, isLoading, error } = useGetCategories();

  return (<>

    <AddProductContractForm formData={formData}
                            updateFormData={updateFormData}
                            category={category}
                            isLoading={isLoading}
                            error={error}
                            handleNext={handleNext} />

  </>);
};
export default SelectProductContract;