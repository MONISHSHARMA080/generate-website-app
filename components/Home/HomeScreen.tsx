import {  deleteItemAsync, setItem } from 'expo-secure-store';
import { View, TextInput, Text, Button, Alert, Modal, ViewBase,StyleSheet, Dimensions } from 'react-native'
import * as React from 'react'
import { useEffect, useState } from 'react';
import JWTStore from '@/app/store';
// import { Redirect, router, useFocusEffect, useRouter } from 'expo-router';
import PillShapeButtonForHomeScreen from './buttons/pillShapeButtonForHomeScreen';
import { Modal as ModalFromRNPaper, Portal,Button as ButtonFromRNPaper, Snackbar, Drawer } from 'react-native-paper';
//   import axios, { AxiosError } from 'axios';
// import axiosInstance from "../auth/utils/new_tokens_auth";
import { useQuery } from "@tanstack/react-query";
import  { QueryFunction } from "../auth/utils/functions_for_updating_tokens";
import { alert_user_for_common__errors_from_backend_given_by_Rquery } from "../auth/utils/func_to_alert_user_for_common_querystatus_and_message_to_displa";
import function_to_make_react_query_request from "../auth/utils/function_to_make_react_query_request";
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import DrawerToShowPreviousSites from './Drawer';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import reactQueryMakeAReq from './utils/abstract_function/reactQueryMakeAReq';


export default function HomeScreen() {

 

    
    
    // const router = useRouter();
    const router = useRouter();
    const { setJWT,JWT, sitePromptStoredInState, setSitePromptStoredInState, setSitePromptArray, setUser_Name_from_Req, User_Name_from_Req, openDrawer, setOpenDrawer } = JWTStore();
    const [IsFirstRequest , setIsFirstRequest] = useState(true)
    const [inputText , setInputText] = useState(null)
    const [makeARequestForTempProject , setMakeARequestForTempProject] = useState(false)
    const [makeARequestFormTempToProject , setMakeARequestFormTempToProject] = useState(false)
    const [makeARequestForDeleteAProjectOrTemp , setMakeARequestForDeleteAProjectOrTemp] = useState(false)
    const [makeARequestForGetAllUserProject , setMakeARequestForGetAllUserProject] = useState(false)
    const [makeARequestForGetNameForTheProject , setMakeARequestForGetNameForTheProject] = useState(false)
    
    const [showSnackBarToTellThatWeUsedPreviousPromptFromZustandState , setShowSnackBarToTellThatWeUsedPreviousPromptFromZustandState] = useState(false)

    const [responnseJSONForGetNameForTheProject , setResponnseJSONForGetNameForTheProject] = useState(null)
    const [responnseJSONForTempSite , setResponnseJSONForTempSite] = useState(null)
    const [responnseJSONForTempToProduction , setResponnseJSONForTempToProduction] = useState(null)
    const [responnseJSONForDeleteAProjectOrTemp , setResponnseJSONForDeleteAProjectOrTemp] = useState(null)
    const [responnseJSONForGetAllUserProject , setResponnseJSONForGetAllUserProject] = useState(null)
    
    const [nameGeneratedFromTheDjango , setNameGeneratedFromTheDjango] = useState(false)
   
    const [project_name , setProject_name] = useState<string|null>(null)
    const [projectLink , setProjectLink] = useState<string|null>(null)
    const [tempLink , setTempLink] = useState<string|null>(null)
    const [modalToShowTheProjectHostedLink , setModalToShowTheProjectHostedLink] = useState(false)
    
    // -----modal ----
    const [isModalVisible, setIsModalVisible] = useState(false);

    const modalTranslateX = useSharedValue(0);
  
    useEffect(() => {
      if (openDrawer) {
        console.log(" we have the drawer in the index.tsx");
        
        modalTranslateX.value = withTiming(0, { duration: 300 });
      } else {
        modalTranslateX.value = withTiming(-Dimensions.get('window').width, { duration: 300 });
      }
    }, [
      openDrawer,
       modalTranslateX]);
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: modalTranslateX.value }],
      };
    });
    
    

const {data, isSuccess, status, refetch, isLoading} = useQuery({
  queryKey:['temp_website'],
  queryFn: ()=>QueryFunction('temp_website', setJWT, refetch, setMakeARequestForTempProject, setResponnseJSONForTempSite, 
    {
      // prompt: "make me a  website for a shop owner that that sells clothes (also make the links), they should be very much inspired from the material ui and the buttons should change the site ; make the colors of the background and buttons etc as colorful as possible and animations that aims  that make it oddly satisfying , we will be selling it as a luxury brand "
      prompt: inputText
    }),
  enabled:makeARequestForTempProject,
  retry:2
  // ------------ decide on the project name  ----------------
})

