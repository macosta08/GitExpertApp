import React, { useState } from 'react';

interface AddCategoryProps {
  onAddElement: (newCategory: string) => void;
}

const useForm = ({ onAddElement }: AddCategoryProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onChangeInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (inputValue.trim().length <= 1) return;
    onAddElement(inputValue.trim());
    setInputValue('');
  };

  return {
    onChangeInput,
    onSubmit,
    inputValue,
  };
};

export default useForm;
