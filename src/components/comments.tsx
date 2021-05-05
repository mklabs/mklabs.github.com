import {useRef, useEffect} from 'react'
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'

const Comments = ({commentBox}) => (<div ref={commentBox} className="comments"></div>)
export default Comments