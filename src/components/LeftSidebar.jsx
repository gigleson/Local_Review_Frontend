// import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
// import React, { useState } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { toast } from 'sonner'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { setAuthUser } from '@/redux/authSlice'
// import CreatePost from './CreatePost'
// import { setPosts, setSelectedPost } from '@/redux/postSlice'
// import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
// import { Button } from './ui/button'

// const LeftSidebar = () => {
//     const navigate = useNavigate();
//     const { user } = useSelector(store => store.auth);
//     const { likeNotification } = useSelector(store => store.realTimeNotification);
//     const dispatch = useDispatch();
//     const [open, setOpen] = useState(false);


//     const logoutHandler = async () => {
//         try {
//             const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
//             if (res.data.success) {
//                 dispatch(setAuthUser(null));
//                 dispatch(setSelectedPost(null));
//                 dispatch(setPosts([]));
//                 navigate("/login");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     }

//     const sidebarHandler = (textType) => {
//         if (textType === 'Logout') {
//             logoutHandler();
//         } else if (textType === "Create") {
//             setOpen(true);
//         } else if (textType === "Profile") {
//             navigate(`/profile/${user?._id}`);
//         } else if (textType === "Home") {
//             navigate("/");
//         } else if (textType === 'Messages') {
//             navigate("/chat");
//         }
//     }

//     const sidebarItems = [
//         { icon: <Home />, text: "Home" },
        
//         { icon: <MessageCircle />, text: "Messages" },
//         { icon: <Heart />, text: "Notifications" },
//         { icon: <PlusSquare />, text: "Create" },
//         {
//             icon: (
//                 <Avatar className='w-6 h-6'>
//                     <AvatarImage src={user?.profilePicture} alt="@shadcn" />
//                     <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//             ),
//             text: "Profile"
//         },
//         { icon: <LogOut />, text: "Logout" },
//     ]
//     return (
//         <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
//             <div className='flex flex-col'>
//                 <h1 className='my-8 pl-3 font-bold text-xl'>LOGO</h1>
//                 <div>
//                     {
//                         sidebarItems.map((item, index) => {
//                             return (
//                                 <div onClick={() => sidebarHandler(item.text)} key={index} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
//                                     {item.icon}
//                                     <span>{item.text}</span>
//                                     {
//                                         item.text === "Notifications" && likeNotification.length > 0 && (
//                                             <Popover>
//                                                 <PopoverTrigger asChild>
//                                                     <Button size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{likeNotification.length}</Button>
//                                                 </PopoverTrigger>
//                                                 <PopoverContent>
//                                                     <div>
//                                                         {
//                                                             likeNotification.length === 0 ? (<p>No new notification</p>) : (
//                                                                 likeNotification.map((notification) => {
//                                                                     return (
//                                                                         <div key={notification.userId} className='flex items-center gap-2 my-2'>
//                                                                             <Avatar>
//                                                                                 <AvatarImage src={notification.userDetails?.profilePicture} />
//                                                                                 <AvatarFallback>CN</AvatarFallback>
//                                                                             </Avatar>
//                                                                             <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
//                                                                         </div>
//                                                                     )
//                                                                 })
//                                                             )
//                                                         }
//                                                     </div>
//                                                 </PopoverContent>
//                                             </Popover>
//                                         )
//                                     }
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//             </div>

//             <CreatePost open={open} setOpen={setOpen} />

//         </div>
//     )
// }

// export default LeftSidebar


import { Heart, Home, LogOut, MessageCircle, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // State for mobile sidebar toggle

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        } else if (textType === 'Messages') {
            navigate("/chat");
        }
    };

    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },
    ];

    return (
        <div className="relative">
            {/* Sidebar for large screens */}
            <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen bg-red-50 text-black hidden lg:block">
                <div className="flex flex-col">
                    {/* Centered Logo */}
                    <div className="my-8 pl-3 flex justify-center">
                        <img src="/logo.png" alt="Your Logo" className="h-15 w-auto" />
                    </div>
                    <div>
                        {sidebarItems.map((item, index) => {
                            return (
                                <div
                                    onClick={() => sidebarHandler(item.text)}
                                    key={index}
                                    className="flex items-center gap-3 relative hover:bg-red-100 cursor-pointer rounded-lg p-3 my-3 transition duration-200"
                                >
                                    <span className="text-red-600">{item.icon}</span>
                                    <span className="text-black font-medium">{item.text}</span>
                                    {item.text === "Notifications" && likeNotification.length > 0 && (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    size="icon"
                                                    className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-500 absolute bottom-6 left-6 text-white"
                                                >
                                                    {likeNotification.length}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="border-gray-300 bg-white text-black">
                                                <div>
                                                    {likeNotification.length === 0 ? (
                                                        <p>No new notifications</p>
                                                    ) : (
                                                        likeNotification.map((notification) => {
                                                            return (
                                                                <div key={notification.userId} className="flex items-center gap-2 my-2">
                                                                    <Avatar>
                                                                        <AvatarImage src={notification.userDetails?.profilePicture} />
                                                                        <AvatarFallback>CN</AvatarFallback>
                                                                    </Avatar>
                                                                    <p className="text-sm">
                                                                        <span className="font-bold text-red-600">
                                                                            {notification.userDetails?.username}
                                                                        </span>{" "}
                                                                        liked your post
                                                                    </p>
                                                                </div>
                                                            );
                                                        })
                                                    )}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <CreatePost open={open} setOpen={setOpen} />
            </div>

            {/* Hamburger menu and mobile sidebar */}
            <div className="lg:hidden fixed bottom-4 left-4 z-20 bg-white shadow-md p-2 rounded-full">
                {/* Hamburger Icon */}
                <button
                    className="text-black"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <span className="text-3xl">&#9776;</span>
                </button>
            </div>

            {/* Sidebar menu (mobile view) */}
            {isSidebarOpen && (
                <div className="absolute top-0 left-0 w-2/3 h-screen bg-white shadow-lg z-30 p-4">
                    {/* Logo inside mobile sidebar */}
                    <div className="my-8 pl-3 flex justify-center">
                        <img src="/logo.png" alt="Your Logo" className="h-12 w-auto" />
                    </div>

                    {sidebarItems.map((item, index) => {
                        return (
                            <div
                                onClick={() => {
                                    sidebarHandler(item.text);
                                    setIsSidebarOpen(false); // Close the sidebar after item click
                                }}
                                key={index}
                                className="flex items-center gap-3 p-3 my-3 rounded-lg hover:bg-red-100 cursor-pointer"
                            >
                                <span className="text-red-600">{item.icon}</span>
                                <span className="text-black font-medium">{item.text}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LeftSidebar;
