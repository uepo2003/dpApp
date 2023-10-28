import React, { useState } from 'react';
import axios from 'axios';

 import { FollowProps } from './Id';
const FollowButton: React.FC<FollowProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const follow = async () => {
    try {
      await axios.post('/follow', { user });
      setIsFollowing(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={follow} disabled={isFollowing}>
      {isFollowing ? 'フォロー中' : 'フォローする'}
    </button>
  );
}

export default FollowButton;
