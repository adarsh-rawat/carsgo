import React, {useEffect, useRef} from 'react'
import './sidebar.css'
import {useLocation} from 'react-router-dom';

function Sidebar(props){

    
    const location = useLocation();

    const items = props.items.map((e, index) => <SidebarItem content={e} key={index}/>)

    const isFirstRun = useRef(true); 
    // above line is implemented so that mobile-sidebar (for mobile website) does not open when homepage is opened
    //for rest of times, whenever a link is clicked on sidebar (from mobile), the sidebar will be closed due this useEffect
    useEffect(()=>{
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
          }
        if(window.innerWidth < 980) //this line makes sure that it is a mobile screen, and not a desktop
          props.handleClick()
      }, [location])

    return (
        <div className='sidebar' id='sidebar'>
            <div>
            <svg onClick={props.handleClick} className='closeButton' fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 7.7070312 6.2929688 L 6.2929688 7.7070312 L 23.585938 25 L 6.2929688 42.292969 L 7.7070312 43.707031 L 25 26.414062 L 42.292969 43.707031 L 43.707031 42.292969 L 26.414062 25 L 43.707031 7.7070312 L 42.292969 6.2929688 L 25 23.585938 L 7.7070312 6.2929688 z"/></svg><br/>
            <br/>
            </div>
            {items}       
        </div>
    )
}

function SidebarItem(props){
    return (
        <div className='sidebarItem'>
            {props.content}
        </div>
    )
}

export default Sidebar;