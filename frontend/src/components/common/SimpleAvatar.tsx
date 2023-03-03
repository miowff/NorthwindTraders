import { Avatar } from '@mui/material';
import React from 'react';

interface Props {
  name: string;
}

const SimpleAvatar: React.FC<Props> = ({ name }) => {
  const letters = name.split(' ').map((word) => word[0]).slice(0, 2).join('');
  const color = `#${(((letters.charCodeAt(0) || 0) ** 3 + (letters.charCodeAt(1) || 0) ** 3) % (16 ** 3)).toString(16)}`;
  return (
    <Avatar sx={{
      width: '30px',
      height: '30px',
      fontSize: '16px',
      backgroundColor: color,
      textTransform: 'uppercase',
    }}
    >
      {letters}
    </Avatar>
  );
};

export default SimpleAvatar;
