import React, { useState } from 'react';
import {
  Control,
  FieldValues,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import libphonenumber from 'google-libphonenumber';

// Define props for the PhoneInput component
interface PhoneInputProps {
  id: string;
  control: Control<FieldValues, any>;
  errors: FieldErrors;
  setValue: UseFormSetValue<FieldValues>;
  isSubmitted: boolean;
}

const PhoneNumberInput: React.FC<PhoneInputProps> = ({
  control,
  id,
  errors,
  setValue,
  isSubmitted,
}) => {
  const [phoneNumberData, setPhoneNumberData] = useState<CountryData>({
    name: 'United States',
    dialCode: '+1',
    countryCode: 'us',
    format: '+. (...) ...-....',
  });

  const validatePhoneNumber = (
    value: string,
    inputInformation: CountryData
  ) => {
    const isValid = true;
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

    const phoneNumber = value.substring(inputInformation.dialCode.length);

    const exampleNumberLengthByCountryCode = phoneUtil
      .getExampleNumber(inputInformation.countryCode)
      .getNationalNumber()
      ?.toString().length;

    if (phoneNumber.length !== exampleNumberLengthByCountryCode) {
      return false;
    }

    return isValid;
  };

  const handleOnChange = (value: string, inputData: CountryData) => {
    setValue(id, value, { shouldValidate: isSubmitted });
    setPhoneNumberData(() => inputData);
  };

  return (
    <Controller
      name={id}
      control={control}
      rules={{
        required: 'Phone number is required!',
        validate: (fieldValue) => {
          const isValid = validatePhoneNumber(fieldValue, phoneNumberData);
          return isValid || 'Phone Number is not valid!';
        },
      }}
      render={({ field }) => {
        return (
          <div className='flex flex-col'>
            <PhoneInput
              onChange={(value, inputData) =>
                handleOnChange(value, inputData as CountryData)
              }
              value={field.value}
              country={'us'}
              inputStyle={{ width: '100%', color: '#fff' }}
              inputProps={{
                className: `pr-4 pl-[50px] py-2.5 text-base rounded-lg bg-[#161925] rounded-lg ${
                  errors[id] && 'focus:ring-red-500'
                }`,
              }}
              buttonClass="!border !border-[#161925] !rounded-lg"
              dropdownClass='!bg-[#161925]'
              searchClass='!bg-[#161925]'
              placeholder="Enter your phone number"
              enableSearch
              countryCodeEditable={true}
              autoFormat
            />
            {errors[id] && errors[id]?.message && (
              <span className="text-red-500 text-base mt-1.5">
                {errors[id]?.message as React.ReactNode}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};

export default PhoneNumberInput;
