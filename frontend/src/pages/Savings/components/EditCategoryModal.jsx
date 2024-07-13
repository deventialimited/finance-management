import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { addSaving } from '../../../libs/postApis';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';
import { updateSaving } from '../../../libs/putApis';

export default function EditCategoryModal({ isEOpen, setIsEOpen }) {
  const { savings, updateAllSavings } = useBackendDataStore();
  const [category, setCategory] = useState('');
  const [accumulatedAmount, setAccumulatedAmount] = useState('');
  const [annualVariation, setAnnualVariation] = useState('');
  const [monthlyVariation, setMonthlyVariation] = useState('');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (isEOpen) {
      setCategory(isEOpen?.category || '');
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

    if (!accumulatedAmount) {
      newErrors.accumulatedAmount = 'Accumulated Amount is required';
    } else if (parseFloat(accumulatedAmount) <= 0) {
      newErrors.accumulatedAmount = 'Accumulated Amount must be greater than 0';
    }

    if (!annualVariation) {
      newErrors.annualVariation = 'Annual % Variation is required';
    }

    if (!monthlyVariation) {
      newErrors.monthlyVariation = 'Monthly % Variation is required';
    }

    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setGeneralError(''); // Clear general error if there are specific field errors
    } else {
      // Check if any value has changed
      const isAnyValueChanged =
        category !== isEOpen.category ||
        accumulatedAmount !== isEOpen.accumulatedAmount ||
        annualVariation !== isEOpen.annualVariation ||
        monthlyVariation !== isEOpen.monthlyVariation;

      if (!isAnyValueChanged) {
        setGeneralError('At least one value must be changed');
        return;
      }

      const result = await updateSaving(isEOpen._id, {
        category,
        accumulatedAmount,
        annualVariation,
        monthlyVariation,
      });
      if (result) {
        console.log('Saving updated successfully', result);
        // Reset form or show success message
        // Update savings array with the updated result
        const updatedSavings = savings.map((saving) =>
          saving._id === result._id ? result : saving,
        );

        updateAllSavings(updatedSavings);
        setCategory('');
        setAccumulatedAmount('');
        setAnnualVariation('');
        setMonthlyVariation('');
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

                  <div className="mt-4 px-6 flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-[#dcdcdc] outline-none border-2 px-4 py-3 shadow-sm sm:text-sm"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Category"
                    />
                    {errors.category && (
                      <p className="text-red-500">{errors.category}</p>
                    )}
                  </div>
                  <div className="mt-4 px-6 flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Accumulated Amount
                    </label>
                    <input
                      type="Number"
                      className="mt-1 block w-full rounded-md border-[#dcdcdc] outline-none border-2 px-4 py-3 shadow-sm sm:text-sm"
                      value={accumulatedAmount}
                      onChange={(e) => setAccumulatedAmount(e.target.value)}
                      placeholder="Accumulated Amount"
                    />
                    {errors.accumulatedAmount && (
                      <p className="text-red-500">{errors.accumulatedAmount}</p>
                    )}
                  </div>
                  <div className="mt-4 px-6 flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Annual % Variation
                    </label>
                    <input
                      type="Number"
                      className="mt-1 block w-full rounded-md border-[#dcdcdc] outline-none border-2 px-4 py-3 shadow-sm sm:text-sm"
                      value={annualVariation}
                      onChange={(e) => setAnnualVariation(e.target.value)}
                      placeholder="Annual % Variation"
                    />
                    {errors.annualVariation && (
                      <p className="text-red-500">{errors.annualVariation}</p>
                    )}
                  </div>
                  <div className="mt-4 px-6 flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Monthly % Variation
                    </label>
                    <input
                      type="Number"
                      className="mt-1 block w-full rounded-md border-[#dcdcdc] outline-none border-2 px-4 py-3 shadow-sm sm:text-sm"
                      value={monthlyVariation}
                      onChange={(e) => setMonthlyVariation(e.target.value)}
                      placeholder="Monthly % Variation"
                    />
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
