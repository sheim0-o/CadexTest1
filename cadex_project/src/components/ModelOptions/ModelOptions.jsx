import React, { useEffect, useState } from 'react'
import css from './model-options.module.css'

export default function ModelOptions({setOptions}) {
    const [ radius, setRadius ] = useState(4);
    const [ height, setHeight] = useState(4);
    const [ radialSegments, setRadialSegments] = useState(4);

    useEffect(()=>{
        setOptions({
            radius:radius,
            height:height,
            radialSegments:radialSegments
        });
    }, [radius,height,radialSegments])

  return (
    <div className={css.options}>
        <div className={css.numberPicker}>
            <label htmlFor="radius">Radius (between 3 and 100):</label>
            <input type="number" id="radius" name="radius" 
            min="3" max="100" defaultValue={radius} 
            onChange={e => setRadius(e.target.value)}/>
        </div>
        
        <div className={css.numberPicker}>
            <label htmlFor="height">Height (between 3 and 100):</label>
            <input type="number" id="height" name="height" 
            min="3" max="100" defaultValue={height}
            onChange={e => setHeight(e.target.value)}/>
        </div>

        <div className={css.numberPicker}>
            <label htmlFor="radialSegments">Radial segments (between 3 and 100):</label>
            <input type="number" id="radialSegments" name="radialSegments" 
            min="3" max="100" defaultValue={radialSegments}            
            onChange={e => setRadialSegments(e.target.value)} />
        </div>
    </div>
  )
}