// const {data, isSuccess, status, refetch, isLoading} = reactQueryMakeAReq('temp_website',makeARequestForTempProject, setMakeARequestForTempProject, setResponnseJSONForTempSite, {prompt: inputText}, setJWT  )



useEffect(()=>{console.log("\n\n ============================||----||data from the query fucntion============================||------||" , "\n\n-->>",(responnseJSONForTempSite?responnseJSONForTempSite:"") );
  // let data = temp_website.data
if (data!=null || data!= undefined){
  console.log("\n data in the isSuccess -->>",isSuccess,"\n\n ",);
  console.log("\n data in the useeffect in str -->>",String(data));
  console.log("\n data in the useeffect -->>",data);
  
  alert_user_for_common__errors_from_backend_given_by_Rquery(data)
  if (data.body.message_for_the_user && data.body.message_for_the_user.trim()=== "Oops! Your name was not found on the server" ){

    // if the user name is not there delete the credentials and go the sign in screen 
    
              deleteItemAsync("JWT") ;
              
              //  console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
              setJWT(null)
              
              router.replace('/(main_app)/');
    // probally return too
    return
  }
  if (data.body.status_code){
    // if made a 1st req and got the err, do not make it first
    if (IsFirstRequest){
      if(data.body.status_code !== 200 && data.body.status_code !== 201){
        // console.log("\n===Turning the 1st req state to flase as qwe got the error ===\n isFirstReq", IsFirstRequest);
        // console.log("\n here if the req is NOT 200/201\n",data.body.status_code);
        // could have just returned here as the 1streq is already true
        setIsFirstRequest(true)
        return
      }
    }
    if (data.body.status_code === 200 || data.body.status_code === 201){
      // if got the response is perfect  check if 1st req --> if it is set th !st req state to false 
      // console.log("\n here if the req is 200/201\n");
      
      if (IsFirstRequest){
        setIsFirstRequest(false)
      }
      // console.log(`\n\n  input text to store in the zustand state ${inputText}  \n\n`);
      
      setSitePromptStoredInState(data.body.prompt)
      
      setTempLink(data.body.link_for_the_current_site)
      
    }
  }
}
},[data, responnseJSONForTempSite, isSuccess, status])



const temp_website_to_production_RQ = useQuery({
  queryKey:['temp_website_to_production'],
  queryFn: ()=>QueryFunction(`temp_website_to_production?project_name=${project_name}`,setJWT,temp_website_to_production_RQ.refetch,setMakeARequestFormTempToProject,setResponnseJSONForTempToProduction, {}),
  enabled:makeARequestFormTempToProject,
  retry:2
  // ------------ decide on the project name  ----------------
})

// const temp_website_to_production_RQ = reactQueryMakeAReq(`temp_website_to_production?project_name=${project_name}`, makeARequestFormTempToProject, setMakeARequestFormTempToProject, setResponnseJSONForTempToProduction, {}, setJWT  )

useEffect(()=>{console.log("\n\n ============================||----||data from the query fucntion============================||------||" , "\n\n-->>",(responnseJSONForTempToProduction?responnseJSONForTempToProduction:"") );
if (temp_website_to_production_RQ.data!=null || temp_website_to_production_RQ.data!= undefined){
  console.log("\n temp_website_to_production_RQ isSuccess -->>",temp_website_to_production_RQ.isSuccess,"\n\n ",);
  console.log("\n temp_website_to_production_RQ useeffect -->>",temp_website_to_production_RQ.data);
  
  alert_user_for_common__errors_from_backend_given_by_Rquery(temp_website_to_production_RQ.data)
  if (temp_website_to_production_RQ.data.body.message_for_the_user && temp_website_to_production_RQ.data.body.message_for_the_user.trim()=== "Oops! Your name was not found on the server" ){

    // if the user name is not there delete the credentials and go the sign in screen 
  
              deleteItemAsync("JWT") ;
              
              //  console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
              setJWT(null)
              
              router.replace('/(main_app)/');
    // probally return too
    return
  }
  if(temp_website_to_production_RQ.data.body){
    setIsModalVisible(false)
    console.log("\n\n here to make sure that the modalToShowTheProjectHostedLink is flase and not getting updated ----|||>>>>  \n\n");
    console.log("\n console.log(modalToShowTheProjectHostedLink);22  "+modalToShowTheProjectHostedLink);
    setModalToShowTheProjectHostedLink(true)
    setProjectLink(temp_website_to_production_RQ.data.body.link_for_the_current_site)
  }
}
},[temp_website_to_production_RQ.data, responnseJSONForTempToProduction, temp_website_to_production_RQ.isSuccess, temp_website_to_production_RQ.status, ])


