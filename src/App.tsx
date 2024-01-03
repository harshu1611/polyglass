import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
// import Tab1 from './pages/MainPage';
import { useState,useEffect } from 'react';
import MainPage from './pages/MainPage';
import './tailwind.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

// /* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

// /* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import acrylic from './assets/images/acrylic.jpg'
import { supabase } from './supabase/supabase';
import Login from './pages/Login';
import Led from './pages/Led';
import SignUp from './pages/SignUp';
import LowStock from './pages/LowStock';

setupIonicReact();

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null)
  const [uid,setUid]=useState<any>()
  const [user,setUser]=useState<any>()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)

      if(session){
        setUid(session?.user.id)
      } else {
        setUid(null)
      }
      
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    // console.log(session)

    // if (session && session.user) {
    //       setUid(session.user.id);
          
    //     }
    return () => subscription.unsubscribe(); 

    
  }, [session])

// // console.log(session)
// useEffect(() => {
//   if (session && session.user) {
//     setUid(session.user.id);
    
//   }

  
// }, [session]);
  // console.log(uid)
// }
// console.log(session.user.id)

const getUser=async(userId:any)=>{

  if(userId){
    let { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
  
    setUser(profiles);
  }
    else {
      setUser(null)
    }
          // console.log(profiles)
}


  useEffect(() => {
    getUser(uid)
   }, [uid])



return  <IonApp>
  {session===null && !uid?
   <IonReactRouter>
    <Route exact path='/login'>
    <Login/>
    </Route>
    <Route exact path='/signup'>
    <SignUp/>
    </Route>
    <Route
            path="/"
            render={() => <Redirect to="/login" />}
            exact={true}
          />
           <Route
            path="/tab1"
            render={() => <Redirect to="/login" />}
            exact={true}
          />
           <Route
            path="/tab2"
            render={() => <Redirect to="/login" />}
            exact={true}
          />
           <Route
            path="/tab3"
            render={() => <Redirect to="/login" />}
            exact={true}
          />
  </IonReactRouter> 
 
   :session && uid && user && user[0].authorized===false? 
   <div className='bg-white h-full flex flex-col justify-center items-center p-4'>
    <h1 className='text-black'>Not Authorized to access application. Contact harsh.mobile231@gmail.com</h1>
    <button className='bg-blue-300' onClick={async()=>await supabase.auth.signOut()}>
      <h1>Sign Out</h1>
    </button>
  </div> 
   :session && uid && user && user[0].authorized && 
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <MainPage />
          </Route>
           <Route exact path="/tab2">
            <Led/>
          </Route>
          <Route path="/tab3">
            <LowStock />
          </Route> 
          <Route exact path="/login">
            <Redirect to="/tab1" />
          </Route>
          <Route exact path="/signup">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            {/* <img src={acrylic} className='h-8 w-8'/> */}
            <IonLabel className='text-lg'>SHEETS</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            {/* <IonIcon aria-hidden="true" icon={ellipse} /> */}
            <IonLabel className='text-lg'>LED</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            {/* <IonIcon aria-hidden="true" icon={square} /> */}
            <IonLabel className='text-lg'>Low Stock</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
   
        }
  </IonApp>
};

export default App;
