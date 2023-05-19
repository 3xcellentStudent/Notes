export default function SVGProgress(props){

   return(
      <>
         <svg style={{transform: 'rotate(-90deg)', position: 'relative', zIndex: 2}} viewBox="0 0 100 100">
            <circle style={{transition: '.5s'}} cx="50" cy="50" r="44" stroke="#2ECC71" strokeWidth="10" fill="transparent" 
            strokeDashoffset={295 + props.dasharray} strokeDasharray={295} />
         </svg>
         <svg style={{transform: 'rotate(-90deg)', position: 'absolute', zIndex: 0, left: 0}} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" stroke="#f8c9c5" strokeWidth="10" fill="transparent" 
            strokeDashoffset={0} strokeDasharray={295} />
         </svg>
      </>
   )
}