const delete_a_project_or_temp = useQuery({
  queryKey:['delete_a_project_or_temp'],
  queryFn: ()=>QueryFunction(`delete_a_project_or_temp?project_name=${project_name}`, setJWT, delete_a_project_or_temp.refetch,setMakeARequestForDeleteAProjectOrTemp,setResponnseJSONForDeleteAProjectOrTemp, {}),
  enabled:makeARequestForDeleteAProjectOrTemp,
  retry:2
  // ------------ decide on the project name  ----------------
})

useEffect(()=>{console.log("\n\n ========isLoading====================||----||data from the query fucntion============================||------||" , "\n\n-->>",(responnseJSONForDeleteAProjectOrTemp?responnseJSONForDeleteAProjectOrTemp:"") );
if (delete_a_project_or_temp.data!=null || delete_a_project_or_temp.data!= undefined){
  console.log("\n data in the isSuccess -->>",delete_a_project_or_temp.isSuccess,"\n\n ",);
  console.log("\n data in the useeffect -->>",delete_a_project_or_temp.data);
  
  alert_user_for_common__errors_from_backend_given_by_Rquery(delete_a_project_or_temp.data)
  if (delete_a_project_or_temp.data.body.message_for_the_user && delete_a_project_or_temp.data.body.message_for_the_user.trim()=== "Oops! Your name was not found on the server" ){

    // if the user name is not there delete the credentials and go the sign in screen 
    
              deleteItemAsync("JWT") ;
              
              //  console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
              setJWT(null)
              
              router.replace('/(main_app)/');
    // probally return too
    return
  }
}
},[temp_website_to_production_RQ.data, responnseJSONForTempToProduction, temp_website_to_production_RQ.isSuccess, temp_website_to_production_RQ.status])



//  --------- XXXXXXXXX -----------------------


const get_all_the_projects_of_the_user = useQuery({
  queryKey:['get_all_the_projects_of_the_user'],
  queryFn: ()=>QueryFunction(`get_all_the_projects_of_the_user`, setJWT, get_all_the_projects_of_the_user.refetch,setMakeARequestForGetAllUserProject,setResponnseJSONForGetAllUserProject, {}),
  enabled:makeARequestForGetAllUserProject,
  retry:2
  // ------------ decide on the project name  ----------------
})

useEffect(()=>{console.log("\n\n ============================||----||data from the query fucntion get_all_the_projects_of_the_user============================||------||" , "\n\n-->>",(responnseJSONForGetAllUserProject?responnseJSONForGetAllUserProject:"") );

if (get_all_the_projects_of_the_user.data!=null || get_all_the_projects_of_the_user.data!= undefined){
  console.log("\n data in the isSuccess -->>",get_all_the_projects_of_the_user.isSuccess,"\n\n ",);
  console.log("\n data in the useeffect -->>",get_all_the_projects_of_the_user.data);
  console.log("\n -------------- get_all_the_projects_of_the_user-->>",get_all_the_projects_of_the_user, "\n\n");
  
  alert_user_for_common__errors_from_backend_given_by_Rquery(get_all_the_projects_of_the_user.data)

  console.log("gggggggggggggggggggg ---", get_all_the_projects_of_the_user);
  
  if(get_all_the_projects_of_the_user.data.body){

      if (get_all_the_projects_of_the_user.data.body.message_for_the_user && get_all_the_projects_of_the_user.data.body.message_for_the_user.trim()=== "Oops! Your name was not found on the server" ){
        
        // if the user name is not there delete the credentials and go the sign in screen 
        
        deleteItemAsync("JWT") ;
        
        //  console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
        setJWT(null)
        
        router.replace('/(main_app)/');
        // probally return too
        return
      }
      
      console.log("gggggggggggggggggggg 222222---",get_all_the_projects_of_the_user.data.body.status_code , " --type is ", typeof(get_all_the_projects_of_the_user.data.body.status_code ));
      if (get_all_the_projects_of_the_user.data.body.status_code === 200  ){
        // console.log("--c11c,",get_all_the_projects_of_the_user.data.body.values," type of ", typeof get_all_the_projects_of_the_user.data.body.values);
        // trying to parse it 

        console.log(" about to do operation on arrays ");
        
        let a = get_all_the_projects_of_the_user.data.body.values === null ?[""]:get_all_the_projects_of_the_user.data.body.values
        console.log(a, typeof a);
        setSitePromptArray(a)
        setItem('allProjectsByUserInString',a.toString())
        // console.log("User_Name_from_Req", );
        User_Name_from_Req===get_all_the_projects_of_the_user.data.body.User_Name?null:setUser_Name_from_Req(get_all_the_projects_of_the_user.data.body.User_Name)
        
    
        
    
        
        // now json parse it , if a is a single character or not there what to do then what  ( teachnically temp would be there)
        
        
      }
      
  }
}
},[get_all_the_projects_of_the_user.data, responnseJSONForGetAllUserProject, get_all_the_projects_of_the_user.isSuccess, get_all_the_projects_of_the_user.status])




