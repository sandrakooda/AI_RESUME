// import React, { useEffect, useState } from 'react'
// import AddResume from './components/AddResume'
// import { useUser } from '@clerk/clerk-react'
// import GlobalApi from './../../service/GlobalApi';
// import ResumeCardItem from './components/ResumeCardItem';

// function Dashboard() {

//   const {user}=useUser();
//   const [resumeList,setResumeList]=useState([]);
//   useEffect(()=>{
//     user&&GetResumesList()
//   },[user])

//   /**
//    * Used to Get Users Resume List
//    */
//   const GetResumesList=()=>{
//     GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
//     .then(resp=>{
//       console.log(resp.data.data)
//       setResumeList(resp.data.data);
//     })
//   }
//   return (
//     <div className='p-10 md:px-20 lg:px-32'>
//       <h2 className='font-bold text-3xl'>My Resume</h2>
//       <p>Start Creating AI resume to your next Job role</p>
//       <div className='grid grid-cols-2 
//       md:grid-cols-3 lg:grid-cols-5 gap-5
//       mt-10
//       '>
//         <AddResume/>
//         {resumeList.length>0?resumeList.map((resume,index)=>(
//           <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
//         )):
//         [1,2,3,4].map((item,index)=>(
//           <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
//           </div>
//         ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Dashboard
// ******************************************************

import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]); // Initialize as empty array

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  const GetResumesList = () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    GlobalApi.GetUserResumes(user.primaryEmailAddress.emailAddress)
      .then((resp) => {
        console.log("Fetched Resumes:", resp.data.data); // Debug API data
        setResumeList(resp.data.data || []); // Update state
      })
      .catch((error) => {
        console.error("Error fetching resumes:", error);
        setResumeList([]); // Fallback to empty array
      });
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume for your next Job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        <AddResume refreshData={GetResumesList} />
        {resumeList.length > 0 ? (
          resumeList.map((resume, index) => (
            <ResumeCardItem
              resume={resume}
              key={index}
              refreshData={GetResumesList}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No resumes found. Start by adding a new one!
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
