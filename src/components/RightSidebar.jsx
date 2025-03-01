import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <div className='w-full max-w-xs lg:max-w-sm bg-red-50 p-5 rounded-lg shadow-lg border border-red-200'>
      {/* User Profile Section */}
      <div className='flex items-center gap-4 p-2'>
        <Link to={`/profile/${user?._id}`}>
          <Avatar className='h-14 w-14 border border-red-300'>
            <AvatarImage src={user?.profilePicture} alt="profile image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div className='flex flex-col'>
          <h1 className='font-semibold text-sm text-red-800'>
            <Link to={`/profile/${user?._id}`} className='hover:underline'>{user?.username}</Link>
          </h1>
          <span className='text-red-600 text-xs'>{user?.bio || 'No bio available'}</span>
        </div>
      </div>

      {/* Suggested Users Section */}
      <div className='mt-5 border-t pt-3 border-red-300'>
      
        <SuggestedUsers />
      </div>
    </div>
  );
};

export default RightSidebar;