// -----------------------------------__XXXXXXXXXXX__XX-


const get_the_name_for_the_project = useQuery({
  queryKey:['get_the_name_for_the_project'],
  queryFn: ()=>QueryFunction(`get_the_name_for_the_project`,setJWT,get_the_name_for_the_project.refetch,setMakeARequestForGetNameForTheProject,setResponnseJSONForGetNameForTheProject, {"prompt":inputText?inputText:sitePromptStoredInState}),
  enabled:makeARequestForGetNameForTheProject,
  retry:2
  // ------------ decide on the project name  ----------------
})

useEffect(()=>{console.log("\n\n ============================||----||data from the query fucntion============================||------||" , "\n\n-->>",(responnseJSONForGetNameForTheProject?responnseJSONForGetNameForTheProject:"") );
console.log(get_the_name_for_the_project,"oooooooooooooooooooooo");

if (get_the_name_for_the_project.data!=null || get_the_name_for_the_project.data!= undefined){
  console.log("\n data in the isSuccess -->>",get_the_name_for_the_project,"\n",);
  console.log("\n --------------||||| -->>\n",);
  console.log("\n data in the isSuccess -->>",String(get_the_name_for_the_project),"\n",);
  console.log("\n --------------||||| -->>\n",);
  console.log("\n data -->>",get_the_name_for_the_project,"\n",);
  console.log("\n data in the useeffect -->>",get_the_name_for_the_project.data);
  
  alert_user_for_common__errors_from_backend_given_by_Rquery(get_the_name_for_the_project.data)
  if (get_the_name_for_the_project.data.body.message_for_the_user && get_the_name_for_the_project.data.body.message_for_the_user.trim()=== "Oops! Your name was not found on the server" ){

    // if the user name is not there delete the credentials and go the sign in screen 
   
              deleteItemAsync("JWT") ;
              
              //  console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
              setJWT(null)
              
              router.replace('/(main_app)/');
    // probally return too
    return
  }



  if(get_the_name_for_the_project.data.body.project_name){
    // console.log("\n--- about to set the project name---\n");
    
    setProject_name(get_the_name_for_the_project.data.body.project_name.slice(0,29))
    setNameGeneratedFromTheDjango(true)
  }
}
},[get_the_name_for_the_project.data, responnseJSONForGetNameForTheProject, get_the_name_for_the_project.isSuccess, get_the_name_for_the_project.status])

