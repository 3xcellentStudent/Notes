export default function SVGClock(props){
   return(
      <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <polyline fill="none" points="11.9 5.9 11.9 11.9 12 12 14.1 14.1" stroke={props.color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
         <circle cx="12" cy="12" fill="none" id="Circle-2" r="10" stroke={props.color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </svg>
   )
}