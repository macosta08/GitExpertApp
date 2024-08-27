import { Button } from '@/components/ui/button';
import React from 'react';

const ButtonPage = () => {
  return (
    <div>
      <Button
        onClick={() => console.log('entre')}
        size={'lg'}
        variant="destructive"
      >
        Click me
      </Button>
    </div>
  );
};

export default ButtonPage;