console.log('toggleDrawer in HomeScreen:', openDrawer, setOpenDrawer);
  

 
    return (
      <>
      <View style={{ 
        flex: 1, 
        paddingTop: 150, 
        backgroundColor: makeARequestForTempProject || makeARequestFormTempToProject || makeARequestForDeleteAProjectOrTemp || makeARequestForGetAllUserProject || makeARequestForGetNameForTheProject ? '#330142' : '#010c1c'
      }}>
        {makeARequestForTempProject || makeARequestFormTempToProject || makeARequestForDeleteAProjectOrTemp || makeARequestForGetAllUserProject || makeARequestForGetNameForTheProject ?
          (<Text className="text-white text-2xl align-middle self-center mb-2">Loading, please wait</Text>) : null}
        
          <Modal visible={openDrawer} transparent={true} onRequestClose={()=>setOpenDrawer(false) }>
            <Animated.View style={[styles.modalContainer, animatedStyle]}>
              <DrawerToShowPreviousSites stateToToogleTheDrawerOn={openDrawer} toogleDrawer={()=>setOpenDrawer(!openDrawer)} />
            </Animated.View>
          </Modal>
          {/* ------ button for opening the drawer/hamburgerMenu -------  */}
          <ButtonFromRNPaper
          className="top-0 z-10 mx-2 my-4 absolute"
          textColor="#4f87d1"
          icon='menu'
          onPress={() => {
            console.log(" clicked on  Deployed websites");
            
            setMakeARequestForGetAllUserProject(true);
            try {
              setOpenDrawer(!openDrawer);
            } catch (error) { 
              console.error(" can't run the function ", error);
              
              // Alert.alert("can't work with function showdrawer", error)
            } 
          }}
        >
          Deployed websites
        </ButtonFromRNPaper>
           
          {/* ------ button for opening the drawer/hamburgerMenu -------  */}

        {/* modal for opening the website in the browser */}
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
            console.log("\n\n here to make sure that the modalToShowTheProjectHostedLink is flase and not getting updated ----|||>>>22>  \n\n");
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
          {/* modal for opening the website in the browser */}

          <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={()=>setIsModalVisible(false)}
        animationType="slide"
        >
          <View className="text-white flex rounded-3xl mt-60 mx-6 border-white border-2 p-7  " style={{backgroundColor:'#010c1c'}}   >
            {/* ---------snack bar to tell the user that previous prompt is used------------ */}
        
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
          onChangeText={(text) => text.length<29?setProject_name(text):null}  value={project_name}
          />
         <View className=" flex-row justify-center pt-4 mx-4">
         <PillShapeButtonForHomeScreen 
        //  colorOnTheBorderAndInTheText={"#0ce80c"} 
         colorOnTheBorderAndInTheText={project_name === null ? "#0ce80c": project_name.length<2?"#474747":"#0ce80c"} 
          textToBeDisplayed="deploy"  function_to_run_on_touch={
            ()=>{
              // -- call the api with the name set here 
              // console.log("ibfbvioub");
              if (project_name.length > 2){
                // console.log("\n--D4c--");

                // -------------------
                // --------------- check if the project is there if not just use the one from the zustand state state 
                // -------------------
                console.log("deploying");
                
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
    
        {/* <View className="mt-3">
      <Button title="delete jwt"
      onPress={()=>{
                deleteItemAsync("JWT") ;
        
         console.log("input text from the home screen -- ",inputText, "\n jwt tokens in zustand state -->>",JWT)
         setJWT(null)
        
  router.replace('/(main_app)/');
      }} />
        </View> */}

        <View style={{ flex: 1, backgroundColor: '#386eb5', borderTopLeftRadius: 32, borderTopRightRadius:32, paddingBottom:24 }}>
        
        {/* ---------snack bar to tell the user that previous prompt is used------------ */}
        {/* <ButtonFromRNPaper mode="outlined" onTouchStart={()=>{setShowSnackBarToTellThatWeUsedPreviousPromptFromZustandState(true)}} >Sbhbhjbe</ButtonFromRNPaper> */}
        <Snackbar
          className="z-40 bottom-24 my-2"
          visible={showSnackBarToTellThatWeUsedPreviousPromptFromZustandState}
          onDismiss={()=>setShowSnackBarToTellThatWeUsedPreviousPromptFromZustandState(false)}
          action={{
            label: 'Hide',
            onPress: () => {
              setShowSnackBarToTellThatWeUsedPreviousPromptFromZustandState(false)
            },
          }}
        >
          Using your old prompt, if want add a new one just type it out below
        </Snackbar>
        {/* ---------snack bar to tell the user that previous prompt is used------------ */}

        
        <View className="flex-1 items-center justify-center">
          {IsFirstRequest? ( 
            <>
              <Text className=" text-xl font-sans font-bold text-slate-900">Hi! Let's make you a website</Text>
              <PillShapeButtonForHomeScreen textToBeDisplayed={'Generate'} colorOnTheBorderAndInTheText={'#000000'} function_to_run_on_touch={()=>{
                if( inputText != null && inputText != undefined  ){
                 if (String(inputText).replaceAll(" ","").length >4){
                  console.log("\n\n input text from the generate --", inputText);
                  

                  setMakeARequestForTempProject(true)
                 }else{
                   Alert.alert("Text can't be so short", "Input can't be empty , please describe something about your website")
                 }
                }
                else{
                  Alert.alert("Text can't be so short", "Input can't be empty , please describe something about your website")
                }
                }} />
              
            </>
          )
          :
          (
            <>
            <PillShapeButtonForHomeScreen textToBeDisplayed={'Deploy'} 
              // colorOnTheBorderAndInTheText={'#0ce80c'}
              colorOnTheBorderAndInTheText={tempLink === null ? "#474747":"#0ce80c"} 
              function_to_run_on_touch={()=>{
             setMakeARequestForGetNameForTheProject(true);
             setIsModalVisible(true)
            // setMakeARequestForGetAllUserProject(true)

            
                }} />
            <PillShapeButtonForHomeScreen textToBeDisplayed={'Regenerate'} colorOnTheBorderAndInTheText={'#000000'} function_to_run_on_touch={()=>{
              // let textToSeeIfMakeARequest = inputText?inputText:sitePromptStoredInState
              let textToSeeIfMakeARequest 
              let inputTextFromState = inputText

              if (inputTextFromState === null || String(inputTextFromState).replaceAll(" ","").length <4){
                console.log("inputText from the state  and sitePromptStoredInState -- ", inputText, " <-->  ",sitePromptStoredInState);
                //  checking if sitePromptStoredInState is there 
                if (sitePromptStoredInState != null ){
                  console.log("\n\n sitePromptStoredInState in the re-gen-->>",sitePromptStoredInState);
                  
                  if( sitePromptStoredInState.replaceAll(" ","").length > 5){  // --- would have caught it in the first deploy button (but here for 
                    // the redeploy check (what if entering the input second time them made it small) )
                    textToSeeIfMakeARequest = sitePromptStoredInState
                    setShowSnackBarToTellThatWeUsedPreviousPromptFromZustandState(true)
                  }else{
                    Alert.alert("Input can't be empty", "Input was empty or too short, please describe something about your website")
                    return
                  }
                }
                //  wait how will this else if cond. be true, input text is null or erased, state text is not there, meaning that
                //  there were no state created before that means it is the first request
                else { 
                  
                  Alert.alert("Input can't be empty", "Input was, please describe something about your website in the input below")
                  return
                }
                
              }else if (String(inputTextFromState).replaceAll(" ","").length >4){
                textToSeeIfMakeARequest = inputTextFromState
              }else if(String(inputTextFromState).replaceAll(" ","").length <4){
                Alert.alert("Input needed", "Input was not found, please describe something about your website in the input box below")
                return
              } 
             


              console.log("\n textToSeeIfMakeARequest ---",textToSeeIfMakeARequest);


              if( textToSeeIfMakeARequest != null || textToSeeIfMakeARequest != undefined ){
                // setI sFirstReque st(false) // ----XXXX ---this one should not be here as we 
                setMakeARequestForTempProject(true)
                setInputText(textToSeeIfMakeARequest)
                setTimeout(()=>setInputText(inputText),3)
                // setMakeARequestForGetNameForTheProject(true);
                
                // setIsModalVisible(true)
                // String(inputText).length >2 ||
              }
              else{
                Alert.alert("Text can't be empty", "Input can't be empty , please describe something about your website")
              }
            }} />
            
            
            {/* -----------------  2nd update --------------- */}

              {/* <PillShapeButtonForHomeScreen textToBeDisplayed={'Tweak it '} colorOnTheBorderAndInTheText={'#f20a77'} /> */}
            
            {/* -----------------  2nd update --------------- */}
            
            <PillShapeButtonForHomeScreen textToBeDisplayed={'See the temp site'} 
            // colorOnTheBorderAndInTheText={'#6f099a'}
            colorOnTheBorderAndInTheText={tempLink === null ? "#474747":"#d7de02"} 
            function_to_run_on_touch={async()=>{
              console.log("temp ink -->>", tempLink);
              
             if (tempLink){
              let a = await Linking.canOpenURL(tempLink)
             if (a){
               Linking.openURL(tempLink)
             }
             else{
               Alert.alert("Can't open the link", "Sorry we can't open the url in a web browser ,please copy it and paste it there")
             }

             }
             
             }} />

            </>
          )}

        </View>

        </View>

        <View style={{ paddingTop:5, paddingBottom:10 ,position: 'absolute', bottom: 0, left: 0, right: 0, 
        alignItems:"center",backgroundColor: '#386eb5' , borderRadius:24}}>
          <TextInput className='z-10 border-2 px-4 w-96 rounded-3xl py-4 text-white border-white h-auto max-h-44' 
              placeholder='Describe you website' placeholderTextColor={"#000a14"} multiline={true} numberOfLines={1} 
              onChangeText={(text) => setInputText(text)} value={inputText} 
              autoFocus={true}  
            />
        </View>
      </View>
      </>
    )
  }

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  });