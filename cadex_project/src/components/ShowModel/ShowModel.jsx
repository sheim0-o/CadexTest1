import React, { useEffect, useState } from 'react'
import css from './show-model.module.css'
import * as THREE from 'three'
import { setModel } from './showModel';

export default function ShowModel({options}) {


    useEffect(() => {
        const elem = document.querySelector('#three-bg');
        
        setModel(elem, options);
    }, [options])

  return (
    <div id='three-bg' className={css.canvas}>
    </div>
  )
}
