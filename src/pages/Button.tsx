import { Button } from '@/components/ui/button';
import React from 'react';

const ButtonPage = () => {
  return (
    <div>
      <Button
        onClick={() => console.log('entre')}
        size={'lg'}
        variant="secondary"
      >
        Click me
      </Button>
    </div>
  );
};

export default ButtonPage;
