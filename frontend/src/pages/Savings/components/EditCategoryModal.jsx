import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { addSaving } from '../../../libs/postApis';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';
import { updateSaving } from '../../../libs/putApis';
import { getAllSavings } from '../../../libs/getApis';
const Dropdown = ({ label, options, placeholder, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <h3 className="block font-medium">{label}</h3>
      <button
        className={`w-full border-r-2 rounded-l-md gap-2 flex justify-between items-center border-[#dcdcdc] bg-white py-3 px-4 text-left`}
        onClick={(e) => onToggleDropdown(e)}
      >
        {selected ? selected : placeholder}
        <img
          src="/images/icon/icon-arrow-down.svg"
          className={`${
            isOpen ? 'rotate-180' : null
          } transition-all duration-200 ease-in-out`}
        />
      </button>
      {isOpen && (
        <div className="absolute w-full right-auto bg-white border-2 border-[#dcdcdc]  rounded-md mt-1 z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="py-2 px-4 w-max hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              By {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const DropdownCategory = ({
  label,
  options,
  placeholder,
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <h3 className="block mb-1 font-medium">{label}</h3>
      <button
        className={`w-full border-2 flex justify-between items-center border-[#dcdcdc] bg-white rounded-md py-2 px-4 text-left`}
        onClick={(e) => onToggleDropdown(e)}
      >
        {selected ? selected : placeholder}
        <img
          src="/images/icon/icon-arrow-down.svg"
          className={`${
            isOpen ? 'rotate-180' : null
          } transition-all duration-200 ease-in-out`}
        />
      </button>
      {isOpen && (
        <div className="absolute w-full bg-white border border-[#adadad] rounded-md mt-1 z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default function EditCategoryModal({ isEOpen, setIsEOpen }) {
  const { savings, updateAllSavings } = useBackendDataStore();
  const [savingName, setSavingName] = useState('');
  const [category, setCategory] = useState('');
  const [accumulatedAmount, setAccumulatedAmount] = useState('');
  const [annualVariation, setAnnualVariation] = useState('');
  const [monthlyVariation, setMonthlyVariation] = useState('');
  const [annualByType, setAnnualByType] = useState('%');
  const [monthlyByType, setMonthlyByType] = useState('%');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (isEOpen) {
      setCategory(isEOpen?.category || '');
      setSavingName(isEOpen?.savingName || '');
      setMonthlyByType(isEOpen?.monthlyByType || '');
      setAnnualByType(isEOpen?.annualByType || '');
      setAccumulatedAmount(isEOpen?.accumulatedAmount || '');
      setAnnualVariation(isEOpen?.annualVariation || '');
      setMonthlyVariation(isEOpen?.monthlyVariation || '');
      setErrors({});
      setGeneralError('');
    }
  }, [isEOpen]);

  const validate = () => {
    const newErrors = {};
    if (!category) newErrors.category = 'Category is required';
    if (!savingName) newErrors.savingName = 'Saving Name is required';

    // Validate accumulatedAmount
    if (!accumulatedAmount) {
      newErrors.accumulatedAmount = 'Accumulated Amount is required';
    } else if (isNaN(accumulatedAmount)) {
      newErrors.accumulatedAmount = 'Accumulated Amount must be a number';
    } else if (parseFloat(accumulatedAmount) <= 0) {
      newErrors.accumulatedAmount = 'Accumulated Amount must be greater than 0';
    }

    // Validate annualVariation
    if (!annualVariation) {
      newErrors.annualVariation = 'Annual Variation is required';
    } else if (isNaN(annualVariation)) {
      newErrors.annualVariation = 'Annual Variation must be a number';
    }

    // Validate monthlyVariation
    if (!monthlyVariation) {
      newErrors.monthlyVariation = 'Monthly Variation is required';
    } else if (isNaN(monthlyVariation)) {
      newErrors.monthlyVariation = 'Monthly Variation must be a number';
    }

    return newErrors;
  };
  const categoryOptions = [
    'Housing',
    'Food',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Others',
  ];
  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setGeneralError(''); // Clear general error if there are specific field errors
    } else {
      // Check if any value has changed
      const isAnyValueChanged =
        category !== isEOpen.category ||
        savingName !== isEOpen.savingName ||
        monthlyByType !== isEOpen.monthlyByType ||
        annualByType !== isEOpen.annualByType ||
        accumulatedAmount !== isEOpen.accumulatedAmount ||
        annualVariation !== isEOpen.annualVariation ||
        monthlyVariation !== isEOpen.monthlyVariation;

      if (!isAnyValueChanged) {
        setGeneralError('At least one value must be changed');
        return;
      }

      const result = await updateSaving(isEOpen._id, {
        savingName,
        category,
        accumulatedAmount,
        annualVariation,
        monthlyVariation,
        monthlyByType,
        annualByType,
      });
      if (result) {
        console.log('Saving updated successfully', result);
        // Reset form or show success message
        // Update savings array with the updated result
        const updatedSavings = savings.map((saving) =>
          saving._id === result._id ? result : saving,
        );
        const fetchedSavings = await getAllSavings();
        updateAllSavings(fetchedSavings || []);
        setSavingName('');
        setCategory('');
        setAccumulatedAmount('');
        setAnnualVariation('');
        setMonthlyVariation('');
        setAnnualByType('%');
        setMonthlyByType('%');
        setIsEOpen(false);
        setErrors({});
        setGeneralError('');
      }
    }
  };

  return (
    <>
      <Transition appear show={isEOpen} as={Fragment}>
        <Dialog
          as="div"
          style={{ zIndex: 99999999999000 }}
          className="relative z-10"
          onClose={() => setIsEOpen(!isEOpen)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-sm bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center bg-[#71299d] p-4 px-6 rounded-t-2xl">
                    <h2 className="text-white flex items-center text-xl font-semibold">
                      Edit Category{' '}
                      <img
                        src="/images/icon/icon-white-edit.svg"
                        className="mx-1"
                      />
                    </h2>
                    <button
                      onClick={() => setIsEOpen(false)}
                      className="text-white"
                    >
                      <img src="/images/icon/icon-cross.svg" />
                    </button>
                  </div>

                  <div className="mt-4  flex flex-col px-6 text-[#767576] ">
                    <label className="block font-medium text-gray-700">
                      Saving Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-[#dcdcdc] outline-none border-2 px-4 py-3  sm:text-sm"
                      value={savingName}
                      onChange={(e) => setSavingName(e.target.value)}
                      placeholder="Saving Name"
                    />
                    {errors.savingName && (
                      <p className="text-red-500">{errors.savingName}</p>
                    )}
                  </div>
                  <div className="mt-4  flex flex-col px-6 text-[#767576] ">
                    <DropdownCategory
                      label="Category"
                      placeholder="Select an option"
                      options={categoryOptions}
                      selected={category}
                      onChange={(value) => setCategory(value)}
                    />
                    {errors.category && (
                      <p className="text-red-500 text-sm">{errors.category}</p>
                    )}
                  </div>
                  <div className="mt-4  flex flex-col px-6 text-[#767576] ">
                    <label className="block font-medium text-gray-700">
                      Accumulated Amount
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-[#dcdcdc] outline-none border-2 px-4 py-3  sm:text-sm"
                      value={accumulatedAmount}
                      onChange={(e) => setAccumulatedAmount(e.target.value)}
                      placeholder="Accumulated Amount"
                    />
                    {errors.accumulatedAmount && (
                      <p className="text-red-500">{errors.accumulatedAmount}</p>
                    )}
                  </div>
                  <div className="mt-4  flex flex-col px-6 text-[#767576] ">
                    <label className="block font-medium text-gray-700">
                      Annual Variation
                    </label>
                    <div className="mt-1 flex w-full rounded-md border-[#dcdcdc]  border-2   sm:text-sm">
                      <Dropdown
                        selected={annualByType}
                        onChange={(value) => setAnnualByType(value)}
                        options={['%', 'val']}
                      />
                      <input
                        type="text"
                        className=" w-full px-4 py-3 outline-none"
                        value={annualVariation}
                        onChange={(e) => setAnnualVariation(e.target.value)}
                        placeholder="Annual Variation"
                      />
                    </div>
                    {errors.annualVariation && (
                      <p className="text-red-500">{errors.annualVariation}</p>
                    )}
                  </div>
                  <div className="mt-4  flex flex-col px-6 text-[#767576] ">
                    <label className="block font-medium text-gray-700">
                      Monthly Variation
                    </label>
                    <div className="mt-1 flex w-full rounded-md border-[#dcdcdc]  border-2   sm:text-sm">
                      <Dropdown
                        selected={monthlyByType}
                        onChange={(value) => setMonthlyByType(value)}
                        options={['%', 'val']}
                      />
                      <input
                        type="text"
                        className=" w-full px-4 py-3 outline-none"
                        value={monthlyVariation}
                        onChange={(e) => setMonthlyVariation(e.target.value)}
                        placeholder="Monthly Variation"
                      />
                    </div>
                    {errors.monthlyVariation && (
                      <p className="text-red-500">{errors.monthlyVariation}</p>
                    )}
                  </div>
                  {generalError && (
                    <p className="text-red-500 px-6 mt-2">{generalError}</p>
                  )}
                  <div className="mt-6 px-6 pb-4 flex justify-center gap-3 items-center">
                    <button
                      onClick={() => setIsEOpen(false)}
                      className="w-max inline-flex justify-center rounded-full border border-[#000] px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="w-max inline-flex justify-center rounded-full sm:px-8 border border-transparent bg-[#71299d] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700"
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
