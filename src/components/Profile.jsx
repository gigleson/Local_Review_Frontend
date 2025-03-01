import useGetUserProfile from '@/hooks/useGetUserProfile';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';

const Profile = () => {
  const params = useParams();
  const userId = params.id;

  // Fetch user profile data
  useGetUserProfile(userId);

  const [activeTab, setActiveTab] = useState('posts');
  const { userProfile, user } = useSelector(store => store.auth);

  // Check if this is the logged-in user's profile
  const isLoggedInUserProfile = user?._id === userProfile?._id;

  // State for follow/unfollow and follower count
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (userProfile) {
      setIsFollowing(userProfile?.followers?.includes(user?._id));
      setFollowerCount(userProfile?.followers?.length);
    }
  }, [userProfile, user]);

  // Follow/Unfollow Handler
  const handleFollowUnfollow = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/followorunfollow/${userProfile?._id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsFollowing(prev => !prev);
        setFollowerCount(prev => (isFollowing ? prev - 1 : prev + 1));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error following/unfollowing:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPosts = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className='flex max-w-5xl justify-center mx-auto pl-10'>
      <div className='flex flex-col gap-20 p-8'>
        <div className='grid grid-cols-2'>
          <section className='flex items-center justify-center'>
            <Avatar className='h-32 w-32'>
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <span>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button variant='secondary' className='hover:bg-gray-200 h-8'>Edit profile</Button>
                    </Link>
                   
                  </>
                ) : (
                  <Button 
                    className={`h-8 ${isFollowing ? 'bg-gray-300' : 'bg-[#0095F6] hover:bg-[#3192d2]'}`}
                    onClick={handleFollowUnfollow}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                )}
              </div>
              <div className='flex items-center gap-4'>
                <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
                <p><span className='font-semibold'>{followerCount} </span>followers</p>
                <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
                <Badge className='w-fit' variant='secondary'><AtSign /> <span className='pl-1'>{userProfile?.username}</span> </Badge>
                
              </div>
            </div>
          </section>
        </div>
        <div className='border-t border-t-gray-200'>
          <div className='flex items-center justify-center gap-10 text-sm'>
            <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
              POSTS
            </span>
            <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
              SAVED
            </span>
           
          </div>
          <div className='grid grid-cols-3 gap-1'>
            {displayedPosts?.map((post) => (
              <div key={post?._id} className='relative group cursor-pointer'>
                <img src={post.image} alt='postimage' className='rounded-sm my-2 w-full aspect-square object-cover' />
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='flex items-center text-white space-x-4'>
                    <button className='flex items-center gap-2 hover:text-gray-300'>
                      <Heart />
                      <span>{post?.likes.length}</span>
                    </button>
                    <button className='flex items-center gap-2 hover:text-gray-300'>
                      <MessageCircle />
                      <span>{post?.comments.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
