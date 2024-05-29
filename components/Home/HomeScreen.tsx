import { FlashList } from "@shopify/flash-list";
import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
import { View, TextInput, Text, Button, Alert, Modal, ViewBase } from 'react-native'
import * as React from 'react'
import { useEffect, useState } from 'react';
import JWTStore from '@/app/store';
import { Redirect, useFocusEffect, useRouter } from 'expo-router';
import PillShapeButtonForHomeScreen from './buttons/pillShapeButtonForHomeScreen';
import { Modal as ModalFromRNPaper, Portal,Button as ButtonFromRNPaper } from 'react-native-paper';
//   import axios, { AxiosError } from 'axios';
// import axiosInstance from "../auth/utils/new_tokens_auth";
import { useQuery } from "@tanstack/react-query";
import UpdateJWT, { QueryFunction } from "../auth/utils/functions_for_updating_tokens";
import { alert_user_for_common__errors_from_backend_given_by_Rquery } from "../auth/utils/func_to_alert_user_for_common_querystatus_and_message_to_displa";
import function_to_make_react_query_request from "../auth/utils/function_to_make_react_query_request";
import * as Linking from 'expo-linking';



  export default function HomeScreen() {    
    const router = useRouter();
    const { setJWT,JWT } = JWTStore();
    const [IsFirstRequest , setIsFirstRequest] = useState(true)
    const [inputText , setInputText] = useState(null)

    const [makeARequestForTempProject , setMakeARequestForTempProject] = useState(false)
    const [makeARequestFormTempToProject , setMakeARequestFormTempToProject] = useState(false)
    const [makeARequestForDeleteAProjectOrTemp , setMakeARequestForDeleteAProjectOrTemp] = useState(false)
    const [makeARequestForGetAllUserProject , setMakeARequestForGetAllUserProject] = useState(false)
    const [makeARequestForGetNameForTheProject , setMakeARequestForGetNameForTheProject] = useState(false)


    const [responnseJSONForGetNameForTheProject , setResponnseJSONForGetNameForTheProject] = useState(null)
    const [responnseJSONForTempSite , setResponnseJSONForTempSite] = useState(null)
    const [responnseJSONForTempToProduction , setResponnseJSONForTempToProduction] = useState(null)
    const [responnseJSONForDeleteAProjectOrTemp , setResponnseJSONForDeleteAProjectOrTemp] = useState(null)
    const [responnseJSONForGetAllUserProject , setResponnseJSONForGetAllUserProject] = useState(null)
    
    const [nameGeneratedFromTheDjango , setNameGeneratedFromTheDjango] = useState(false)
   
    const [project_name , setProject_name] = useState<string|null>(null)
    const [projectLink , setProjectLink] = useState<string|null>(null)
    const [modalToShowTheProjectHostedLink , setModalToShowTheProjectHostedLink] = useState(false)
    


    // -----modal ----
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    // useEffect(()=>{
    //     console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT,"\n ====>make a request -->",makeARequest)
    //   },[JWT,makeARequest])


// let a 
// a = function_to_make_react_query_request("temp_website",setJWT,setResponnseJSONForTempSite, setMakeARequestForTempProject, makeARequestForTempProject)

const {data, isSuccess, status, refetch} = useQuery({
  queryKey:['temp_website'],
  queryFn: ()=>QueryFunction('temp_website', setJWT, refetch, setMakeARequestForTempProject, setResponnseJSONForTempSite, 
    {
      prompt: "Give me a website for a shop owner that that sells jwellery , but make it  material design with extreme curves that has its own personality  and make the colors(bg and all) as posh as possible (meaning play with  golds silver(these were examples , make your own combination for sure) with unique buttons ,bg and animations that aims to sell it to 1% (wealth wise) ) , we will be selling it to a luxury brand "
    }),
  enabled:makeARequestForTempProject,
  // retry:2
  // ------------ decide on the project name  ----------------
})

useEffect(()=>{console.log("\n\n ============================||----||data from the query fucntion============================||------||" , "\n\n-->>",(responnseJSONForTempSite?responnseJSONForTempSite:"") );
if (data!=null || data!= undefined){
  console.log("\n data in the isSuccess -->>",isSuccess,"\n\n ",);
  console.log("\n data in the useeffect -->>",data);
  
  alert_user_for_common__errors_from_backend_given_by_Rquery(data)
  if (data.body.status_code){
    if (data.body.status_code === 200 || data.body.status_code === 201){
      setIsFirstRequest(false)
    }
  }
}
},[data, responnseJSONForTempSite, isSuccess, status])







// ------------------------XXXXX_----------------





 


const temp_website_to_production_RQ = useQuery({
  queryKey:['temp_website_to_production'],
  queryFn: ()=>QueryFunction(`temp_website_to_production?project_name=${project_name}`,setJWT,temp_website_to_production_RQ.refetch,setMakeARequestFormTempToProject,setResponnseJSONForTempToProduction, {}),
  enabled:makeARequestFormTempToProject,
  // retry:2
  // ------------ decide on the project name  ----------------
})

useEffect(()=>{console.log("\n\n ============================||----||data from the query fucntion============================||------||" , "\n\n-->>",(responnseJSONForTempToProduction?responnseJSONForTempToProduction:"") );
if (temp_website_to_production_RQ.data!=null || temp_website_to_production_RQ.data!= undefined){
  console.log("\n temp_website_to_production_RQ isSuccess -->>",temp_website_to_production_RQ.isSuccess,"\n\n ",);
  console.log("\n temp_website_to_production_RQ useeffect -->>",temp_website_to_production_RQ.data);
  
  alert_user_for_common__errors_from_backend_given_by_Rquery(temp_website_to_production_RQ.data)
  if(temp_website_to_production_RQ.data.body){
    setIsModalVisible(false)
    setModalToShowTheProjectHostedLink(true)
    setProjectLink(temp_website_to_production_RQ.data.body.link_for_the_current_site)
  }
}
},[temp_website_to_production_RQ.data, responnseJSONForTempToProduction, temp_website_to_production_RQ.isSuccess, temp_website_to_production_RQ.status])




// ------------ xxxxxxx ------------




const delete_a_project_or_temp = useQuery({
  queryKey:['delete_a_project_or_temp'],
  queryFn: ()=>QueryFunction(`delete_a_project_or_temp?project_name=${project_name}`, setJWT, delete_a_project_or_temp.refetch,setMakeARequestForDeleteAProjectOrTemp,setResponnseJSONForDeleteAProjectOrTemp, {}),
  enabled:makeARequestForDeleteAProjectOrTemp,
  // retry:2
  // ------------ decide on the project name  ----------------
})

useEffect(()=>{console.log("\n\n ============================||----||data from the query fucntion============================||------||" , "\n\n-->>",(responnseJSONForDeleteAProjectOrTemp?responnseJSONForDeleteAProjectOrTemp:"") );
if (delete_a_project_or_temp.data!=null || delete_a_project_or_temp.data!= undefined){
  console.log("\n data in the isSuccess -->>",delete_a_project_or_temp.isSuccess,"\n\n ",);
  console.log("\n data in the useeffect -->>",delete_a_project_or_temp.data);
  
  alert_user_for_common__errors_from_backend_given_by_Rquery(delete_a_project_or_temp.data)
}
},[temp_website_to_production_RQ.data, responnseJSONForTempToProduction, temp_website_to_production_RQ.isSuccess, temp_website_to_production_RQ.status])






//  --------- XXXXXXXXX -----------------------




const get_all_the_projects_of_the_user = useQuery({
  queryKey:['get_all_the_projects_of_the_user'],
  queryFn: ()=>QueryFunction(`get_all_the_projects_of_the_user`,setJWT,get_all_the_projects_of_the_user.refetch,setMakeARequestForGetAllUserProject,setResponnseJSONForGetAllUserProject, {}),
  enabled:makeARequestForGetAllUserProject,
  // retry:2
  // ------------ decide on the project name  ----------------
})

useEffect(()=>{console.log("\n\n ============================||----||data from the query fucntion============================||------||" , "\n\n-->>",(responnseJSONForGetAllUserProject?responnseJSONForGetAllUserProject:"") );
if (get_all_the_projects_of_the_user.data!=null || get_all_the_projects_of_the_user.data!= undefined){
  console.log("\n data in the isSuccess -->>",get_all_the_projects_of_the_user.isSuccess,"\n\n ",);
  console.log("\n data in the useeffect -->>",get_all_the_projects_of_the_user.data);
  
  alert_user_for_common__errors_from_backend_given_by_Rquery(get_all_the_projects_of_the_user.data)
}
},[get_all_the_projects_of_the_user.data, responnseJSONForGetAllUserProject, get_all_the_projects_of_the_user.isSuccess, get_all_the_projects_of_the_user.status])




// -----------------------------------__XXXXXXXXXXX__XX-


// ---------------some problem/wromg with this method this is not sending requests----------------------
const get_the_name_for_the_project = useQuery({
  queryKey:['get_the_name_for_the_project'],
  queryFn: ()=>QueryFunction(`get_the_name_for_the_project`,setJWT,get_the_name_for_the_project.refetch,setMakeARequestForGetNameForTheProject,setResponnseJSONForGetNameForTheProject, {"prompt":inputText}),
  enabled:makeARequestForGetNameForTheProject,
  // retry:2
  // ------------ decide on the project name  ----------------
})

useEffect(()=>{console.log("\n\n ============================||----||data from the query fucntion============================||------||" , "\n\n-->>",(responnseJSONForGetNameForTheProject?responnseJSONForGetNameForTheProject:"") );
if (get_the_name_for_the_project.data!=null || get_the_name_for_the_project.data!= undefined){
  console.log("\n data in the isSuccess -->>",get_the_name_for_the_project.isSuccess,"\n",);
  console.log("\n data in the useeffect -->>",get_the_name_for_the_project.data);
  
  alert_user_for_common__errors_from_backend_given_by_Rquery(get_the_name_for_the_project.data)
  if(get_the_name_for_the_project.data.body.project_name){
    // console.log("\n--- about to set the project name---\n");
    
    setProject_name(get_the_name_for_the_project.data.body.project_name)
    setNameGeneratedFromTheDjango(true)
  }
}
},[get_the_name_for_the_project.data, responnseJSONForGetNameForTheProject, get_the_name_for_the_project.isSuccess, get_the_name_for_the_project.status])






// -------make a function that takes in the data from react query amd alerts all teh function of the  common errors 400 , 500 , message to display to the userrs




  
  // ------------------------------- react query ------------------------------

  

 
    return (
      <View style={{ flex: 1, backgroundColor: '#010c1c', paddingTop: 150 }}>
       <Portal>
        <ModalFromRNPaper visible={modalToShowTheProjectHostedLink} onDismiss={()=>setModalToShowTheProjectHostedLink(false)} contentContainerStyle={{backgroundColor:"#010c1c",padding:20, borderRadius:28
          ,paddingVertical:90 , justifyContent:"center"
        }}
        dismissable={true} dismissableBackButton={true} theme={{version:3, roundness:20}} 
        >
          <Text className=" text-white text-xl">Your website is ready, to see it just click on the button </Text>
         <View className=" flex-row justify-center pt-7">

          <ButtonFromRNPaper
          className="px-6 mx-4"
          mode="outlined" buttonColor={"#6edcfa"} textColor="#000"
          onTouchStart={()=>{
            setModalToShowTheProjectHostedLink(false)
          }}
          
          >Cancel</ButtonFromRNPaper>

          <ButtonFromRNPaper
          mode="outlined" buttonColor={"#6edcfa"} textColor="#000"
          onTouchStart={async()=>{
            let a = await Linking.canOpenURL(projectLink)
            if (a){
              Linking.openURL(projectLink)
            }
            else{
              Alert.alert("Can't open the link", "Sorry we can't open the url in a web browser ,please copy it and paste it there")
            }
          }}
          >See the Site in action</ButtonFromRNPaper>
         </View>
        </ModalFromRNPaper>

      </Portal>

          <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={()=>setIsModalVisible(false)}
        animationType="slide"
        >
          <View className="text-white flex rounded-3xl mt-60 mx-6 border-white border-2 p-7 " style={{backgroundColor:'#010c1c'}}   >
            {project_name?(<>
              <Text className=" text-white text-2xl ">Project name:  <Text>{project_name}</Text> </Text>
              <Text className="text-slate-200 pt-6 ">To change the title just type it down</Text>
            </>) 
              :
              nameGeneratedFromTheDjango?(<Text className=" text-white text-xl">Start by typing your name below</Text>)
                  : 
                  (<Text className=" text-stone-400">Hold on! generating the project name</Text>)
           
            }


            {/*  make a title with text saying project name in  bold , and down below will be a text stating the input  */}
            {/* ----------- On modal and another input --------------- */}
            {/* well you see id the modal is open then just make the values of text input down to be that  */}
            {/* ----------- On modal and another input --------------- */}

          <TextInput className=" my-1  border-2 border-white rounded-3xl py-3 px-4" style={{backgroundColor: '#5a7ead' }}
          onChangeText={(text) => setProject_name(text)}  value={project_name}
          />
         <View className=" flex-row justify-center pt-4">
         <PillShapeButtonForHomeScreen colorOnTheBorderAndInTheText="#0ce80c" textToBeDisplayed="deploy" function_to_run_on_touch={
            ()=>{
              // -- call the api with the name set here 
              console.log("ibfbvioub");
              if (project_name.length > 1){
                console.log("\n--D4c--");
                setMakeARequestFormTempToProject(true)
              }
              
            }
          } />
          <PillShapeButtonForHomeScreen colorOnTheBorderAndInTheText="#db0000" textToBeDisplayed="cancel" function_to_run_on_touch={
            ()=>{
              // -- call the func when the site is successfully made and show the site to the user
             setIsModalVisible(false)
              
            }
          } />
         </View>
            </View>    
      </Modal>
   
       
        {/* <Button title='remove' onPress={async ()=>{
          setMakeARequest(true)

        }} /> */}
        
        {/* <View className="mt-3">
        <Button title="delete jwt"
        onPress={()=>{
                  deleteItemAsync("JWT") ;
          
           console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
           setJWT(null)
          
    router.replace('/(main_app)/');
        }} />
        </View> */}

        <View style={{ flex: 1, backgroundColor: '#5a7ead', borderTopLeftRadius: 32, borderTopRightRadius:32, paddingBottom:24 }}>

        
        <View className="flex-1 items-center justify-center">
          {IsFirstRequest? ( 
            <>
              <Text className=" text-xl font-sans font-bold text-slate-900">Hi! Let's make you a website</Text>
              <PillShapeButtonForHomeScreen textToBeDisplayed={'Generate'} colorOnTheBorderAndInTheText={'#000000'} function_to_run_on_touch={()=>{
                setIsFirstRequest(false)
              // if( inputText != null || inputText != undefined ){
              //     setMakeARequestForTempProject(true)
              //     setMakeARequestForGetNameForTheProject(true);
              //     setIsModalVisible(true)
              //     // String(inputText).length >2 ||
              //   }
              //   else{
              //     Alert.alert("Text can't be empty", "Input can't be empty , please describe something about your website")
              //   }
                }} />
              
            </>
          )
          :
          (
            <>
            <PillShapeButtonForHomeScreen textToBeDisplayed={'Deploy'} colorOnTheBorderAndInTheText={'#0ce80c'} function_to_run_on_touch={()=>{
             setMakeARequestForGetNameForTheProject(true);
             setIsModalVisible(true)

            
                }} />
            <PillShapeButtonForHomeScreen textToBeDisplayed={'Fix It'} colorOnTheBorderAndInTheText={'#f20a77'} />
            </>
          )}

        </View>

        </View>

        <View style={{ paddingTop:5, paddingBottom:10 ,position: 'absolute', bottom: 0, left: 0, right: 0, 
        alignItems:"center",backgroundColor: '#5a7ead' , borderRadius:24}}>
          <TextInput className='z-10 border-2 px-4 w-96 rounded-3xl py-4 text-white border-white h-auto max-h-44' 
              placeholder='Describe you website' placeholderTextColor={"#000a14"} multiline={true} numberOfLines={1} 
              onChangeText={(text) => setInputText(text)} value={inputText} 
              autoFocus={true}  
            />
        </View>
      </View>
    )
  }